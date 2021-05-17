import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNotify from './MainNotify'
import { ScreenKey } from '../../../../globals/constants'
import NotifyRepairPublic from './NotifyRepairPublic/NotifyRepairPublic'
import NotifySelfRepair from './NotifySelf-Repair/ScreenSelf-Repair';
import NotifyServiceRepair from './NotifyServices-Repair/ScreenServices-Repair'
import DetailPublic from './NotifyRepairPublic/DetailPublic'
import DetailSelf from './NotifySelf-Repair/DetailSelf'
import DetailServices from './NotifyServices-Repair/DetailServices'
const BillStack = createStackNavigator();
export default function ScreenInfo(props) {
    const {token,userId,apartId}=props.route.params;
    return (
        <BillStack.Navigator>
            <BillStack.Screen name={ScreenKey.MainNotifyRepair} component={MainNotify} options={{ headerShown: false }} initialParams={{token,userId,apartId}}/>
            <BillStack.Screen name={ScreenKey.NotifyRepairPublic} component={NotifyRepairPublic} options={{ headerShown: false }} />
            <BillStack.Screen name={ScreenKey.NotifySelfRepair} component={NotifySelfRepair} options={{ title:"Tự sửa chữa" }} />
            <BillStack.Screen name={ScreenKey.NotifyServiceRepair} component={NotifyServiceRepair} options={{title:'Dịch vụ sửa chữa' }} />
            <BillStack.Screen name={ScreenKey.DetailPublic} component={DetailPublic} options={{ title:'Chi tiết' }} />
            <BillStack.Screen name={ScreenKey.DetailSelf} component={DetailSelf} options={{ title:'Chi tiết' }} />
            <BillStack.Screen name={ScreenKey.DetailServices} component={DetailServices} options={{ title:'Chi tiết' }} />
        </BillStack.Navigator>


    )
}