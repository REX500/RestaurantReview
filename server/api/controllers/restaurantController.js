const { db } = require('../../db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment');
const random = require('random');

function getRestaurants() {
	let restaurants;

	try {
		restaurants = db.getData('/restaurants');
		return restaurants.restaurants;
	} catch (error) {
		throw new HttpError(
			'Bad request',
			'Error occured while fetching restaurants',
			500
		);
	}
}

function addReview(data) {
	try {
		// first get all restaurants
		let restaurants = db.getData('/restaurants');

		// find restaurant
		let restaurant = restaurants.restaurants.find(
			(entry) => entry.id === data.id
		);

		// add review to restaurant body
		restaurant = {
			...restaurant,
			reviews: [
				{
					id: random.int(0, 100000),
					...data.review,
					createdAt: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
					updatedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
				},
				...restaurant.reviews,
			],
		};

		// append review to the restaurant object
		restaurants = restaurants.restaurants.map((entry) => {
			if (entry.id === data.id) return restaurant;
			return entry;
		});

		db.push('/restaurants', { restaurants });

		return restaurant;
	} catch (error) {
		throw new HttpError(
			'Bad request',
			'Error occured while adding a review',
			500
		);
	}
}

function editReview(data) {
	try {
		// first get all restaurants
		let restaurants = db.getData('/restaurants');

		// find the restaurant
		let restaurant = restaurants.restaurants.find(
			(entry) => entry.id === data.id
		);

		// find and update the review
		const updatedReviews = restaurant.reviews.map((entry) => {
			if (entry.id === data.review.id) {
				return {
					...entry,
					...data.review,
					updatedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
				};
			}

			return entry;
		});

		// put updated reviews back in the restaurant
		restaurant = {
			...restaurant,
			reviews: updatedReviews,
		};

		// put restaurant back into restaurants
		restaurants = restaurants.restaurants.map((entry) => {
			if (entry.id === data.id) return restaurant;
			return entry;
		});

		db.push('/restaurants', { restaurants });

		return restaurant;
	} catch (error) {
		throw new HttpError(
			'Bad request',
			'Error occured while updating a review',
			500
		);
	}
}

function deleteReview(data) {
	try {
		// first get all restaurants
		let restaurants = db.getData('/restaurants');

		// find the restaurant
		let restaurant = restaurants.restaurants.find(
			(entry) => entry.id === data.id
		);

		// filter out review
		const updatedReviews = restaurant.reviews.filter(
			(entry) => entry.id !== data.review.id
    );
    
    restaurant = {
      ...restaurant,
      reviews: updatedReviews
    };

    restaurants = restaurants.restaurants.map(entry => {
      if (entry.id === data.id) return restaurant;
      return entry;
    });

		db.push('/restaurants', { restaurants });

    return {id: data.review.id};
	} catch (error) {
		throw new HttpError(
			'Bad request',
			'Error occured while deleting a review',
			500
		);
	}
}

module.exports = {
	getRestaurants,
	addReview,
  editReview,
  deleteReview
};
