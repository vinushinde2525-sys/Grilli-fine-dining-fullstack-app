'use strict';

// Wrap async route handlers to catch errors
exports.asyncHandler = function(fn) {
  return function(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Global error handler
exports.errorHandler = function(err, req, res, next) {
  var status  = err.statusCode || err.status || 500;
  var message = err.message || 'Server Error';

  // Mongoose duplicate key
  if (err.code === 11000) {
    var field = Object.keys(err.keyValue || {})[0] || 'field';
    message = field + ' already exists';
    status  = 400;
  }
  // Mongoose validation
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(function(e) { return e.message; }).join(', ');
    status  = 400;
  }
  // JWT
  if (err.name === 'JsonWebTokenError') { message = 'Invalid token'; status = 401; }
  if (err.name === 'TokenExpiredError') { message = 'Token expired'; status = 401; }

  console.error('[' + status + ']', message, err.stack ? err.stack.split('\n')[1] : '');
  res.status(status).json({ success: false, message });
};
