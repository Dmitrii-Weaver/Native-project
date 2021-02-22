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

  didLogIn(){
    if(this.props.decodedJWT){
      return this.props.decodedJWT.user.uname
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor:"#CAF0F8" }}>
        <View style={styles.itemBox}>
          
        <Text style={{ fontSize: 40, marginTop: 15 }}>Welcome back {this.didLogIn()}!</Text>


        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button  color={'#0077B6'} title={'Sell Something!'}   onPress={() => this.props.navigation.navigate('SellItem')}></Button>

        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button color={'#0077B6'} title={'Edit something!'}  onPress={() => console.log(this.props.decodedJWT)} ></Button>

        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button color={'#0077B6'} title={'Delete Something!'} ></Button>

        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button color={'#0077B6'} title={'LOG OUT'} onPress={() => this.props.onLogout()}></Button>

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
    backgroundColor: '#CAF0F8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CAF0F8',
    width: 300
  },
  text:{
    fontSize: 18, 
    marginTop: 15,
    marginBottom:15
  }
});
