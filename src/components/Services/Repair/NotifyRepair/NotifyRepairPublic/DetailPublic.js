import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
// import { Cloudinary } from '@cloudinary/base';
import { URL, Text_Size } from '../.././../../../globals/constants'
import { Resize } from '@cloudinary/base/actions/resize';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements'
import { SliderBox } from "react-native-image-slider-box";
export default function NotifyDetailRepair(props) {
    const { item, create_date ,token} = props.route.params;
    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);
    const [createDate, setCreateDate] = useState(create_date);

    // const [_image, setImage] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [statusImage, setStatusImage] = useState(true);
    const [_image, setImage] = useState([])



    const fetchData = async () => {

      
        const res_1 = await fetch(URL + `api/uploadv2/image-url?key=${item.image}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res_1.status === 200) {
            const result_1 = await res_1.json();
            console.log("URL ", result_1.imageUrl);
            setImage(oldArray => [...oldArray, result_1.imageUrl]);
        }
    }
    useEffect(() => {
      
        if (item.image === '') {
            setStatusImage(false);
            
        }
        else {
            fetchData();
        }
        


    }, [])

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../../image/bgDetail.jpg')}>
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
                            <Text style={styles.text}>Chủ đề</Text>
                        </View>

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
                        <Text style={styles.text}>Ngày thông báo</Text>
                    </View>

                    <Text style={styles.text_input}>{createDate}</Text>
                </View>
                
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

                        <SliderBox resizeMode='contain' images={_image} />
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
    button: {
        // marginLeft:10,
        // marginRight:10
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
});