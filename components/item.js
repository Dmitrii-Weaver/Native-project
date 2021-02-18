import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class item extends Component {
    constructor(props) {

        super(props);
    }

    render() {
        return (
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
        width: 250
    },
    itempic:{
        width:40,
        height:40,
        marginRight:5
    }
});
