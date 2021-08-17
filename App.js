import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {AppTabNavigator} from './components/apptabnavigator'
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/welcomescreen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import { AppStackNavigator } from './components/appdrawernavigator';

export default class App extends React.Component {
  render() {
  return (
    <AppContainer/>
  );
}
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  BottomTab: {screen: AppTabNavigator}, 
  Drawer: {screen: AppStackNavigator}
})

const AppContainer = createAppContainer(switchNavigator);
