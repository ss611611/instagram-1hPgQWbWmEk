import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main';


const store = createStore(rootReducer, applyMiddleware(thunk))

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

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        console.log("!user")
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        console.log("user")
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShow: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return(
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShow: false }} />
          </Stack.Navigator>
      </Provider>
    )
  }
}

export default App


