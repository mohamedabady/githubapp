import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//Screens Import
import SplashScreen from './Screens/Splash';
import LogInScreen from './Screens/LogIn';

const SwitchNavigator = createSwitchNavigator({
    SplashScreen:{
        screen: SplashScreen
    },
    LogInScreen:{
        screen: LogInScreen
    }
})

export default createAppContainer(SwitchNavigator);