'use strict';

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('[Socket] Client connected:', socket.id);

    // Join admin room
    socket.on('join_admin', function() {
      socket.join('admin');
      console.log('[Socket] Admin joined:', socket.id);
    });

    // Track order
    socket.on('track_order', function(orderId) {
      socket.join('order_' + orderId);
      console.log('[Socket] Tracking order:', orderId);
    });

    // Track reservation
    socket.on('track_reservation', function(refId) {
      socket.join('res_' + refId);
    });

    // Join user room for notifications
    socket.on('join_user', function(userId) {
      socket.join('user_' + userId);
    });

    socket.on('disconnect', function() {
      console.log('[Socket] Client disconnected:', socket.id);
    });
  });
};
