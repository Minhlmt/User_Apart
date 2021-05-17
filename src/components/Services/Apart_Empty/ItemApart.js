import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScreenKey } from'../../../globals/constants'
import { Icon } from 'react-native-elements'
export default function ItemApart(props) {

   
    const handleClick = () => {
        props.navigation.navigate(ScreenKey.DetailApart_Empty,{
            item:props.item
        })
    }
    return (
        <View style={{flexDirection:'column',justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.container1} onPress={handleClick}>
            
           
            <Text style={styles.text}>{props.item.name}</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-end',width:50,marginTop:10}}>
            {/* <Text style={styleStatus}>{status}</Text> */}
            <Text>{props.item.area} m2</Text>
            <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
            </View>
        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 2,


    },
    container2: {
        flexDirection: 'row',
        backgroundColor: "#BBBBBB",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
    },
    text: {
        flex: 1,
        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 10,
        fontSize: 20
    },
    status_wait:{
        fontSize:12,
        color:'#e74c3c',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 0.3,
        textShadowColor:'#c0392b'
    },
    status:{
        fontSize:12,
        color:'#f1c40f',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 0.3,
        textShadowColor:'#f1c40f'
    },
    status_done:{
        fontSize:12,
        color:'#2ecc71',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 0.3,
        textShadowColor:'#2ecc71'
    },
});