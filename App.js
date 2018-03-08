import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { SignedOut } from './src/router.js'
import Wardrobe from './src/screens/Wardrobe'
import store from './src/store'



export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>

        <Wardrobe />
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
