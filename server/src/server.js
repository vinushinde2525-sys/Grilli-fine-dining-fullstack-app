'use strict';

require('dotenv').config();

var path       = require('path');
var express    = require('express');
var http       = require('http');
var { Server } = require('socket.io');
var cors       = require('cors');
var helmet     = require('helmet');
var morgan     = require('morgan');
var rateLimit  = require('express-rate-limit');
var mongoSanitize = require('express-mongo-sanitize');

var connectDB      = require('./config/db');
var socketHandler  = require('./sockets/socketHandler');
var { errorHandler } = require('./middleware/error');

var authRoutes        = require('./routes/authRoutes');
var menuRoutes        = require('./routes/menuRoutes');
var orderRoutes       = require('./routes/orderRoutes');
var reservationRoutes = require('./routes/reservationRoutes');
var contentRoutes     = require('./routes/contentRoutes');
var adminRoutes       = require('./routes/adminRoutes');

var app    = express();
var server = http.createServer(app);

var allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

var io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true },
});

app.set('io', io);

// Connect DB (non-blocking — server starts even if DB is down)
connectDB();

// Security
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false, // disable so images load from any src
}));

app.use(cors({
  origin: function(origin, cb) {
    if (!origin) return cb(null, true); // allow non-browser requests
    if (allowedOrigins.some(function(o) { return origin.startsWith(o.replace(/\/$/, '')); })) {
      return cb(null, true);
    }
    cb(null, true); // in dev, allow all
  },
  credentials: true,
}));

app.use(mongoSanitize());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 500, message: 'Too many requests' }));
app.use('/api/auth/', rateLimit({ windowMs: 60 * 60 * 1000, max: 30, message: 'Too many auth attempts' }));

// Health check (before other routes)
app.get('/api/health', function(req, res) {
  var mongoose = require('mongoose');
  res.json({
    success: true,
    message: 'Grilli API v3',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth',         authRoutes);
app.use('/api/menu',         menuRoutes);
app.use('/api/orders',       orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/content',      contentRoutes);
app.use('/api/admin',        adminRoutes);

// 404 for unmatched API routes
app.use('/api/*', function(req, res) {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Socket.IO
socketHandler(io);

// Global error handler
app.use(errorHandler);

var PORT = parseInt(process.env.PORT || '3001', 10);
server.listen(PORT, '0.0.0.0', function() {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║     🍽️  Grilli API v3 — Running      ║');
  console.log('  ║  http://localhost:' + PORT + '              ║');
  console.log('  ║  Health: /api/health                 ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
});

module.exports = { app, server };
