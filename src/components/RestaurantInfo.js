import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Image } from 'react-native';

// components
import StarRating from 'components/StarRating';

// utils
import _get from 'lodash/get';
import RestaurantImage from 'images/restaurant.png';

const RestaurantInfo = ({ route, navigation }) => {
	const restaurant = _get(route, 'params.place', null);
	const name = _get(restaurant, 'name', null);
	const address = _get(restaurant, 'address', null);

	return (
		<View style={style.main}>

			{/* restaurant name */}
			<View style={style.header}>
				<Text style={style.headerText}>{name}</Text>
				<View style={style.ratingContainer}>
					<Text style={style.ratingText}>Rating:</Text>
					<StarRating entry={restaurant} />
				</View>
			</View>

			{/* image and restaurant info (rating, address...) */}
			<View style={style.content}>

				{/* image wrapper */}
				<Image
					style={style.image}
					source={RestaurantImage} />

				{/* details */}
				<View style={style.detailsWrapper}>
					<View style={style.detailsContainer}>
						<Text style={style.detailsTitle}>Name</Text>
						<Text style={style.detailsContent}>{name}</Text>
					</View>
					<View style={style.detailsContainer}>
						<Text style={style.detailsTitle}>Address</Text>
						<Text style={style.detailsContent}>{address}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

RestaurantInfo.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object
};

const style = StyleSheet.create({
	main: {
		flex: 1,
		padding: 16
	},
	header: {
		flexDirection: 'column',
	},
	headerText: {
		fontSize: 20,
		marginRight: 10,
		fontWeight: 'bold'
	},
	ratingContainer: {
		marginTop: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	ratingText: {
		marginRight: 4
	},
	content: {
		marginTop: 8,
		flexDirection: 'row'
	},
	image: {
		height: 150,
		width: 250,
		resizeMode: 'contain'
	},
	detailsWrapper: {
		paddingTop: 4,
		paddingHorizontal: 16,
		flexDirection: 'column'
	},
	detailsContainer: {
		paddingBottom: 4,
	},
	detailsTitle: {
		fontWeight: '500',
		color: 'darkgrey'
	},
	detailsContent: {
		fontSize: 15,
		fontWeight: '600'
	}
});

export default RestaurantInfo;
