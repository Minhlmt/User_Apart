import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button, TextInput, Alert, Dimensions, ScrollView } from 'react-native';
import { Text_Size, URL } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { ImageBackground } from 'react-native';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Icon } from 'react-native-elements'

const { width: WIDTH } = Dimensions.get('window')
export default function ChangeInfo(props) {
    const { user_id, token } = props.route.params;
    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirm, setConfirm] = useState();
    const [spinner, setSpinner] = useState(false);
    const [showPass1, setShowPass1] = useState(true);
    const [showPass2, setShowPass2] = useState(true);
    const [showPass3, setShowPass3] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [layoutButton, setStylesButton] = useState(styles.appButtonContainerLogOut_Dis)
    const [statusNumber, setStatusNumber] = useState(false);
    const [statusUpper, setStatusUpper] = useState(false);
    const [statusLength, setStatusLength] = useState(false);
    const [statusLower, setStatusLower] = useState(false);

    const updatePass = async () => {
        const res = await fetch(URL + `api/auth/change-pass`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                new_pass: newPass,
                old_pass: oldPass
            })

        })
        if (res.status === 200) {
            Alert.alert(
                "Thông báo",
                "Cập nhật thành công",
                [
                    {
                        text: "Ok",
                        onPress: () => props.navigation.navigate(ScreenKey.SignIn)
                    },
                ]
            );
        }
        else {
            Alert.alert(
                "Cảnh báo",
                "Mật khẩu cũ không đúng",
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    },
                ]
            );
        }
    }
    const checkConfirm = () => {
        if (newPass !== confirm) {
            Alert.alert(
                "Cảnh báo",
                "Mật khẩu không trùng khớp",
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    },
                ]
            );

        } else {
            updatePass();
        }
    }
    const changePass = () => {
        checkConfirm();
    }
    const onChangeNewPass = (text) => {
        setNewPass(text);
        if (lengthPass(text))
            setStatusLength(true);
        else
            setStatusLength(false);
        if (upperWord(text))
            setStatusUpper(true);
        else
            setStatusUpper(false)
        if (lowerWord(text))
            setStatusLower(true)
        else
            setStatusLower(false);
        if (numberWord(text))
            setStatusNumber(true)
        else
            setStatusNumber(false)
        if (validate(text)) {
            setDisabled(false);
            setStylesButton(styles.appButtonContainerLogOut)
        }
        else {
            setDisabled(true);
            setStylesButton(styles.appButtonContainerLogOut_Dis)
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
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
            <ScrollView>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View>
                    <Text style={styles.text}>Mật khẩu cũ</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Fumi
                        label={'Mật khẩu cũ'}
                        iconClass={FontAwesomeIcon}
                        iconName={'unlock'}
                        iconColor={'white'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        labelStyle={{ color: 'white' }}
                        inputStyle={{ color: 'white' }}
                        style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10 }}
                        onChangeText={(text) => setOldPass(text)}
                        secureTextEntry={showPass1}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={() => { setShowPass1(!showPass1) }}>
                        <Ionicon name={showPass1 ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255,255,255,0.7)'}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.text}>Mật khẩu mới</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Fumi
                        label={'Mật khẩu mới'}
                        iconClass={FontAwesomeIcon}
                        iconName={'unlock-alt'}
                        iconColor={'white'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        labelStyle={{ color: 'white' }}
                        inputStyle={{ color: 'white' }}
                        style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10 }}
                        onChangeText={(text) => onChangeNewPass(text)}
                        secureTextEntry={showPass2}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={() => { setShowPass2(!showPass2) }}>
                        <Ionicon name={showPass2 ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255,255,255,0.7)'}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.text}>Xác nhận mật khẩu</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Fumi
                        label={'Nhập lại mật khẩu mới'}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={'white'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        labelStyle={{ color: 'white' }}
                        inputStyle={{ color: 'white' }}
                        style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10 }}
                        onChangeText={(text) => setConfirm(text)}
                        secureTextEntry={showPass3}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={() => { setShowPass3(!showPass3) }}>
                        <Ionicon name={showPass3 ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255,255,255,0.7)'}
                        />
                    </TouchableOpacity>

                </View>
                <Text style={styles.text}>Yêu cầu mật khẩu</Text>
                <View style={{ marginLeft: 20 }}>


                    
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
                <View style={styles.myButtonContainer}>
                    <TouchableOpacity onPress={changePass} style={layoutButton} disabled={disabled}>
                        <View style={styles.myButtonLogOut}>
                            <Text style={styles.appButtonText}>Cập nhật</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 10,
        marginHorizontal: 10
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 10,
        fontSize: 20,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,1)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    text: {
        color: 'rgba(255,255,255,1)',
        fontSize: 20,

        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 25,
    },
    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        marginTop: 0
        // backgroundColor:'red'
    },
    appButtonContainerLogOut: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    appButtonContainerLogOut_Dis: {
        elevation: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    myButtonLogOut: {
        alignItems: 'center',
        // marginTop:10,

    },
    btnEye: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    requirePass: {
        flexDirection: 'row'
    },
    textRequirePass: {

    }
});