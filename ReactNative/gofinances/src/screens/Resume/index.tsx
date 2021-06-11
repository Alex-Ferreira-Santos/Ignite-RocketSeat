import React,{useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native'
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {VictoryPie} from 'victory-native'
import {useTheme} from 'styled-components'
import { Container,Header, Title, Content,ChartContainer,MonthSelect,MonthSelectButton,MonthSelectIcon,Month, LoadContainer} from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import {addMonths, subMonths,format} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface TransactionData{
  type: 'positive' | 'negative'
  name:string,
  amount: string,
  category: string,
  date: string,
}

interface CategoryData{
  key: string
  name:string
  total: number
  totalFormatted: string
  color: string
  percentFormatted: string
  percent: number
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate,setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()
  const {user} = useAuth()

  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    }else{
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData(){
    setIsLoading(true)
    try{
      const dataKey = `@gofinance:transactions_user:${user.id}`
      const response = await AsyncStorage.getItem(dataKey)
      const responseFormatted = response ? JSON.parse(response) : []
      
      const expensives = responseFormatted.filter((expensive:TransactionData) => 
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() && new Date(expensive.date).getFullYear() === selectedDate.getFullYear()

      )
      
      

      const expensivesTotal = expensives.reduce((accumulator: number,expensive: TransactionData) => {
        return accumulator + Number(expensive.amount)
      },0)


      const totalByCategory: CategoryData[] = []

      categories.forEach( category => {
        let categorySum = 0

        expensives.forEach((expensive:TransactionData) => {
          if(expensive.category === category.key){
            categorySum += Number(expensive.amount)
          }
        })

        if(categorySum > 0){
          const totalFormatted = categorySum.toLocaleString('pt-BR',{
            style: 'currency',
            currency: 'BRL'
          }) 

          const percent = Number(categorySum / expensivesTotal * 100)
          const percentFormatted = `${percent.toFixed(0)}%`

          totalByCategory.push({
            key: category.key,
            name: category.name,
            total: categorySum, 
            color: category.color,
            percent,
            percentFormatted,
            totalFormatted
          })
        }      

      })
      setTotalByCategories(totalByCategory)
      setIsLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  useFocusEffect(useCallback(() => {
    loadData()
},[selectedDate]))

  return (
    <Container>

      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? 
      <LoadContainer>
        <ActivityIndicator 
          color={theme.colors.primary}
          size='large'
        />
      </LoadContainer> :
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={()=>handleDateChange('prev')}>
            <MonthSelectIcon name='chevron-left'/>
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy',{locale: ptBR})}</Month>

          <MonthSelectButton onPress={()=>handleDateChange('next')}>
            <MonthSelectIcon name='chevron-right'/>
          </MonthSelectButton>
        </MonthSelect>
        
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map( category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={70}
            x='percentFormatted'
            y='total'
          />
        </ChartContainer>
        { totalByCategories.map(item => (
          <HistoryCard 
            title={item.name} 
            key={item.key} 
            amount={item.totalFormatted} 
            color={item.color}
          />
        ))}
      </Content>
      }
    </Container>
  );
};

