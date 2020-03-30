import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
import style from './style';

const ReviewBody = ({ text }) => {
	const [likes, setLikes] = useState(5);
	const [dislikes, setDislikes] = useState(1);

	const iconClicked = '#c2c2c2';

	return (
		<View style={style.main}>
			<Text style={style.text}>{text}</Text>
			<View style={style.footer}>
				<View style={style.iconWrapper}>
					<TouchableOpacity onPress={() => setLikes(likes + 1)}>
						<Icon
							style={style.icon}
							name="thumb-up"
							size={20}
							color={iconClicked}
						/>
					</TouchableOpacity>
					<Text>{likes}</Text>
				</View>
				<View style={style.iconWrapper}>
					<TouchableOpacity
            onPress={() => setDislikes(dislikes - 1)}
          >
						<Icon
							style={style.icon}
							name="thumb-down"
							size={20}
							color={iconClicked}
						/>
					</TouchableOpacity>
        <Text>{dislikes}</Text>
				</View>
			</View>
		</View>
	);
};

ReviewBody.propTypes = {
	text: PropTypes.string,
};

export default ReviewBody;
