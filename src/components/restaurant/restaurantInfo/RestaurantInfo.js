import React, { Component } from 'react';
import PropTypes from 'prop-types';

// redux
import { bindActionCreators } from 'redux';
import { store, connectWithStore } from 'appState';

// actions
import { updateReview } from 'components/modal/components/addReviewModal/store/actions';
import { deleteReview } from '../restaurantList/store/actions';

// context
import MyContext from 'context'; // global
import RestaurantInfoContext from './restaurantInfo.context'; // local - to avoid passing the navigation prop

// components
import { View, Text, Image, TouchableOpacity } from 'react-native';
import StarRating from 'components/starRating/StarRating';
import RestaurantReviews from './components/restaurantReviews/restaurantReviews';

// utils
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import RestaurantImage from 'images/restaurant.png';

// modal type
import ModalTypes from 'components/modal/modalTypes.enum';

// styles
import style from './style';

class RestaurantInfo extends Component {
	constructor(props) {
		super(props);

		this.restaurant = this.getRestaurant();

		this.addReview = this.addReview.bind(this);
	}

	getRestaurant() {
		const { restaurantList } = this.props;

		const id = _get(this.context, 'restaurant.restaurantInfo.id', null);

		// get restaurant from the store
		const restaurant = restaurantList.find((entry) => entry.id === id);

		return restaurant;
	}

	addReview() {
		const { navigation } = this.props;

		const id = _get(this.context, 'restaurant.restaurantInfo.id', null);
		const setModalTitle = _get(this.context, 'modal.setModalTitle', () => {});
		const setModalType = _get(this.context, 'modal.setModalType', () => {});
		const setExtraData = _get(this.context, 'modal.setExtraData', () => {});

		// set modal title and type in context
		setModalTitle('Add a review');
		setModalType(ModalTypes.ADD_REVIEW);
		setExtraData(id);

		navigation.navigate('Modal');
	}

	static contextType = MyContext;

	render() {
		const { navigation, deleteReview, updateReview } = this.props;

		// get restaurant from redux based on id passed in context
		const restaurant = this.getRestaurant();

		// get restaurant info
		let id, name, address, rating;
		if (restaurant) {
			id = restaurant.id;
			name = restaurant.name;
			address = restaurant.address;
			rating = restaurant.rating;
		}

		return (
			<RestaurantInfoContext.Provider value={{ navigation, restaurantId: id, deleteReview, updateReview }}>
				<View style={style.main}>
					{restaurant && (
						<>
							{/* restaurant name */}
							<View style={style.header}>
								<Text style={style.headerText}>{name}</Text>
								<View style={style.ratingContainer}>
									<Text style={style.ratingText}>Rating:</Text>
									<StarRating rating={rating} />
								</View>
							</View>

							{/* image and restaurant info (rating, address...) */}
							<View style={style.content}>
								{/* image wrapper */}
								<Image style={style.image} source={RestaurantImage} />

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
									<TouchableOpacity
										style={style.button}
										onPress={this.addReview}>
										<Text style={style.buttonText}>Add review</Text>
									</TouchableOpacity>
								</View>
							</View>
							{
								!_isEmpty(restaurant.reviews) && (
								<View>
									<RestaurantReviews restaurant={restaurant} />
								</View>
								)
							}
						</>
					)}
				</View>
			</RestaurantInfoContext.Provider>
		);
	}
}

RestaurantInfo.propTypes = {
	navigation: PropTypes.object,
	restaurantList: PropTypes.array,
	deleteReview: PropTypes.func,
	updateReview: PropTypes.func,
};

const mapStateToProps = (store) => {
	return {
		restaurantList: store.restaurantList.restaurantList,
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		deleteReview,
		updateReview
	},
	dispatch);
};

export default connectWithStore(store, RestaurantInfo, mapStateToProps, mapDispatchToProps);
