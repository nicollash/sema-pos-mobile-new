import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import { Dimensions } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import AuthHeader from '../components/headers/AuthHeader';
import SitePickerScreen from '../screens/SitePickerScreen';
import DrawerScreen from '../screens/DrawerScreen';

const width = Dimensions.get('window').width;

const MainStack = createDrawerNavigator(
  { Home: createStackNavigator({ HomeScreen }) },
  {
    contentComponent: DrawerScreen,
    edgeWidth: width * .35,
    drawerWidth: width * .35,
    drawerType: 'back',
  }
);

const AuthStack = createStackNavigator(
  { Authentication: AuthScreen, SitePicker: SitePickerScreen },
  {
    defaultNavigationOptions: {
      header: props => <AuthHeader headerProps={props} />,
    },
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));