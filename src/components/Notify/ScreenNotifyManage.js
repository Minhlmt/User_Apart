import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from '../../globals/constants'
import NotifyManage from './NotifyManage'
import NotifyDetailManage from './NotifyDetailManage'
const ScreenManage=createStackNavigator();
export default function ScreenNotifyManage({route}){
    const {updateBadge}=route.params;
   
  
    return(
        <ScreenManage.Navigator>
            <ScreenManage.Screen name={ScreenKey.NotifyManage} component={NotifyManage} options={{headerShown:false}} initialParams={{updateBadge}}/>
            <ScreenManage.Screen name={ScreenKey.NotifyDetailManage} component={NotifyDetailManage} options={{title:'Chi tiết'}}/>
        </ScreenManage.Navigator>
    )
}