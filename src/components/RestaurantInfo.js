import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

const RestaurantInfo = ({route, navigation}) => {
  console.log('navigation', route.params.place)
  return (
    <View style={style.main}>
      <Text style={style.text}>{route.params.place.name}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    marginVertical: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 20
  }
});

export default RestaurantInfo;
