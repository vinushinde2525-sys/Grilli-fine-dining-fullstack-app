'use strict';

var Order  = require('../models/Order');
var { Payment } = require('../models/misc');
var emailSvc = require('../services/emailService');
var { asyncHandler } = require('../middleware/error');
var crypto = require('crypto');

// Normalize any order doc (including legacy/malformed ones already in the DB)
// so every field the frontend reads is guaranteed present and correctly typed.
function normalizeOrder(o) {
  if (!o) return o;
  return {
    ...o,
    items:         Array.isArray(o.items) ? o.items : [],
    customer:      o.customer && typeof o.customer === 'object' ? o.customer : { name: 'Guest', email: '', phone: '' },
    status:        o.status || 'pending',
    subtotal:      typeof o.subtotal === 'number' ? o.subtotal : 0,
    tax:           typeof o.tax === 'number' ? o.tax : 0,
    deliveryFee:   typeof o.deliveryFee === 'number' ? o.deliveryFee : 0,
    total:         typeof o.total === 'number' ? o.total : 0,
    address:       o.address || '',
    paymentMethod: o.paymentMethod || 'COD',
    paymentStatus: o.paymentStatus || 'pending',
    estimatedTime: o.estimatedTime || '25-35 min',
    createdAt:     o.createdAt || null,
  };
}

// POST /api/orders
exports.createOrder = asyncHandler(async function(req, res) {
  var b = req.body;
  if (!b.items || !Array.isArray(b.items) || b.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must have at least one item' });
  }

  var order = await Order.create({
    items:         b.items,
    user:          req.user ? req.user._id : null,
    customer:      b.customer || { name: 'Guest' },
    address:       b.address  || 'Pickup from restaurant',
    orderType:     b.orderType     || 'delivery',
    paymentMethod: b.paymentMethod || 'COD',
    paymentStatus: b.paymentMethod === 'COD' ? 'pending' : 'pending',
    subtotal:      b.subtotal   || 0,
    tax:           b.tax        || 0,
    deliveryFee:   b.deliveryFee || 0,
    total:         b.total      || 0,
    estimatedTime: '25-35 min',
  });

  // Emit socket event
  var io = req.app.get('io');
  if (io) {
    io.to('admin').emit('new_order', { orderId: order.orderId, total: order.total, customer: order.customer.name });
  }

  emailSvc.sendOrderConfirmation(order).catch(function() {});

  res.status(201).json({ success: true, data: order });
});

// GET /api/orders (admin: all; customer: theirs)
exports.getAll = asyncHandler(async function(req, res) {
  var filter  = {};
  var isAdmin = req.user && req.user.role === 'admin';
  if (!isAdmin && req.user) filter.user = req.user._id;

  var page  = parseInt(req.query.page  || '1', 10);
  var limit = parseInt(req.query.limit || '20', 10);
  var skip  = (page - 1) * limit;

  if (req.query.status) filter.status = req.query.status;

  var total  = await Order.countDocuments(filter);
  var orders = await Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

  res.json({ success: true, count: total, page, pages: Math.ceil(total / limit), data: orders.map(normalizeOrder) });
});

// GET /api/orders/:orderId
exports.getById = asyncHandler(async function(req, res) {
  var order = await Order.findOne({ orderId: req.params.orderId }).lean();
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, data: normalizeOrder(order) });
});

// PUT /api/orders/:orderId/status (admin)
exports.updateStatus = asyncHandler(async function(req, res) {
  var order = await Order.findOneAndUpdate(
    { orderId: req.params.orderId },
    { status: req.body.status },
    { new: true }
  );
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

  // Real-time update
  var io = req.app.get('io');
  if (io) {
    io.to('order_' + order.orderId).emit('order_status_update', { orderId: order.orderId, status: order.status });
  }

  res.json({ success: true, data: order });
});

// ── Razorpay ──────────────────────────────────────────────────────────────────

// POST /api/orders/create-payment
exports.createPayment = asyncHandler(async function(req, res) {
  try {
    var Razorpay = require('razorpay');
    var rz = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    var amount = Math.round((req.body.amount || 0) * 100); // paise
    var rzOrder = await rz.orders.create({ amount, currency: 'INR', receipt: 'grilli_' + Date.now() });

    // Update order with razorpay order id
    if (req.body.orderId) {
      await Order.findOneAndUpdate({ orderId: req.body.orderId }, { razorpayOrderId: rzOrder.id });
    }

    res.json({ success: true, data: { orderId: rzOrder.id, amount: rzOrder.amount, currency: rzOrder.currency, key: process.env.RAZORPAY_KEY_ID } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Payment creation failed: ' + err.message });
  }
});

// POST /api/orders/verify-payment
exports.verifyPayment = asyncHandler(async function(req, res) {
  var { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  var body = razorpay_order_id + '|' + razorpay_payment_id;
  var expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(body).digest('hex');

  if (expected !== razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Payment verification failed' });
  }

  // Mark order paid
  var order = await Order.findOneAndUpdate(
    { orderId },
    { paymentStatus: 'paid', razorpayPaymentId: razorpay_payment_id, razorpayOrderId: razorpay_order_id },
    { new: true }
  );

  await Payment.create({
    orderId, razorpayOrderId: razorpay_order_id, razorpayPaymentId: razorpay_payment_id,
    amount: order ? order.total : 0, status: 'captured',
  });

  res.json({ success: true, message: 'Payment verified', data: order });
});
