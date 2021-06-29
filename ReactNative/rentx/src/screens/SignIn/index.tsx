import React,{useState} from 'react';
import {StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Container, Header, Title, Subtitle, Form, Footer } from './styles';


import {Button} from '../../components/Button'
import {Input} from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../styles/theme';


export function SignIn() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <Subtitle>Faça seu login para começar{'\n'}uma experiência incrível</Subtitle>
          </Header>

          <Form>
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button 
              title='Login' 
              onPress={()=>{}} 
              enabled={false} 
              loading={false}
            />
            <Button 
              title='Criar conta gratuita' 
              color={theme.colors.background_secondary}
              onPress={()=>{}} 
              light
              enabled={true} 
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

