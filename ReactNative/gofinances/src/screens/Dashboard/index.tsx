import React from 'react';
import { HighLightCard } from '../../components/HighLightCard';
import {TransactionCard} from '../../components/TransactionCard'
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
    TransactionList
} from './styles'

export function Dashboard(){
    const data = [{
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category:{
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date:"13/04/2020"
    },{
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category:{
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date:"13/04/2020"
    },{
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category:{
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date:"13/04/2020"
    }]
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri:'https://avatars.githubusercontent.com/u/64551315?v=4'}}/>
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>Alex</UserName>
                        </User>
                    </UserInfo>
                    <Icon name='power'/>
                </UserWrapper>
            </Header>

            <HighLightCards >
                <HighLightCard 
                    type="up"
                    title="Entradas" 
                    amount="R$ 17.400,00" 
                    lastTrasaction="Última entrada dia 13 de abril"
                />
                <HighLightCard 
                    type="down"
                    title="Saídas" 
                    amount="R$1.259,00" 
                    lastTrasaction="Última saída dia 03 de abril"
                />
                <HighLightCard 
                    type="total"
                    title="Total" 
                    amount="R$ 16.141,00" 
                    lastTrasaction="01 à 16 de abril"
                />
            </HighLightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    renderItem={({item}) => <TransactionCard data={item}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 10
                    }}
                >
                    
                </TransactionList>
                
            </Transactions>
        </Container>
    )
}