'use strict';

var express = require('express');
var router  = express.Router();
var ctrl    = require('../controllers/menuController');
var { protect, authorize } = require('../middleware/auth');

// Public
router.get('/',            ctrl.getAll);
router.get('/categories',  ctrl.getCategories);
router.get('/featured',    ctrl.getFeatured);
router.get('/special',     ctrl.getSpecial);
router.get('/popular',     ctrl.getPopular);
router.get('/recommended', ctrl.getRecommended);
router.get('/trending',    ctrl.getTrending);
router.get('/:id',         ctrl.getById);

// Admin
router.post('/',     protect, authorize('admin'), ctrl.create);
router.put('/:id',   protect, authorize('admin'), ctrl.update);
router.delete('/:id',protect, authorize('admin'), ctrl.remove);

module.exports = router;
