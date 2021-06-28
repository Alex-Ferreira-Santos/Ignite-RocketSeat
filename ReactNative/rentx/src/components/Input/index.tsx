import React from 'react';
import { TextInputProps } from 'react-native';
import theme from '../../styles/theme';
import {Feather} from '@expo/vector-icons'

import { Container } from './styles';

interface Props extends TextInputProps{
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({iconName}: Props) {
  return (
    <Container>
      <Feather name={iconName} size={24} color={theme.colors.text_detail}/>
    </Container>
  );
};

