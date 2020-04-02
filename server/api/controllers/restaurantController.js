const { db } = require('../../db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment');
const random = require('random');
const _ = require('lodash');

/*************************************/
/*           HELPER FUNCTIONS        */
/*************************************/

// returns all restaurants and the one based on param id
const getRestaurant = (restaurantId) => {
	// first get all restaurants
	const restaurants = db.getData('/restaurants');

	// find restaurant
	const restaurant = restaurants.restaurants.find(
		(entry) => entry.id === restaurantId
	);

	return { restaurants, restaurant };
};

// sorts reviews based on updatedAt key
const sortReviews = (reviews) => {
	return reviews.sort((a, b) => {
		const isAfter = moment
			.utc(a.updatedAt, 'YYYY-MM-DDTHH:mm:ss')
			.isAfter(moment.utc(b.updatedAt, 'YYYY-MM-DDTHH:mm:ss'), 'millisecond');

		if (isAfter) return -1;
		else if (!isAfter) return 1;
		else return 0;
	});
};

// gets a new updated restaurant rating
const getRestaurantRating = (reviews) => {
	// update restaurant ratings
	const ratingSum = reviews.reduce((acc, currentValue) => {
		acc += currentValue.rating;
		return acc;
	}, 0);

	const rating = ratingSum / reviews.length;

	return Math.round(rating * 2) / 2;
};

/*****************************************/
/*           CONTROLLER FUNCTIONS        */
/*****************************************/

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
		let { restaurant, restaurants } = getRestaurant(data.id);

		// new review object
		const review = {
			id: random.int(0, 100000),
			...data.review,
			createdAt: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
			updatedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
		};

		// add review to restaurant body, automatically add it to the start of the array
		restaurant = {
			...restaurant,
			reviews: [review, ...restaurant.reviews],
		};

		// throw new rating in
		restaurant = {
			...restaurant,
			rating: getRestaurantRating(restaurant.reviews),
		};

		// append review to the restaurant object
		restaurants = restaurants.restaurants.map((entry) => {
			if (entry.id === data.id) return restaurant;
			return entry;
		});

		db.push('/restaurants', { restaurants });

		return review;
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
		let { restaurant, restaurants } = getRestaurant(data.id);

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
			reviews: sortReviews(updatedReviews),
			rating: getRestaurantRating(updatedReviews),
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
			'Error occured while updating a review.',
			500
		);
	}
}

function deleteReview(data) {
	try {
		let { restaurant, restaurants } = getRestaurant(data.id);

		// filter out review
		const updatedReviews = restaurant.reviews.filter(
			(entry) => entry.id !== data.review.id
		);

		restaurant = {
			...restaurant,
			reviews: updatedReviews,
			rating: getRestaurantRating(updatedReviews),
		};

		restaurants = restaurants.restaurants.map((entry) => {
			if (entry.id === data.id) return restaurant;
			return entry;
		});

		db.push('/restaurants', { restaurants });

		return { id: data.review.id };
	} catch (error) {
		throw new HttpError(
			'Bad request',
			'Error occured while deleting a review.',
			500
		);
	}
}

/**
 * @function handleLikeDislike
 * @param {Object} data - like {id: 1, review: {id: 1, like/dislike: 1,2,3,5...}}
 */
function handleLikeDislike(data) {
	let { restaurant, restaurants } = getRestaurant(data.id);

	try {
		// find and update the review
		const updatedReviews = restaurant.reviews.map((entry) => {
			if (entry.id === data.review.id) {
				const isLike = _.get(data, 'review.like', null);
				const isDislike = _.get(data, 'review.dislike', null);

				const reviewLikes = entry.like || 0;
				const reviewDislikes = entry.dislike || 0;

				return {
					...entry,
					// if like, increment like
					...(isLike && {
						like: data.review.like + reviewLikes,
					}),
					// if dislike, decrement dislike
					...(isDislike && {
						dislike: data.review.dislike + reviewDislikes,
					}),
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
			if (entry.id === data.id) {
				return restaurant;
			}
			return entry;
		});

		// save
		db.push('/restaurants', { restaurants });

		return restaurant;
	} catch (error) {
		throw new HttpError(
			'Bad request',
			'Error occured while liking/disliking review.',
			500
		);
	}
}

module.exports = {
	getRestaurants,
	addReview,
	editReview,
	deleteReview,
	handleLikeDislike,
};
