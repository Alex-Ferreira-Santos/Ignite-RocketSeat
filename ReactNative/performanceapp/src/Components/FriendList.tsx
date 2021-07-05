import React,{useMemo} from 'react';
import {View,Text} from 'react-native';
import { Friend } from './Friend';

interface Props{
    data: {
        id: number
        name: string
        likes: number
    }[]
}

export function FriendList({data}: Props){
    const totalLikes = useMemo(() => {
        return data.reduce((likes, friend) => {
            return likes + friend.likes
        },0)
    },[data])
    
    
    return(
        <View>
            <Text> Total de likes {totalLikes}</Text>
            {
                data.map(friend => (
                    <Friend 
                        data={friend} 
                        key={String(friend.id)}
                    />
                ))
            }
        </View>
    );
}
