import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ItemsView from './ItemsView'
import StackInTab from './StackInTab'
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default class TabNavigation extends Component {
  render() {
    return (
      <NavigationContainer> 
        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            component={ItemsView} 
            options={{ 
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" color={color} size={size} />)
            }}
          />
          <Tab.Screen 
            name="Log in" 
            component={StackInTab} 
            options={{ 
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-list" color={color} size={size} />)
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
