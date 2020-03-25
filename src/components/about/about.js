import React from 'react';

import { View, Text, Image } from 'react-native';

import CartoonRestaurantImage from 'images/cartoonRestaurant.png';
import Style from './style';

const About = () => {
	return (
		<View style={Style.main}>
			<Text style={Style.header}>About</Text>
			<Image style={Style.image} source={CartoonRestaurantImage} />
			<Text style={Style.text}>
				Denote simple fat denied add worthy little use. As some he so high down
				am week. Conduct esteems by cottage to pasture we winding. On assistance
				he cultivated considered frequently. Person how having tended direct own
				day man. Saw sufficient indulgence one own you inquietude sympathize.{' '}
			</Text>
			<Text style={Style.text}>
				Be me shall purse my ought times. Joy years doors all would again rooms
				these. Solicitude announcing as to sufficient my.
			</Text>
		</View>
	);
};

export default About;
