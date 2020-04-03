import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import style from './style';
import { appWhiteSmokey, appYellow } from 'utils/styleVars';

const StarRating = ({ rating }) => {
	// round to 0.5
	const roundedEntry = Math.round(rating * 2) / 2;
	const array = [...Array(Math.ceil(rating))];

	return (
		<View style={style.starWrapper}>
			{rating ?
				array.map((value, index) => {
					const iconName =
						index === array.length - 1 && !Number.isInteger(roundedEntry)
							? 'star-half'
							: 'star';
	
					return <Icon key={index} name={iconName} color={appYellow} />;
				}
				) : (
					[1, 2, 3, 4, 5].map(index => {
						return <Icon key={index} name="star" color={appWhiteSmokey} />;
				})
			)}
		</View>
	);
};

StarRating.propTypes = {
	rating: PropTypes.number
};

export default StarRating;
