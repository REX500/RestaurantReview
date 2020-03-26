import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import axios from 'axios';

// components
import Header from 'components/header/Header';
import RestaurantRow from 'components/restaurant/restaurantRow/RestaurantRow';

// images
import PizzaImage from 'images/pizza.png';
import RestaurantInfo from '../restaurantInfo/RestaurantInfo';

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
			<View style={styles.wrapper}>
				<View style={styles.image}>
					<Image source={PizzaImage} />
				</View>

				<Header />

				<TextInput
					placeholder="Enter text"
					style={styles.input}
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
					contentContainerStyle={styles.restaurantWrapper}
				/>
			</View>
		);
	}
}

RestaurantList.propTypes = {
	navigation: PropTypes.object,
};

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	restaurantWrapper: {
		padding: 20,
	},
	address: { color: 'grey' },
	input: {
		padding: 10,
		marginHorizontal: 20,
		fontSize: 16,
		color: '#444',
		borderBottomWidth: 1,
		borderColor: '#ddd',
		backgroundColor: '#F5F5F5',
	},
	image: {
		alignItems: 'center',
		marginTop: 40,
	},
});

export default RestaurantList;
