import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text_Size, URL, ScreenKey } from '../../../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
export default function Repair(props) {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('123');
    const [token, setToken] = useState('');
    const [apartId, setApartId] = useState();
    const [image, setImage] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [contact, setContact] = useState('');
    const { arrImage } = props.route.params;


    const getData = async () => {

        try {

            const _token = await AsyncStorage.getItem('token');
            const _userId = await AsyncStorage.getItem('infoUser');
            const _apartId = await AsyncStorage.getItem('apartId');

            if (_token !== null && _userId !== null) {

                const _tokenObject = JSON.parse(_token);
                const _userIdObject = JSON.parse(_userId);
                const _apartIdObJect = JSON.parse(_apartId)
                // console.log(userId+" "+token+" "+apartId);
                setUserId(_userIdObject.id);
                setToken(_tokenObject);
                setApartId(_apartIdObJect);
            }

        } catch (e) {
            // error reading value
        }
    }
    const sendImage = async (nameImage, extension, path, keyImage) => {

        const res = await fetch(URL + `api/uploadv2/signed-url?fileName=${nameImage}&extension=${extension}&mediaType=image`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        console.log("STATUS_1", res.status);
        if (res.status === 200) {
            // var body = new FormData();
            // body.append('file', imageBase64);
            const result = await res.json()
            keyImage.push(result.key);
            const localFile = await fetch(path);
            // then create a blob out of it (only works with RN 0.54 and above)
            const fileBlob = await localFile.blob();

            // then send this blob to filestack
            const serverRes = await fetch(`${result.uploadUrl}`, { // Your POST endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': fileBlob && fileBlob.type,
                },
                body: fileBlob, // This is your file object
            });
            console.log("STATUS_2", serverRes.status);
        }
    }
    const saveDb = async (keyImage) => {
        setSpinner(false);
        const res = await fetch(URL + `api/post/create`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user_id:userId,
                title:topic,
                content:content,
                contact:contact,
                images:keyImage
            })
        })
        
        if(res.status===200){
            const result=await res.json();
            console.log("RESULT ",result);
            Alert.alert('Thông báo', 'Đăng bài thành công.Chờ quản lý duyệt',
            [
              { text: "OK" }
            ]);
        }
        else{
            Alert.alert('Thông báo', 'Máy chủ đang bảo trì',
            [
              { text: "OK" }
            ]);
        }



    }
    const checkTextInput = async () => {
        //Check for the Name TextInput
        if (!topic.trim()) {
            Alert.alert('Thông báo', 'Chủ đề không được trống');
            return;
        }
        //Check for the Email TextInput
        if (!content.trim()) {
            Alert.alert('Thông báo', 'Nội dung không được trống');
            return;
        }
        if (!contact.trim()) {
            Alert.alert('Thông báo', 'Liên hệ không được trống');
            return;
        }
        else {
            setSpinner(true);
            const keyImage = []
            if(image!==null){
                for (let temp of image) {
                    var filename = temp.path.replace(/^.*[\\\/]/, '')
                    const nameimage = filename.split('.');
                    var extension = temp.mime.replace(/^.*[\\\/]/, '');
                    await sendImage(nameimage[0], extension, temp.path, keyImage)
                }
                await saveDb(keyImage);
            }
            else{
                await saveDb(keyImage);
            }
           
        }
    };

    useEffect(() => {
        if (arrImage.length === 0) {
            setImage(null);
        }
        else {
            setImage(arrImage);
        }
        getData();
    }, [props.route.params?.arrImage])
    const renderAsset = (image) => {
        return (
            <View style={{marginLeft:10}}>
            <Image
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                source={image}
            />
             </View>
        );
    }
    const hanldeChooseImage = () => {
        props.navigation.navigate(ScreenKey.ChooseManyImage)
    }

    return (

        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../../image/bgPost.jpg')}>
            <ScrollView>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles._title}>
                    <Text style={styles._text_title} >Tạo bài mới</Text>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text2}>Tiêu đề</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input2}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => setTopic(text)}
                            multiline
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text2}>Mô tả</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input2}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            multiline
                            onChangeText={(text) => setContent(text)}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text2}>Liên hệ</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input2}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            multiline
                            onChangeText={(text) => setContact(text)}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.button_image}>
                        <Button
                            onPress={hanldeChooseImage}
                            title="Chọn ảnh"
                            color="#841584"
                        />
                    </View>
                </View>
                {image !== null &&
                    (<ScrollView horizontal={true}>
                        {image.map((i) => renderAsset(i))}
                        {/* {image ? renderAsset(image) : null} */}
                    </ScrollView>)}

                <TouchableOpacity onPress={checkTextInput} style={styles.appButtonContainer}>
                    <View style={styles.myButtonLogOut}>

                        <Text style={styles.appButtonText}>Gửi</Text>

                    </View>
                </TouchableOpacity>

            </ScrollView>
        </ImageBackground>

    )


}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 10,

    },
    button_image: {
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 10,

        // justifyContent:'center'

    },
    text: {
        color: 'rgba(206, 0, 255, 1)',
        fontSize: 20,

        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 25,

    },
    text2: {
        color: 'rgba(72, 100, 106, 1)',
        fontSize: 20,

        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 25,

    },
    inputContainer: {
        marginTop: 10
    },

    input2: {
        width: WIDTH - 55,
        // height: 45,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 0.5,
        backgroundColor: ' rgba(255, 255, 255, 0.3)',
        color: 'rgba(66, 100, 59, 1)',
        marginHorizontal: 25
    },
    appButtonContainer: {
        // elevation: 8,
        backgroundColor: "rgba(46, 142, 45, 0.8)",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 10,
        marginHorizontal: 10
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    badgeIconView: {
        position: 'relative',
        padding: 5
    },
    badge: {
        color: '#fff',
        position: 'absolute',
        zIndex: 10,
        top: 1,
        right: 1,
        padding: 1,
        backgroundColor: 'red',
        borderRadius: 5
    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "rgba(46, 142, 45, 0.8)",
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

});