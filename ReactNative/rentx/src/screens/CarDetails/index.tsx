import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container,Header,CarImages } from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={()=>{}}/>
      </Header>
    <CarImages>
      <ImageSlider imagesUrl={['https://www.audicentersalvador.com.br/assets/uploads/nt_veiculos/16615-imagem-topo.png?v=1622516337']}/>
    </CarImages>
    
    </Container>
  );
};
