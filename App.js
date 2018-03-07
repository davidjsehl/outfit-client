import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignedOut } from './src/router.js'
import Wardrobe from './src/screens/Wardrobe'


export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
        // <SignedOut />
        <Wardrobe />
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
