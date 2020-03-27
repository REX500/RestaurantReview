import React, {useContext} from 'react';
import MyContext from 'context';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

// components
import { View, Text, TouchableOpacity } from 'react-native';
import StarRating from 'components/starRating/StarRating';

// style
import style from './style';

const RestaurantRow = ({ data, index, navigation }) => {
	const infoPress = () => {
		// set restaurant info in context
		setRestaurantInfo(data);

		navigation.navigate('Info');
	};

	const context = useContext(MyContext);
	const setRestaurantInfo = _get(context, 'restaurant.setRestaurantInfo', () => {});

	return (
		<View style={style.wrapper}>
			<View
				style={[
					style.row,
					...(index % 2 !== 0 ? [{ backgroundColor: '#FDE8E9' }] : []),
				]}>
				<View style={style.rating}>
					<StarRating entry={data} />
				</View>

				<View style={style.nameAddress}>
					<Text>{data.name}</Text>
					<Text style={style.address}>{data.address}</Text>
				</View>

				<TouchableOpacity
					onPress={infoPress}
					style={[style.button, style.textSmall]}>
					<Text style={style.buttonText}>Info</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

RestaurantRow.propTypes = {
	data: PropTypes.object,
	index: PropTypes.number,
	navigation: PropTypes.object,
};

export default RestaurantRow;
