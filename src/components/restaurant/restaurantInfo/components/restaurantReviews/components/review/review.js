import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import { View } from 'react-native';
import ReviewHeader from './components/reviewHeader/reviewHeader';
import ReviewBody from './components/reviewBody/reviewBody';

// service files
import { updateLikeDislike, deleteReview } from './review.service';

// context
import MyContext from 'context';

import style from './style';

class Review extends Component {
	static contextType = MyContext;

	render() {
		const { index, review } = this.props;

		return (
			<View style={style.main}>
					<ReviewHeader
						review={review}
						index={index}
						context={{...this.context.decoratedExtraData.restaurantInfo, ...this.context}}
						deleteReview={deleteReview}
					/>
					<ReviewBody
						review={review}
						context={this.context.decoratedExtraData.restaurantInfo}
						updateLikeDislike={updateLikeDislike}
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
