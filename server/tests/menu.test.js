'use strict';

process.env.JWT_SECRET = 'test_secret';

var request  = require('supertest');
var testDb   = require('./testDb');
var { app }  = require('../src/app');
var MenuItem = require('../src/models/MenuItem');

beforeAll(async function() { await testDb.connect(); });
afterEach(async function() { await testDb.clear(); });
afterAll(async function() { await testDb.close(); });

function sampleItem(overrides) {
  return Object.assign({
    name: 'Paneer Tikka',
    category: 'starters',
    price: 220,
    description: 'Grilled cottage cheese with spices',
    image: 'https://example.com/paneer.jpg',
    isVeg: true,
    isAvailable: true,
  }, overrides || {});
}

describe('Menu API', function() {
  test('GET /api/menu returns only available items', async function() {
    await MenuItem.create(sampleItem({ name: 'Available Dish' }));
    await MenuItem.create(sampleItem({ name: 'Hidden Dish', isAvailable: false }));

    var res = await request(app).get('/api/menu');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Available Dish');
  });

  test('GET /api/menu filters by category', async function() {
    await MenuItem.create(sampleItem({ name: 'Starter A', category: 'starters' }));
    await MenuItem.create(sampleItem({ name: 'Main A', category: 'mains' }));

    var res = await request(app).get('/api/menu?category=mains');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].category).toBe('mains');
  });

  test('GET /api/menu respects veg filter', async function() {
    await MenuItem.create(sampleItem({ name: 'Veg Dish', isVeg: true }));
    await MenuItem.create(sampleItem({ name: 'Non Veg Dish', isVeg: false }));

    var res = await request(app).get('/api/menu?isVeg=true');
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].isVeg).toBe(true);
  });

  test('unknown API route returns 404', async function() {
    var res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/health reports API status', async function() {
    var res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
