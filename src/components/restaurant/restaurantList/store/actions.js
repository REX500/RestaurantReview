export const SET_RESTAURANTS = 'RESTAURANT_LIST/SET_RESTAURANTS';
export const UPDATE_RESTAURANT = 'RESTAURANT_LIST/UPDATE_RESTAURANT';
export const ADD_REVIEW = 'RESTAURANT_LIST/ADD_REVIEW';
export const UPDATE_RESTAURANT_REVIEW = 'RESTAURANT_LIST/UPDATE_RESTAURANT_REVIEW';
export const UPDATE_RESTAURANT_REVIEW_LIKES = 'RESTAURANT_LIST/UPDATE_RESTAURANT_REVIEW_LIKES';
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

export function addReview(payload) {
  return {
    type: ADD_REVIEW,
    payload
  };
}

export function updateRestaurantReview(payload) {
  return {
    type: UPDATE_RESTAURANT_REVIEW,
    payload
  };
}

export function updateRestaurantReviewLikes(payload) {
  return {
    type: UPDATE_RESTAURANT_REVIEW_LIKES,
    payload
  };
}

export function deleteReview(payload) {
  return {
    type: DELETE_REVIEW,
    payload
  };
}
