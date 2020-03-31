import { get } from 'axios';

export function getRestaurants() {
	return get('http://localhost:3000/api/restaurants')
		.then((result) => {
			return result;
		})
		.catch((err) => {
			// eslint-disable-next-line no-console
			console.error(err);
		});
}
