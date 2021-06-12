import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePost from './CreatePost'
import ChooseImage from './ChooseImage'
import {ScreenKey} from '../../../../../globals/constants'
const NavigationStack = createStackNavigator();
export default function ScreenRepair(props){
    const [arrImage,setArrImage]=useState([]);
    
    return(
        <NavigationStack.Navigator>
            <NavigationStack.Screen name={ScreenKey.CreatePost} component={CreatePost} options={{headerShown:false}} 
            initialParams={{arrImage}}
            />
            <NavigationStack.Screen name={ScreenKey.ChooseManyImage} component={ChooseImage} options={{headerShown:false}}/>
        </NavigationStack.Navigator>
    )
}