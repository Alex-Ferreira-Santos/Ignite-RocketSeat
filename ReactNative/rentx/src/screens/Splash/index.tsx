import React from 'react';
import {Button, StyleSheet} from 'react-native'

import Animated,{useSharedValue, useAnimatedStyle} from 'react-native-reanimated'

import { Container } from './styles';


export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle( () => {
    return {
      transform:[
        {translateX: animation.value}
      ]
    }
  })

  function handleAnimationPosition(){
    animation.value = Math.random() * 400
  }

  return (
    <Container>
      <Animated.View style={[styles.box,animatedStyles]}>

      </Animated.View>
      <Button title='Mover' onPress={handleAnimationPosition}/>
    </Container>
  );
};

export default Splash;

const styles = StyleSheet.create({
  box:{
    width: 100,
    height: 100,
    backgroundColor: 'red',
  }
})