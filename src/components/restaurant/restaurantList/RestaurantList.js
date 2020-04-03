import React, { Component } from 'react';
import PropTypes from 'prop-types';

// redux
import { connectWithStore, store } from 'appState';
import { bindActionCreators } from 'redux';
import { setRestaurants } from './store/actions';

// components
import { View, TextInput, FlatList, Image } from 'react-native';
import Header from 'components/header/Header';
import RestaurantRow from './components/restaurantRow/RestaurantRow';

// services
import { getRestaurants } from './restaurantList.service';

// images
import PizzaImage from 'images/pizza.png';

// style
import style from './style';

class RestaurantList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: null,
		};
	}

	componentDidMount() {
		const { setRestaurants } = this.props;

		getRestaurants().then((result) => {
			setRestaurants(result.data);
			// this.setState(() => ({ restaurants: result.data }));
		});
	}

	render() {
		const { navigation, restaurantList } = this.props;

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
					data={restaurantList.filter(
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
					extraData={restaurantList}
					keyExtractor={(item) => item.name}
					contentContainerStyle={style.restaurantWrapper}
				/>
			</View>
		);
	}
}

RestaurantList.propTypes = {
	navigation: PropTypes.object,
	setRestaurants: PropTypes.func,
	restaurantList: PropTypes.array,
};

const mapStateToProps = (store) => {
	return {
		restaurantList: store.restaurantList.restaurantList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			setRestaurants,
		},
		dispatch
	);
};

export default connectWithStore(
	store,
	RestaurantList,
	mapStateToProps,
	mapDispatchToProps
);
