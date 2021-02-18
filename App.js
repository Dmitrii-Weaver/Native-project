import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigatorTab from './components/tabNavigation'


export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>

        <NavigatorTab>
          
        </NavigatorTab>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 18
  },
  contentBox: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 15,
    borderStyle: 'solid',
  }
});
