import React, { useState } from 'react';

import {View, StyleSheet, TextInput, FlatList, Image, Button} from 'react-native';

// components
import Header from 'components/Header';
import RestaurantRow from 'components/RestaurantRow';

// images
import PizzaImage from 'images/pizza.png';

const restaurants = [
  {rating: 4.7, name: 'React Cafe', address: '123 Anywhere St'},
  {rating: 3.7, name: 'Fancy Restaurant', address: '799 Main St'},
  {rating: 2.7, name: 'Taco Place', address: '550 Maple Rd'},
  {rating: 5.0, name: 'React Cafe1', address: '123 Anywhere St'},
  {rating: 4.4, name: 'Fancy Restaurant1', address: '799 Main St'},
  {rating: 4.5, name: 'Taco Place1', address: '550 Maple Rd'},
  {rating: 3.7, name: 'React Cafe2', address: '123 Anywhere St'},
  {rating: 2.7, name: 'Fancy Restaurant2', address: '799 Main St'},
  {rating: 4.2, name: 'Taco Place2', address: '550 Maple Rd'},
  {rating: 4.3, name: 'React Cafe3', address: '123 Anywhere St'},
  {rating: 4.4, name: 'Fancy Restaurant3', address: '799 Main St'},
  {rating: 4.8, name: 'Taco Place3', address: '550 Maple Rd'},
  {rating: 4.9, name: 'React Cafe4', address: '123 Anywhere St'},
  {rating: 4.0, name: 'Fancy Restaurant4', address: '799 Main St'},
  {rating: 3.0, name: 'Taco Place4', address: '550 Maple Rd'},
  {rating: 2.6, name: 'React Cafe5', address: '123 Anywhere St'},
  {rating: 2.0, name: 'Fancy Restaurant5', address: '799 Main St'},
  {rating: 4.1, name: 'Taco Place5', address: '550 Maple Rd'},
  {rating: 4.9, name: 'Taco Place6', address: '550 Maple Rd'},
  {rating: 4.9, name: 'Taco Place7', address: '550 Maple Rd'},
];

const RestaurantList = ({navigation}) => {
  const [input, setInput] = useState(null);

  return (
    <View style={styles.wrapper}>
      <View style={styles.image}>
        <Image source={PizzaImage} />
      </View>

      <Header />

      <TextInput
        placeholder="Enter text"
        style={styles.input}
        onChangeText={text => setInput(text)}
        value={input}
      />

      <FlatList
        data={restaurants.filter(
          entry =>
            !input ||
            entry.name.toLowerCase().indexOf(input.toLowerCase()) > -1,
        )}
        renderItem={({item, index}) => {
          return <RestaurantRow data={item} index={index} navigation={navigation} />;
        }}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.restaurantWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  restaurantWrapper: {
    padding: 20,
  },
  address: {color: 'grey'},
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