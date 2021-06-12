import React, { useEffect, useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { Avatar } from 'react-native-elements';
import { ScreenKey, URL, notifyBillContext } from '../../../../globals/constants'
import { SliderBox } from "react-native-image-slider-box";
function ItemParking(props) {
    const [create_date, setCreate_date] = useState();
    const [nameUser, setNameUser] = useState("");
    const [avt,setAvt]=useState();
    const [_image, setImage] = useState([])
    const getName = async () => {
        const res = await fetch(URL + `api/auth/user/${props.item.user_id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${props.token}`,
                'Content-Type': "application/json",
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            setNameUser(result.data.name);
            getImage(result.data.avatar,2);
        }
    }
    const getImage = async (image,type) => {
        const res = await fetch(URL + `api/uploadv2/image-url?key=${image}`, {
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
            if(type===1){
                setImage(arrImage);
            }
            else{
                setAvt(result.imageUrl)
            }
          
        }
    }

    useEffect(() => {
        var date = new Date(props.item.create_date);
        setCreate_date(date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() + ":" + date.getSeconds());
        getName();
        getImage(props.item.images[0],1);
    }, [props.item.create_date])
    const handleDetail = () => {
        props.navigation.navigate(ScreenKey.DetailPost, {
            item: props.item,
            create_date,
            nameUser,
            token: props.token,
            avt
        })
    }
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.container1} onPress={handleDetail}>

                <View style={{ flexDirection: 'column', justifyContent: 'space-between',paddingHorizontal: 15 }}>
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
                    <Text style={styles.text}>{props.item.title} </Text>
                </View>
                <SliderBox resizeMode='contain' images={_image} />
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'column',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        // padding: 8,
        paddingVertical: 14,
        // paddingHorizontal: 15,
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