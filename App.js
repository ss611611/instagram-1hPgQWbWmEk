import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { initializeApp } from 'firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen, { Register } from './components/auth/Register'

const firebaseConfig = {
  apiKey: "AIzaSyBipSULOdUv9LEo83BzGImVdtAPLzjuMSU",
  authDomain: "instagram-dev-761f1.firebaseapp.com",
  projectId: "instagram-dev-761f1",
  storageBucket: "instagram-dev-761f1.appspot.com",
  messagingSenderId: "985008116071",
  appId: "1:985008116071:web:7976f2eabb7a20a3985fc2",
  measurementId: "G-C7M69Z5N5J"
};

var app = null

if (app === null) {
  // firebase.initializeApp(firebaseConfig)
   app = initializeApp(firebaseConfig)
   console.log("initializeApp")
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShow: false }} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


