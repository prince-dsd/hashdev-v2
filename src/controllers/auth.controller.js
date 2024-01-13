const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const jwtExpiryMilliseconds = process.env.JWT_EXPIRES_MINUTES * 60 * 1000;

const cookieOptions = {
  expires: new Date(Date.now() + jwtExpiryMilliseconds),
  httpOnly: true,
  sameSite: 'strict',
};

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});


const login = catchAsync(async (req, res) => {
  const { userId, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(userId, password);
  const tokens = await tokenService.generateAuthTokens(user);

  res.cookie('jwt', tokens.access.token, cookieOptions);
  res.send({ user, tokens });
});

const updatePassword = catchAsync(async (req, res) => {
  const { currentPassword, password } = req.body;
  const user = await authService.updatePasswordWithID(req.user.id, currentPassword, password)
  const tokens = await tokenService.generateAuthTokens(user);
  // Create and send JWT
  res.cookie('jwt', tokens.access.token, cookieOptions);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  updatePassword,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
