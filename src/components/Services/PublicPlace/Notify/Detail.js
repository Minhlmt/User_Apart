import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
// import { Cloudinary } from '@cloudinary/base';
import { URL, Text_Size } from '../../../../globals/constants'
import { Resize } from '@cloudinary/base/actions/resize';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements'
import { SliderBox } from "react-native-image-slider-box";
export default function NotifyDetailRepair(props) {
    const { item, create_date, token } = props.route.params;
    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);
    const [createDate, setCreateDate] = useState(create_date);
    const [dateOrganization, setDateOrganization] = useState();
    // const [_image, setImage] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [status, setStatus] = useState();
    const [statusImage, setStatusImage] = useState(true);
    const [namePlace, setNamePlace] = useState();
    const [reason, setReason] = useState('');
    const [statusReason, setStatusReason] = useState();



    const getNamePlace = async () => {
        const res = await fetch(URL + `api/service/all-services?_id=${item.service_id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })
        if (res.status === 200) {
            const result = await res.json();

            setNamePlace(result.data[0].name)
        }
    }
    useEffect(() => {
        var date = new Date(item.date);
        setDateOrganization(date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear());
        getNamePlace();
        if (item.status === 0) {
            setStatus('Chờ duyệt');
            setStatusReason(false);
        }

        else if (item.status === 1) {
            setStatus('Đã duyệt');
            setStatusReason(false);
        }

        else {
            setStatus('Không duyệt');
            setStatusReason(true);
            setReason(item.reason);
        }

    }, [])

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/bgDetail.jpg')}>
            <ScrollView style={styles.container}>
                <View>
                    <Spinner
                        visible={spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={styles.icon_title}>
                            <Icon name='topic'
                                type='material'
                                color='#e74c3c'
                                size={30}
                            />
                            <Text style={styles.text}>Nơi tổ chức</Text>
                        </View>
                        <Text style={styles.textStaus}>{status}</Text>
                    </View>

                    <Text style={styles.text_input}>{namePlace}</Text>

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
                {statusReason && (
                    <View style={{ marginTop: 30 }}>
                        <View style={styles.icon_title}>
                            <Icon name='lead-pencil'
                                type='material-community'
                                color='blue'
                                size={30}
                            />
                            <Text style={styles.text}>Lý do</Text>
                        </View>

                        <Text style={styles.text_input}>{reason}</Text>
                    </View>
                )}
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='date'
                            type='fontisto'
                            color='#34495e'
                            size={25}
                        />
                        <Text style={styles.text}>Ngày đăng kí</Text>
                    </View>

                    <Text style={styles.text_input}>{createDate}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='date'
                            type='fontisto'
                            color='#f39c12'
                            size={25}
                        />
                        <Text style={styles.text}>Ngày tổ chức</Text>
                    </View>

                    <Text style={styles.text_input}>{dateOrganization}</Text>
                </View>


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
    textStaus: {
        color: 'white',
        fontSize: Text_Size.Text,
        marginTop: 2,
        marginLeft: 5,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        elevation: 8,
        backgroundColor: "green",
        shadowRadius: 15,
        shadowOffset: { width: 56, height: 13 },
        borderWidth: 0,
        borderRadius: 20,
        borderWidth:0,
        paddingHorizontal:10
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