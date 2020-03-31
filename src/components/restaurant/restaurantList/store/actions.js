export const SET_RESTAURANTS = 'RESTAURANT_LIST/SET_RESTAURANTS';
export const UPDATE_RESTAURANT = 'RESTAURANT_LIST/UPDATE_RESTAURANT';

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