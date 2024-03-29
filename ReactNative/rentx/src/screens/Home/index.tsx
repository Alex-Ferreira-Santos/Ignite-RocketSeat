import React,{useEffect,useState} from 'react';
import { Alert, StatusBar} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo'
import {synchronize} from '@nozbe/watermelondb/sync'

import {database} from '../../database'
import {api} from '../../services/api'
import {Car as ModelCar} from '../../database/model/Car'

import Logo from '../../assets/logo.svg';
import {CarDTO} from '../../dtos/CarDTO'

import {Car} from '../../components/Car'
import {Load} from '../../components/Load'
import { Container,Header,TotalCars,HeaderContent,CarList} from './styles';


export function Home() {
  const [cars,setCars] = useState<ModelCar[]>([])
  const [loading,setLoading] = useState(true)

  const netInfo = useNetInfo()
  const navigation = useNavigation()

  function handleCarDetails(car:CarDTO){
    navigation.navigate('carDetails',{car})
  }

  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({lastPulledAt}) => {
        const {data} = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
    
        const {changes, latestVersion} = data
        return {changes,  timestamp: latestVersion}
      },
      pushChanges: async ({changes}) => {
        const user = changes.users
        await api.post('/users/sync',user).catch( err => console.log(err))
      }
    })
  }

  useEffect(()=>{
    let isMounted = true

    async function fetchCars(){
      try{
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()
        

        if(isMounted){
          setCars(cars)
        }
        
      }catch(err){
        console.log(err)
      }finally{
        if(isMounted){
          setLoading(false)
        }
      }
    }
    fetchCars()
    return () => {
      isMounted = false
    }
  },[])

  useEffect(() => {
    if(netInfo.isConnected){
      offlineSynchronize()
    }
  },[netInfo.isConnected])

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
          {
            !loading && (<TotalCars>Total de {cars.length} carros</TotalCars>)
          }
          
        </HeaderContent>
      </Header>
      {loading ? <Load/> :<CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
      />}
      
    </Container>
  );
};
