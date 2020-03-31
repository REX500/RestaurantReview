import { SET_RESTAURANTS, UPDATE_RESTAURANT } from './actions';

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
              ...payload
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
