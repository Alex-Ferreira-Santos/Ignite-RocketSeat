import React from 'react';
import {StatusBar} from 'react-native'
import { Container, Header, Title, Subtitle, Form, Footer } from './styles';

import {Button} from '../../components/Button'
import {Input} from '../../components/Input'

import theme from '../../styles/theme';

export function SignIn() {
  return (
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
  );
};

