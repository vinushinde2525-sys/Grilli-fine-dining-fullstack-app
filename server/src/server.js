'use strict';

require('dotenv').config();

var connectDB = require('./config/db');
var { app, server } = require('./app');

// Connect DB (non-blocking — server starts even if DB is down)
connectDB();

var PORT = parseInt(process.env.PORT || '3001', 10);

server.listen(PORT, '0.0.0.0', function() {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║     🍽️  Grilli API v3 — Running      ║');
  console.log('  ║  Port: ' + PORT + '                          ║');
  console.log('  ║  Health: /api/health                 ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
});

// Graceful shutdown — helps on Render/Docker restarts
process.on('SIGTERM', function() {
  console.log('[Server] SIGTERM received, shutting down gracefully');
  server.close(function() {
    process.exit(0);
  });
});

module.exports = { app, server };
