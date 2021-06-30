import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import {Home} from '../screens/Home'
import {CarDetails} from '../screens/CarDetails'
import {Scheduling} from '../screens/Scheduling'
import {SchedulingDetails} from '../screens/SchedulingDetails'
import {Confirmation} from '../screens/Confirmation'
import {MyCars} from '../screens/MyCars';
import {Splash} from '../screens/Splash';


const {Navigator,Screen} = createStackNavigator()

export function AppStackRoutes(){
    return(
        <Navigator headerMode='none' initialRouteName='Splash'>
            <Screen name="home" component={Home} options={{gestureEnabled: false}}/>
            <Screen name="carDetails" component={CarDetails}/>
            <Screen name="scheduling" component={Scheduling}/>
            <Screen name="schedulingDetails" component={SchedulingDetails}/>
            <Screen name="Confirmation" component={Confirmation}/>
            <Screen name="myCars" component={MyCars}/>
        </Navigator>
    )
}