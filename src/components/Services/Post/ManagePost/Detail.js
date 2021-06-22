import React, { useEffect, useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScreenKey, URL, notifyBillContext } from '../../../../globals/constants'
import { SliderBox } from "react-native-image-slider-box";
export default function DetailManage(props) {
    const { create_date, item, token } = props.route.params;
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
    const deletePost = async () => {
        const res = await fetch(URL + `api/post/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: item._id
            })
        })
        console.log("STATUS DELETE ", res.status);
        if (res.status === 200) {
            Alert.alert(
                "Thông báo",
                "Bài viết đã xóa",
                [
                    { text: "OK", onPress: () => {props.navigation.navigate(ScreenKey.MainManage)} }
                ]
            );

        }
        else{
            Alert.alert(
                "Thông báo",
                "Vui lòng thử lại sau"
              
            );
        }
    }

    const handleDelete = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có muốn xóa bài viết không?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),

                },
                { text: "OK", onPress: () => {deletePost();} }
            ]
        );
    }
    return (

        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/bgPost.jpg')}>
            <ScrollView>
                <View style={styles.container1} >
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={styles.sumPrice}>{create_date} </Text>
                        <Text style={styles.text}>{item.title} </Text>
                        <Text style={styles.text}>{item.content} </Text>
                        <Text style={styles.text}>Vui lòng liên hệ sdt: {item.contact} để biết thêm chi tiết</Text>
                    </View>
                 
                </View>
                <SliderBox resizeMode='contain' images={_image} />
                <View style={styles.rowButton}>

                    <TouchableOpacity style={[styles.appButtonContainer, { backgroundColor: 'red' }]} onPress={handleDelete}>

                        <Text style={styles.appButtonText}>Xóa bài viết</Text>

                    </TouchableOpacity>
                </View>
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
});
