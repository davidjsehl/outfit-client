import { StackNavigator, TabNavigator } from 'react-navigation'
import { Platform, StatusBar } from 'react-native'
import Landing from './screens/Landing'
import Login from './screens/Login'
import SignUp from './screens/SignUp'

const headerStyle = {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: 'Sign Up',
            headerStyle
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Log In',
            headerStyle
        }
    }
}, {
    headerMode: 'none'
})