import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// utils
import _debounce from 'lodash/debounce';

// style
import style from './style';

const ReviewBody = ({ review, context, updateLikeDislike }) => {
	const getText = () => {
		return textTooLong && textCollapsed
			? `${review.comment.substring(0, 300)} ...`
			: review.comment;
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
		const { updateRestaurantReviewLikes, restaurantId } = context;

		// update redux before we make a call, if call fails revert to old state
		const reviewClone = { ...review };

		// update in redux
		updateRestaurantReviewLikes({
			id: restaurantId,
			review: {
				...review,
				...(action === 'like' && { like: review.like + 1 }),
				...(action === 'dislike' && { dislike: review.dislike + 1 }),
			},
		});

		const payload = {
			id: restaurantId,
			review: {
				id: review.id,
				[action]: 1,
			},
		};

		updateLikeDislike(payload)
			.then((res) => {
				updateRestaurantReviewLikes({
					id: restaurantId,
					review: res,
				});
			})
			.catch(() => {
				// revert to old like count
				updateRestaurantReviewLikes({
					id: restaurantId,
					review: reviewClone,
				});
			});
	};

	const textTooLong = review.comment.length > 300;
	const [textCollapsed, setTextCollapsed] = useState(true);
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
					<Text style={style.likesDislikes}>{review.like || 0}</Text>
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
					<Text style={style.likesDislikes}>{review.dislike || 0}</Text>
				</View>
			</View>
		</View>
	);
};

ReviewBody.propTypes = {
	comment: PropTypes.string,
	context: PropTypes.object,
	review: PropTypes.object,
	updateLikeDislike: PropTypes.func,
};

export default ReviewBody;
