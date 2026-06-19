'use strict';

var { Event, Testimonial, Notification } = require('../models/misc');
var Order       = require('../models/Order');
var Reservation = require('../models/Reservation');
var User        = require('../models/User');
var MenuItem    = require('../models/MenuItem');
var { asyncHandler } = require('../middleware/error');

// ── Events ────────────────────────────────────────────────────────────────────
exports.getEvents = asyncHandler(async function(req, res) {
  var events = await Event.find({ isActive: true }).sort({ date: -1 }).lean();
  res.json({ success: true, data: events });
});

exports.getEventById = asyncHandler(async function(req, res) {
  var event = await Event.findById(req.params.id).lean();
  if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
  res.json({ success: true, data: event });
});

// Admin
exports.createEvent = asyncHandler(async function(req, res) {
  var event = await Event.create(req.body);
  res.status(201).json({ success: true, data: event });
});

exports.updateEvent = asyncHandler(async function(req, res) {
  var event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
  res.json({ success: true, data: event });
});

exports.deleteEvent = asyncHandler(async function(req, res) {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Event deleted' });
});

// ── Testimonials ──────────────────────────────────────────────────────────────
exports.getTestimonials = asyncHandler(async function(req, res) {
  var items = await Testimonial.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});

exports.createTestimonial = asyncHandler(async function(req, res) {
  var item = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.updateTestimonial = asyncHandler(async function(req, res) {
  var item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  res.json({ success: true, data: item });
});

exports.deleteTestimonial = asyncHandler(async function(req, res) {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
});

// ── Stats ─────────────────────────────────────────────────────────────────────
exports.getStats = asyncHandler(async function(req, res) {
  res.json({
    success: true,
    data: {
      years: 12, satisfied: 20000, chefs: 15, awards: 50,
    },
  });
});

// ── Admin Analytics ───────────────────────────────────────────────────────────
exports.getAnalytics = asyncHandler(async function(req, res) {
  var [totalOrders, totalReservations, totalUsers, menuCount] = await Promise.all([
    Order.countDocuments(),
    Reservation.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    MenuItem.countDocuments(),
  ]);

  // Revenue
  var revenueAgg = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);
  var totalRevenue = revenueAgg[0] ? revenueAgg[0].total : 0;

  // Monthly orders (last 6 months)
  var sixMonths = new Date();
  sixMonths.setMonth(sixMonths.getMonth() - 6);
  var monthlyOrders = await Order.aggregate([
    { $match: { createdAt: { $gte: sixMonths } } },
    { $group: {
      _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
      count: { $sum: 1 }, revenue: { $sum: '$total' }
    }},
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  // Popular dishes
  var popularItems = await Order.aggregate([
    { $unwind: '$items' },
    { $group: { _id: '$items.name', count: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  // Recent orders
  var recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).lean();

  // Status breakdown
  var orderStatuses = await Order.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.json({
    success: true,
    data: {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders, totalReservations, totalUsers, menuCount,
      monthlyOrders, popularItems, recentOrders, orderStatuses,
    },
  });
});

// ── Notifications ─────────────────────────────────────────────────────────────
exports.getNotifications = asyncHandler(async function(req, res) {
  var notes = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50).lean();
  res.json({ success: true, data: notes });
});

exports.markNotificationsRead = asyncHandler(async function(req, res) {
  await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
  res.json({ success: true, message: 'Marked as read' });
});
