'use strict';

var MenuItem = require('../models/MenuItem');
var { asyncHandler } = require('../middleware/error');

// GET /api/menu
exports.getAll = asyncHandler(async function(req, res) {
  var q      = req.query;
  var filter = { isAvailable: true };

  if (q.category && q.category !== 'all') filter.category = q.category.toLowerCase();
  if (q.isVeg === 'true')  filter.isVeg = true;
  if (q.featured === 'true') filter.isFeatured = true;

  var limit = Math.min(parseInt(q.limit || '100', 10), 100);
  var skip  = (Math.max(parseInt(q.page || '1', 10), 1) - 1) * limit;

  var sort = {};
  if (q.sort === 'price_asc')  sort = { price: 1 };
  else if (q.sort === 'price_desc') sort = { price: -1 };
  else if (q.sort === 'rating')     sort = { rating: -1 };
  else if (q.sort === 'newest')     sort = { createdAt: -1 };
  else sort = { sortOrder: 1, createdAt: 1 };

  var queryObj;
  if (q.search && q.search.trim()) {
    queryObj = MenuItem.find(
      Object.assign({}, filter, { $text: { $search: q.search.trim() } }),
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
  } else {
    queryObj = MenuItem.find(filter).sort(sort);
  }

  var total = await MenuItem.countDocuments(filter);
  var items = await queryObj.skip(skip).limit(limit).lean();

  res.json({ success: true, count: total, data: items });
});

// GET /api/menu/categories
exports.getCategories = asyncHandler(async function(req, res) {
  var cats = await MenuItem.aggregate([
    { $match: { isAvailable: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  var ORDER = ['starters', 'mains', 'specials', 'desserts', 'drinks', 'brunch'];
  cats.sort(function(a, b) {
    var ai = ORDER.indexOf(a._id), bi = ORDER.indexOf(b._id);
    if (ai === -1) ai = 99; if (bi === -1) bi = 99;
    return ai - bi;
  });
  var data = cats.map(function(c) {
    return { id: c._id, name: c._id.charAt(0).toUpperCase() + c._id.slice(1), count: c.count };
  });
  res.json({ success: true, data: data });
});

// GET /api/menu/featured
exports.getFeatured = asyncHandler(async function(req, res) {
  var items = await MenuItem.find({ isFeatured: true, isAvailable: true })
    .sort({ sortOrder: 1 }).limit(8).lean();
  res.json({ success: true, count: items.length, data: items });
});

// GET /api/menu/special
exports.getSpecial = asyncHandler(async function(req, res) {
  var item = await MenuItem.findOne({ category: 'specials', isAvailable: true })
    .sort({ rating: -1 }).lean();
  if (!item) {
    item = await MenuItem.findOne({ isFeatured: true, isAvailable: true }).sort({ rating: -1 }).lean();
  }
  if (!item) return res.status(404).json({ success: false, message: 'No special dish found' });
  res.json({ success: true, data: item });
});

// GET /api/menu/popular
exports.getPopular = asyncHandler(async function(req, res) {
  var items = await MenuItem.find({ isPopular: true, isAvailable: true })
    .sort({ reviewCount: -1 }).limit(8).lean();
  if (items.length === 0) {
    items = await MenuItem.find({ isAvailable: true }).sort({ rating: -1 }).limit(8).lean();
  }
  res.json({ success: true, count: items.length, data: items });
});

// GET /api/menu/recommended
exports.getRecommended = asyncHandler(async function(req, res) {
  var items = await MenuItem.find({ tags: 'chef-special', isAvailable: true })
    .sort({ rating: -1 }).limit(6).lean();
  if (items.length === 0) {
    items = await MenuItem.find({ isAvailable: true }).sort({ rating: -1 }).limit(6).lean();
  }
  res.json({ success: true, count: items.length, data: items });
});

// GET /api/menu/trending
exports.getTrending = asyncHandler(async function(req, res) {
  var items = await MenuItem.find({ tags: 'new', isAvailable: true })
    .sort({ createdAt: -1 }).limit(6).lean();
  if (items.length < 3) {
    items = await MenuItem.find({ isAvailable: true }).sort({ createdAt: -1 }).limit(6).lean();
  }
  res.json({ success: true, count: items.length, data: items });
});

// GET /api/menu/:id — works with MongoDB _id OR slug
exports.getById = asyncHandler(async function(req, res) {
  var id   = req.params.id;
  var item = null;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    item = await MenuItem.findById(id).lean();
  }
  if (!item) {
    item = await MenuItem.findOne({ slug: id }).lean();
  }
  if (!item) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }
  res.json({ success: true, data: item });
});

// POST /api/menu (admin)
exports.create = asyncHandler(async function(req, res) {
  var item = await MenuItem.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// PUT /api/menu/:id (admin)
exports.update = asyncHandler(async function(req, res) {
  var item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, data: item });
});

// DELETE /api/menu/:id (admin)
exports.remove = asyncHandler(async function(req, res) {
  var item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, message: 'Deleted' });
});
