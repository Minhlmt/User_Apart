import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, ImageBackground, Button, ScrollView ,FlatList} from 'react-native';
import ItemApart from './ItemApart'
import {URL} from '../../../globals/constants'
const ItemSeparatorView = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
    )
  }
export default function Apart(props) {
    const [data,setData]=useState();
    const {token}=props.route.params;
    const fetchData=async()=>{
        const res = await fetch(URL + `api/apart/aparts-empty`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },

        })
        if(res.status===200){
            const result=await res.json();
            setData(result.data)
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    const renderItem = ({ item }) => {
        
        return (
         <ItemApart navigation={props.navigation} item={item}/>
        );
      };

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/background.jpg')}>
            <View style={styles._title}>
                <Text style={styles._text_title} >Căn hộ trống</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorView}
            />
          </ImageBackground>
        
    )
}
const styles = StyleSheet.create({
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 8,
    },
    _text_title: {
        fontSize: 25,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
})