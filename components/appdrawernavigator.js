import React, { Component } from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import { ListItem, Icon } from 'react-native-elements';
import {AppTabNavigator} from './apptabnavigator'
import NotificationScreen from '../screens/notificationscreen'

export const AppStackNavigator = createStackNavigator({
    Home: {
        screen: AppTabNavigator,
        navigationOptions:{
            headerShown : false
          }
    },
    Notifications: {
        screen: NotificationScreen,
        navigationOptions:{
            headerShown : false
          }
    },

},
{
    initialRootName: 'Home'
})