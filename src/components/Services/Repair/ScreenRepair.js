import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Repair from './Repair'
import ChooseImage from './ChooseImage'
import {ScreenKey} from '../../../globals/constants'
const NavigationStack = createStackNavigator();
export default function ScreenRepair(props){
    
    return(
        <NavigationStack.Navigator>
            <NavigationStack.Screen name={ScreenKey.RepairService} component={Repair} options={{headerShown:false}} 
            initialParams={{imageBase64:'',uri:'',width:'',height:'',mime:'',path:''}}
            />
            <NavigationStack.Screen name={ScreenKey.ChooseImage} component={ChooseImage} options={{headerShown:false}}/>
        </NavigationStack.Navigator>
    )
}