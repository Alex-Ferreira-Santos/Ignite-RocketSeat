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
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighLightProps{
    amount: string
    lastTrasaction: string
}

interface HighlightData{
    entries:HighLightProps
    expensives:HighLightProps
    total: HighLightProps
}

export function Dashboard(){
    const [isLoading,setIsLoading] = useState(true)
    const [transactions,setTransactions] = useState<DataListProps[]>([])
    const [highLightData,setHighLightData] = useState<HighlightData>({} as HighlightData)
    
    const theme = useTheme()
    const {signOut,user} = useAuth()

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ){
        const collectionFiltered = collection.filter( transactions => transactions.type == type)

        if(collectionFiltered.length === 0){
            return 0
        }
       
        const lastTrasaction = new Date(Math.max.apply(Math, collection
            .filter(transaction => collectionFiltered)
            .map(transaction => new Date(transaction.date).getTime())))
        
        return `${lastTrasaction.getDate()} de ${lastTrasaction.toLocaleString('pt-BR',{month: 'long'})}`
    }
    
    async function loadTransactions(){
        
        const dataKey =`@gofinance:transactions_user:${user.id}`
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

        const lastTrasactionEntries = getLastTransactionDate( transactions, 'positive')

        const lastTrasactionExpensives = getLastTransactionDate( transactions, 'negative')
        const totalInterval = lastTrasactionExpensives === 0 ? 'Não há transações' : ` 01 a ${lastTrasactionExpensives}`
        const total = entriesTotal - expensiveTotal

        setHighLightData({
            entries:{
                amount: entriesTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTrasaction: lastTrasactionEntries === 0 ? 'Não há transações' : `Última entrada dia ${lastTrasactionEntries}`
            },
            expensives:{
                amount: expensiveTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTrasaction: lastTrasactionExpensives === 0 ? 'Não há transações' : `Última saída dia ${lastTrasactionExpensives}`
            },
            total:{
                amount: total.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTrasaction: totalInterval
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
                        <Photo source={{uri:user.photo}}/>
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>{user.name}</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={signOut}>
                        <Icon name='power'/>
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighLightCards >
                <HighLightCard 
                    type="up"
                    title="Entradas" 
                    amount={highLightData.entries.amount}
                    lastTrasaction={highLightData.entries.lastTrasaction}
                />
                <HighLightCard 
                    type="down"
                    title="Saídas" 
                    amount={highLightData.expensives.amount} 
                    lastTrasaction={highLightData.expensives.lastTrasaction}
                />
                <HighLightCard 
                    type="total"
                    title="Total" 
                    amount={highLightData.total.amount}
                    lastTrasaction={highLightData.total.lastTrasaction}
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