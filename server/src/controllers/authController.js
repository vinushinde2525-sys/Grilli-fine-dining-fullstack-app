'use strict';

var crypto  = require('crypto');
var User    = require('../models/User');
var email   = require('../services/emailService');
var { asyncHandler } = require('../middleware/error');

var sendTokenResponse = function(user, statusCode, res) {
  var token        = user.getSignedToken();
  var refreshToken = user.getRefreshToken();
  user.refreshToken = refreshToken;
  user.save({ validateBeforeSave: false });

  res.status(statusCode).json({
    success: true,
    token,
    refreshToken,
    user: {
      id:     user._id,
      name:   user.name,
      email:  user.email,
      role:   user.role,
      avatar: user.avatar,
      phone:  user.phone,
    },
  });
};

// POST /api/auth/register
exports.register = asyncHandler(async function(req, res) {
  var { name, email: userEmail, password } = req.body;
  if (!name || !userEmail || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password required' });
  }
  var exists = await User.findOne({ email: userEmail });
  if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

  var user = await User.create({ name, email: userEmail, password });
  email.sendWelcomeEmail(user).catch(function() {});
  sendTokenResponse(user, 201, res);
});

// POST /api/auth/login
exports.login = asyncHandler(async function(req, res) {
  var { email: userEmail, password } = req.body;
  if (!userEmail || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }
  var user = await User.findOne({ email: userEmail }).select('+password');
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  var isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  sendTokenResponse(user, 200, res);
});

// POST /api/auth/logout
exports.logout = asyncHandler(async function(req, res) {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  }
  res.json({ success: true, message: 'Logged out' });
});

// GET /api/auth/me
exports.getMe = asyncHandler(async function(req, res) {
  res.json({ success: true, user: req.user });
});

// PUT /api/auth/profile
exports.updateProfile = asyncHandler(async function(req, res) {
  var allowed = ['name', 'phone', 'address'];
  var updates = {};
  allowed.forEach(function(k) { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
  var user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
  res.json({ success: true, user });
});

// PUT /api/auth/change-password
exports.changePassword = asyncHandler(async function(req, res) {
  var { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Both passwords required' });
  }
  var user = await User.findById(req.user._id).select('+password');
  var ok = await user.matchPassword(currentPassword);
  if (!ok) return res.status(400).json({ success: false, message: 'Current password incorrect' });
  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: 'Password updated' });
});

// POST /api/auth/forgot-password
exports.forgotPassword = asyncHandler(async function(req, res) {
  var user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ success: false, message: 'No account with that email' });
  var resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });
  var resetUrl = (process.env.CLIENT_URL || 'http://localhost:5173') + '/reset-password/' + resetToken;
  email.sendPasswordReset(user, resetUrl).catch(function() {});
  res.json({ success: true, message: 'Password reset email sent' });
});

// PUT /api/auth/reset-password/:token
exports.resetPassword = asyncHandler(async function(req, res) {
  var hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  var user   = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpire: { $gt: Date.now() } }).select('+resetPasswordToken +resetPasswordExpire');
  if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });
  user.password             = req.body.password;
  user.resetPasswordToken   = undefined;
  user.resetPasswordExpire  = undefined;
  await user.save();
  sendTokenResponse(user, 200, res);
});

// POST /api/auth/refresh
exports.refreshToken = asyncHandler(async function(req, res) {
  var jwt  = require('jsonwebtoken');
  var { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ success: false, message: 'No refresh token' });
  try {
    var decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'grilli_refresh');
    var user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
    sendTokenResponse(user, 200, res);
  } catch (e) {
    res.status(401).json({ success: false, message: 'Refresh token expired' });
  }
});
