const { body } = require('express-validator');
const { sanitize } = require('../utils');
const { validateWithExpressValidaor } = require('../middlewares/validate');


const passwordRules = sanitize.fieldRequired('password', 'Password is required')
  .bail()
  .custom(value => value.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z])/g))
  .withMessage('Password must contain a mix of letters, numbers and symbols')
  .bail()
  .isLength({ min: 8 })
  .withMessage('Password must contain at least 8 characters');

const password2Rules = sanitize.fieldRequired('password2', 'Confirm password is required')
  .bail()
  .custom((value, { req }) => value === req.body.password)
  .withMessage('Password and confirm password must match');

const emailRules = sanitize.fieldRequired('email', 'Email is required')
  .bail()
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage('Please enter a valid email');

const usernameRules = sanitize.fieldRequired('username', 'Username is required')
  .bail()
  .trim()
  .custom(value => value.split('').indexOf(' ') === -1)
  .withMessage("Username can't contain any spaces");

const signUpRules = [
  sanitize.fieldRequired('name', 'Name is required'),
  usernameRules,
  emailRules,
  passwordRules,
  password2Rules,
];

const signInRules = [
  sanitize.fieldRequired('userId', 'Username or email is required'),
  sanitize.fieldRequired('password', 'Password is required'),
];

const forgotPasswordRules = emailRules;

const resetPasswordRules = [passwordRules, password2Rules];

const updatePasswordRules = [
  sanitize.fieldRequired('current_password', 'Please enter your current password'),
  passwordRules,
  password2Rules,
];

const updateUserRules = [
  body('name', "Name can't be empty")
    .if(body('name').exists())
    .notEmpty(),
  body('username', "Username can't be empty")
    .if(body('username').exists())
    .notEmpty(),
  body('email', "Email can't be empty")
    .if(body('email').exists())
    .notEmpty()
    .bail()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('active', 'Active field should be a true or false bool')
    .if(body('active').exists())
    .isBoolean()
    .toBoolean(),
];


const validation = validationRules => [validationRules, validateWithExpressValidaor];

exports.signUp = validation(signUpRules);
exports.signIn = validation(signInRules);
exports.forgotPassword = validation(forgotPasswordRules);
exports.resetPassword = validation(resetPasswordRules);
exports.updatePassword = validation(updatePasswordRules);
exports.updateUser = validation(updateUserRules);

