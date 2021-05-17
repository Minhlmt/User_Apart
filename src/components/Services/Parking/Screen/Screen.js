import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parking  from '../Parking/Parking'
import MainParking from './MainParking'
import NotifyParking from '../NotifyParking/NotifyParking'
import  DetailNotifyParking from '../NotifyParking/DetailNotifyParking.js'
import ChooseImageParking from '../Parking/ChooseImage'
import {URL, ScreenKey, notifyBillContext, Tab_Home_ProfileBillContext } from '../../../../globals/constants'
const ParkingStack = createStackNavigator();
export default function ScreenInfo(props) {
    const {countMess}=props.route.params;
    // const [countMess,setCountMess]=useState(0);
    // const _notifyBill = useContext(notifyBillContext).notifyBill;
    // console.log("NOTY ",_notifyBill);
   
    // const [newMessBill, setnewMessBill] = useState(_notifyBill);

    // useEffect(() => {
    //     setnewMessBill(_notifyBill);
    // }, [props.navigation, _notifyBill])



    // const getcountMess= async()=>{
    //     const res = await fetch(URL + `api/noti-parking/unread/${userId}`, {
    //         method: 'GET',
    //         headers: {
    //             Authorization: 'Bearer ' + `${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     if (res.status === 200) {
    //         const result = await res.json();
    //         console.log("status ", result);
    //         setCountMess(result.unread);
          
    //     }
    // }
    // useEffect(()=>{
    //     getcountMess()
    // },[])
    return (
        // <Tab_Home_ProfileBillContext.Provider value={newMessBill}>
            <ParkingStack.Navigator>
                <ParkingStack.Screen name={ScreenKey.MainParking} component={MainParking} options={{ headerShown: false }} initialParams={{countMess}}/>
                <ParkingStack.Screen name={ScreenKey.Parking} component={Parking} options={{ headerShown:false }} 
                initialParams={{  imageBase64: '', uri: '',width: "",height: '',mime: '',path: ''}} />
                <ParkingStack.Screen name={ScreenKey.NotifyParking} component={NotifyParking} options={{ headerShown: false }} />
                <ParkingStack.Screen name={ScreenKey.DetailNotifyParking} component={DetailNotifyParking} options={{ headerShown: false }} />
                <ParkingStack.Screen name={ScreenKey.ChooseImageParking} component={ChooseImageParking} options={{ headerShown: false }} />
            </ParkingStack.Navigator>
        // </Tab_Home_ProfileBillContext.Provider>

    )
}