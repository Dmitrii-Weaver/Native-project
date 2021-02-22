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
  
  didLogIn(){
    if(this.props.decodedJWT){
      return this.props.decodedJWT.user.uname
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor:"#CAF0F8" }}>
        <View style={styles.itemBox}>
          
        <Text style={{ fontSize: 28, marginTop: 15 }}>Welcome back, {this.didLogIn()}!</Text>



        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button color={'#0077B6'} title={'My items'}  onPress={() => this.props.navigation.navigate('MyItems')} ></Button>
        
        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button  color={'#0077B6'} title={'Sell something'}   onPress={() => this.props.navigation.navigate('SellItem')}></Button>

        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button  color={'#0077B6'} title={'Edit an item'}   onPress={() => this.props.navigation.navigate('EditItem')}></Button>

        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button color={'#0077B6'} title={'Delete an item'} onPress={() => this.props.navigation.navigate('DeleteItem')} ></Button>

        <Text styles={styles.itemBox}>&#8195;</Text>
        <Button color={'#0077B6'} title={'Attach a picture!'} onPress={() => this.props.navigation.navigate('DeleteItem')} ></Button>

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
