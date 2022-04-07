/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';

import * as React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import ShopScreen from './src/screens/ShopScreen';
import PlantScreen from './src/screens/PlantScreen';

import {colors} from './src/utils/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: colors.DarkColor},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Timer'}}
      />
    </Stack.Navigator>
  );
}

function PlantStack() {
  return (
    <Stack.Navigator
      initialRouteName="Plant"
      screenOptions={{
        headerStyle: {backgroundColor: colors.DarkColor},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Plant"
        component={PlantScreen}
        options={{title: 'Plant'}}
      />
    </Stack.Navigator>
  );
}

function ShopStack() {
  return (
    <Stack.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerStyle: {backgroundColor: colors.DarkColor},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{title: 'Shop'}}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: colors.DarkColor,
          tabBarInactiveBackgroundColor: colors.DarkColor,
        }}
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: colors.InactiveColor,
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PlantStack"
          component={PlantStack}
          options={{
            tabBarLabel: 'Plant',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="seed" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="ShopStack"
          component={ShopStack}
          options={{
            tabBarLabel: 'Shop',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="shopping"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
