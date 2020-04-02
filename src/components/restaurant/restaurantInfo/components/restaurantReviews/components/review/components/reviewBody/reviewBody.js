import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// style
import style from './style';

const ReviewBody = ({ text, likes, dislikes, setLikeDislike }) => {
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

	const textTooLong = text.length > 300;
	const [textCollapsed, setTextCollapsed] = useState(true);

	const iconClicked = '#c2c2c2';

	return (
		<View style={style.main}>
			{getTextSection()}
			<View style={style.footer}>
				<View style={style.iconWrapper}>
					<TouchableOpacity
						onPress={() => setLikeDislike('like')}>
						<Icon
							style={style.icon}
							name="thumb-up"
							size={20}
							color={iconClicked}
						/>
					</TouchableOpacity>
					<Text style={style.likesDislikes}>{likes || 0}</Text>
				</View>
				<View style={style.iconWrapper}>
					<TouchableOpacity
						onPress={() => setLikeDislike('dislike')}>
						<Icon
							style={style.icon}
							name="thumb-down"
							size={20}
							color={iconClicked}
						/>
					</TouchableOpacity>
					<Text style={style.likesDislikes}>{dislikes || 0}</Text>
				</View>
			</View>
		</View>
	);
};

ReviewBody.propTypes = {
	text: PropTypes.string,
	likes: PropTypes.number,
	dislikes: PropTypes.number,
	setLikeDislike: PropTypes.func
};

export default ReviewBody;
