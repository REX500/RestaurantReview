import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { store, connectWithStore } from 'appState';
import { bindActionCreators } from 'redux';

// actions
import { updateRestaurant, addReview, updateRestaurantReview } from 'components/restaurant/restaurantList/store/actions';
import { updateReview, clearReview } from './store/actions';

import { postReview, editReview } from './addReviewModal.service';

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

// utils/phrases
import _debounce from 'lodash/debounce';
import phrases from './addReviewModal.phrases';

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
			// increase index by 1 so that it matches rating from backend
			const increasedIndex = index + 1;
			const isRated = review.rating > 0 && increasedIndex <= review.rating;

			const iconName = isRated ? 'star' : 'star-border';
			const iconColor = isRated ? '#FFD64C' : '#EFEFEF';

			return (
				<TouchableOpacity
					key={increasedIndex}
					onPress={() => this.editStoreEntry('rating', increasedIndex)}>
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
		const { onClose, review, extraData, updateRestaurantReview, mode, addReview } = this.props;

		const payload = {
			// extraData in this case contains restaurant id or null
			id: extraData,
			review: {
				...(mode === 'edit' && {id: review.id}),
				name: review.name ?? '',
				rating: review.rating ?? 0,
				comment: review.comment ?? '',
			},
		};

		this.setState(() => ({ loading: true }));

		const functionToSubmit =
			mode === 'add' ? postReview(payload) : editReview(payload);

		Promise.resolve(functionToSubmit).then((res) => {
			const payload = {
				id: extraData,
				review: res.data
			};

			if (mode === 'add') {
				addReview(payload);
			} else {
				updateRestaurantReview(payload);
			}

			this.setState(
				() => ({ loading: false }),
				() => {
					onClose();
				}
			);
		});
	}

	render() {
		const { review, mode } = this.props;

		return (
			<View style={style.main}>
				<View style={style.inputWrapper}>
					<Text style={style.inputLabel}>Your name</Text>
					{mode === 'edit' ?
					(
						<Text style={style.nameText} >{review.name}</Text>
					) : (
						<TextInput
							style={style.input}
							placeholder="Enter your name"
							value={review.name}
							onChangeText={(text) => this.editStoreEntry('name', text)}
						/>
					)}
				</View>

				<View style={style.ratingWrapper}>
					<Text style={style.inputLabel}>Your rating:</Text>
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
						<Text style={style.submitButtonText}>
							{mode === 'edit' ? phrases.UPDATE_REVIEW : phrases.SUBMIT_REVIEW}
						</Text>
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
	review: PropTypes.object,
	extraData: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
	]),
	mode: PropTypes.string,
	addReview: PropTypes.func,
	updateRestaurantReview: PropTypes.func,
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
			updateRestaurant,
			addReview,
			updateRestaurantReview
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
