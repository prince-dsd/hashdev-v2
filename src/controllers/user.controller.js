const { User, Profile } = require('../models');
const { commonService } = require('../services');
const { AppError, catchAsync } = require('../utils');

exports.getUser = commonService.getOneById(User);
exports.createUserAdmin = commonService.createOne(User);
exports.updateUserAdmin = commonService.updateOneById(User);
exports.deleteUser = commonService.deleteOneById(User);

exports.getIdFromCurrentUser = (req, _res, next) => {
  req.params.id = req.user.id;
  next();
};

// Allows updating of name, email & active status
exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email, username, password, password2, active } = req.body;
  const user = await User.findById(req.params.id);

  // Create error if user sends password data
  if (password || password2) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /auth/update-password.',
        400,
      ),
    );
  }

  if (name && name !== user.name) user.name = name;

  if (username && username !== user.username) {
    if (await User.findOne({ username })) {
      return next(new AppError('This username is already taken!', 400));
    }
    user.username = username;
  }

  if (email && email !== user.email) {
    if (await User.findOne({ email })) {
      return next(new AppError('This email is already taken!', 400));
    }
    user.email = email;
  }

  if ('active' in req.body) {
    await Profile.findByIdAndUpdate(user.profile, { active });
    user.active = active;
  }

  user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// eslint-disable-next-line no-unused-vars
exports.getWatching = catchAsync(async (req, res, _next) => {
  const { watching } = await User.findById(req.params.id).populate('watching');

  res.status(200).json({
    status: 'success',
    data: {
      watching,
    },
  });
});

// eslint-disable-next-line no-unused-vars
exports.getLikes = catchAsync(async (req, res, _next) => {
  const { likes } = await User.findById(req.params.id).populate('likes');

  res.status(200).json({
    status: 'success',
    data: {
      likes,
    },
  });
});
