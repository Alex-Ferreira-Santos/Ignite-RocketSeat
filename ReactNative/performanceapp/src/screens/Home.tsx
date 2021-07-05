import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';

import {FriendList} from '../Components/FriendList'

interface Data{
    id: string
    name: string
    likes: number
}

export function Home(){
    const [name,setName] = useState('')
    const [friends,setFriends] = useState([])

    async function handleSearch(){
        const response = await fetch(`http://192.168.3.103:3333/friends?q=${name}`)
        const data = await response.json()

        const formattedDate = data.map((item:Data) => {
            return {
                id: item.id,
                name: item.name,
                likes: item.likes,
                online: `${new Date().getHours()}:${new Date().getMinutes()}`
            }
        })

        setFriends(formattedDate)
    }

    const handleFollow = useCallback(()=>{
        console.log('follow user')
    },[])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Amigos</Text>

            <TextInput
                placeholder="Nome do cliente"
                onChangeText={setName}
                style={styles.input}
            />

            <Button
                title='Buscar'
                onPress={handleSearch}
            />

            <ScrollView style={styles.list}>
               <FriendList 
                    data={friends}
                    follow={handleFollow}
                /> 
            </ScrollView>
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 100,
        padding: 25,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    input:{
        borderWidth:1,
        padding: 7,
        marginVertical: 10
    },
    list:{
        marginTop: 20
    }
})