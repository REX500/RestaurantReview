import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// utils
import _debounce from 'lodash/debounce';

// style
import style from './style';

const ReviewBody = ({
	review: { id, comment, like, dislike },
	context,
	setLikeDislike,
}) => {
	const getText = () => {
		return textTooLong && textCollapsed
			? `${comment.substring(0, 300)} ...`
			: comment;
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

		const payload = {
			id: restaurantId,
			review: {
				id,
				[action]: 1,
			},
		};

		setLikeDislike(payload).then((res) => {
			// spread the res in redux
			updateRestaurantReviewLikes({
				id: restaurantId,
				review: res,
			});
		});
	};

	const textTooLong = comment.length > 300;
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
					<Text style={style.likesDislikes}>{like || 0}</Text>
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
					<Text style={style.likesDislikes}>{dislike || 0}</Text>
				</View>
			</View>
		</View>
	);
};

ReviewBody.propTypes = {
	comment: PropTypes.string,
	context: PropTypes.object,
	review: PropTypes.object,
	setLikeDislike: PropTypes.func,
};

export default ReviewBody;
