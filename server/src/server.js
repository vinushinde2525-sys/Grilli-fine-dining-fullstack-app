'use strict';

require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const socketHandler = require('./sockets/socketHandler');
const { errorHandler } = require('./middleware/error');

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const contentRoutes = require('./routes/contentRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();


// Render / production proxy support
app.set('trust proxy', 1);


const server = http.createServer(app);


// Allowed frontend URLs
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173"
].filter(Boolean);


// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});


app.set('io', io);


// Database connection
connectDB();


// Security middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
  })
);


// CORS
app.use(
  cors({
    origin: function(origin, callback) {

      // allow Postman/server requests
      if (!origin) {
        return callback(null, true);
      }


      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }


      return callback(
        new Error("CORS blocked: " + origin)
      );
    },

    credentials: true
  })
);


// Body parsing
app.use(
  express.json({
    limit: "10mb"
  })
);


app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb"
  })
);


// Security
app.use(mongoSanitize());


// Logging
app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? "combined"
      : "dev"
  )
);


// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    success:false,
    message:"Too many requests"
  }
});


const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message:{
    success:false,
    message:"Too many login attempts"
  }
});


app.use('/api/', apiLimiter);

app.use(
  '/api/auth/',
  authLimiter
);



// Health check
app.get('/api/health', (req,res)=>{

  const mongoose = require('mongoose');

  res.json({

    success:true,

    message:"Grilli API running",

    database:
      mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected",

    environment:
      process.env.NODE_ENV,

    timestamp:
      new Date().toISOString()

  });

});



// Routes

app.use(
  '/api/auth',
  authRoutes
);


app.use(
  '/api/menu',
  menuRoutes
);


app.use(
  '/api/orders',
  orderRoutes
);


app.use(
  '/api/reservations',
  reservationRoutes
);


app.use(
  '/api/content',
  contentRoutes
);


app.use(
  '/api/admin',
  adminRoutes
);



// API 404
app.use(
  '/api/*',
  (req,res)=>{

    res.status(404).json({

      success:false,

      message:"API endpoint not found"

    });

  }
);



// Socket handlers
socketHandler(io);



// Error middleware
app.use(errorHandler);



// Render PORT
const PORT =
  process.env.PORT || 3001;



server.listen(
  PORT,
  "0.0.0.0",
  ()=>{

    console.log(`
====================================
 🍽️  Grilli API Running
 Port: ${PORT}
 Environment: ${process.env.NODE_ENV}
 Health: /api/health
====================================
`);

  }
);



module.exports = {
  app,
  server
};