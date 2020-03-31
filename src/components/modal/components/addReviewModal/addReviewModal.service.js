import axios from 'axios';

export function addReview(payload) {
	return axios({
		method: 'post',
		url: 'http://localhost:3000/review',
		data: payload,
	})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			// eslint-disable-next-line no-console
			console.error(err);
		});
}
