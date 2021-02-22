import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native'
import axios from 'axios';

export default class RegisterView extends Component {

    constructor(props) {

        super(props);
        this.state = {
            userName: 'aaa',
            email: 'a@gmail.com',
            password: 'bbb',
        }
    }
    setUserName(value){
        this.setState({userName : value})
    }
    setPassword(value){
        this.setState({password : value})
    }
    setEmail(value){
        this.setState({email : value})
    }
    signupPressed() {
        fetch('https://gradedapi.herokuapp.com/register', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.navigation.navigate('Login')
        })
        .catch(err => console.error(err));

    }

    render() {
        return (
            <View style={styles.mainBox}>
                <Text style={styles.header}>Sign Up</Text>
                <Text style={styles.text}>Username</Text>
                <TextInput
                    style={styles.textbox}
                    value={this.state.userName}
                    placeholder="johndoe"
                    onChangeText={value => this.setUserName(value)}
                />
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.textbox}
                    value={this.state.email}
                    placeholder="test@email.com"
                    onChangeText={value => this.setEmail(value)}
                />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.textbox}
                    value={this.state.password}
                    placeholder="password"
                    onChangeText={value => this.setPassword(value)}
                />
                <TouchableHighlight onPress={() => this.signupPressed()}>
                    <View style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Sign up</Text>
                    </View>
                </TouchableHighlight>
                <Button
                    title="Cancel"
                    color="#0077B6"
                    onPress={
                        () => this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        })
                    } />
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
        fontSize: 40,
        marginBottom: 20,
        color: 'black'
    },
    text: {
        fontSize: 20,
        color: 'black'
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
    primaryButton: {
        backgroundColor: '#00B4D8',
        height: 60,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 20,
        marginBottom: 10
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 20

    }
});


