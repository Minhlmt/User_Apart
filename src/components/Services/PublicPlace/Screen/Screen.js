import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateRegister from '../Create/Create'
import NotifyRegister from '../Notify/ScreenNotify'
import MainRegister from './MainScreen'
import DetailRegister from '../Notify/Detail'
import { ScreenKey } from '../../../../globals/constants'
const BillStack = createStackNavigator();
export default function ScreenInfo(props) {
 
    return (

        <BillStack.Navigator>
            <BillStack.Screen name={ScreenKey.MainRegister} component={MainRegister} options={{ headerShown: false }}  />
            <BillStack.Screen name={ScreenKey.CreateRegister} component={CreateRegister} options={{ headerShown:false }} />
            <BillStack.Screen name={ScreenKey.NotifyRegister} component={NotifyRegister} options={{title:'Thông báo'}} />
        </BillStack.Navigator>


    )
}