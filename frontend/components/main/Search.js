import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import firebase from 'firebase';

require('firebase/firestore');

export default function Search(props) {
    const [user, setUsers] = useState([])

    const fetchUsers = (Search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', Search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            });
            setUsers(users);
        })
    }

  return (
    <View>
        <TextInput placeholder="Type Here..." 
            onChange={(search) => fetchUsers(search)} />

        <FlatList 
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem={({item}) => (
                <TouchableOpacity
                onPress={() => props.navigate.navigate("Profile", {uid:item.id})} >

                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )} />
    </View>
  )
}
