'use strict';

var express = require('express');
var router  = express.Router();
var ctrl    = require('../controllers/contentController');
var { protect, authorize } = require('../middleware/auth');

// Public
router.get('/events',           ctrl.getEvents);
router.get('/events/:id',       ctrl.getEventById);
router.get('/testimonials',     ctrl.getTestimonials);
router.get('/stats',            ctrl.getStats);

// Admin
router.post('/events',          protect, authorize('admin'), ctrl.createEvent);
router.put('/events/:id',       protect, authorize('admin'), ctrl.updateEvent);
router.delete('/events/:id',    protect, authorize('admin'), ctrl.deleteEvent);

router.post('/testimonials',    protect, authorize('admin'), ctrl.createTestimonial);
router.put('/testimonials/:id', protect, authorize('admin'), ctrl.updateTestimonial);
router.delete('/testimonials/:id', protect, authorize('admin'), ctrl.deleteTestimonial);

// Analytics
router.get('/analytics',        protect, authorize('admin'), ctrl.getAnalytics);

// Notifications
router.get('/notifications',         protect, ctrl.getNotifications);
router.put('/notifications/read-all',protect, ctrl.markNotificationsRead);

module.exports = router;
