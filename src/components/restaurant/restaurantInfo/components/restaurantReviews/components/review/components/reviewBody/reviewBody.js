import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

// local context
import RestaurantInfoContext from 'components/restaurant/restaurantInfo/restaurantInfo.context';

// components
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// services/utils
import { setLikeDislike } from './reviewBody.service';
import _debounce from 'lodash/debounce';

// style
import style from './style';

const ReviewBody = ({ text, likes, dislikes, reviewId }) => {
	const getText = () => {
		return textTooLong && textCollapsed
			? `${text.substring(0, 300)} ...`
			: text;
	};

	const getTextSection = () => {
		return textTooLong && textCollapsed ? (
			<TouchableOpacity onPress={() => setTextCollapsed(false)}>
				<Text style={style.text}>
					{getText()}
					{textCollapsed && (
						<Text style={style.clickToExpandText}>{'   '}Click to expand</Text>
					)}
				</Text>
			</TouchableOpacity>
		) : (
			<Text style={style.text}>{getText()}</Text>
		);
	};

	const setLikeDislikeWrapper = (action) => {
		if (action === 'like') setLikeLoading(true);
		else setDislikeLoading(true);

		const payload = {
			id: restaurantId,
			review: {
				id: reviewId,
				[action]: 1,
			},
		};

		setLikeDislike(payload).then((res) => {
			// spread the res in redux
			updateRestaurantReviewLikes({
				id: restaurantId,
				review: res
			});

			if (action === 'like') setLikeLoading(false);
			else setDislikeLoading(false);
		});
	};

	// get updateReviewcontext
	const context = useContext(RestaurantInfoContext);
	const { updateRestaurantReviewLikes, restaurantId } = context;

	const textTooLong = text.length > 300;
	const [textCollapsed, setTextCollapsed] = useState(true);
	const [likeLoading, setLikeLoading] = useState(false);
	const [dislikeLoading, setDislikeLoading] = useState(false);

	const iconClicked = '#c2c2c2';

	return (
		<View style={style.main}>
			{getTextSection()}
			<View style={style.footer}>
				<View style={style.iconWrapper}>
					<TouchableOpacity
						onPress={_debounce(() => setLikeDislikeWrapper('like'), 300, {
							trailing: true,
						})}>
						<Icon
							style={style.icon}
							name="thumb-up"
							size={20}
							color={iconClicked}
						/>
					</TouchableOpacity>
					{likeLoading ? (
						<ActivityIndicator size="small" />
					) : (
						<Text style={style.likesDislikes}>{likes || 0}</Text>
					)}
				</View>
				<View style={style.iconWrapper}>
					<TouchableOpacity
						onPress={_debounce(() => setLikeDislikeWrapper('dislike'), 300, {
							trailing: true,
						})}>
						<Icon
							style={style.icon}
							name="thumb-down"
							size={20}
							color={iconClicked}
						/>
					</TouchableOpacity>
					{dislikeLoading ? (
						<ActivityIndicator size="small" />
					) : (
						<Text style={style.likesDislikes}>{dislikes || 0}</Text>
					)}
				</View>
			</View>
		</View>
	);
};

ReviewBody.propTypes = {
	text: PropTypes.string,
	likes: PropTypes.number,
	dislikes: PropTypes.number,
	reviewId: PropTypes.number,
};

export default ReviewBody;
