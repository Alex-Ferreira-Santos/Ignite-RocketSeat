import React from 'react';
import {StatusBar} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Container,Header,TotalCars,HeaderContent,CarList } from './styles';
import {Car} from '../../components/Car'
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation()

  const carData={
    brand: 'Audi',
    name: 'R$ 5 Coupé',
    rent:{
      period: 'AO DIA',
      price: 120
    },
    thumbnail: 'https://www.audicentersalvador.com.br/assets/uploads/nt_veiculos/16615-imagem-topo.png?v=1622516337'
  }

  function handleCarDetails(){
    navigation.navigate('carDetails')
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
      <CarList 
        data={[1,2,3]}
        keyExtractor={item => String(item)}
        renderItem={({ item}) => <Car data={carData} onPress={handleCarDetails}/>}
      />
      
    </Container>
  );
};

