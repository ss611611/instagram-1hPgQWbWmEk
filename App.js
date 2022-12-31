import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

const firebaseConfig = {
  apiKey: "AIzaSyBipSULOdUv9LEo83BzGImVdtAPLzjuMSU",
  authDomain: "instagram-dev-761f1.firebaseapp.com",
  projectId: "instagram-dev-761f1",
  storageBucket: "instagram-dev-761f1.appspot.com",
  messagingSenderId: "985008116071",
  appId: "1:985008116071:web:7976f2eabb7a20a3985fc2",
  measurementId: "G-C7M69Z5N5J"
};



if (firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig)
   
}

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShow: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App


