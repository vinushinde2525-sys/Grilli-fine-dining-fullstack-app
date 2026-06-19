'use strict';

var express = require('express');
var router  = express.Router();
var ctrl    = require('../controllers/authController');
var { protect } = require('../middleware/auth');

router.post('/register',         ctrl.register);
router.post('/login',            ctrl.login);
router.post('/logout',           protect, ctrl.logout);
router.get ('/me',               protect, ctrl.getMe);
router.put ('/profile',          protect, ctrl.updateProfile);
router.put ('/change-password',  protect, ctrl.changePassword);
router.post('/forgot-password',  ctrl.forgotPassword);
router.put ('/reset-password/:token', ctrl.resetPassword);
router.post('/refresh',          ctrl.refreshToken);

module.exports = router;
