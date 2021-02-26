import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Item from './item'
export default class ItemsView extends Component {
  constructor(props) {

    super(props);
    this.state = {
      items: [],
      itemsToShow:[],
      textbar: ''
    }
  }


  setItemsToShow(value){
    this.setState({itemsToShow:value})
  }

  setText(value){
    this.setState({textbar:value})
    this.setItemsToShow(this.state.items.filter(i => i.item_info.name  == this.state.textbar || i.item_info.location == this.state.textbar || i.item_info.category == this.state.textbar))
    if(this.state.textbar == '' || this.state.textbar == null){
       this.setItemsToShow(this.state.items)
    }
  }

  getItems() {
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
        this.setItemsToShow(this.state.items)
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
          <Text style={styles.header}>Khajiit Has Wares, If You Have Coin</Text>
          <Button title="Refresh!" color="#0077B6" onPress={() => this.getItems()} />
          <TextInput
                    style={styles.textbox}
                    value={this.state.textbar}
                    placeholder="Lookin' for somethin'?"
                    onChangeText={value => this.setText(value)}
                />
          <ScrollView>
            {
              this.state.itemsToShow.map(i => <Item item={i} key={i.item_id} />)
            }
          </ScrollView>
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
  },
  textbox: {
    borderWidth: 1,
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20
},
});
