// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const {
  getSymptomTrends,
  getDailySymptomStats,
  getTopSymptoms
} = require('../controllers/analyticsController');

const { protect } = require('../middleware/authMiddleware');

router.get('/trends', protect, getSymptomTrends);
router.get('/daily', protect, getDailySymptomStats);
router.get('/top-symptoms', protect, getTopSymptoms);

module.exports = router;
