'use strict';

process.env.JWT_SECRET = 'test_secret';
process.env.NODE_ENV = 'test';

var request = require('supertest');
var testDb  = require('./testDb');
var { app } = require('../src/app');
var User    = require('../src/models/User');

beforeAll(async function() { await testDb.connect(); });
afterEach(async function() { await testDb.clear(); });
afterAll(async function() { await testDb.close(); });

describe('Auth API', function() {
  var validUser = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };

  test('POST /api/auth/register creates a user and returns a token', async function() {
    var res = await request(app).post('/api/auth/register').send(validUser);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user.password).toBeUndefined();
  });

  test('POST /api/auth/register rejects missing fields', async function() {
    var res = await request(app).post('/api/auth/register').send({ email: 'x@x.com' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/register rejects duplicate email', async function() {
    await request(app).post('/api/auth/register').send(validUser);
    var res = await request(app).post('/api/auth/register').send(validUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already registered/i);
  });

  test('POST /api/auth/login succeeds with correct credentials', async function() {
    await request(app).post('/api/auth/register').send(validUser);
    var res = await request(app).post('/api/auth/login').send({
      email: validUser.email, password: validUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('POST /api/auth/login fails with wrong password', async function() {
    await request(app).post('/api/auth/register').send(validUser);
    var res = await request(app).post('/api/auth/login').send({
      email: validUser.email, password: 'wrongpass',
    });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/auth/me requires a token', async function() {
    var res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  test('GET /api/auth/me returns user when authenticated', async function() {
    var regRes = await request(app).post('/api/auth/register').send(validUser);
    var token = regRes.body.token;
    var res = await request(app).get('/api/auth/me').set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(validUser.email);
  });

  test('password is hashed, not stored in plaintext', async function() {
    await request(app).post('/api/auth/register').send(validUser);
    var stored = await User.findOne({ email: validUser.email }).select('+password');
    expect(stored.password).not.toBe(validUser.password);
    var matches = await stored.matchPassword(validUser.password);
    expect(matches).toBe(true);
  });
});
