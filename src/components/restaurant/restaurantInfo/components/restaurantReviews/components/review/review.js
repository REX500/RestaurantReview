import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

// components
import ReviewHeader from './components/reviewHeader/reviewHeader';
import ReviewBody from './components/reviewBody/reviewBody';

import style from './style';

const Review = ({ review, index }) => {
	return (
		<View style={style.main}>
			<ReviewHeader
				reviewId={review.id}
				name={review.name}
				rating={review.rating}
				review={review}
				timeStamp={{ createdAt: review.createdAt, updatedAt: review.updatedAt }}
				index={index}
			/>
			<ReviewBody text={review.comment} />
		</View>
	);
};

Review.propTypes = {
	review: PropTypes.object,
	// only used to get different profile
	// pictures for different reviews
	index: PropTypes.number,
};

export default Review;
