import React from 'react';
import {StatusBar} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Container,Header,TotalCars,HeaderContent } from './styles';
import {Car} from '../../components/Car'

export function Home() {
  const carDataOne={
    brand: 'Audi',
    name: 'R$ 5 Coupé',
    rent:{
      period: 'AO DIA',
      price: 120
    },
    thumbnail: 'https://www.audicentersalvador.com.br/assets/uploads/nt_veiculos/16615-imagem-topo.png?v=1622516337'
  }
  const carDataTwo={
    brand: 'Porsche',
    name: 'Panamera',
    rent:{
      period: 'AO DIA',
      price: 340
    },
    thumbnail: 'http://freebiescloud.com/wp-content/uploads/2021/02/PORSCHE-PANAMERA-2021-1.png'
  }
  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carDataOne} />
      <Car data={carDataTwo} />
    </Container>
  );
};

