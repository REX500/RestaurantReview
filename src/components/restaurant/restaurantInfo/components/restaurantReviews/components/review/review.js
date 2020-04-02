import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import { View } from 'react-native';
import ReviewHeader from './components/reviewHeader/reviewHeader';
import ReviewBody from './components/reviewBody/reviewBody';

// service files
import { setLikeDislike } from './review.service';

// utils
import _debounce from 'lodash/debounce';

// local context
import RestaurantInfoContext from 'components/restaurant/restaurantInfo/restaurantInfo.context';

import style from './style';

class Review extends Component {
	constructor(props) {
		super(props);

		this.setLikeDislike = _debounce(this.setLikeDislike, 300, {
			trailing: true,
		}).bind(this);
	}

	// context
	static contextType = RestaurantInfoContext;

	setLikeDislike(action) {
		const { updateRestaurantReviewLikes, restaurantId } = this.context;
		const { review } = this.props;

		const payload = {
			id: restaurantId,
			review: {
				id: review.id,
				[action]: 1,
			},
		};

		setLikeDislike(payload).then((res) => {
			// spread the res in redux
			updateRestaurantReviewLikes({
				id: restaurantId,
				review: res,
			});
		});
	}

	render() {
		const { index, review } = this.props;

		return (
			<View style={style.main}>
				<ReviewHeader review={review} index={index} />
				<ReviewBody
					reviewId={review.id}
					text={review.comment}
					likes={review.like}
					dislikes={review.dislike}
					setLikeDislike={this.setLikeDislike}
				/>
			</View>
		);
	}
}

Review.propTypes = {
	review: PropTypes.object,
	// only used to get different profile
	// pictures for different reviews
	index: PropTypes.number,
};

export default Review;
