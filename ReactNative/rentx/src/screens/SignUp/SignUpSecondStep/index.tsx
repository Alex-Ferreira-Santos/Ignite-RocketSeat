import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import { BackButton } from '../../../components/BackButton';
import { Bullet} from '../../../components/Bullet'
import { PasswordInput } from '../../../components/PasswordInput'
import { Button } from '../../../components/Button'

import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';
import theme from '../../../styles/theme';

export function SignUpSecondStep() {
  const navigation = useNavigation()

  function handleBack(){
    navigation.goBack()
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
            />
            <PasswordInput 
              iconName='lock'
              placeholder='Repetir senha'
            />
            
          </Form>

          <Button title='Cadastrar' color={theme.colors.success}/>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

