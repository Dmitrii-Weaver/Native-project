import React, { Component, useState } from 'react'
import { View, Text, TextInput, TouchableHighlight, Button, StyleSheet } from 'react-native'
import { Base64 } from 'js-base64'



export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            password:''
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
                alert('Nope, try again!')
                console.log("Error message:")
                console.log(error.message)
            });
    }


    render() {
        return (
            <View style={styles.mainBox}>
                <Text style={styles.header}>Log in</Text>
                <Text style={styles.text}>Username</Text>
                <TextInput
                    style={styles.textbox}
                    value={this.state.userName}
                    placeholder="username"
                    onChangeText={value => this.setUserName(value)}
                />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.textbox}
                    value={this.state.password}
                    placeholder="password"
                    onChangeText={value => this.setPassword( value)}
                />
                <TouchableHighlight onPress={() => this.loginClick(this.props)}>
                    <View style={styles.primaryButton}>
                        <Text style={{ color: 'white', fontSize: 20}}>Login</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.text}>or</Text>
                <Button 
                    title="Sign up" 
                    color="#0077B6" 
                    onPress={() => this.props.navigation.navigate('Register')} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        marginBottom: 20,
        color: 'black'
    },
    mainBox: {
        backgroundColor: '#CAF0F8',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    },

});
