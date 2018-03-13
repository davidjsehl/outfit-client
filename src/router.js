import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Platform, StatusBar } from 'react-native'
import { FontAwesome } from 'react-native-vector-icons';
import Landing from './screens/Landing'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Wardrobe from './screens/Wardrobe'

const headerStyle = {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const LoggedOut = StackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            // title: 'Sign Up',
            // headerStyle
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            // title: 'Log In',
            // headerStyle
            header: null
        }
    }
}, {
    headerMode: 'none'
})

export const LoggedIn = TabNavigator({
    Wardrobe: {
        screen: Wardrobe,
        navigationOptions: {
            // headerLeft: null,
            header: null,
            tabBarLabel: 'Wardrobe',
            tabBarIcon: ({ tintColor }) => {
                <FontAwesome name="connectdevelop" size={30} color={tintColor} />
            }
        },
        Landing: {
            screen: Landing,
            navigationOptions: {
                headerLeft: null,
                tabBarLabel: 'Landing',
                tabBarIcon: ({ tintColor }) => {
                    <FontAwesome name="connectdevelop" size={30} color={tintColor} />
                }
            }
        }
        
    }
}, {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }
    }
})

export const createRootNavigator = (loggedIn = false) => {
  return StackNavigator(
    {
      LoggedIn: {
        screen: LoggedIn,
        navigationOptions: {
          gesturesEnabled: false,
          headerLeft: null,
          headerStyle
        }
      },
      LoggedOut: {
        screen: LoggedOut,
        navigationOptions: {
          gesturesEnabled: false,
          headerLeft: null,
          headerStyle
        }
      }
    }, 
    {
        mode: 'modal',
        initialRouteName: loggedIn ? 'LoggedIn' : 'LoggedOut'
    })
}
