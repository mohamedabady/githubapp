import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, NavigationDrawerConfig, DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator, BottomTabBarProps } from 'react-navigation-tabs';

import React from 'react';
import { Dimensions, Image } from 'react-native';
//Screens Import
import SplashScreen from './Screens/Splash';
import LogInScreen from './Screens/LogIn';
import Repos from './Screens/Repos';
import Followers from './Screens/Followers';
import Following from './Screens/Following';
import Profile from './Screens/Profile';
import { Colors } from './Utils/Constants';
import CustomDrawer from './CustomDrawer';

//Tab navigator
const TabBarOptions: BottomTabBarProps = {
    activeTintColor: 'black',
    //activeBackgroundColor:'white',
    //inactiveTintColor:Colors.lightGrey,
    //inactiveBackgroundColor:'white',
    style: {
        height: 50,
        paddingVertical: 8,
        alignItems: 'center',
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: '400',
    },
    labelPosition: 'below-icon',
    keyboardHidesTabBar: true
}

const tabConfig = {
    initialRouteName: 'Profile',
    backBehavior: 'initialRoute',
    lazy: true,
    tabBarOptions: TabBarOptions,
}

const UserTabs = createBottomTabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Image resizeMode='contain' style={{ width: 20, height: 20, tintColor: focused ? Colors.greyTextColor : Colors.lightGrey }} source={require('./Assets/profile.png')} />
        }
    },
    Followers: {
        screen: Followers,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Image resizeMode='contain' style={{ width: 20, height: 20, tintColor: focused ? Colors.greyTextColor : Colors.lightGrey }} source={require('./Assets/followers.png')} />
        }
    },
    Following: {
        screen: Following,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Image resizeMode='contain' style={{ width: 20, height: 20, tintColor: focused ? Colors.greyTextColor : Colors.lightGrey }} source={require('./Assets/following.png')} />
        }
    }
}, tabConfig)

//Drawer navigator
const drawerConfig: NavigationDrawerConfig = {
    drawerBackgroundColor: 'grey',
    drawerWidth: Dimensions.get('window').width * 0.7,
    overlayColor: 'rgba(184, 184, 184,0.7)',
    contentComponent: CustomDrawer
}

const DrawerNavigator = createDrawerNavigator({
    Profile: {
        screen: UserTabs,
    },
    Repos: {
        screen: Repos
    },
    Followers: {
        screen: UserTabs,
    },
    Following: {
        screen: UserTabs
    }
}, drawerConfig);


//Switch navigator
const SwitchNavigator = createSwitchNavigator({
    SplashScreen: {
        screen: SplashScreen
    },
    LogInScreen: {
        screen: LogInScreen
    },
    DrawerNavigator: {
        screen: DrawerNavigator,
    }
})

export default createAppContainer(SwitchNavigator);