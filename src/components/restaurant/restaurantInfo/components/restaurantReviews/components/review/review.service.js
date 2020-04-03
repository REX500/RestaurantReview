import axios from 'axios';

export function updateLikeDislike(data) {
  return axios({
		method: 'post',
		url: 'http://localhost:3000/api/restaurants/review/likeDislike',
		data,
	}).then(res => {
		return res.data;
  })
  .catch(err => {
    // eslint-disable-next-line no-console
		console.error(err.message);
		throw err;
  });
}

export function deleteReview(data) {
	return axios({
		method: 'delete',
		url: 'http://localhost:3000/api/restaurants/review',
		data,
	}).then(res => {
		return res.data;
  })
  .catch(err => {
    // eslint-disable-next-line no-console
		console.error(err.message);
		throw err;
  });
}
