import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, ImageBackground, Button, ScrollView } from 'react-native';

import { URL, Text_Size } from '../../../globals/constants'
import { Icon } from 'react-native-elements'
import { SliderBox } from "react-native-image-slider-box";
export default function DetailApart(props) {
    const { name, area, direction, type, description,images } = props.route.params.item;
    const {token }=props.route.params;
    const [image, setImage] = useState([]);
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
            setImage(oldArray => [...oldArray, result.imageUrl]);
        }
        else {
            setImage([]);
        }
    }

    useEffect(()=>{
        for (let temp of images) {
            getImage(temp)
        }

    },[])
    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/bgDetail.jpg')}>
            <ScrollView style={styles.container}>

                <View>
                    {/* <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={styles.icon_title}>
                            <Icon name='home'
                                type='fontAwesome'
                                color='#e74c3c'
                                size={30}
                            />
                            <Text style={styles.text}>Nhà</Text>
                        </View>
                        {/* <Text style={styles.text}>{status}</Text> */}
                    </View>

                    <Text style={styles.text_input}>{name}</Text>

                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='square'
                            type='feather'
                            color='#9b59b6'
                            size={30}
                        />
                        <Text style={styles.text}>Diện tích</Text>
                    </View>

                    <Text style={styles.text_input}>{area} m2</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='direction'
                            type='entypo'
                            color='#34495e'
                            size={25}
                        />
                        <Text style={styles.text}>Hướng căn hộ</Text>
                    </View>

                    <Text style={styles.text_input}>{direction}</Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='apartment'
                            type='material'
                            color='#27ae60'
                            size={25}
                        />
                        <Text style={styles.text}>Loại căn hộ</Text>
                    </View>

                    <Text style={styles.text_input} >{type}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='filetext1'
                            type='antdesign'
                            color='#3498db'
                            size={25}
                        />
                        <Text style={styles.text}>Mô tả</Text>
                    </View>

                    <Text style={styles.text_input} >{description}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='folder-images'
                            type='entypo'
                            color='#3498db'
                            size={25}
                        />
                        <Text style={styles.text}>Hình ảnh</Text>
                    </View>

                    <SliderBox resizeMode='contain' images={image} />
                </View>
                <View style={{ marginTop: 30 }}>
                   
                         <Text style={styles.text_input1} >Để biết thêm chi tiết, vui lòng liên hệ với quản lý chung cư</Text>
                    </View>

                   
            



                {/* <Image cloudName="datnqlcc" publicId="datn-qlcc/gookgudncaqq6i28ez1s" width="300" crop="scale"/> */}



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
    text_input1: {
        color: '#34495e',
        fontSize: Text_Size.Text,
        marginTop: 10,
        borderColor: '#2ecc71',
        borderBottomWidth: 0.3,
        textDecorationLine:'underline'

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