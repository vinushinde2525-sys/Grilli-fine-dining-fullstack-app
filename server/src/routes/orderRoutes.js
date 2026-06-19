'use strict';

var express = require('express');
var router  = express.Router();
var ctrl    = require('../controllers/orderController');
var { protect, authorize, optionalAuth } = require('../middleware/auth');

// Static routes FIRST (before dynamic :orderId)
router.post('/create-payment',     optionalAuth, ctrl.createPayment);
router.post('/verify-payment',     optionalAuth, ctrl.verifyPayment);

// Collection routes
router.post('/',                   optionalAuth, ctrl.createOrder);
router.get ('/',                   protect,      ctrl.getAll);

// Dynamic routes LAST
router.get ('/:orderId',           protect,      ctrl.getById);
router.put ('/:orderId/status',    protect, authorize('admin'), ctrl.updateStatus);

module.exports = router;
