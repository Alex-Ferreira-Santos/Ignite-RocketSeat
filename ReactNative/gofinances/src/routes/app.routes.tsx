import React from 'react';
import {useTheme} from 'styled-components'
import {Platform} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialIcons} from '@expo/vector-icons'
const {Navigator,Screen} = createBottomTabNavigator()

import {Dashboard} from '../screens/Dashboard'
import {Register} from '../screens/Register'
import { Resume } from '../screens/Resume';

export function AppRoutes(){
    const theme = useTheme()
    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.secondary,
                inactiveTintColor: theme.colors.text,
                labelPosition: 'beside-icon',
                style:{
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                }
            }}
        >
            <Screen 
                name='Listagem' 
                component={Dashboard}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name='Cadastrar' 
                component={Register}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name='Resumo' 
                component={Resume}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    )
}