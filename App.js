'use strict';

import React, { Component } from 'react';

// components
import RestaurantList from 'components/RestaurantList';
import RestaurantInfo from 'components/RestaurantInfo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Platform } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={RestaurantList} options={{ title: 'Restaurant list' }} />
        <Stack.Screen name="Info" component={RestaurantInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
