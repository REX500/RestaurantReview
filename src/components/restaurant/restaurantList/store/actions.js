export const SET_RESTAURANTS = 'RESTAURANT_LIST/SET_RESTAURANTS';
export const UPDATE_RESTAURANT = 'RESTAURANT_LIST/UPDATE_RESTAURANT';
export const DELETE_REVIEW = 'RESTAURANT_LIST/DELETE_REVIEW';

export function setRestaurants(payload) {
  return {
    type: SET_RESTAURANTS,
    payload
  };
}

export function updateRestaurant(payload) {
  return {
    type: UPDATE_RESTAURANT,
    payload
  };
}

export function deleteReview(payload) {
  return {
    type: DELETE_REVIEW,
    payload
  };
}
