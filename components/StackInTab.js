import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import jwt_decode from "jwt-decode";
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import UserView from './UserView'
import SellItem from './newItemView'
import DeleteItem from './deleteItemView'
import * as SecureStore from 'expo-secure-store'


const Stack = createStackNavigator();
const secureStoreTokenName = "demoAppJWT2";

export default class StackNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckingTokenStorage: true,
            activeJWT: null,
            decodedJWT: {
                user:{
                    uname:'',
                    id:''
                }
            }
        };
    }

    onLogout = () => {
        this.setState({ activeJWT: null });
        this.setState({ decodedJWT: null });
        SecureStore.deleteItemAsync(secureStoreTokenName);
    }

    componentDidMount() {
        SecureStore.getItemAsync(secureStoreTokenName)
            .then(response => {
                console.log("SecureStore.getItemAsync success")
                this.setState({ activeJWT: response, isCheckingTokenStorage: false })
            })
            .catch(error => {
                console.log("SecureStore.getItemAsync error")
                console.log(error);
            });
    }

    onLoginReceiveJWT = (responseJWT) => {

        SecureStore.setItemAsync(secureStoreTokenName, responseJWT)
            .then(response => {
                console.log(response);
                this.setState({ activeJWT: responseJWT, isCheckingTokenStorage: false })
                this.setState({ decodedJWT: jwt_decode(this.state.activeJWT) });
                console.log(this.state.decodedJWT)
                console.log(this.state.activeJWT)
            })
    }


    AuthScreens = () => {
        const screens = (
            <>
                <Stack.Screen name="Login" options={{ headerShown: false }} >
                    {props => <LoginView {...props} onLoginReceiveJWT={this.onLoginReceiveJWT} ></LoginView>}
                </Stack.Screen>
                <Stack.Screen name="Register" options={{ headerShown: false }} >
                    {props => <RegisterView  {...props} ></RegisterView>}
                </Stack.Screen>
            </>
        )
        const screenIfLoggedIn = (
            <>
                <Stack.Screen name="UserView" options={{ headerShown: false }} >
                    {
                        props => <UserView
                            {...props}
                            decodedJWT={this.state.decodedJWT}
                            jwt={this.state.activeJWT}
                            onLogout={this.onLogout} >
                        </UserView>}
                </Stack.Screen>
                <Stack.Screen name="SellItem" options={{ headerShown: false }} >
                    {
                        props => <SellItem
                            {...props}
                            decodedJWT={this.state.decodedJWT}
                            jwt={this.state.activeJWT}
                             >
                        </SellItem>}
                </Stack.Screen>
                <Stack.Screen name="DeleteItem" options={{ headerShown: false }} >
                    {
                        props => <DeleteItem
                            {...props}
                            decodedJWT={this.state.decodedJWT}
                            jwt={this.state.activeJWT}
                            >
                        </DeleteItem>}
                </Stack.Screen>
            </>
        )
        if (this.state.activeJWT != null) {
            return screenIfLoggedIn;
        }
        else {
            return screens;
        }
    }

    render() {
        return (
            <Stack.Navigator>
                {this.AuthScreens()}
            </Stack.Navigator>
        )
    }
}
