import React from 'react';
import {View, Text, TextInput, Button} from 'react-native'

export function Profile(){
    return(
        <View>
            <Text testID='text-title'>Perfil</Text>

            <TextInput
                testID='input-name'
                placeholder="nome"
                autoCorrect={false}
                value='Alex'
            />

            <TextInput
                testID='input-surname'
                placeholder="sobrenome"
                value='Ferreira'
            />

            <Button title='Salvar' onPress={()=>{}}/>
        </View>
    )
}
