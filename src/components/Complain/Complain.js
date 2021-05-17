import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenKey } from '../../globals/constants'
import { URL } from '../../globals/constants'
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
export default function Repair(props) {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('123');
    const [token, setToken] = useState('');
    const [nameImage, setNameImage] = useState();
    const [nameExtension, setNameExtension] = useState();
    const [extension, setExtension] = useState();
    const [image, setImage] = useState(null);
    
    const [imagePublic, setImagePublic] = useState();
    const { imageBase64, uri, width, height, path, mime,billId } = props.route.params;

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');


            if (token != null) {

                const _token = JSON.parse(token);



                setToken(_token);

            }

        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        var filename = path.replace(/^.*[\\\/]/, '')
        setNameExtension(filename);
        const nameimage = filename.split('.');

        setNameImage(nameimage[0])
        var extension = mime.replace(/^.*[\\\/]/, '');
        setExtension(extension);
        setImage({
            uri: uri,
            width: width,
            height: height,
            mime: mime,
        });
        getData();

    }, [props.route.params?.imageBase64])
    const handleSend = async () => {

        const res = await fetch(URL + `api/uploadv2/signed-url?fileName=${nameImage}&extension=${extension}&mediaType=image`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            // var body = new FormData();
            // body.append('file', imageBase64);
            const result = await res.json()
         
            let arrImage=[];
            let imageKey=result.key;
            arrImage.push(imageKey);


            const localFile = await fetch(path);

            // then create a blob out of it (only works with RN 0.54 and above)
            const fileBlob = await localFile.blob();
            console.log("FILEBlov", fileBlob);
            // then send this blob to filestack
            const serverRes = await fetch(`${result.uploadUrl}`, { // Your POST endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': fileBlob && fileBlob.type,
                },
                body: fileBlob, // This is your file object
            });
            if(serverRes.status===200){
                const res_2 = await fetch(URL + `api/all-bill/update-image`, {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + `${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                       bill_id:billId,
                       image:arrImage
                    }),
                })
                if(res_2.status===200){
                    Alert.alert('Thông báo', 'Khiếu nại thành công',
                    [
                      { text: "OK",onPress: ()=>props.navigation.navigate(ScreenKey.HomeService)}
                    ]);
                }
                else{
                    Alert.alert('Thông báo', 'Server đang bảo trì ! Vui lòng thử lại sau',
                    [
                      { text: "OK" ,onPress:()=>props.navigation.navigate(ScreenKey.HomeService)}
                    ]);
                }

            }
            console.log("RES_1 STATUS ", serverRes.status);

        }
    }
    const renderAsset = (image) => {

        return (<Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={image}
        />);
    }
    const hanldeChooseImage = () => {
        props.navigation.navigate(ScreenKey.ChooseImageHome)
    }

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
            <View style={styles._title}>
                <Text style={styles._text_title} >Khiếu nại</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <View style={styles.button_image}>
                    <Button
                        onPress={hanldeChooseImage}
                        title="Chọn ảnh"
                        color="#841584"
                    />
                </View>
                {image ? renderAsset(image) : null}
            </View>
            <TouchableOpacity onPress={handleSend} style={styles.appButtonContainer}>
                <View style={styles.myButtonLogOut}>

                    <Text style={styles.appButtonText}>Gửi</Text>

                </View>
            </TouchableOpacity>


        </ImageBackground>
    )


}
async function uploadToServer(sourceUrl) {
    // first get our hands on the local file

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
    input: {
        width: WIDTH - 55,
        // height: 45,
        borderRadius: 10,
        fontSize: 20,

        backgroundColor: ' rgba(255, 255, 255, 0.3)',
        color: 'rgba(206, 0, 255, 1)',
        marginHorizontal: 25
    },
    input2: {
        width: WIDTH - 55,
        // height: 45,
        borderRadius: 10,
        fontSize: 16,

        backgroundColor: ' rgba(255, 255, 255, 0.3)',
        color: 'rgba(72, 100, 106, 1)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },

    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 10,

    },





    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 30,
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

});