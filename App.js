import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// components
import RestaurantList from 'components/restaurant/restaurantList/RestaurantList';
import RestaurantInfo from 'components/restaurant/restaurantInfo/RestaurantInfo';
import About from 'components/about/about';
import Modal from 'components/modal/modal';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'rgb(255, 255, 255)',
	},
};

const homeStackScreen = () => {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#0066CC',
				},
				headerTintColor: '#ffffff',
			}}>
			<Stack.Screen
				name="Home"
				options={{ headerTransparent: true, title: '' }}>
				{(props) => <RestaurantList {...props} />}
			</Stack.Screen>
			<Stack.Screen name="Info">
				{(props) => <RestaurantInfo {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

const tabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => {
					const iconName = route.name === 'List' ? 'list' : 'info-circle';

					return <Icon name={iconName} color={color} size={22} />;
				},
			})}
			tabBarOptions={{
				activeBackgroundColor: '#E6F0FA',
				activeTintColor: '#0066CC',
				inactiveTintColor: 'gray',
			}}>
			<Tab.Screen name="List" component={homeStackScreen} />
			<Tab.Screen name="About" component={About} />
		</Tab.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer theme={MyTheme} headerMode="none">
			<Stack.Navigator mode="modal" screenOptions={{ headerTransparent: true }}>
				<Stack.Screen
					name="Tabs"
					component={tabNavigator}
					options={{ headerTransparent: true, title: '' }}
				/>
				<Stack.Screen
					name="Modal"
					options={{ headerTransparent: true, title: '', headerLeft: null }}>
					{(props) => <Modal {...props} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
