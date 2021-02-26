import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export default class ImagePickAndSend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
    }
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
    postForm.append('image', {
      uri: pickerResult.uri,
      name: fileName,
      type: 'image.jpeg'
    });
    postForm.append('foo', 'bar');
    this.setState({ isSubmitting: true })
    fetch('https://gradedapi.herokuapp.com/items/upload', {
      method: 'POST',
      body: postForm,

    })
      .then(response => response.json())
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
      <View>
        <Text> Image Picker </Text>

        { this.state.isSubmitting ? <ActivityIndicator /> :
          <TouchableOpacity onPress={this.openImagePickerAsync} style={{ borderWidth: 1, borderColor: 'black' }}>
            <Text>Pick a photo and start upload</Text>
          </TouchableOpacity>
        }

      </View>
    )
  }
}