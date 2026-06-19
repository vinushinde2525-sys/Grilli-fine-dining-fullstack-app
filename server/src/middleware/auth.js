'use strict';

var jwt  = require('jsonwebtoken');
var User = require('../models/User');

exports.protect = async function(req, res, next) {
  var token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised — no token' });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET || 'grilli_secret');
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

exports.authorize = function() {
  var roles = Array.from(arguments);
  return function(req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Not authorised for this resource' });
    }
    next();
  };
};

// Optional auth — doesn't fail if no token
exports.optionalAuth = async function(req, res, next) {
  var token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET || 'grilli_secret');
      req.user = await User.findById(decoded.id);
    } catch (e) {}
  }
  next();
};
