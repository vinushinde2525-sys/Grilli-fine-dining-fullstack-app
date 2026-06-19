'use strict';

var express = require('express');
var router  = express.Router();
var ctrl    = require('../controllers/adminController');
var { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/users',        ctrl.getUsers);
router.put('/users/:id',    ctrl.updateUser);
router.delete('/users/:id', ctrl.deleteUser);

module.exports = router;
