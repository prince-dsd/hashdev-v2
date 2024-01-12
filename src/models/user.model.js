const { Schema, model } = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const options = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your full name'],
      min: [2, 'Name is too short!'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      min: [2, 'Name is too short!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter a valid email address'],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
    starred: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
    watching: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
    created_at: {
      type: Date,
      default: Date.now(),
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  options
);

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);


userSchema.index({ name: 1, username: 1, email: 1 });
userSchema.virtual('first_name').get(function () {
  return this.name.split(' ')[0];
});
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.encryptPasswordResetToken = function (token) {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.changedPasswordSinceJWT = function (JWTTimestamp) {
  let hasPasswordChanged = false;

  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    hasPasswordChanged = JWTTimestamp < changedTimestamp;
  }
  return hasPasswordChanged;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = this.constructor.encryptPasswordResetToken(resetToken);

  this.passwordResetExpires = Date.now() + process.env.PASSWORD_RESET_EXPIRY_MINUTES * 60 * 1000;

  return resetToken;
};

/**
 * @typedef User
 */
const User = model('User', userSchema, 'users');

module.exports = User;
