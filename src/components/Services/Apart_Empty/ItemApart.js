import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScreenKey, URL } from '../../../globals/constants'
import { Icon } from 'react-native-elements'
import { SliderBox } from "react-native-image-slider-box";
export default function ItemApart(props) {
    const [_image, setImage] = useState(['https://i.pinimg.com/originals/9a/7a/6f/9a7a6f2b9c7b8433e7c947fb38d4f067.jpg'])
    const getImage = async () => {
        const res = await fetch(URL + `api/uploadv2/image-url?key=${props.item.images[0]}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${props.token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            let arrImage = [];
            arrImage.push(result.imageUrl);
            console.log("URL ", result.imageUrl);
            setImage(arrImage);
        }
    }
    useEffect(() => {

        getImage();
    }, [])


    const handleClick = () => {
        props.navigation.navigate(ScreenKey.DetailApart_Empty, {
            item: props.item,
            token: props.token
        })
    }
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={styles.container2}>


                <TouchableOpacity style={styles.container1} onPress={handleClick}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='home'
                            type='font-awesome'
                            color='blue'
                            size={30}
                        />
                        
                        <Text style={[styles.text, { color: 'blue' ,marginTop:5}]}>Căn hộ: {props.item.name} - </Text>
                       
                        <Text style={[styles.text,{marginTop:5}]}>{props.item.area} m2</Text>
                    </View>
                </TouchableOpacity>
                <SliderBox resizeMode='contain' images={_image} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'column',
        backgroundColor: "rgba(255, 255, 255, 0.2)",


        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,



    },
    container2: {
        flexDirection: 'column',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',

        borderTopWidth: 2,
        marginBottom: 20,
        borderColor: '#3498db',

        elevation: 2,
    },
    text: {

        color: 'red',
        marginBottom: 10,
        fontSize: 20
    },
    status_wait: {
        fontSize: 12,
        color: '#e74c3c',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 0.3,
        textShadowColor: '#c0392b'
    },
    status: {
        fontSize: 12,
        color: '#f1c40f',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 0.3,
        textShadowColor: '#f1c40f'
    },
    status_done: {
        fontSize: 12,
        color: '#2ecc71',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 0.3,
        textShadowColor: '#2ecc71'
    },
});