import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import { View } from 'react-native';
import ReviewHeader from './components/reviewHeader/reviewHeader';
import ReviewBody from './components/reviewBody/reviewBody';

// service files
import { setLikeDislike, deleteReview } from './review.service';

// local context
import RestaurantInfoContext from 'components/restaurant/restaurantInfo/restaurantInfo.context';
// global context
import MyContext from 'context';

import style from './style';

class Review extends Component {
	render() {
		const { index, review } = this.props;

		return (
			<View style={style.main}>
				<RestaurantInfoContext.Consumer>
					{localContextObject => (
						<>
							<MyContext.Consumer>
								{globalContextObject => (
									<ReviewHeader
										review={review}
										index={index}
										context={{...localContextObject, ...globalContextObject}}
										deleteReview={deleteReview}
									/>
								)}
							</MyContext.Consumer>
							<ReviewBody
								review={review}
								context={localContextObject}
								setLikeDislike={setLikeDislike}
							/>
						</>
					)}
				</RestaurantInfoContext.Consumer>
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
