import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { store, connectWithStore } from 'appState';
import { bindActionCreators } from 'redux';

import { updateRestaurant } from 'components/restaurant/restaurantList/store/actions';
import { updateReview, clearReview } from './store/actions';
import { addReview } from './addReviewModal.service';

// components
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './style';

// utils
import _debounce from 'lodash/debounce';

class AddReview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		};

		this.submitReview = _debounce(this.submitReview, 150, {
			trailing: true,
		}).bind(this);
		this.editStoreEntry = this.editStoreEntry.bind(this);
		this.getRatingStars = this.getRatingStars.bind(this);
	}

	componentWillUnmount() {
		this.props.clearReview();
	}

	// creates 5 clickable stars
	getRatingStars() {
		const { review } = this.props;

		// array with 5 undefined elements
		const loopArray = [...Array(5)];

		return loopArray.map((entry, index) => {
			const isRated = review.rating >= 0 && index <= review.rating;

			const iconName = isRated ? 'star' : 'star-border';
			const iconColor = isRated ? '#FFD64C' : '#EFEFEF';

			return (
				<TouchableOpacity
					key={index}
					onPress={() => this.editStoreEntry('rating', index)}>
					<Icon name={iconName} size={44} color={iconColor} />
				</TouchableOpacity>
			);
		});
	}

	editStoreEntry(name, value) {
		const { updateReview } = this.props;

		const payload = {
			[name]: value,
		};

		updateReview(payload);
	}

	submitReview() {
		const { onClose, review, extraData, updateRestaurant } = this.props;

		const payload = {
			// extraData in this case contains restaurant id or null
			id: extraData,
			review: {
				name: review.name ?? '',
				// add 1 to rating cause rating starts at 0 cause array.map function
				rating: review.rating + 1 ?? 0,
				comment: review.comment ?? '',
			},
		};

		this.setState(() => ({ loading: true }));

		addReview(payload).then(res => {
			// update restaurant in the store
			updateRestaurant(res.data);

			this.setState(
				() => ({ loading: false }),
				() => {
					onClose();
				}
			);
		});
	}

	render() {
		const { review } = this.props;

		return (
			<View style={style.main}>
				<View style={style.inputWrapper}>
					<Text style={style.inputLabel}>Your name</Text>
					<TextInput
						style={style.input}
						placeholder="Enter your name"
						value={review.name}
						onChangeText={(text) => this.editStoreEntry('name', text)}
					/>
				</View>

				<View style={style.ratingWrapper}>
					<Text>Your rating:</Text>
					<View style={style.rating}>{this.getRatingStars()}</View>
				</View>

				<View style={style.inputWrapper}>
					<Text style={style.inputLabel}>Review</Text>
					<TextInput
						style={[style.input, { height: 150 }]}
						placeholder="Enter review text"
						value={review.comment}
						onChangeText={(text) => this.editStoreEntry('comment', text)}
						multiline
						numberOfLines={8}
					/>
				</View>

				<TouchableOpacity
					style={style.submitButton}
					onPress={this.submitReview}>
					{this.state.loading ? (
						<ActivityIndicator size="small" color="white" />
					) : (
						<Text style={style.submitButtonText}>Submit Review</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	}
}

AddReview.propTypes = {
	onClose: PropTypes.func,
	updateReview: PropTypes.func,
	clearReview: PropTypes.func,
	updateRestaurant: PropTypes.func,
	review: PropTypes.object,
	extraData: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
	]),
};

const mapStateToProps = (store) => {
	return {
		review: store.addReviewModal.review,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			updateReview,
			clearReview,
			updateRestaurant
		},
		dispatch
	);
};

export default connectWithStore(
	store,
	AddReview,
	mapStateToProps,
	mapDispatchToProps
);
