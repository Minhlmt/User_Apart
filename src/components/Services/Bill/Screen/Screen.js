import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bill from '../Bill'
import NotifyBill from '../Notify/Notify'
import MainBill from './MainBill'
import { ScreenKey, notifyBillContext, Tab_Home_ProfileBillContext } from '../../../../globals/constants'
const BillStack = createStackNavigator();
export default function ScreenInfo(props) {
    const _notifyBill = useContext(notifyBillContext).notifyBill;
    console.log("NOTY ",_notifyBill);
   
    const [newMessBill, setnewMessBill] = useState(_notifyBill);

    useEffect(() => {
        setnewMessBill(_notifyBill);
    }, [props.navigation, _notifyBill])
    return (
        <Tab_Home_ProfileBillContext.Provider value={newMessBill}>
            <BillStack.Navigator>
                <BillStack.Screen name={ScreenKey.MainBill} component={MainBill} options={{ headerShown: false }} />
                <BillStack.Screen name={ScreenKey.Bill} component={Bill} options={{ title: 'Hóa đơn' }} />
                <BillStack.Screen name={ScreenKey.NotifyBill} component={NotifyBill} options={{ headerShown: false }} />
            </BillStack.Navigator>
        </Tab_Home_ProfileBillContext.Provider>

    )
}