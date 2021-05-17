import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateRepair from '../ScreenRepair'
import NotifyRepair from '../NotifyRepair/ScreenNotify'
import MainRepair from './MainScreen'
import { ScreenKey } from '../../../../globals/constants'
const BillStack = createStackNavigator();
export default function ScreenInfo(props) {
    return (

        <BillStack.Navigator>
            <BillStack.Screen name={ScreenKey.MainRepair} component={MainRepair} options={{ headerShown: false }} />
            <BillStack.Screen name={ScreenKey.CreateRepair} component={CreateRepair} options={{ title: 'Sữa chữa' }} />
            <BillStack.Screen name={ScreenKey.NotifyRepair} component={NotifyRepair} options={{ headerShown: false }} />
        </BillStack.Navigator>


    )
}