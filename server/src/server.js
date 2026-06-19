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


// Render / Production support
app.set('trust proxy', 1);


const server = http.createServer(app);


// Frontend URLs
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173"
].filter(Boolean);



// Socket.IO
const io = new Server(server, {

  cors:{
    origin: allowedOrigins,
    credentials:true
  }

});


app.set('io', io);



// Database
connectDB();



// Security middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy:false,
    contentSecurityPolicy:false
  })
);



// CORS
app.use(
  cors({

    origin:(origin, callback)=>{

      if(!origin){
        return callback(null,true);
      }


      if(allowedOrigins.includes(origin)){
        return callback(null,true);
      }


      return callback(
        new Error("CORS blocked: " + origin)
      );

    },

    credentials:true

  })
);



// Body parser
app.use(
  express.json({
    limit:"10mb"
  })
);


app.use(
  express.urlencoded({
    extended:true,
    limit:"10mb"
  })
);



// Sanitize
app.use(
  mongoSanitize()
);



// Logs
app.use(
  morgan(
    process.env.NODE_ENV === "production"
    ? "combined"
    : "dev"
  )
);



// Rate limit

const apiLimiter = rateLimit({

  windowMs:15 * 60 * 1000,

  max:500,

  message:{
    success:false,
    message:"Too many requests"
  }

});


const authLimiter = rateLimit({

  windowMs:60 * 60 * 1000,

  max:30,

  message:{
    success:false,
    message:"Too many authentication attempts"
  }

});


app.use(
  '/api/',
  apiLimiter
);


app.use(
  '/api/auth/',
  authLimiter
);




// Root route
app.get('/', (req,res)=>{

  res.json({

    message:"🍽️ Grilli API is running",

    status:"success"

  });

});




// Health check

app.get('/api/health',(req,res)=>{

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





// API Routes

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





// Error handler

app.use(errorHandler);





// Render Port

const PORT = process.env.PORT || 3001;



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