import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator, NavigationDrawerConfig, DrawerActions} from 'react-navigation-drawer'

import {Dimensions} from 'react-native';
//Screens Import
import SplashScreen from './Screens/Splash';
import LogInScreen from './Screens/LogIn';
import Repos from './Screens/Repos';
import Followers from './Screens/Followers';
import Following from './Screens/Following';

const drawerConfig : NavigationDrawerConfig = {
    drawerBackgroundColor:'grey',
    drawerWidth: Dimensions.get('window').width * 0.7,
    overlayColor:'rgba(184, 184, 184,0.7)',
}

const DrawerNavigator = createDrawerNavigator({
    Repos:{
        screen:Repos
    },
    Followers:{
        screen: Followers
    },
    Following:{
        screen: Following
    }
}, drawerConfig);

const SwitchNavigator = createSwitchNavigator({
    SplashScreen:{
        screen: SplashScreen
    },
    LogInScreen:{
        screen: LogInScreen
    },
    DrawerNavigator:{
        screen: DrawerNavigator,
    }
})


export default createAppContainer(SwitchNavigator);