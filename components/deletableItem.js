import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class DeletableItem extends Component {
    constructor(props) {

        super(props);
    }

    deleteItem(itemID){
        fetch('https://gradedapi.herokuapp.com/items/' + itemID , {
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + this.props.jwt,
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(response => {
            if (response.ok == false) {
              throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
            }
            return response.json();
          })
    
          .catch(error => {
            console.log("Error message:")
            console.log(error.message)
          });
      }

    render() {
        return (
            <TouchableHighlight onPress={() => this.deleteItem(this.props.item.item_id)} >
                <View style={styles.anitem}>
                    <Image
                        style={styles.itempic}
                        source={{
                            uri: 'https://res.cloudinary.com/dzd114icl/image/upload/v1613678484/images/noimag_rx26gs.png',
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <Text>{this.props.item.item_info.name}</Text>
                        <Text>price : {this.props.item.item_info.price}</Text>
                        <Text>Location : {this.props.item.item_info.location}</Text>
                    </View>
                </View>
            </TouchableHighlight>

        )
    }
}

const styles = StyleSheet.create({
    anitem: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        padding: 30,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'solid',
        height: 50,
        width: 300
    },
    itempic: {
        width: 40,
        height: 40,
        marginRight: 20
    }
});
