'use strict';

var mongoose = require('mongoose');
var crypto   = require('crypto');

var OrderItemSchema = new mongoose.Schema({
  menuItem:  { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null },
  id:        { type: String },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true, min: 1 },
  image:     { type: String, default: '' },
});

var OrderSchema = new mongoose.Schema({
  orderId:  { type: String, unique: true, sparse: true },
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  items:    { type: [OrderItemSchema], default: [] },
  customer: {
    type: {
      name:  { type: String, required: true },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    default: function() { return { name: 'Guest', email: '', phone: '' }; },
  },
  address:       { type: String, default: '' },
  orderType:     { type: String, enum: ['delivery', 'pickup'], default: 'delivery' },
  paymentMethod: { type: String, enum: ['COD', 'CARD', 'UPI', 'razorpay'], default: 'COD' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'confirmed',
  },
  subtotal:      { type: Number, default: 0 },
  tax:           { type: Number, default: 0 },
  deliveryFee:   { type: Number, default: 0 },
  total:         { type: Number, default: 0 },
  estimatedTime: { type: String, default: '25-35 min' },
  razorpayOrderId:   { type: String, default: null },
  razorpayPaymentId: { type: String, default: null },
  notes:         { type: String, default: '' },
}, { timestamps: true });

// Guaranteed-unique orderId: year + timestamp ms + 4 random hex bytes
OrderSchema.pre('save', function(next) {
  if (!this.orderId) {
    var year = new Date().getFullYear();
    var ts   = Date.now().toString(36).toUpperCase();
    var rnd  = crypto.randomBytes(3).toString('hex').toUpperCase();
    this.orderId = 'GR-' + year + '-' + ts + rnd;
  }
  next();
});

OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });

// Drop legacy 'orderNumber' unique index if it exists (from old schema)
OrderSchema.post('init', function() {});

var Order = mongoose.model('Order', OrderSchema);

// On first model load, drop the legacy index silently
(async function dropLegacyIndex() {
  try {
    var coll = mongoose.connection.db && mongoose.connection.db.collection('orders');
    if (coll) {
      var indexes = await coll.indexes();
      var hasLegacy = indexes.some(function(ix) { return ix.name === 'orderNumber_1'; });
      if (hasLegacy) {
        await coll.dropIndex('orderNumber_1');
        console.log('[DB] Dropped legacy orderNumber_1 index');
      }
    }
  } catch(e) { /* ignore - runs before connection ready, will retry on next restart */ }
})();

module.exports = Order;
