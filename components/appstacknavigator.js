import DonorScreen from '../screens/donorsscreen'
import RecieverDetailsScreen from '../screens/recieverdetailsscreen'
import { createStackNavigator } from 'react-navigation-stack'
import NotificationScreen from '../screens/notificationscreen'

export const AppStackNavigator = createStackNavigator({
    ItemDonateList : {
      screen : DonorScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    RecieverDetails : {
      screen : RecieverDetailsScreen,
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
      initialRouteName: 'ItemDonateList'
    }
);