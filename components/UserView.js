import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Item from './item'
export default class ItemsView extends Component {
  constructor(props) {

    super(props);
    this.state = {
      items: []
    }    
  }
  componentDidMount(){
    console.log('getting items');
    fetch('https://gradedapi.herokuapp.com/items', {
      method: 'GET',
    })
    .then(response => {
      if (response.ok == false) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      return response.json();
    })
    .then(json => {
      console.log("items GET successful")
      console.log("Received following JSON");
      console.log(json);

      this.setState({ items: json})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor:"#CAF0F8" }}>
        <View style={styles.itemBox}>
          
        <Text style={{ fontSize: 18, marginTop: 15 }}>Welcome back, {}!</Text>
        <Button title={'Sell Something!'} ></Button>
        <Button title={'Edit something!'} ></Button>
        <Button title={'Delete Something!'} ></Button>
        
        <Button title={'LOG OUT'} onPress={() => this.props.onLogout()}></Button>

        </View>
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
  itemBox: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#CAF0F8',
    width: 300
  }
});
