import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
import axios from 'axios';
import _debounce from 'lodash/debounce';

const AddReview = ({ closeModal }) => {
	const [reviewName, setReviewName] = useState(null);
	const [reviewRating, setReviewRating] = useState(null);
	const [reviewComment, setReviewComment] = useState(null);
	const [loading, setLoading] = useState(false);

	// creates 5 clickable stars
	const getRatingStars = () => {
		// array with 5 undefined elements
		const loopArray = [...Array(5)];

		return loopArray.map((entry, index) => {
			const isRated = reviewRating && index <= reviewRating;

			const iconName = isRated ? 'star' : 'star-border';
			const iconColor = isRated ? '#FFD64C' : '#EFEFEF';

			return (
				<TouchableOpacity key={index} onPress={() => setReviewRating(index)}>
					<Icon name={iconName} size={44} color={iconColor} />
				</TouchableOpacity>
			);
		});
	};

	const submitReview = () => {
		const payload = {
			name: reviewName,
			rating: reviewRating,
			comment: reviewComment,
		};

		setLoading(true);

		axios({
			method: 'post',
			url: 'http://localhost:3000/review',
			data: payload,
		})
			.then(() => {
				closeModal();
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	};

	return (
		<View style={style.main}>
			<View style={style.inputWrapper}>
				<Text style={style.inputLabel}>Your name</Text>
				<TextInput
					style={style.input}
					placeholder="Enter your name"
					value={reviewName}
					onChangeText={(text) => setReviewName(text)}
				/>
			</View>

			<View style={style.ratingWrapper}>
				<Text>Your rating:</Text>
				<View style={style.rating}>{getRatingStars()}</View>
			</View>

			<View style={style.inputWrapper}>
				<Text style={style.inputLabel}>Review</Text>
				<TextInput
					style={[style.input, { height: 150 }]}
					placeholder="Enter review text"
					value={reviewComment}
					onChangeText={(text) => setReviewComment(text)}
					multiline
					numberOfLines={8}
				/>
			</View>

			<TouchableOpacity
				style={style.submitButton}
				onPress={_debounce(submitReview, 300, { trailing: true })}>
				{loading ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<Text style={style.submitButtonText}>Submit Review</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

AddReview.propTypes = {
	closeModal: PropTypes.func,
};

export default AddReview;
