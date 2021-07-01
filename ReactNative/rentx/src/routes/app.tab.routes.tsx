import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Home} from '../screens/Home'
import {MyCars} from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import {Profile} from '../screens/Profile';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import theme from '../styles/theme';
import { Platform } from 'react-native';

const {Navigator,Screen} = createBottomTabNavigator()

export function AppTabRoutes(){
    return(
        <Navigator 
            tabBarOptions={{
                activeTintColor: theme.colors.main,
                inactiveTintColor: theme.colors.text_detail,
                showLabel: false,
                style:{
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 78,
                    backgroundColor: theme.colors.background_primary
                }
            }}
        >
            
            <Screen 
                name="home" 
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({color}) => (
                        <HomeSvg width={24} height={24} fill={color}/>
                    )
                }}
            />
            <Screen 
                name="myCars" 
                component={MyCars}
                options={{
                    tabBarIcon: ({color}) => (
                        <CarSvg width={24} height={24} fill={color}/>
                    )
                }}
            />
            <Screen 
                name="profile" 
                component={Profile}
                options={{
                    tabBarIcon: ({color}) => (
                        <PeopleSvg width={24} height={24} fill={color}/>
                    )
                }}
            />
            
        </Navigator>
    )
}