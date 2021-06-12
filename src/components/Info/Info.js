import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, ImageBackground, Button, ScrollView, Modal } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, Text_Size } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider, } from 'react-native-popup-menu';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
const window = Dimensions.get('window');
export default function Info(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nativePlace, setNativePlace] = useState('');
    const [address, setAddress] = useState('');
    const [apartId, setApartId] = useState();
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [identify_card, setIndetify_card] = useState('');
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [avt, setAvt] = useState('https://i.pinimg.com/originals/82/e4/12/82e412763fb611b0a8eaf28b58da0856.jpg');
    const [keyAvt,setKeyAvt]=useState();
       const [spinner, setSpinner] = useState(false);

    const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                var filename = image.path.replace(/^.*[\\\/]/, '')
                const nameimage = filename.split('.');
                var extension = image.mime.replace(/^.*[\\\/]/, '');
                sendImage(nameimage[0], extension, image.path);
            })
            .catch((e) => alert(e));
    }
    const pickSingle = (cropit, circular = false, mediaType) => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperStatusBarColor: 'white',
            cropperToolbarColor: 'white',
            cropperActiveWidgetColor: 'white',
            cropperToolbarWidgetColor: '#3498DB',
            // includeBase64:true
        })
            .then((image) => {
                var filename = image.path.replace(/^.*[\\\/]/, '')
                const nameimage = filename.split('.');
                var extension = image.mime.replace(/^.*[\\\/]/, '');
                sendImage(nameimage[0], extension, image.path);



            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    }
    const sendImage = async (nameImage, extension, path) => {

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
            if (serverRes.status === 200) {
                const res_2 = await fetch(URL + `api/auth/update-avatar`, {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + `${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        avatar: result.key
                    }),
                })
                storeData(result.key);
                setKeyAvt(result.key);
                console.log("STATUS_3", res_2.status);

            }
        }
    }
    const getImage = async (image) => {
        const res = await fetch(URL + `api/uploadv2/image-url?key=${image}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            console.log("URL ", result.imageUrl);
            setAvt(result.imageUrl);
        }
    }
    const getInfoApart = async () => {
        const res = await fetch(URL + `api/apart/${apartId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },

        })

        setSpinner(false);
        if (res.status === 200) {
            const result = await res.json();
            const res_1 = await fetch(URL + `api/block/${result.data.block}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + `${token}`,
                    'Content-Type': 'application/json',
                },

            })
            const result_1 = await res_1.json();
            if (res_1.status === 200) {
                setAddress("toà " + result_1.data.name + " số nhà " + result.data.name);
            }
            else {
                setAddress('Chưa có thông tin')
            }

        }


    }
    const getData = async () => {
        try {
            const infoUser = await AsyncStorage.getItem('infoUser');
            const token = await AsyncStorage.getItem('token');
            const apartId = await AsyncStorage.getItem('apartId');
            const avt1 = await AsyncStorage.getItem('avt');

            if (infoUser != null) {
                const _infoUser = JSON.parse(infoUser);
                const _token = JSON.parse(token);
                const _apartId = JSON.parse(apartId);
                const _avt = JSON.parse(avt1);
                await setApartId(_apartId);
                await setToken(_token);
                setName(_infoUser.name);
                setEmail(_infoUser.email);
                setPhone(_infoUser.phone);
                setNativePlace(_infoUser.native_place);
                setUserId(_infoUser.id);
                setIndetify_card(_infoUser.identify_card);
                setFlag(false);
                setKeyAvt(_avt);
                getImage(_avt);


            }
            else {
                console.log("else else");
            }

        } catch (e) {
            // error reading value
        }
    }

    const storeData = async (avatar) => {
        try {
            const jsonAvatar = JSON.stringify(avatar);
            await AsyncStorage.setItem('avt', jsonAvatar);
        } catch (e) {
            // saving error
        }
    }

    useEffect(() => {
        getImage(keyAvt);
    }, [modalVisible])
    useEffect(() => {
        setSpinner(true);
        getData();
        getInfoApart();
        setFlag2(false);

        const unsubscribe = props.navigation.addListener('focus', () => {
            setSpinner(true);
            getData();
            getInfoApart();
            setFlag2(false);
        });

        return unsubscribe;




    }, [flag, flag2, props.navigation])
    const deleteAsync = async () => {
        try {

            AsyncStorage.clear();

        } catch (e) {
            // error reading value
        }
    }
    const handleLogout = () => {
        deleteAsync();
        props.navigation.navigate(ScreenKey.SignIn);
    }
    const handleUpdateInfo = () => {
        props.navigation.navigate(ScreenKey.ChangeInfo, {
            user_id: userId,
            name: name,
            email: email,
            phone: phone,
            identify_card: identify_card,
            native_place: nativePlace,
            token: token
        });
    }
    const handleChangePass = () => {
        props.navigation.navigate(ScreenKey.ChangePass, {
            user_id: userId,

            token: token
        });
    }
    const changeApart = () => {
        props.navigation.navigate(ScreenKey.ChooseApart, {
            token: token,
            userId: userId
        })
    }


    return (
        <MenuProvider style={{ flex: 1 }}>
            <ScrollView>
                <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
                    <Spinner
                        visible={spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >

                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>

                                <Text style={styles.modalText}>Chọn ảnh từ:</Text>
                                <TouchableOpacity onPress={() => pickSingleWithCamera(false)}>


                                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                        <Icon name='camera'
                                            type='evilicon'
                                            color='#3498db'
                                            size={30}
                                            style={{ marginTop: 7 }}
                                        />
                                        <Text style={styles.textModal}>Chụp ảnh mới</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => pickSingle(false)}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                        <Icon name='image'
                                            type='evilicon'
                                            color='#d35400'
                                            size={30}
                                            style={{ marginTop: 7 }}
                                        />
                                        <Text style={styles.textModal}>Chọn ảnh có sẵn</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                        <Icon name='arrow-left'
                                            type='evilicon'
                                            color='#3498db'
                                            size={30}
                                            style={{ marginTop: 7 }}
                                        />

                                        <Text style={styles.textModal}>Thoát</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                    {/* <View style={styles._title}>
                <Text style={styles._text_title} >Thông tin cá nhân</Text>
            </View> */}
                    <View style={styles.container1} >
                        <View style={styles.background} >
                            {/* <Image style={styles.image} source={require('../../../image/sea.jpg')} /> */}
                            <ImageBackground source={require('../../../image/sea.jpg')} style={styles.image}>
                                <Text style={styles.text1} adjustsFontSizeToFit>Thông tin cá nhân</Text>
                            </ImageBackground>
                        </View>

                        <View style={{ flexDirection: 'row-reverse' }}>

                            <Menu>
                                <MenuTrigger style={{ fontSize: 20 }}>
                                    <Icon name='dots-three-horizontal'
                                        type='entypo'
                                        color='black'
                                        size={30}
                                    />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption  >
                                        <TouchableOpacity onPress={changeApart} >
                                            <View style={{ borderBottomWidth: 0.5, padding: 10 }}>
                                                <Text style={styles.textMenu}>Thay đổi căn hộ</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                    <MenuOption>
                                        <TouchableOpacity onPress={handleUpdateInfo} >
                                            <View style={{ borderBottomWidth: 0.5, padding: 10 }}>
                                                <Text style={styles.textMenu}>Cập nhật thông tin</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                    <MenuOption>
                                        <TouchableOpacity onPress={handleChangePass} >
                                            <View style={{ borderBottomWidth: 0.5, padding: 10 }}>
                                                <Text style={styles.textMenu}>Thay đổi mật khẩu</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                    <MenuOption>
                                        <TouchableOpacity onPress={handleLogout} >
                                            <View style={{ padding: 10 }}>
                                                <Text style={styles.textMenu}>Đăng xuất</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>

                                </MenuOptions>
                            </Menu>

                        </View>
                    </View>
                    <Avatar
                        size={100}
                        rounded
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.7}
                        containerStyle={{ flexDirection: 'row', alignSelf: 'center', zIndex: 2, position: 'absolute', marginTop: window.width / 3, }}
                        source={{
                            uri: `${avt}`,
                        }}
                    >
                        <Avatar.Accessory name="pencil-alt"
                            type="font-awesome-5"
                            size={25} />



                    </Avatar>
                    <View style={styles.container}>
                        <View style={styles._row}>
                            <Icon name='user'
                                type='feather'
                                color='#f1c40f'
                                size={30}
                            />
                            <Text style={styles.text} >Họ tên</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                        <Text style={styles.text_info}>{name}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles._row}>
                            <Icon name='email'
                                type='fontisto'
                                color='#e74c3c'
                                size={30}
                            />
                            <Text style={styles.text}>Email</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                        <Text style={styles.text_info}>{email}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles._row}>
                            <Icon name='phone-call'
                                type='feather'
                                color='#3498db'
                                size={30}
                            />
                            <Text style={styles.text}>Điện thoại</Text>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                        <Text style={styles.text_info}>{phone}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles._row}>
                            <Icon name='v-card'
                                type='entypo'
                                color='rgba(169, 76, 122, 0.9)'
                                size={30}
                            />
                            <Text style={styles.text}>CMND/Căn cước</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                        <Text style={styles.text_info}>{identify_card}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles._row}>
                            <Icon name='island'
                                type='fontisto'
                                color='#2ecc71'
                                size={30}
                            />
                            <Text style={styles.text}>Quê Quán</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                        <Text style={styles.text_info}>{nativePlace}</Text>
                    </View>

                    <View style={styles.container}>
                        <View style={styles._row}>
                            <Icon name='building-o'
                                type='font-awesome'
                                color='#1abc9c'
                                size={30}
                            />
                            <Text style={styles.text}>Địa chỉ</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={styles.text_info}>{address}</Text>
                    </View>
                    <View style={styles.myButtonContainer}>
                        {/* <View style={styles.rowButton}>
                            <TouchableOpacity onPress={changeApart} style={styles.appButtonContainer}>
                                <View style={styles.myButton}>
                                    <Text style={styles.appButtonText}>Thay đổi căn hộ</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleUpdateInfo} style={styles.appButtonContainer}>
                                <View style={styles.myButton}>
                                    <Text style={styles.appButtonText}>Cập nhật thông tin</Text>
                                </View>
                            </TouchableOpacity>
                        </View> */}


                        {/* <TouchableOpacity onPress={handleLogout} style={styles.appButtonContainerLogOut}>
                            <View style={styles.myButtonLogOut}>
                                <Text style={styles.appButtonText}>Đăng xuất</Text>
                            </View>
                        </TouchableOpacity> */}

                    </View>
                </ImageBackground>
            </ScrollView>
        </MenuProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // justifyContent: 'space-between',
        margin: 5
    },
    _row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textMenu: {
        color: 'black', fontSize: 17
    },
    text: {
        fontSize: Text_Size.Text,
        color: 'rgba(0, 0, 0, 0.7)',
        marginLeft: 10,

    },
    text_info: {
        fontSize: Text_Size.Text,
        color: 'rgba(0, 0, 0, 0.7)',
        marginTop: 5,
        flexWrap: 'wrap'


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
    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        // backgroundColor:'red'
    },
    myButton: {
        alignItems: 'center',
        // marginTop:10,

    },
    myButtonLogOut: {
        alignItems: 'center',
        // marginTop:10,

    },
    myText: {
        fontSize: Text_Size.Text,

    },
    rowButton: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 10
    },





    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    appButtonContainerLogOut: {
        elevation: 8,
        backgroundColor: "#e74c3c",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    container1: {

        alignSelf: 'center',
        width: window.width,
        overflow: 'hidden',
        height: window.width / 2,
        zIndex: 1
    },
    background: { // this shape is a circle 
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    image: {
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
        backgroundColor: '#9DD6EB'
    },
    text1: {
        marginTop: window.height / 9.5,
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        // backgroundColor: "#000000a0"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    // modalText: {
    //     marginBottom: 15,
    //     textAlign: "center"
    // },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 5,
        marginTop: 10
    },
    textModal: {
        marginTop: 10,
        fontSize: 16
    }

});