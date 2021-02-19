import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableHighlight, Button, StyleSheet } from 'react-native'
import { Base64 } from 'js-base64'



export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:'aaa',
            password:'bbb'
        }
    }
    setUserName(value){
        this.setState({userName : value})
    }
    setPassword(value){
        this.setState({password : value})
    }
    
    componentDidMount(){
        console.log(this.props)
    }
    

    loginClick() {
        fetch('https://gradedapi.herokuapp.com/loginForJWT', {
            method: 'GET',
            headers: {
                "Authorization": "Basic " + Base64.encode(this.state.userName + ":" + this.state.password)
            }
        })

        
            .then(response => {
                if (response.ok == false) {
                    throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                }
                return response.json();
            })
            .then(json => {
                console.log("Login successful")
                console.log("Received following JSON");
                console.log(json);

                this.props.onLoginReceiveJWT(json.token);
            })
            .catch(error => {
                console.log("Error message:")
                console.log(error.message)
            });
    }


    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.header}>User Login</Text>
                <Text style={styles.text}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.userName}
                    placeholder="username"
                    onChangeText={value => this.setUserName(value)}
                />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.password}
                    placeholder="password"
                    onChangeText={value => this.setPassword( value)}
                />
                <TouchableHighlight onPress={() => this.loginClick(this.props)}>
                    <View style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Login</Text>
                    </View>
                </TouchableHighlight>
                <Button title="Sign up" color="#000000" onPress={() => this.props.navigation.navigate('Register')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'rgb(51, 153, 255)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 40,
        marginBottom: 20,
        color: 'white'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    input: {
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 20
    },
    primaryButton: {
        backgroundColor: 'rgb(0, 153, 51)',
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
