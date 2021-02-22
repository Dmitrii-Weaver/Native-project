import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Item from './item'
export default class DeleteItem extends Component {
  constructor(props) {

    super(props);
    this.state = {
      items: []
    }
  }

  getItems(){
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
        let neededItems = json.filter(i => i.item_seller.id == this.props.decodedJWT.user.id)
        this.setState({ items: json })
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });


  }
  componentDidMount() {
      this.getItems()
  }

  deleteItem(itemID){
    fetch('https://gradedapi.herokuapp.com/items/' + itemID , {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log("Item deleted")
        this.getItems()
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
          <Text style={styles.header}>Delete an item!</Text>
          <Button  title="Refresh!" color="#0077B6"  onPress={ () => this.getItems() } />
          <ScrollView>
          {
            this.state.items.map(i => <Item item={i} key={i.item_id} onPress={() => this.deleteItem(i.item_id)} />)
          }
          </ScrollView>
          <Button
          title="Back"
          color="#0077B6"
          onPress={
            () => this.props.navigation.navigate('UserView')} />

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
