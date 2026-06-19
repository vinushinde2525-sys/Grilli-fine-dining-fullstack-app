'use strict';

var User    = require('../models/User');
var { asyncHandler } = require('../middleware/error');

// GET /api/admin/users
exports.getUsers = asyncHandler(async function(req, res) {
  var page  = parseInt(req.query.page  || '1', 10);
  var limit = parseInt(req.query.limit || '20', 10);
  var skip  = (page - 1) * limit;
  var total = await User.countDocuments();
  var users = await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-refreshToken').lean();
  res.json({ success: true, count: total, page, pages: Math.ceil(total / limit), data: users });
});

// PUT /api/admin/users/:id
exports.updateUser = asyncHandler(async function(req, res) {
  var allowed = ['name', 'email', 'role', 'isActive'];
  var update  = {};
  allowed.forEach(function(k) { if (req.body[k] !== undefined) update[k] = req.body[k]; });
  var user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-refreshToken');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

// DELETE /api/admin/users/:id
exports.deleteUser = asyncHandler(async function(req, res) {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ success: false, message: 'Cannot delete yourself' });
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
});
