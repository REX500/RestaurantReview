import { SET_RESTAURANTS, UPDATE_RESTAURANT, DELETE_REVIEW } from './actions';

const defaultState = {
	restaurantList: [],
};

function reducer(state = defaultState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_RESTAURANTS: {
			return {
				...state,
				restaurantList: payload,
			};
		}

		case UPDATE_RESTAURANT: {
			return {
				...state,
				restaurantList: state.restaurantList.map((entry) => {
					if (entry.id === payload.id) {
						return {
							...payload,
						};
					}
					return entry;
				}),
			};
		}

		case DELETE_REVIEW: {
			return {
				...state,
				restaurantList: state.restaurantList.map((entry) => {
					if (entry.id === payload.id) {
						// filter out the review and return
						return {
							...entry,
							reviews: entry.reviews.filter(
								(entry) => entry.id !== payload.review.id
							),
						};
					}

					return entry;
				}),
			};
		}

		default:
			return state;
	}
}

export default reducer;
