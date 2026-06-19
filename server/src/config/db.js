'use strict';

var mongoose = require('mongoose');

var dropLegacyIndexes = async function() {
  try {
    var db = mongoose.connection.db;
    if (!db) return;

    // Drop legacy orderNumber unique index if present
    var orders = db.collection('orders');
    var ixList = await orders.indexes().catch(function() { return []; });
    var leg = ixList.find(function(ix) { return ix.name === 'orderNumber_1'; });
    if (leg) {
      await orders.dropIndex('orderNumber_1');
      console.log('[DB] Dropped legacy orderNumber_1 index');
    }
  } catch(e) {
    console.warn('[DB] Could not check legacy indexes:', e.message);
  }
};

var connectDB = async function() {
  try {
    var uri = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grilli')
      .replace('localhost', '127.0.0.1');

    var conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    console.log('[DB] MongoDB connected: ' + conn.connection.host);
    await dropLegacyIndexes();
  } catch (err) {
    console.error('[DB] Connection failed:', err.message);
    console.error('[DB] Make sure MongoDB is running');
  }
};

mongoose.connection.on('disconnected', function() {
  console.warn('[DB] MongoDB disconnected — retrying...');
});

mongoose.connection.on('reconnected', function() {
  console.log('[DB] MongoDB reconnected');
});

module.exports = connectDB;
