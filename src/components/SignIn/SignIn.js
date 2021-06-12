import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { URL, notifyBillContext } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import bgImage from '../../../image/login.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
export default function App(props) {
    const changeOnRefesh = useContext(notifyBillContext).changeOnRefesh;
    const [showPass, setShowPass] = useState(true);
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState();
    const [spinner, setSpinner] = useState(false)
    const senddata = async () => {
        const res = await fetch(URL + 'api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: pass
            }),
        })
        if (res.status === 200) {
            const result = await res.json();
            setSpinner(false);
            console.log("AVT ",result);

            storeData(result.token, result.infoUser,result.infoUser.avatar);
            changeOnRefesh();
            props.navigation.navigate(ScreenKey.ChooseApart, { token: result.token, userId: result.infoUser.id });
        } else {
            setSpinner(false);
            Alert.alert("Login", 'username or password invalid');
        }

    }
    const storeData = async (token, infoUser,avt) => {
        try {
            console.log("AVATAR ",avt);
            const jsonToken = JSON.stringify(token);
            const jsonInfoUser = JSON.stringify(infoUser);
            const jsonavt=JSON.stringify(avt);
            await AsyncStorage.setItem('token', jsonToken);
            await AsyncStorage.setItem('infoUser', jsonInfoUser);
            await AsyncStorage.setItem('avt',jsonavt)
        } catch (e) {
            // saving error
        }
    }
    function handleLogin() {
        setSpinner(true);
        senddata();
    }
    const getCodeForgetPass = async () => {
        const res = await fetch(URL + 'api/auth/reset-code', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            }),
        })
        console.log("status mail", res.status)
    }
    const handleForgetPass = () => {
        if (!username.trim()) {
            Alert.alert('Cảnh báo', 'Cần username trước khi thực hiện chức năng này')
        }
        else {
            getCodeForgetPass();
            props.navigation.navigate(ScreenKey.ForgetPass, {
                username
            });
        }
    }
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.logoContainer}>
                {/* <Image source={Logo} style={styles.logo} backfaceVisibility={'hidden'} /> */}
                <Text style={styles.logoText}>REACT NATIVE</Text>
            </View>
            <View style={styles.inputContainer}>
                <Icon name={'ios-person-outline'} size={28} color={'rgba(255,255,255,0.7)'}
                    style={{
                        position: 'absolute',
                        top: 8,
                        left: 37
                    }} />
                <TextInput
                    style={styles.input}
                    placeholder={'Username'}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                    onChangeText={text => setUsername(text)}

                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name={'ios-lock-closed-outline'} size={28} color={'rgba(255,255,255,0.7)'}
                    style={{
                        position: 'absolute',
                        top: 8,
                        left: 37
                    }} />
                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    secureTextEntry={showPass}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                    onChangeText={text => setPass(text)}
                />
                <TouchableOpacity style={styles.btnEye} onPress={() => { setShowPass(!showPass) }}>
                    <Icon name={showPass ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255,255,255,0.7)'}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForgetPass}>
                <Text style={styles.textPass}>Quên mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1, width: null, height: null,
        justifyContent: 'center',
        alignContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        width: 120,
        height: 120,
        // color:'rgba(255,255,255,0.7)'
    },
    logoText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
        opacity: 0.5
    },
    inputContainer: {
        marginTop: 10
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        // width: WIDTH - 55,
        // height: 45,
        // borderRadius: 25,
        // backgroundColor:'#432577',
        // justifyContent:'center',
        // marginTop:20
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: '#432577',
        // color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    }, textPass: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        textDecorationLine: 'underline'
    }
})