

// router setup
const express = require('express');

const router = express.Router({mergeParams: true});

// controllers
const restaurantController = require('../../controllers/restaurantController');

// ENDPOINT: /api/restaurant/ :GET
router.get('/', (req, res, next) => {
  try {
    const result = restaurantController.getRestaurants();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ENDPOINT: /api/restaurant/review :POST
router.post('/review', (req, res, next) => {
  try {
    const result = restaurantController.addReview(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ENDPOINT: /api/restaurant/review :PATCH
router.patch('/review', (req, res, next) => {
  try {
    const result = restaurantController.editReview(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ENDPOINT: /api/restaurant/review :DELETE
router.delete('/review', (req, res, next) => {
  try {
    const result = restaurantController.deleteReview(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ENDPOINT: /api/restaurant/review/likeDislike :POST
router.post('/review/likeDislike', (req, res, next) => {
  try {
    const result = restaurantController.handleLikeDislike(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
