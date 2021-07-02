import { useNavigation, useIsFocused} from '@react-navigation/native';
import React,{useState, useEffect} from 'react';
import {StatusBar,FlatList} from 'react-native'
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import {Load} from '../../components/Load'
import { api } from '../../services/api';
import { Container,Header,Title,Subtitle, Content, Appointment, AppointmentTitle, AppointmentQuantity, CarWrapper, CarFooter, CarFooterTitle, CarFooterPeriod, CarFooterDate } from './styles';
import { Car} from '../../components/Car'
import {AntDesign} from '@expo/vector-icons'
import {Car as ModelCar} from '../../database/model/Car'
import {format,parseISO} from 'date-fns'

interface DataProps{
  id: string
  car: ModelCar
  start_date: string
  end_date: string
}

export function MyCars() {
  const [cars,setCars] = useState<DataProps[]>([])
  const [loading,setLoading] = useState(true)
  const screenIsFocus = useIsFocused()
  const navigation = useNavigation()
  const theme = useTheme()

  function handleBack(){
    navigation.goBack()
  }

  useEffect( () => {
    async function fetchCars(){
      try{
        const response = await api.get('/rentals')
        const dataFormatted = response.data.map( (data: DataProps) => {
          return{
            id:data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date),'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date),'dd/MM/yyyy')
          }
        })
        setCars(dataFormatted)
      } catch(error){
        console.log(error)
      } finally{
        setLoading(false)
      }
    }

    fetchCars()
  },[screenIsFocus])

  return (
    <Container>
      <Header>
          <StatusBar barStyle='light-content' translucent backgroundColor='transparent'/>
          <BackButton onPress={handleBack}color={theme.colors.shape}/>
          <Title>Escolha uma{'\n'} 
          data de início e{'\n'}fim do aluguel</Title>

          <Subtitle>Contato, segurança e praticidade</Subtitle>
        </Header>
        {loading ? <Load/> :
        <Content>
          <Appointment>
            <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
            <AppointmentQuantity>{cars.length}</AppointmentQuantity>
          </Appointment>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car}/>
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign 
                      name='arrowright' 
                      size={20} 
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />

        </Content>
        }
    </Container>
  );
};

