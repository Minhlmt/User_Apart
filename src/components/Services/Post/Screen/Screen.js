import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AllPost from '../AllPost/AllPost'
import DetailPost from '../AllPost/Detail'
import ManagePost from '../ManagePost/ScreenManage'
import { ScreenKey } from '../../../../globals/constants'
const BillStack = createStackNavigator();
export default function ScreenInfo(props) {
    const {token}=props.route.params;
    return (

        <BillStack.Navigator>
            <BillStack.Screen name={ScreenKey.AllPost} component={AllPost} options={{ headerShown:false }} initialParams={{token}}/>
            <BillStack.Screen name={ScreenKey.DetailPost} component={DetailPost} options={{title:'Chi tiết'}} />
            <BillStack.Screen name={ScreenKey.ManagePost} component={ManagePost} options={{headerShown:false}}/>
        </BillStack.Navigator>


    )
}