import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, BackHandler, Alert, Linking,Dimensions } from 'react-native';
// import { Cloudinary } from '@cloudinary/base';

import { URL, Text_Size } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements'
import { SliderBox } from "react-native-image-slider-box";
import { ImageBackground } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
// const cld = new Cloudinary({
//     cloud: {
//         cloudName: 'datnqlcc'
//     },
//     url: {
//         secure: true // force https, set to false to force http
//     }
// });
export default function NotifyDetailManage(props) {
    const [statusImage, setStatusImage] = useState(true);
    const [_image, setImage] = useState('');
    const [statusLink, setStatusLink] = useState(true);
    const { title, content, create_date, image, link, token, userId, notice_id } = props.route.params;
    const getImage = async () => {
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
            setImage(result.imageUrl);
        }

    }
    useEffect(() => {
        if (image === '') {
            setStatusImage(false);
        }
        else {
            getImage();
        }

        if (link === '') {
            setStatusLink(false);
        }
        else {
            setStatusLink(true);
        }
        const backAction = () => {
            props.navigation.navigate(ScreenKey.NotifyManage)
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();

    }, [])

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/bgDetail.jpg')}>
            <ScrollView style={styles.container}>

                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={styles.icon_title}>
                            <Icon name='topic'
                                type='material'
                                color='#e74c3c'
                                size={30}
                            />
                            <Text style={styles.text}>Chủ đề</Text>
                        </View>
                        {/* <Text style={styles.text}>{status}</Text> */}
                    </View>

                    <Text style={styles.text_input}>{title}</Text>

                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='content-paste'
                            type='material-community'
                            color='#9b59b6'
                            size={30}
                        />
                        <Text style={styles.text}>Nội dung</Text>
                    </View>

                    <Text style={styles.text_input}>{content}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='date'
                            type='fontisto'
                            color='#34495e'
                            size={25}
                        />
                        <Text style={styles.text}>Ngày đăng</Text>
                    </View>

                    <Text style={styles.text_input}>{create_date}</Text>
                </View>

                {statusLink && (
                    <View style={{ marginTop: 30 }}>
                        <View style={styles.icon_title}>
                            <Icon name='article'
                                type='material'
                                color='#3498db'
                                size={25}
                            />
                            <Text style={styles.text}>Bài viết</Text>
                        </View>

                        <Text style={styles.text_input} onPress={() => Linking.openURL(`${link}`)}>{link}</Text>
                    </View>)}
                <View style={{ marginTop: 30 }}>
                    {statusImage && (
                        <View style={styles.icon_title}>
                            <Icon name='image'
                                type='font-awesome'
                                color='#f1c40f'
                                size={25}
                            />
                            <Text style={styles.text}>Hình ảnh</Text>
                        </View>)}

                    
                </View>
                {/* <Image cloudName="datnqlcc" publicId="datn-qlcc/gookgudncaqq6i28ez1s" width="300" crop="scale"/> */}

                <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={300}
                        imageWidth={300}
                        imageHeight={300}
                        enableCenterFocus={true}>
                            
                        <Image style={{ width: 300, height: 300 }}
                            source={{uri:`${_image}`}} />
                    </ImageZoom>

            </ScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10

    },
    icon_title: {
        flexDirection: 'row',
        // paddingTop: 10,
        elevation: 8

    },
    button_image: {
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 10
        // justifyContent:'center'

    },
    text: {
        color: '#1abc9c',
        fontSize: Text_Size.Text,
        marginTop: 2,
        marginLeft: 5,
    },
    text_status: {
        marginTop: 20,
        paddingTop: 10
    },
    text_input: {
        color: '#34495e',
        fontSize: Text_Size.Text,
        marginTop: 10,
        borderColor: '#2ecc71',
        borderBottomWidth: 0.3


    },
    button: {
        // marginLeft:10,
        // marginRight:10
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
});