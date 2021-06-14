import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import { Container,Header,CarImages,Content,Details,Description,Brand,Name,Rent,Period,Price,About, Accessories} from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={()=>{}}/>
      </Header>
    <CarImages>
      <ImageSlider imagesUrl={['https://www.audicentersalvador.com.br/assets/uploads/nt_veiculos/16615-imagem-topo.png?v=1622516337']}/>
    </CarImages>
    
    <Content>
      <Details>
        <Description>
          <Brand>Lamborguini</Brand>
          <Name>Huracan</Name>
        </Description>

        <Rent>
          <Period>Ao dia</Period>
          <Price>R$ 580</Price>
        </Rent>
      </Details>

      <Accessories>
        <Accessory name='380Km/h' icon={SpeedSvg}/>
        <Accessory name='3.2s' icon={AccelerationSvg}/>
        <Accessory name='800 HP' icon={ForceSvg}/>
        <Accessory name='Gasolina' icon={GasolineSvg}/>
        <Accessory name='Auto' icon={ExchangeSvg}/>
        <Accessory name='2 pessoas' icon={PeopleSvg}/>
      </Accessories>

      <About>
        Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar
      </About>
    </Content>
    </Container>
  );
};
