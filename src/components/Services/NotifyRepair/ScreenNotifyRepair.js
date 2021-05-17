import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from '../../../globals/constants'
// import NotifyRepair from './NotifyRepair'
import NotifyDetailRepair from './NotifyDetailRepair'
import NotifyWaitComfirm from './NotifyWaitConfirm'
import NotifyCofirm from './NotifyCofirm'
import NotifyDone from './NotifyDone'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack=createStackNavigator();
const TabRepair =({route})=>{
    const {token,userId}=route.params;
    return(
        <Tab.Navigator initialRouteName='WaitComfirm'  
        tabBarOptions={{
           activeTintColor: '#e91e63',
           labelStyle: { fontSize: 14 ,  fontWeight: "bold",},
           style: { backgroundColor: 'powderblue' },
           
         }}>
           <Tab.Screen name="WaitComfirm" component={NotifyWaitComfirm} options={{tabBarLabel:'Chờ xác nhận'}} initialParams={{token:token,userId:userId}}/>
           <Tab.Screen name="Comfirm" component={NotifyCofirm} options={{tabBarLabel:'Đã xác nhận'}} initialParams={{token:token,userId:userId}}/>
           <Tab.Screen name="Done" component={NotifyDone} options={{tabBarLabel:'Hoàn thành'}} initialParams={{token:token,userId:userId}}/>
          
          
       </Tab.Navigator>
    )
}
export default function ScreenNotifyManage({route}){
    const {token,userId}=route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name={ScreenKey.NotifyRepair} component={TabRepair}  initialParams={{token:token,userId:userId}} options={{headerShown:false}}/>
            <Stack.Screen name={ScreenKey.NotifyDetailRepair} component={NotifyDetailRepair} options={{headerShown:false}} />
        </Stack.Navigator>
    )
   
}