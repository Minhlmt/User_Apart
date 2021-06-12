import React, { useEffect, useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView,ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScreenKey, URL, notifyBillContext } from '../../../../globals/constants'
import { SliderBox } from "react-native-image-slider-box";
import { Avatar } from 'react-native-elements';
export default function DetailPost(props) {
    const { create_date, nameUser, item, token,avt } = props.route.params;
    const [_image, setImage] = useState([])
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
            // console.log("URL ", result.imageUrl);
            setImage(oldArray => [...oldArray, result.imageUrl]);
        }
        else {
            setImage([]);
        }
    }

    useEffect(() => {
        for (let temp of item.images) {
            getImage(temp)
        }

    }, [])

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/bgBlue.jpg')}>
            <ScrollView>
                <View style={styles.container1} >
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Avatar
                            size={50}
                            rounded
                            activeOpacity={0.7}
                            containerStyle={{marginRight:10}}
                            source={{
                                uri:`${avt}`,
                            }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.textUser}>{nameUser}</Text>
                            <Text style={styles.sumPrice}>{create_date} </Text>
                        </View>
                    </View>
                        <Text style={styles.text}>{item.title} </Text>
                        <Text style={styles.text}>{item.content} </Text>
                        <Text style={styles.text}>Vui lòng liên hệ sdt: {item.contact} để biết thêm chi tiết</Text>
                    </View>
                  
                </View>
                <SliderBox resizeMode='contain' images={_image} />
            </ScrollView>
        </ImageBackground>

    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'column',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginTop: 10,
        padding: 8,
        paddingVertical: 14,
        paddingHorizontal: 15,

        justifyContent: 'space-between'


    },
    text: {

        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 5,
        fontSize: 18
    },
    status_done: {
        color: 'red'
    },
    status_false: {
        color: 'red'
    },
    sumPrice: {
        color: '#800000'
    },
    textUser: {
        color: '#2980b9',
        fontSize: 16
    }
});
