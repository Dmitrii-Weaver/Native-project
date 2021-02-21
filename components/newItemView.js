import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native'
import axios from 'axios';

export default class CreateItemView extends Component {

  constructor(props) {

    super(props);
    this.state = {
      Name:'a',
      Description:'a',
      Category:'a',
      Location:'a',
      Price:'a',
      Delivery:'a',
      Phone:'a',

    }
  }
  setName(value) {
    this.setState({ Name: value })
  }
  setDescription(value) {
    this.setState({ Description: value })
  }
  setCategory(value) {
    this.setState({ Category: value })
  }
  setLocation(value) {
    this.setState({ Location: value })
  }
  setPrice(value) {
    this.setState({ Price: value })
  }
  setDelivery(value) {
    this.setState({ Delivery: value })
  }
  setPhone(value) {
    this.setState({ Phone: value })
  }

  createItem() {
    fetch('https://gradedapi.herokuapp.com/items', {
      method: 'POST',
      body: JSON.stringify(       {
        item_id: 3,
        item_info: {
            name: this.state.Name,
            description: this.state.Description,
            category: this.state.Category,
            location: this.state.Location,
            images: [],
            price: this.state.Price,
            date_of_posting: "today",
            delivery: this.state.Delivery
        },
        item_seller: {
            name: "boris",
            phone: this.state.Phone,
            id: 1
        }
    }),
      headers: {
        "Authorization": "Bearer " + this.props.jwt,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));

  }

  render() {
    return (
      <View style={styles.mainBox}>
        <Text style={styles.header}>New item</Text>


        <View style={styles.container}>
          <Text style={styles.text}>Name : </Text>
          <TextInput
            style={styles.textbox}
            value={this.state.Name}
            placeholder="a plant"
            onChangeText={value => this.setName(value)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Descriprion : </Text>
          <TextInput
            style={styles.textbox}
            value={this.state.Description}
            placeholder="a very cool plant"
            onChangeText={value => this.setDescription(value)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Category : </Text>
          <TextInput
            style={styles.textbox}
            value={this.state.Category}
            placeholder="plants"
            onChangeText={value => this.setCategory(value)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Location : </Text>
          <TextInput
            style={styles.textbox}
            value={this.state.Location}
            placeholder="Oulu"
            onChangeText={value => this.setLocation(value)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Price : </Text>
          <TextInput
            style={styles.textbox}
            value={this.state.Price}
            placeholder="9999e"
            onChangeText={value => this.setPrice(value)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Delivery : </Text>
          <TextInput
            style={styles.textbox}
            value={this.state.Delivery}
            placeholder="pickup"
            onChangeText={value => this.setDelivery(value)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Phone : </Text>
          <TextInput
            style={styles.textbox}
            value={this.state.Phone}
            placeholder="+3581111111"
            onChangeText={value => this.setPhone(value)}
          />
        </View>
        



        <TouchableHighlight onPress={() => this.createItem()}>
          <View style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Create!</Text>
          </View>
        </TouchableHighlight>
        <Button
          title="Cancel"
          color="#0077B6"
          onPress={
            () => this.props.navigation.navigate('UserView')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: '#CAF0F8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginTop:50,
    fontSize: 36,
    marginBottom: 15,
    color: 'black'
  },
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
    
    
  },
  text: {
    fontSize: 20,
    color: 'black'
  },
  textbox: {
    borderWidth: 1,
    height: 30,
    width: '50%',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  primaryButton: {
    backgroundColor: '#00B4D8',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 5
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});


