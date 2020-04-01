import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, FlatList } from 'react-native';

// components
import Review from './components/review/review';

// utils
import _uniqueId from 'lodash/uniqueId';

import style from './style';

class RestaurantReviews extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { restaurant } = this.props;

		return (
			<View style={style.main}>
				<Text style={style.header}>Reviews {restaurant.reviews.length}</Text>
				<FlatList
					data={restaurant.reviews}
					renderItem={({ item, index }) => {
						return <Review review={item} index={index} />;
					}}
					keyExtractor={() => _uniqueId()}
					contentContainerStyle={style.reviews}
					showsVerticalScrollIndicator={false}
					extraData={restaurant}
				/>
			</View>
		);
	}
}

RestaurantReviews.propTypes = {
	restaurant: PropTypes.object,
};

export default RestaurantReviews;
