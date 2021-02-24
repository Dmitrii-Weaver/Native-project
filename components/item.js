import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, Button, Image } from 'react-native';




export default class item extends Component {

    constructor(props) {

        super(props);
        this.state = {
            itemState: 0,
            output: (<>
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
            </>)


        }

    }
    setItemState(value) {
        this.setState({ itemState: value })
    }
    setOutput(value) {
        this.setState({ output: value })
    }
    manageOutput() {

        if (this.state.itemState == 0) {
            this.setOutput(<>
                <View style={styles.anitem}>
                    <Image
                        style={styles.itempic}
                        source={{
                            uri: 'https://res.cloudinary.com/dzd114icl/image/upload/v1613678484/images/noimag_rx26gs.png',
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>About item :</Text>
                        <Text>{this.props.item.item_info.name}</Text>
                        <Text>price : {this.props.item.item_info.price}</Text>
                        <Text>Desctiption : {this.props.item.item_info.description}</Text>
                        <Text>Location : {this.props.item.item_info.location}</Text>
                        <Text>Delivery : {this.props.item.item_info.delivery}</Text>
                        <Text>Posted : {this.props.item.item_info.date_of_posting}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>About seller :</Text>
                        <Text>Name : {this.props.item.item_seller.name}</Text>
                        <Text>Phone : {this.props.item.item_seller.phone}</Text>


                    </View>
                </View>
            </>)
            this.setItemState(1)
        }
        else if (this.state.itemState == 1) {
            this.setOutput(<>
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
            </>
            )
            this.setItemState(0)
        }

    }

    render() {
        return (
            <TouchableHighlight onPress={() => this.manageOutput()} >
                {
                    this.state.output
                }
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    anitem: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'solid',

        width: 300
    },
    itempic: {
        width: 40,
        height: 40,
        marginRight: 20
    }
});
