import React, { useEffect, useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScreenKey, URL, notifyBillContext } from '../../../../globals/constants'
import { SliderBox } from "react-native-image-slider-box";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider, } from 'react-native-popup-menu';
function ItemParking(props) {
    const [create_date, setCreate_date] = useState();
    const [status, setStatus] = useState('')
    const [_image, setImage] = useState([])
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
            setImage(arrImage);
        }
    }
    const deletePost = async () => {
        const res = await fetch(URL + `api/post/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + `${props.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: props.item._id
            })
        })
        console.log("STATUS DELETE ", res.status);
        if (res.status === 200) {
            const result = await res.json();

        }
    }

    useEffect(() => {
        var date = new Date(props.item.create_date);
        setCreate_date(date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() + ":" + date.getSeconds());

        getImage();
        if (props.item.status === 0) {
            setStatus("Chờ duyệt");
        }
        else if (props.item.status === 1)
            setStatus("Đã duyệt");
        else{
            setStatus('Không duyệt')
        }
          
    }, [props.item.create_date])
    const handleDetail = () => {
        props.navigation.navigate(ScreenKey.DetailManage, {
            item: props.item,
            create_date,
            token: props.token
        })
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
                { text: "OK", onPress: () => { deletePost(); props.handleRefesh(); console.log("OK") } }
            ]
        );
    }

    return (
        <MenuProvider style={{ flex: 1, borderBottomWidth:1}}>
            <View style={styles.container1}>
                <TouchableOpacity onPress={handleDetail}>
                    <View style={{ flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.sumPrice}>{create_date} </Text>
                                <Text style={{ fontSize: 16 }}>({status})</Text>
                            </View>
                            <TouchableOpacity onPress={handleDelete}>
                                <Text style={{ fontSize: 18, color: 'red' }}>Xóa </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>{props.item.title} </Text>

                    </View>

                </TouchableOpacity>
                
            </View>
            <SliderBox resizeMode='contain' images={_image} />
        </MenuProvider>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'column',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        padding: 8,
        paddingVertical: 14,
        paddingHorizontal: 15,
        elevation: 3,
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
export default React.memo(ItemParking);