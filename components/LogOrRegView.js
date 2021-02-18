import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native';

export default class StartView extends Component {
    constructor(props) {

        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
    }

    setSomething(variable, value) {
        this.setState(variable, [value])
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.header}>Log Up</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.username}
                    placeholder="username"
                    onChangeText={value => this.setSomething(this.state.username, value)}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    placeholder="something-something@email.com"
                    onChangeText={value => this.setSomething(this.state.email, value)}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.password}
                    placeholder="password"
                    onChangeText={value => this.setSomething(this.state.password, value)}
                />
                <TouchableHighlight>
                    <View style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Sign up</Text>
                    </View>
                </TouchableHighlight>
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
    contentBox: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20,
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 15,
        borderStyle: 'solid',
        width: 300
    },
    screen: {
        backgroundColor: '#FBFBFB',
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




