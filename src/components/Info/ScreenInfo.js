import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {ScreenKey} from '../../globals/constants'
import ChangeInfo from './ChangeInfo'
import Info from './Info'
import ChangePass from './ChangePass'
const InfoStack=createStackNavigator();
export default function ScreenInfo(){
    return (
        <InfoStack.Navigator>
            <InfoStack.Screen name={ScreenKey.TabProfile} component={Info} options={{headerShown:false}}/>
            <InfoStack.Screen name={ScreenKey.ChangeInfo} component={ChangeInfo} options={{title:'Cập nhật thông tin'}}/>
            <InfoStack.Screen name={ScreenKey.ChangePass} component={ChangePass} options={{title:'Đổi mật khẩu'}}/>
        </InfoStack.Navigator>
    )
}