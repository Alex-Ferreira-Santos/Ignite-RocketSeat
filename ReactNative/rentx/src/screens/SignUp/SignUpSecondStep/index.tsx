import { useNavigation, useRoute } from '@react-navigation/native';
import React,{useState} from 'react';
import {KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, Alert} from 'react-native'
import { BackButton } from '../../../components/BackButton';
import { Bullet} from '../../../components/Bullet'
import { PasswordInput } from '../../../components/PasswordInput'
import { Button } from '../../../components/Button'

import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';
import theme from '../../../styles/theme';

interface Params{
  user:{
    name: string
    email: string
    driverLicense: string
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigation = useNavigation()
  const {params} = useRoute()
  const {user} = params as Params

  function handleBack(){
    navigation.goBack()
  }

  function handleRegister(){
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação dela')
    }

    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais')
    }

    navigation.navigate('Confirmation',{
      nextScreenRoute: 'SignIn',
      title: 'Conta criada',
      message: `Agora é só fazer login\ne aproveitar`
    })
  }

  return (
    <KeyboardAvoidingView behavior='position'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active/>
              <Bullet/>
            </Steps>
          </Header>

          <Title>Crie sua {'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de {'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
            
          </Form>

          <Button 
            title='Cadastrar' 
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

