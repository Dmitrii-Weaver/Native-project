import React, { Component } from 'react'
import { Button, StyleSheet, TextInput, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export default class AddImageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            itemID: ''
        }
    }

    setID(value) {
        this.setState({ itemID: value })
    }

    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled == true) {
            alert('Image picker cancelled or failed');
            return;
        }

        const fileNameSplit = pickerResult.uri.split('/');
        const fileName = fileNameSplit[fileNameSplit.length - 1];

        let postForm = new FormData();
        postForm.append(this.props.imageFormName, {
            uri: pickerResult.uri,
            name: fileName,
            type: 'image/jpeg'
        });
        postForm.append('foo', 'bar');
        this.setState({ isSubmitting: true })
        axios({
            method: 'post',
            url: 'https://gradedapi.herokuapp.com/items/uploadImage/' + this.state.itemID,
            data: postForm,
            headers: { 
                "Authorization": "Bearer " + this.props.jwt,
                'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                //handle success
                console.log(response);
                alert("Image upload completed");
                this.setState({ isSubmitting: false })
            })
            .catch(response => {
                //handle error
                console.log(response);
                alert("Image upload failed");
                this.setState({ isSubmitting: false })
            });
    }

    render() {
        return (
            <View style={styles.mainBox}>
                <Text> Image Picker </Text>
                <View style={styles.container}>
                    <Text style={styles.text}>ID of the item : </Text>
                    <TextInput
                        style={styles.textbox}
                        value={this.state.itemID}
                        placeholder="789"
                        onChangeText={value => this.setID(value)}
                    />
                </View>

                { this.state.isSubmitting ? <ActivityIndicator /> :
                    <TouchableOpacity onPress={this.openImagePickerAsync} style={{ borderWidth: 1, borderColor: 'black' }}>
                        <Text>Pick a photo and start upload</Text>
                    </TouchableOpacity>
                }
                <Button
                    title="Cancel"
                    color="#0077B6"
                    onPress={
                        () => this.props.navigation.navigate('UserView')} />
                
            </View >
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
        marginTop: 50,
        fontSize: 36,
        marginBottom: 15,
        color: 'black'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
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
    }
});
