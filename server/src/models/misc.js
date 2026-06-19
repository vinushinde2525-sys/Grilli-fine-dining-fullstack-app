'use strict';

var mongoose = require('mongoose');

// ── Event ─────────────────────────────────────────────────────────────────────
var EventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, default: 'General' },
  date:        { type: String, required: true },
  description: { type: String, default: '' },
  image:       { type: String, required: true },
  imagePublicId: { type: String, default: null },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

// ── Testimonial ───────────────────────────────────────────────────────────────
var TestimonialSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  role:     { type: String, default: 'Guest' },
  avatar:   { type: String, default: '' },
  text:     { type: String, required: true },
  rating:   { type: Number, default: 5, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// ── Notification ──────────────────────────────────────────────────────────────
var NotificationSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:   { type: String, required: true },
  message: { type: String, required: true },
  type:    { type: String, enum: ['order', 'reservation', 'promo', 'system'], default: 'system' },
  isRead:  { type: Boolean, default: false },
  link:    { type: String, default: null },
  meta:    { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

NotificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

// ── Payment ───────────────────────────────────────────────────────────────────
var PaymentSchema = new mongoose.Schema({
  order:            { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  orderId:          { type: String },
  razorpayOrderId:  { type: String },
  razorpayPaymentId:{ type: String, default: null },
  amount:           { type: Number, required: true },
  currency:         { type: String, default: 'INR' },
  status:           { type: String, enum: ['created', 'captured', 'failed', 'refunded'], default: 'created' },
  method:           { type: String, default: null },
}, { timestamps: true });

module.exports = {
  Event:        mongoose.model('Event', EventSchema),
  Testimonial:  mongoose.model('Testimonial', TestimonialSchema),
  Notification: mongoose.model('Notification', NotificationSchema),
  Payment:      mongoose.model('Payment', PaymentSchema),
};
