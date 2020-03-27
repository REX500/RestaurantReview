import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TextInput, FlatList, Image } from 'react-native';
import axios from 'axios';

// components
import Header from 'components/header/Header';
import RestaurantRow from 'components/restaurant/restaurantRow/RestaurantRow';

// images
import PizzaImage from 'images/pizza.png';

// style
import style from './style';

class RestaurantList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: null,
			restaurants: [],
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:3000/restaurants')
			.then((result) => this.setState(() => ({ restaurants: result.data })));
	}

	render() {
		const { navigation } = this.props;

		return (
			<View style={style.wrapper}>
				<View style={style.image}>
					<Image source={PizzaImage} />
				</View>

				<Header />

				<TextInput
					placeholder="Enter text"
					style={style.input}
					onChangeText={(text) => this.setState(() => ({ searchText: text }))}
					value={this.state.searchText}
				/>

				<FlatList
					data={this.state.restaurants.filter(
						(entry) =>
							!this.state.searchText ||
							entry.name
								.toLowerCase()
								.indexOf(this.state.searchText.toLowerCase()) > -1
					)}
					renderItem={({ item, index }) => {
						return (
							<RestaurantRow
								data={item}
								index={index}
								navigation={navigation}
							/>
						);
					}}
					keyExtractor={(item) => item.name}
					contentContainerStyle={style.restaurantWrapper}
				/>
			</View>
		);
	}
}

RestaurantList.propTypes = {
	navigation: PropTypes.object,
};

export default RestaurantList;
