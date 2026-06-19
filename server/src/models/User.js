'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var jwt      = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  name: {
    type: String, required: [true, 'Name is required'], trim: true, maxlength: [60, 'Name too long'],
  },
  email: {
    type: String, required: [true, 'Email is required'], unique: true,
    lowercase: true, trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String, required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'], select: false,
  },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  avatar:   { type: String, default: null },
  phone:    { type: String, default: null },
  address:  { type: String, default: null },
  isActive: { type: Boolean, default: true },
  resetPasswordToken:   { type: String, select: false },
  resetPasswordExpire:  { type: Date,   select: false },
  refreshToken:         { type: String, select: false },
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  var salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function(entered) {
  return bcrypt.compare(entered, this.password);
};

UserSchema.methods.getSignedToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'grilli_secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

UserSchema.methods.getRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET || 'grilli_refresh',
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
  );
};

UserSchema.methods.getResetToken = function() {
  var crypto = require('crypto');
  var token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken  = crypto.createHash('sha256').update(token).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return token;
};

// NO duplicate index — unique:true on the field is sufficient
module.exports = mongoose.model('User', UserSchema);
