import React, { useState } from 'react'
import { View, TextInput,Image, Button } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
require("firebase/firebase")
require("firebase/firebase-storage")

export default function Save(props, {navigation}) {
    const [caption, setCaption] = useState("")    

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);
        const takeProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTrasnferred}`)
        } 

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", takeProgress, taskCompleted, taskError);

    }

    const savePostData = (downloadURL) => {

        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            likesCount: 0,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        }))
    }

  return (
    <View style={{flex: 1}}>
        <Image source={{uri: props.route.params.inage}} />
        <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(caption) => setCaption(caption)} 
        />
        
        <Button title="Save" onPress={() => uploadImage()} />
    </View>
  )
}
