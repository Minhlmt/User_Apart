import React, { useEffect, useState ,useContext} from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, ScrollView,TextInput,Alert } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, Text_Size,notifyBillContext } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import { ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
export default function Apartment(props) {
    // const { token, userId } = props.route.params;
    const {username}=props.route.params;
    const changeOnRefesh=useContext(notifyBillContext).changeOnRefesh;
    const [code, setCode] = useState();
    const [password, setPassWord] = useState();
    const storeData = async (token, infoUser) => {
        try {
            const jsonToken = JSON.stringify(token);
            const jsonInfoUser = JSON.stringify(infoUser);
            await AsyncStorage.setItem('token', jsonToken);
            await AsyncStorage.setItem('infoUser', jsonInfoUser);
        } catch (e) {
            // saving error
        }
    }
    const getNewPass= async()=>{
        console.log("code ",code);
        console.log("username ",username);
        console.log("pass ",password);
        const res = await fetch(URL + 'api/auth/reset-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                new_pass: password,
                code:code
            }),
        })
        console.log("STATUS FORget ",res.status)
        if (res.status === 200) {
            const result = await res.json();
            props.navigation.navigate(ScreenKey.SignIn);
        } else {
          
            Alert.alert("Cảnh báo", 'Mã code không đúng');
        }
    }
    const handleClick = () => {
        getNewPass();
    }


    return (


        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/bgApart.jpg')}>

            <View style={styles._title}>
                <Text style={styles._text_title} >{`Quên mật khẩu`}</Text>

            </View>
            <View style={{ flex: 1, flexDirection: 'column' ,justifyContent:'space-between'}} >

                <View style={{marginHorizontal:10}}>
                    <Text style={styles.welcome}>Vui lòng kiểm tra mail và nhập mã code vào đây </Text>
                    <TextInput
                        style={styles.input2}
                        placeholderTextColor={'#660000'}
                        underlineColorAndroid='transparent'
                        keyboardType={'numeric'}
                        onChangeText={(text) => setCode(text)}
                        multiline
                    />
                    <Text style={styles.welcome}>Nhập mật khẩu mới</Text>
                    <TextInput
                        style={styles.input2}
                        placeholderTextColor={'#660000'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => setPassWord(text)}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={handleClick} style={styles.container}>
                    <View >
                        <Text style={styles.text_title}>Next</Text>

                    </View>
                </TouchableOpacity>

            </View>

        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    container: {

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 20,
        backgroundColor: 'rgba(0, 0, 255, 0.4)',
        paddingVertical: 20,
        marginHorizontal: 10,
        borderRadius: 25,
        marginBottom:20
    },
    welcome: {
        fontSize: 22,
        
        marginTop: 20,
        marginBottom: 20,
        color: 'rgba(46, 138, 138, 0.9)'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    component: {
        alignItems: 'center',
        marginBottom: 50,
    },
    radioStyle: {
        borderRightWidth: 1,
        borderColor: '#2196f3',
        paddingRight: 10
    },
    radioButtonWrap: {
        marginRight: 5
    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 15,
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
    input2: {
        width: WIDTH - 55,
        // height: 45,
        borderRadius: 10,
        fontSize: 16,

        backgroundColor: ' rgba(255, 255, 255, 0.3)',
        borderWidth:1,
        borderColor:'#33CC00',
        color: '#660000',
        marginHorizontal: 20
    },

});