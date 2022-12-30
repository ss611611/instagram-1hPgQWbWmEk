import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'

import { initializeApp } from 'firebase/app';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }
    
    onSignUp(){
        const { email, password, name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })

    }
    return () {
        return (
    <View>
      <TextInput
            placeholder="name"
            onChangeText={(name) => this.setState({ name })}  
      />
      <TextInput
            placeholder="email"
            onChangeText={(email) => this.setState({ email })}  
      />
      <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}  
      />

      <Button
          onPress={() => this.onSignUp()}
          title="Sign Up" 
      />
    </View>
    )
  } 
}

export default Register