import React,{useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import { HighLightCard } from '../../components/HighLightCard';
import {useTheme} from 'styled-components'
import {TransactionCard,TransactionCardProps} from '../../components/TransactionCard'
import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighLightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer
} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighLightProps{
    amount: string
}

interface HighlightData{
    entries:HighLightProps
    expensives:HighLightProps
    total: HighLightProps
}

export function Dashboard(){
    const [isLoading,setIsLoading] = useState(true)
    const [transactions,setTransactions] = useState<DataListProps[]>([])
    const [highLightData,setHighLightData] = useState<HighlightData>({
        entries:{
            amount: '0'
        },
        expensives:{
            amount: '0'
        },
        total:{
            amount: '0'
        }
    } as HighlightData)
    const theme = useTheme()
    
    async function loadTransactions(){
        const dataKey = '@gofinance:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        
        const transactions = response ? JSON.parse(response) : []

        let entriesTotal = 0
        let expensiveTotal = 0
        
        const transactionsFormatted: DataListProps[] = transactions.map( (item:DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount)
            }else{
                expensiveTotal += Number(item.amount)
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
            const date = Intl.DateTimeFormat('pt-BR', { 
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date( item.date))
            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        })

        setTransactions(transactionsFormatted)
        const total = entriesTotal - expensiveTotal
        setHighLightData({
            entries:{
                amount: entriesTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives:{
                amount: expensiveTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total:{
                amount: total.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        })

        setIsLoading(false)
    }

    useEffect(()=>{
        loadTransactions()
    },[]) 
 
    useFocusEffect(useCallback(() => {
        loadTransactions()
    },[]))
    return (
        <Container>
            {
            isLoading ? <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary}
                        size='large'
                    />
                </LoadContainer> :
            <>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri:'https://avatars.githubusercontent.com/u/64551315?v=4'}}/>
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>Alex</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={()=>{}}>
                        <Icon name='power'/>
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighLightCards >
                <HighLightCard 
                    type="up"
                    title="Entradas" 
                    amount={highLightData.entries.amount}
                    lastTrasaction="Última entrada dia 13 de abril"
                />
                <HighLightCard 
                    type="down"
                    title="Saídas" 
                    amount={highLightData.expensives.amount} 
                    lastTrasaction="Última saída dia 03 de abril"
                />
                <HighLightCard 
                    type="total"
                    title="Total" 
                    amount={highLightData.total.amount}
                    lastTrasaction="01 à 16 de abril"
                />
            </HighLightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <TransactionCard data={item}/>}
                >
                    
                </TransactionList>
                
            </Transactions>
            </>}
        </Container>
    )
}