'use strict';

var nodemailer = require('nodemailer');

var isEmailConfigured = function() {
  var user = process.env.EMAIL_USER || '';
  var pass = process.env.EMAIL_PASS || '';
  // Skip if placeholder values
  return user && pass && user !== 'your_email@gmail.com' && pass !== 'your_app_password';
};

var transporter = null;

var getTransporter = function() {
  if (!isEmailConfigured()) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
  });
  return transporter;
};

var sendEmail = async function(opts) {
  var t = getTransporter();
  if (!t) {
    console.log('[Email] Skipped (not configured): ' + opts.subject);
    return;
  }
  try {
    await t.sendMail({
      from:    process.env.EMAIL_FROM || 'Grilli <noreply@grilli.com>',
      to:      opts.to,
      subject: opts.subject,
      html:    opts.html || opts.text,
    });
    console.log('[Email] Sent to', opts.to);
  } catch (err) {
    console.warn('[Email] Failed (non-fatal):', err.message.split('\n')[0]);
    // Never throw — email failure must not break order/reservation flow
  }
};

var goldBar = '<div style="height:3px;background:linear-gradient(90deg,#c9a96e,#e8c97e,#c9a96e);margin:20px 0"></div>';
var wrap = function(content) {
  return '<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0e0f11;color:#fff;padding:40px 30px;border:1px solid #2a2a2a">' +
    '<h1 style="font-size:36px;color:#fff;margin:0 0 4px">Grilli<span style="color:#c9a96e">.</span></h1>' +
    goldBar + content + goldBar +
    '<p style="color:#666;font-size:12px;text-align:center;margin-top:20px">© ' + new Date().getFullYear() + ' Grilli Restaurant. All rights reserved.</p>' +
    '</div>';
};

exports.sendWelcomeEmail = function(user) {
  if (!user || !user.email) return Promise.resolve();
  return sendEmail({
    to: user.email,
    subject: 'Welcome to Grilli Restaurant!',
    html: wrap(
      '<h2 style="color:#c9a96e">Welcome, ' + user.name + '!</h2>' +
      '<p style="color:#aaa;line-height:1.8">Thank you for joining Grilli. Explore our menu, make reservations, and enjoy the finest dining experience.</p>' +
      '<a href="' + (process.env.CLIENT_URL || 'http://localhost:5173') + '/menu" style="display:inline-block;background:#c9a96e;color:#111;padding:12px 28px;text-decoration:none;font-weight:bold;margin-top:16px">Browse Our Menu</a>'
    ),
  });
};

exports.sendReservationConfirmation = function(res) {
  if (!res || !res.email) return Promise.resolve();
  return sendEmail({
    to: res.email,
    subject: 'Reservation Confirmed — ' + res.refId,
    html: wrap(
      '<h2 style="color:#c9a96e">Your Table is Booked!</h2>' +
      '<table style="width:100%;color:#ccc;margin:16px 0">' +
      '<tr><td style="padding:6px 0;color:#666">Reference</td><td style="color:#c9a96e;font-weight:bold">' + res.refId + '</td></tr>' +
      '<tr><td style="padding:6px 0;color:#666">Name</td><td>' + res.name + '</td></tr>' +
      '<tr><td style="padding:6px 0;color:#666">Date</td><td>' + res.date + '</td></tr>' +
      '<tr><td style="padding:6px 0;color:#666">Time</td><td>' + res.time + '</td></tr>' +
      '<tr><td style="padding:6px 0;color:#666">Guests</td><td>' + res.persons + '</td></tr>' +
      '</table>'
    ),
  });
};

exports.sendOrderConfirmation = function(order) {
  if (!order || !order.customer || !order.customer.email) return Promise.resolve();
  var itemRows = order.items.map(function(i) {
    return '<tr><td style="padding:6px 0;color:#ccc">' + i.name + ' ×' + i.quantity + '</td><td style="color:#c9a96e">$' + (i.price * i.quantity).toFixed(2) + '</td></tr>';
  }).join('');
  return sendEmail({
    to: order.customer.email,
    subject: 'Order Confirmed — ' + order.orderId,
    html: wrap(
      '<h2 style="color:#c9a96e">Order Placed!</h2>' +
      '<p style="color:#aaa">Thank you, ' + order.customer.name + '. Your order <strong style="color:#fff">' + order.orderId + '</strong> has been received.</p>' +
      '<table style="width:100%;margin:16px 0">' + itemRows + '</table>' +
      '<p style="color:#c9a96e;font-size:18px;font-weight:bold">Total: $' + order.total.toFixed(2) + '</p>' +
      '<p style="color:#aaa">Estimated: <strong>' + order.estimatedTime + '</strong></p>'
    ),
  });
};

exports.sendPasswordReset = function(user, resetUrl) {
  if (!user || !user.email) return Promise.resolve();
  return sendEmail({
    to: user.email,
    subject: 'Password Reset — Grilli',
    html: wrap(
      '<h2 style="color:#c9a96e">Reset Your Password</h2>' +
      '<p style="color:#aaa">Click below (valid 10 minutes):</p>' +
      '<a href="' + resetUrl + '" style="display:inline-block;background:#c9a96e;color:#111;padding:12px 28px;text-decoration:none;font-weight:bold;margin-top:16px">Reset Password</a>' +
      '<p style="color:#666;margin-top:20px;font-size:13px">If you did not request this, ignore this email.</p>'
    ),
  });
};
