import { UPDATE_REVIEW, CLEAR_REVIEW } from './actions';

const defaultState = {
	review: {},
};

function reducer(state = defaultState, action) {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_REVIEW:
			return {
				review: {
					...state.review,
					...payload,
				},
			};

		case CLEAR_REVIEW:
			return {
				review: defaultState.review,
			};

		default:
			return state;
	}
}

export default reducer;
