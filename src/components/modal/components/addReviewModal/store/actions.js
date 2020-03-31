export const UPDATE_REVIEW = 'ADD_REVIEW_MODAL/UPDATE_REVIEW';
export const CLEAR_REVIEW = 'ADD_REVIEW_MODAL/CLEAR_REVIEW';

export function updateReview(payload) {
  return {
    type: UPDATE_REVIEW,
    payload
  };
}

export function clearReview(payload) {
  return {
    type: CLEAR_REVIEW,
    payload
  };
}