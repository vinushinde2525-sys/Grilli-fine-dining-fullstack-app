'use strict';

var { errorHandler, asyncHandler } = require('../src/middleware/error');

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status: function(code) { this.statusCode = code; return this; },
    json: function(payload) { this.body = payload; return this; },
  };
}

describe('errorHandler middleware', function() {
  test('defaults to 500 for generic errors', function() {
    var res = mockRes();
    errorHandler(new Error('boom'), {}, res, function() {});
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('boom');
    expect(res.body.success).toBe(false);
  });

  test('maps Mongo duplicate key errors to 400', function() {
    var res = mockRes();
    var err = new Error('dup');
    err.code = 11000;
    err.keyValue = { email: 'a@a.com' };
    errorHandler(err, {}, res, function() {});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email already exists/i);
  });

  test('maps Mongoose ValidationError to 400', function() {
    var res = mockRes();
    var err = new Error('validation failed');
    err.name = 'ValidationError';
    err.errors = { name: { message: 'Name is required' } };
    errorHandler(err, {}, res, function() {});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Name is required');
  });

  test('maps expired JWT to 401', function() {
    var res = mockRes();
    var err = new Error('jwt expired');
    err.name = 'TokenExpiredError';
    errorHandler(err, {}, res, function() {});
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token expired');
  });
});

describe('asyncHandler', function() {
  test('forwards thrown errors to next() instead of crashing', async function() {
    var nextCalled = null;
    var handler = asyncHandler(async function() {
      throw new Error('async failure');
    });
    await handler({}, {}, function(err) { nextCalled = err; });
    expect(nextCalled).toBeInstanceOf(Error);
    expect(nextCalled.message).toBe('async failure');
  });

  test('does not call next() when the handler resolves normally', async function() {
    var nextCalled = false;
    var handler = asyncHandler(async function(req, res) { res.ok = true; });
    var res = {};
    await handler({}, res, function() { nextCalled = true; });
    expect(nextCalled).toBe(false);
    expect(res.ok).toBe(true);
  });
});
