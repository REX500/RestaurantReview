import {
  SET_RESTAURANTS
} from './actions';

const defaultState = {
  restaurantList: []
};

function reducer(state = defaultState, action) {
	const { type, payload } = action;

  switch (type) {
    case SET_RESTAURANTS: {
      return {
        ...state,
        restaurantList: payload
      };
    }
  
    default:
      return state;
  }
}

export default reducer;
