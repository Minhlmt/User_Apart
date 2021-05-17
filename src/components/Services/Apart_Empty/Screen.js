import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from '../../../globals/constants'
import Apart_Empty from './Apart'
import DetailApart_Empty from './DetailApart'
const ScreenManage=createStackNavigator();
export default function Screen_Apart_Empty(props){
    const {token}=props.route.params;
    return(
        <ScreenManage.Navigator>
            <ScreenManage.Screen name={ScreenKey.Apart_Empty} component={Apart_Empty} options={{headerShown:false}} initialParams={{token:token}}/>
            <ScreenManage.Screen name={ScreenKey.DetailApart_Empty} component={DetailApart_Empty} options={{title:'Chi tiết'}}/>
        </ScreenManage.Navigator>
    )
}