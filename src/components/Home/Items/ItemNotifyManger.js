import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScreenKey } from '../../../globals/constants'
import { Icon } from 'react-native-elements'
import { URL, Text_Size } from '../../../globals/constants'
export default function ItemNotifyManger(props) {
    const [status,setStatus]=useState();
    const [styleStatus,setStyleStatus]=useState();
    useEffect(()=>{
      
        if(props.status){
            setStatus(false);
            setStyleStatus(styles.status_wait);
        }
        else if(!props.status){
            setStatus(true);
            setStyleStatus(styles.status);
        }
        
    },[props.status])
    const changeStatusNotify= async()=>{
        console.log("token api ",props.token);
        console.log("userid",props.userId);
        console.log("id ",props.id);
        const res = await fetch(URL + `api/noti/change-is-read`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${props.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notice_id:props.id,
                user_id:props.userId,
                status:true
              })
        })
       
    }
    const handleClick = () => {
        props.updateBadge();
        changeStatusNotify();
        setStatus(false);
        props.navigation.navigate(ScreenKey.NotifyDetailManage, {
            title:props.title,
            content:props.content,
            create_date:props.create_date,
            image:props.image,
            link:props.link,
            token:props.token,
            userId:props.userId,
            notice_id:props.id
        })
    }
    return (
        <View style={{flexDirection:'column',justifyContent:'space-between',elevation:2}}>
        <TouchableOpacity style={ styles.container1 } onPress={handleClick}>
             <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} source={require('../../../../image/bell.png')} />
           
            <Text style={styles.text}>{props.title}</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-end',width:30}}>
           
           {status &&(<Icon name='circle'
                        type='font-awesome'
                        color='#3498db'
                        size={20}
                    />) } 

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
        marginTop: 7,
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