"use strict";

import React, { Component } from "react";

// components
import RestaurantList from "components/RestaurantList";
import RestaurantInfo from "components/RestaurantInfo";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Platform } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0066CC"
          },
          headerTintColor: '#ffffff'
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ headerTransparent: true, title: '' }}
        >
          {props => <RestaurantList {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Info">
          {props => <RestaurantInfo {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
