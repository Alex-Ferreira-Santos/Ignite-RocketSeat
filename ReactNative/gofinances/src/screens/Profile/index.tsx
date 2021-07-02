import React from 'react';
import {View, Text, TextInput, Button} from 'react-native'

export function Profile(){
    return(
        <View>
            <Text>Perfil</Text>

            <TextInput
                placeholder="nome"
                autoCorrect={false}
            />

            <TextInput
                placeholder="sobrenome"
            />

            <Button title='Salvar' onPress={()=>{}}/>
        </View>
    )
}
