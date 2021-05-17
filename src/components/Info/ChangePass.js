import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button, TextInput, Alert, Dimensions } from 'react-native';
import { Text_Size, URL } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH } = Dimensions.get('window')
export default function ChangeInfo(props) {
    const { user_id, token } = props.route.params;
    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirm, setConfirm] = useState();
    const [spinner, setSpinner] = useState(false);
  

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
                        onPress:() => props.navigation.navigate(ScreenKey.SignIn)
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
    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
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
                    iconColor={'#f95a25'}
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={16}
                    style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10 }}
                    onChangeText={(text) => setOldPass(text)}
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Text style={styles.text}>Mật khẩu mới</Text>
            </View>
            <View style={styles.inputContainer}>
                <Fumi
                    label={'Mật khẩu mới'}
                    iconClass={FontAwesomeIcon}
                    iconName={'unlock-alt'}
                    iconColor={'#f95a25'}
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={16}
                    style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10 }}
                    onChangeText={(text) => setNewPass(text)}
                    secureTextEntry={true}
                />

            </View>
            <View>
                <Text style={styles.text}>Xác nhận mật khẩu</Text>
            </View>
            <View style={styles.inputContainer}>
                <Fumi
                    label={'Nhập lại mật khẩu mới'}
                    iconClass={FontAwesomeIcon}
                    iconName={'lock'}
                    iconColor={'#f95a25'}
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={16}
                    style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10 }}
                    onChangeText={(text) => setConfirm(text)}
                    secureTextEntry={true}
                />

            </View>
            <View style={styles.myButtonContainer}>
                <TouchableOpacity onPress={changePass} style={styles.appButtonContainerLogOut}>
                    <View style={styles.myButtonLogOut}>
                        <Text style={styles.appButtonText}>Cập nhật</Text>
                    </View>
                </TouchableOpacity>
            </View>

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
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,

        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 25,
    },




    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
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
    myButtonLogOut: {
        alignItems: 'center',
        // marginTop:10,

    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
});