import 'react-native';
import React from 'react';
import {
	render,
	// eslint-disable-next-line no-unused-vars
	fireEvent,
	// eslint-disable-next-line no-unused-vars
	screen,
	cleanup,
} from 'react-native-testing-library';

// components
import TimeStamp from 'components/restaurant/restaurantInfo/components/restaurantReviews/components/review/components/reviewHeader/components/timeStamp/timeStamp';
import ReviewHeader from 'components/restaurant/restaurantInfo/components/restaurantReviews/components/review/components/reviewHeader/reviewHeader';
import ReviewBody from 'components/restaurant/restaurantInfo/components/restaurantReviews/components/review/components/reviewBody/reviewBody';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

describe('Testing review components', () => {
	afterEach(() => {
		cleanup();
	});

	test('testing timeStamp: should show published', () => {
		// how values should look
		const shownValues = {
			// published because createdAt/updateAt are the same
			text: 'Published on:',
			date: 'Apr 3rd, 2020',
		};

		const { getByText } = render(
			<TimeStamp
				date={{
					createdAt: '2020-04-03T17:37:51',
					updatedAt: '2020-04-03T17:37:51',
				}}
			/>
		);

		const firstElement = getByText(shownValues.text);
		const secondElement = getByText(shownValues.date);

		expect(firstElement).toBeTruthy();
		expect(secondElement).toBeTruthy();
	});

	test('testing timeStamp: should show updated', () => {
		// how values should look
		const expectedValues = {
			// updated because createdAt/updateAt are not the same
			text: 'Updated on:',
			date: 'Apr 5th, 2020',
		};

		const { getByText } = render(
			<TimeStamp
				date={{
					createdAt: '2020-04-03T17:37:51',
					updatedAt: '2020-04-05T17:37:51',
				}}
			/>
		);

		const firstElement = getByText(expectedValues.text);
		const secondElement = getByText(expectedValues.date);

		expect(firstElement).toBeTruthy();
		expect(secondElement).toBeTruthy();
	});

	test('testing reviewHeader: should show propper review name', () => {
		const { getByText } = render(
			<ReviewHeader
				review={{
					id: 4,
					name: 'Martin',
					rating: 5,
					comment:
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
					like: 20,
					createdAt: '2020-04-03T17:37:51',
					updatedAt: '2020-04-03T17:37:51',
					dislike: 13,
				}}
				index={0}
				deleteReview={() => {}}
				context={{
					navigation: {},
					restaurantId: 1,
					deleteReview: () => {},
					updateReview: () => {},
					modal: {
						setModalTitle: () => {},
						setModalType: () => {},
						setExtraData: () => {},
					},
				}}
			/>
		);

		const firstElement = getByText('Martin');

		expect(firstElement).toBeTruthy();
	});

	test('testing reviewBody: should show whole review text(comment)', () => {
		const { getByText } = render(
			<ReviewBody
				review={{
					id: 4,
					name: 'Martin',
					rating: 5,
					comment: 'this is some review text',
					like: 20,
					createdAt: '2020-04-03T17:37:51',
					updatedAt: '2020-04-03T17:37:51',
					dislike: 13,
				}}
				updateLikeDislike={() => {}}
				context={{
					restaurantId: 1,
					updateRestaurantReviewLikes: () => {},
				}}
			/>
		);

		const firstElement = getByText('this is some review text');

		expect(firstElement).toBeTruthy();
	});

	test('testing reviewBody: should show expand text when comment too long', () => {
		const { getByText } = render(
			<ReviewBody
				review={{
					id: 4,
					name: 'Martin',
					rating: 5,
					comment:
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
					like: 20,
					createdAt: '2020-04-03T17:37:51',
					updatedAt: '2020-04-03T17:37:51',
					dislike: 13,
				}}
				updateLikeDislike={() => {}}
				context={{
					restaurantId: 1,
					updateRestaurantReviewLikes: () => {},
				}}
			/>
		);

  // has a few spaces in front
		const expandText = '   Click to expand';

		const firstElement = getByText(expandText);

		expect(firstElement).toBeTruthy();
	});

	test('testing reviewBody: should show correct number of likes', () => {
		const { getByText } = render(
			<ReviewBody
				review={{
					id: 4,
					name: 'Martin',
					rating: 5,
					comment:
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
					like: 20,
					createdAt: '2020-04-03T17:37:51',
					updatedAt: '2020-04-03T17:37:51',
					dislike: 13,
				}}
				updateLikeDislike={() => {}}
				context={{
					restaurantId: 1,
					updateRestaurantReviewLikes: () => {},
				}}
			/>
		);

		const firstElement = getByText('20');

		expect(firstElement).toBeTruthy();
  });

	test('testing reviewBody: should show correct number of dislikes', () => {
		const { getByText } = render(
			<ReviewBody
				review={{
					id: 4,
					name: 'Martin',
					rating: 5,
					comment:
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
					like: 20,
					createdAt: '2020-04-03T17:37:51',
					updatedAt: '2020-04-03T17:37:51',
					dislike: 13,
				}}
				updateLikeDislike={() => {}}
				context={{
					restaurantId: 1,
					updateRestaurantReviewLikes: () => {},
				}}
			/>
		);

		const firstElement = getByText('13');

		expect(firstElement).toBeTruthy();
	});
});
