import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScreenKey } from '../../../globals/constants'
import { Icon } from 'react-native-elements'
export default function ItemNotification(props) {
    const [status,setStatus]=useState();
    const [styleStatus,setStyleStatus]=useState();
    useEffect(()=>{
        if(props.status===0){
            setStatus('Chờ xác nhận');
            setStyleStatus(styles.status_wait);
        }
        else if(props.status===1){
            setStatus('Đã xác nhận');
            setStyleStatus(styles.status);
        }
        else{
            setStatus('Đã xong');
            setStyleStatus(styles.status_done)
        }
    },[])
    const handleClick = () => {
        props.navigation.navigate(ScreenKey.NotifyDetailRepair, {
            notice_id: props.id,
            token: props.token,
            status:status,
        })
    }
    return (
        <View style={{flexDirection:'column',justifyContent:'space-between'}}>
        <TouchableOpacity style={props.is_read_user ? styles.container1 : styles.container2} onPress={handleClick}>
             <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} source={require('../../../../image/bell.png')} />
           
            <Text style={styles.text}>{props.title}</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-end',width:30,marginTop:10}}>
            {/* <Text style={styleStatus}>{status}</Text> */}
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
        elevation: 5,


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