import React, { useState } from 'react'
import { Rating } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import {URL} from '../../../../../globals/constants'
const { width: WIDTH } = Dimensions.get('window')
export default function Rate(props) {
    // const {token,notice_id}=props.route.params;
    
    const [comment, setComment] = useState('');
    const [islike, setIslike] = useState();

    const sendData=async()=>{
        console.log(comment);
        console.log(islike);
        // console.log(token);
        // console.log(notice_id);
        // const res = await fetch(URL + `api/repair/user/update-evaluation`, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: 'Bearer ' + `${token}`,
        //         'Content-Type': "application/json",
        //     },
        // })
        // setSpinner(false);
        // if (res.status === 200) {
        //     const result = await res.json();
        //     console.log("RESULT da xac nhan ",result.data)
        //     setData(result.data);
        // }
    }


    const ratingCompleted = (rating) => {
        // console.log("Rating is: " + rating)
        if (rating < 3)
            setIslike(false);
        else
            setIslike(true)
    }
    const handleRate=()=>{
        sendData();
    }
    return (
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles._title}>
                <Text style={styles._text_title} >Đánh giá dịch vụ</Text>
            </View>
            <View style={styles.boxtext}>
                <Text style={styles.intro}>Cám ơn bạn đã sử dụng dịch vụ của chúng tôi! Mời bạn đánh giá chất lượng</Text>
            </View>

            <Rating
                showRating
                onFinishRating={ratingCompleted}
                style={{ paddingVertical: 10, marginTop: 20 }}
            />
            <View>
                <Text style={styles.text2}>Nội dung đánh giá</Text>

                <TextInput
                    style={styles.input2}
                    placeholderTextColor={' rgba(109, 47, 188, 0.6)'}
                    underlineColorAndroid='transparent'
                    multiline
                    onChangeText={(text) => setComment(text)}
                />
                <TouchableOpacity style={styles.appButtonContainer} onPress={handleRate} >
                    <View style={styles.myButton}>
                        <Text style={styles.appButtonText}>Đánh giá</Text>
                    </View>
                </TouchableOpacity>
            </View>



        </ScrollView>
    )
}
const styles = StyleSheet.create({
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
    intro: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(155, 0, 0, 0.6)'
    },
    boxtext: {
        marginTop: 10,
        marginHorizontal: 5
    },
    input2: {
        width: WIDTH - 55,
        // height: 45,
        borderRadius: 10,
        fontSize: 16,

        backgroundColor: '  rgba(91, 89, 163, 0.4)',
        color: 'rgba(72, 100, 106, 1)',
        marginHorizontal: 25,
        marginTop: 10

    },
    text2: {
        color: 'rgba(72, 100, 106, 1)',
        fontSize: 20,

        fontWeight: 'bold',
        marginTop: 50,
        marginHorizontal: 25,

    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 100,
        marginHorizontal: 10
    },
    myButton: {
        alignItems: 'center',
        // marginTop:10,

    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        paddingVertical:5

    },

})

