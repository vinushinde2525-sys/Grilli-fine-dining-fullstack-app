'use strict';

var Reservation = require('../models/Reservation');
var { Notification } = require('../models/misc');
var emailSvc = require('../services/emailService');
var { asyncHandler } = require('../middleware/error');

// POST /api/reservations
exports.create = asyncHandler(async function(req, res) {
  var b = req.body;
  if (!b.name || !b.phone || !b.date || !b.time) {
    return res.status(400).json({ success: false, message: 'Name, phone, date and time are required' });
  }

  var entry = await Reservation.create({
    user:    req.user ? req.user._id : null,
    name:    b.name,
    phone:   b.phone,
    email:   b.email || '',
    persons: b.persons || '2 Persons',
    date:    b.date,
    time:    b.time,
    message: b.message || '',
    status:  'confirmed',
  });

  // Socket notification to admin
  var io = req.app.get('io');
  if (io) {
    io.to('admin').emit('new_reservation', { refId: entry.refId, name: entry.name, date: entry.date, time: entry.time });
  }

  // User notification
  if (req.user) {
    Notification.create({
      user:    req.user._id,
      title:   'Reservation Confirmed',
      message: 'Your table for ' + entry.date + ' at ' + entry.time + ' is confirmed. Ref: ' + entry.refId,
      type:    'reservation',
      link:    '/reservation/success/' + entry.refId,
    }).catch(function() {});
  }

  emailSvc.sendReservationConfirmation(entry).catch(function() {});

  res.status(201).json({ success: true, data: entry });
});

// GET /api/reservations/:refId
exports.getByRef = asyncHandler(async function(req, res) {
  var entry = await Reservation.findOne({ refId: req.params.refId }).lean();
  if (!entry) return res.status(404).json({ success: false, message: 'Reservation not found' });
  res.json({ success: true, data: entry });
});

// GET /api/reservations (admin)
exports.getAll = asyncHandler(async function(req, res) {
  var filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.date)   filter.date   = req.query.date;

  var page  = parseInt(req.query.page  || '1', 10);
  var limit = parseInt(req.query.limit || '20', 10);
  var skip  = (page - 1) * limit;

  var total = await Reservation.countDocuments(filter);
  var list  = await Reservation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

  res.json({ success: true, count: total, page, pages: Math.ceil(total / limit), data: list });
});

// PUT /api/reservations/:refId/status (admin)
exports.updateStatus = asyncHandler(async function(req, res) {
  var entry = await Reservation.findOneAndUpdate(
    { refId: req.params.refId },
    { status: req.body.status, adminNotes: req.body.adminNotes || '' },
    { new: true }
  );
  if (!entry) return res.status(404).json({ success: false, message: 'Reservation not found' });

  var io = req.app.get('io');
  if (io) io.to('res_' + entry.refId).emit('reservation_update', { refId: entry.refId, status: entry.status });

  res.json({ success: true, data: entry });
});
