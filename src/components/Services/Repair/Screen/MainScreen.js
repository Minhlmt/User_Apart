import React, { useEffect, useState ,useContext} from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity ,BackHandler} from 'react-native';

import { ScreenKey} from '../../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreenRepair(props) {
  
    const [token, setToken] = useState('');
    const [apartId, setApartID] = useState('');
    const [userId, setUserId] = useState();
  
  
    const getData = async () => {
        try {
            const _token = await AsyncStorage.getItem('token');
            const _apartId = await AsyncStorage.getItem('apartId');
            const _userId = await AsyncStorage.getItem('infoUser');
            // const _newMessage= await AsyncStorage.getItem('notifyBill');
            // if(_newMessage!==null){
            //     setNewMessage(true);
            // }
            if (_token !== null && _apartId !== null) {
                const _tokenObject = JSON.parse(_token);
                const _apartIdObject = JSON.parse(_apartId);
                const _userIdObject = JSON.parse(_userId);
                setToken(_tokenObject);
                setApartID(_apartIdObject);
                setUserId(_userIdObject.id)

            }

        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        getData();
    }, [])
    const handleCreateRepair = () => {
        props.navigation.navigate(ScreenKey.CreateRepair);
      
    }
    const handleClickNotify = () => {
        props.navigation.navigate(ScreenKey.NotifyRepair,{
            token:token,
            userId:userId,
            apartId:apartId
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles._title}>
                <Text style={styles._text_title} >Sữa chữa</Text>
            </View>


            <View style={styles.margin_top}>
                <View style={styles.service_h}>

                    <View style={styles.shadow_button}>
                        <TouchableOpacity style={styles.container} onPress={handleCreateRepair}>
                            <Image style={styles.tinyLogo} resizeMode='contain' source={require('../../../../../image/bill.png')} />
                            <View>
                                <Text style={styles.text}>Tạo sữa chữa</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shadow_button}>
                        <TouchableOpacity style={styles.container} onPress={handleClickNotify}>
                            <View style={styles.badgeIconView}>
                               <Text style={styles.badge}> N </Text>
                                <Image style={styles.tinyLogo} resizeMode='contain' source={require('../../../../../image/notifyBill.png')} />
                            </View>
                            <View>
                                <Text style={styles.text}>Thông báo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    margin_top: {
        flex: 1,
    },
    service_h: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // justifyContent: 'space-around',
        // paddingVertical: 10,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 20,

    },
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
    shadow_button: {
        flex: 1,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 4,
        // backgroundColor:'red',

    },
    container: {
        display: 'flex',
        //   justifyContent:'center',
        alignItems: 'center',

    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    text: {
        marginTop: 10,
        color: 'black',
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'rgba(89, 180, 138, 1)'
    },
    badgeIconView:{
        position:'relative',
        padding:5
      },
      badge:{
        color:'#fff',
        position:'absolute',
        zIndex:10,
        top:1,
        right:1,
        padding:1,
        backgroundColor:'red',
        borderRadius:5
      }
})