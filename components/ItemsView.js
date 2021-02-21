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
  componentDidMount() {
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

        this.setState({ items: json })
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#CAF0F8" }}>
        <View style={styles.itemBox}>
          <Text style={styles.header}>Khajiit Has Wares, If You Have Coin</Text>
          {
            this.state.items.map(i => <Item item={i} key={i.item_id} />)
          }

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: 'black'
  },
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
