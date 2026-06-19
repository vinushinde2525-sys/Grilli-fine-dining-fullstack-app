'use strict';

var express = require('express');
var router  = express.Router();
var ctrl    = require('../controllers/reservationController');
var { protect, authorize, optionalAuth } = require('../middleware/auth');

router.post('/',                       optionalAuth, ctrl.create);
router.get('/',                        protect, authorize('admin'), ctrl.getAll);
router.get('/:refId',                  ctrl.getByRef);
router.put('/:refId/status',           protect, authorize('admin'), ctrl.updateStatus);

module.exports = router;
