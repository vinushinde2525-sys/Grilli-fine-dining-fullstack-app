'use strict';

var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
  refId:   { type: String, unique: true },
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name:    { type: String, required: true, trim: true },
  phone:   { type: String, required: true },
  email:   { type: String, default: '' },
  persons: { type: String, default: '2 Persons' },
  date:    { type: String, required: true },
  time:    { type: String, required: true },
  message: { type: String, default: '' },
  status:  {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'confirmed',
  },
  adminNotes: { type: String, default: '' },
}, { timestamps: true });

ReservationSchema.pre('save', function(next) {
  if (!this.refId) {
    this.refId = 'GR-' + Math.random().toString(36).substr(2, 7).toUpperCase();
  }
  next();
});

// Only secondary indexes here
ReservationSchema.index({ user: 1, createdAt: -1 });
ReservationSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model('Reservation', ReservationSchema);
