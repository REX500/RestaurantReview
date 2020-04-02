import axios from 'axios';

export function postReview(payload) {
	return axios({
		method: 'post',
		url: 'http://localhost:3000/api/restaurants/review',
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
	
	export function editReview(payload) {
		return axios({
			method: 'patch',
			url: 'http://localhost:3000/api/restaurants/review',
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
