// routes/travel.js

const express = require('express');
const router = express.Router();
const { searchTrips } = require('../controllers/travelController');

// POST /api/travel/search
router.post('/search', searchTrips);

module.exports = router;
