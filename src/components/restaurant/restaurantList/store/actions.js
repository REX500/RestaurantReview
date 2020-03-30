export const SET_RESTAURANTS = 'RESTAURANT_LIST/SET_RESTAURANTS';

export function setRestaurants(payload) {
  return {
    type: SET_RESTAURANTS,
    payload
  };
}