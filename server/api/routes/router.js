

const express = require('express');

const router = express.Router();

// ::V1 router
const restaurantRouter = require('./restaurants/restaurantsRouter');

// /api/restaurants
router.use('/restaurants', restaurantRouter);

module.exports = router;
