import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

var numeral = require('numeral');
 function ItemBill(props) {
     const [createDate,setCreateDate]=useState();
     useEffect(()=>{
         console.log(props.item);
        var date = new Date(props.item.create_date);

        setCreateDate(date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds()) ;
     },[])
    
 
   
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={styles.container1}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{props.item.title} </Text>
                    <Text style={styles.sumPrice}>{createDate}</Text>
                </View>
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        padding: 8,
        paddingVertical: 14,
        paddingHorizontal: 15,
        elevation: 3,
        justifyContent: 'space-between'


    },
    text: {
        flex: 1,
        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 5,
        fontSize: 18
    },
    status_done:{
        color:'blue'
    },
    status_false:{
        color:'red'
    },
    sumPrice:{
        color:'#800000'
    }
});
export default React.memo(ItemBill);