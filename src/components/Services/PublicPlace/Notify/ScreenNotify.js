import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from '../../../../globals/constants'
import Wait from './Wait'
import Cofirm from './Confirm'
import NotConfirm from './NotConfirm'
import Detail from './Detail'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack=createStackNavigator();
const TabRepair =({route})=>{
  const {token,userId}=route.params

    return(
        <Tab.Navigator initialRouteName='WaitConfirm'  
        tabBarOptions={{
           activeTintColor: '#e91e63',
           labelStyle: { fontSize: 14 ,  fontWeight: "bold",},
           style: { backgroundColor: 'powderblue' },
         }}>
           <Tab.Screen name="WaitConfirm" component={Wait} options={{tabBarLabel:'Chờ duyệt'}} initialParams={{token,userId}} />
           <Tab.Screen name="Confirm" component={Cofirm} options={{tabBarLabel:'Đã duyệt'}} initialParams={{token,userId}}/>
           <Tab.Screen name="NotConfirm" component={NotConfirm} options={{tabBarLabel:'Không duyệt'}} initialParams={{token,userId}}/>
       </Tab.Navigator>
    )
}
export default function ScreenNotifyManage({route}){
    const {token,userId}=route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name={ScreenKey.NotifyRegister} component={TabRepair}  initialParams={{token:token,userId:userId}} options={{headerShown:false}}/>
            <Stack.Screen name={ScreenKey.DetailRegister} component={Detail} options={{headerShown:false}} />
        </Stack.Navigator>
    )
   
}