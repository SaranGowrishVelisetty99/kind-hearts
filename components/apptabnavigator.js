import React, { Component } from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DonorScreen from '../screens/donorsscreen'
import OrphanageScreen from '../screens/orphanagescreen'
import SettingScreen from '../screens/settings'
import ContributionScreen from '../screens/contributions'
import LogoutScreen from '../screens/logout'
import { AppStackNavigator } from './appstacknavigator'

export const AppTabNavigator = createBottomTabNavigator({
  Donors: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: <Image source={require("../assets/donoricon.png")} style={{ width: 20, height: 20 }} />,
      tabBarLabel: "Donors",
    }
  },
  Orphanage: {
    screen: OrphanageScreen,
    navigationOptions: {
      tabBarIcon: <Image source={require("../assets/orphanageicon.png")} style={{ width: 20, height: 20 }} />,
      tabBarLabel: "Orphanages",
    }
  },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
      tabBarIcon: <Image source={require("../assets/settings.png")} style={{ width: 20, height: 20 }} />,
      tabBarLabel: "Settings",
    }
  },
  Contributions: {
    screen: ContributionScreen,
    navigationOptions: {
    tabBarIcon: <Image source={require("../assets/contributions.png")} style={{ width: 20, height: 20 }} />,
    tabBarLabel: "Contributions",
  }
},
Logout: {
  screen: LogoutScreen,
  navigationOptions: {
  tabBarIcon: <Image source={require("../assets/logout.png")} style={{ width: 20, height: 20 }} />,
  tabBarLabel: "Logout",
}
}
  });