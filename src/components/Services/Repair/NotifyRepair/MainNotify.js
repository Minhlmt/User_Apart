import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import {ScreenKey} from '../../../../globals/constants'
import {Icon} from 'react-native-elements'
export default function MainNotify(props) {
    const {token,userId,apartId}=props.route.params;
    const notifyPublic = () => {
        props.navigation.navigate(ScreenKey.NotifyRepairPublic,{
            token,
            userId,
            apartId
        })
    }
    const notifySelfRepair = () => {
        props.navigation.navigate(ScreenKey.NotifySelfRepair,{
            token,
            userId,
            apartId
        });
    }
    const notifyServivesRepair = () => {
        props.navigation.navigate(ScreenKey.NotifyServiceRepair,{
            token,
            userId,
            apartId
        });
    }
    return (
        <View>
            <View style={styles._title}>
                <Text style={styles._text_title} >{`Thông báo`}</Text>

            </View>
            <TouchableOpacity style={styles.container1} onPress={notifyPublic}>

                {/* <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} resizeMode='contain' source={require('../../../../image/createuser.png')} /> */}
                <Text style={styles.text}>Thông báo chung</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container1} onPress={notifySelfRepair}>

                {/* <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} resizeMode='contain' source={require('../../../../image/billHistory.png')} /> */}
                <Text style={styles.text}>Tự sữa chữa </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container1} onPress={notifyServivesRepair}>

                {/* <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} resizeMode='contain' source={require('../../../../image/billHistory.png')} /> */}
                <Text style={styles.text}>Sử dụng dịch vụ </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
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
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 20,
        paddingHorizontal: 12,
        elevation: 8,
    },
    _text_title: {
        fontSize: 20,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
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
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10
    },
})