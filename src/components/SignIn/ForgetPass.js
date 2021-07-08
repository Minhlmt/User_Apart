import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, Text_Size, notifyBillContext } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import { ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')

import { Icon } from 'react-native-elements'
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
export default function Apartment(props) {
    // const { token, userId } = props.route.params;
    const { username } = props.route.params;
    const changeOnRefesh = useContext(notifyBillContext).changeOnRefesh;
    const [showPass, setShowPass] = useState(true);
    const [code, setCode] = useState();
    const [password, setPassWord] = useState();
    const [disabled, setDisabled] = useState(true);
    const [stylesButton, setStylesButton] = useState(styles.container_disable);
    const [statusNumber, setStatusNumber] = useState(false);
    const [statusUpper, setStatusUpper] = useState(false);
    const [statusLength, setStatusLength] = useState(false);
    const [statusLower, setStatusLower] = useState(false);
    const valueDefault = {
        touched: false,
        scoreLimit: 100,
        variations: {
            digits: /\d/,
            lower: /[a-z]/,
            upper: /[A-Z]/,
            nonWords: /\W/,
        },
        minLength: 6,
        labelVisible: false,
        levels: [
            {
                label: 'Cực kì yếu',
                labelColor: '#DD0000',
                activeBarColor: '#DD0000',
            },
            {
                label: 'Rất yếu',
                labelColor: '#ff3e00',
                activeBarColor: '#ff3e00',
            },

            {
                label: 'Yếu',
                labelColor: '#ff6900',
                activeBarColor: '#ff6900',
            },
            {
                label: 'Tạm được',
                labelColor: '#f4d744',
                activeBarColor: '#f4d744',
            },
            {
                label: 'Trung bình',
                labelColor: '#FFFF00',
                activeBarColor: '#FFFF00',
            },
            {
                label: 'Mạnh',
                labelColor: '#14eb6e',
                activeBarColor: '#14eb6e',
            },
            {
                label: 'Rất mạnh',
                labelColor: '#0af56d',
                activeBarColor: '#0af56d',
            },
            {
                label: 'Tuyệt vời',
                labelColor: '#00ff6b',
                activeBarColor: '#00ff6b',
            },
        ],
        wrapperStyle: {},
        labelStyle: { fontSize: 18 },

        // Bar
        barContainerStyle: {},
        barStyle: {},
        barColor: '#f1f3f4',




    }
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
    const getNewPass = async () => {
        console.log("code ", code);
        console.log("username ", username);
        console.log("pass ", password);
        const res = await fetch(URL + 'api/auth/reset-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                new_pass: password,
                code: code
            }),
        })
        console.log("STATUS FORget ", res.status)
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
    const onChange = (password, score, { label, labelColor, activeBarColor }) => {
        console.log(password, score, { label, labelColor, activeBarColor });
        setPassWord(password);
        if (lengthPass(password))
            setStatusLength(true);
        else
            setStatusLength(false);
        if (upperWord(password))
            setStatusUpper(true);
        else
            setStatusUpper(false)
        if (lowerWord(password))
            setStatusLower(true)
        else
            setStatusLower(false);
        if (numberWord(password))
            setStatusNumber(true)
        else
            setStatusNumber(false)
            
        if (!validate(password)) {
            setDisabled(true);
            setStylesButton(styles.container_disable)

        }

        else {

            setDisabled(false)
            setStylesButton(styles.container)
        }
    }

    const lengthPass = (password) => {
        if (password.length >= 8)
            return true;
        return false
    }
    const upperWord = (password) => {
        const expression = /(?=.*?[A-Z])/;
        return expression.test(password)
    }
    const lowerWord = (password) => {
        const expression = /(?=.*?[a-z])/;
        return expression.test(password)
    }
    const numberWord = (password) => {
        const expression = /(?=.*?[0-9])/;
        return expression.test(password)
    }
    const validate = (password) => {
        const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return expression.test(password)
    }
    return (


        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/bgApart.jpg')}>
            <ScrollView>
                <View style={styles._title}>
                    <Text style={styles._text_title} >{`Quên mật khẩu`}</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }} >

                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={styles.welcome}>Vui lòng kiểm tra mail và nhập mã code vào đây </Text>
                        <TextInput
                            style={styles.input2}
                            placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
                            placeholder='Code'
                            underlineColorAndroid='transparent'
                            keyboardType={'numeric'}
                            onChangeText={(text) => setCode(text)}
                            multiline
                        />





                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={styles.welcome}>Nhập mật khẩu mới</Text>
                        <RNPasswordStrengthMeter
                            onChangeText={onChange}
                            meterType="text"
                            passwordProps={valueDefault}

                        />
                        <View>


                            <Text style={[styles.welcome, { fontSize: 16, marginTop: 0 }]}>Yêu cầu mật khẩu</Text>
                            <View style={styles.requirePass}>

                                {statusLength && (
                                    <Icon name='check'
                                        type='font-awesome'
                                        color='#006600'
                                        size={20}
                                    />
                                )}
                                <Text style={{ marginLeft: 10, fontSize: 14 }}>- Ít nhất 8 kí tự</Text>
                            </View>
                            <View style={styles.requirePass}>
                                {statusUpper && (
                                    <Icon name='check'
                                        type='font-awesome'
                                        color='#006600'
                                        size={20}
                                    />
                                )}

                                <Text style={{ marginLeft: 10, fontSize: 14 }}>- Ít nhất 1 chữ cái viết hoa</Text>
                            </View>
                            <View style={styles.requirePass}>
                                {statusLower && (
                                    <Icon name='check'
                                        type='font-awesome'
                                        color='#006600'
                                        size={20}
                                    />
                                )}

                                <Text style={{ marginLeft: 10, fontSize: 14 }}>- Ít nhất 1 chữ cái viết thường</Text>
                            </View>
                            <View style={styles.requirePass}>
                                {statusNumber && (
                                    <Icon name='check'
                                        type='font-awesome'
                                        color='#006600'
                                        size={20}
                                    />
                                )}

                                <Text style={{ marginLeft: 10, fontSize: 14 }}>- Ít nhất 1 số</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleClick} style={stylesButton} disabled={disabled}>
                        <View >
                            <Text style={styles.text_title}>Next</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
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
        marginBottom: 20,
        marginTop: 150
    },
    requirePass: {
        flexDirection: 'row'
    },
    container_disable: {

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingVertical: 20,
        marginHorizontal: 10,
        borderRadius: 25,
        marginBottom: 20,
        marginTop: 150
    },
    welcome: {
        fontSize: 22,

        marginTop: 20,
        marginBottom: 0,
        color: 'rgba(46, 138, 138, 0.9)'
    },
    btnEye: {
        position: 'absolute',
        top: 227,
        right: 37
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
        width: WIDTH - 50,
        // height: 45,
        // borderRadius: 10,
        fontSize: 16,

        backgroundColor: ' rgba(255, 255, 255, 0)',
        borderBottomWidth: 1,
        borderColor: 'white',
        color: '#660000',
        marginHorizontal: 20
    },

});