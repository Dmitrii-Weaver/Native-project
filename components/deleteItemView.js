import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DeletableItem from './deletableItem'
export default class DeleteItem extends Component {
  constructor(props) {

    super(props);
    this.state = {
      items: [],
    }
  }

  getItems(){
    console.log('getting items');
    fetch('https://gradedapi.herokuapp.com/items/user/' +this.props.decodedJWT.user.id, {
      method: 'GET',
    })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.text()));
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
  componentDidMount() {
      this.getItems()
      
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#CAF0F8" }}>
        <View style={styles.itemBox}>
          <Text style={styles.header}>Delete an item!</Text>
          <Button  title="Refresh!" color="#0077B6"  onPress={ () => this.getItems() } />
          <ScrollView>
          {
            this.state.items.map(i => <DeletableItem item={i} key={i.item_id} jwt={this.props.jwt} onPress={() => this.deleteItem(i.item_id)} />)
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
