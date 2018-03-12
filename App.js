import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
// import { LoggedOut } from './src/router.js'
import { createRootNavigator } from './src/router';
import Wardrobe from './src/screens/Wardrobe'
import store from './src/store'
import { isLoggedIn } from './src/auth'



export default class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loggedIn: false,
      checkedLogin: false
    }
  }

  componentWillMount () {
    isLoggedIn()
    .then(res => this.setState({ loggedIn: res, checkedLogin: true}))
    .catch(err => console.error(err))
  }

  render() {
    const { loggedIn, checkedLogin } = this.state
    if (!checkedLogin) {
      return null
    }

    const Layout = createRootNavigator(loggedIn)

    return (
      <Provider store={store}>
        <Layout />
        {/* <Wardrobe /> */}
      </Provider>
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
        // <SignedOut />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
