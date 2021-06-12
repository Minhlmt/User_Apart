import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainManage from './MainManage'
import CreatePost from './CreatePost/ScreenCreate'
import UpdatePost from './UpdatePost'
import DetailManage from './Detail'
import { ScreenKey } from '../../../../globals/constants'
const BillStack = createStackNavigator();
export default function ScreenInfo(props) {
    const {token}=props.route.params;
    return (

        <BillStack.Navigator>
            <BillStack.Screen name={ScreenKey.MainManage} component={MainManage} options={{ headerShown:false }} initialParams={{token}}/>
            <BillStack.Screen name={ScreenKey.CreatePost} component={CreatePost} options={{ headerShown:false }}/>
         
            <BillStack.Screen name={ScreenKey.DetailManage} component={DetailManage} options={{ title:'Chi tiết' }}/>
        </BillStack.Navigator>


    )
}