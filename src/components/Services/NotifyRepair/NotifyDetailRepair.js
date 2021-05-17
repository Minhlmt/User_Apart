import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image ,ImageBackground} from 'react-native';
// import { Cloudinary } from '@cloudinary/base';
import Item from '../../Home/Items/ItemNotification'
import { URL, Text_Size } from '../../../globals/constants'
// import { Resize } from '@cloudinary/base/actions/resize';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements'
// const cld = new Cloudinary({
//     cloud: {
//         cloudName: 'datnqlcc'
//     },
//     url: {
//         secure: true // force https, set to false to force http
//     }
// });
export default function NotifyDetailRepair(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [image, setImage] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [statusImage,setStatusImage]=useState(true);
    const { notice_id, token,status } = props.route.params;

    const fetchData = async () => {
        const res = await fetch(URL + `api/repair/${notice_id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
       
        setSpinner(false);
        if (res.status === 200) {
            const result = await res.json();
            setTitle(result.data.title);
            setContent(result.data.content);
            setCreateDate(result.data.create_date);
            if(result.data.image===''){
                setStatusImage(false);
            }
            else{
                const res_1 = await fetch(URL + `api/uploadv2/image-url?key=${result.data.image}`, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + `${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                if(res_1.status===200){
                    const result_1=await res_1.json();
                    console.log("URL ",result_1.imageUrl);
                    setImage(result_1.imageUrl);
                }
            

                // const myImage = cld.image(`${result.data.image}`);
                // const myURL = myImage.toURL();
                // setImage(myURL);
               
            }
           
        }
    }
    useEffect(() => {
        // const myImage = cld.image('datn-qlcc/gookgudncaqq6i28ez1s');
        // const myURL = myImage.toURL();
        // setImage(myURL);
        // console.log(myURL);
        setSpinner(true);
        fetchData();
    }, [])

    return (
        <ImageBackground  style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/bgDetail.jpg')}>
        <ScrollView style={styles.container}>
            <View>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10} }>
                    <View style={styles.icon_title}>
                        <Icon name='topic'
                            type='material'
                            color='#e74c3c'
                            size={30}
                        />
                        <Text style={styles.text}>Chủ đề</Text>
                    </View>
                    <Text style={styles.text}>{status}</Text>
                </View>

                <Text style={styles.text_input}>{title}</Text>

            </View>
            <View style={{marginTop:30}}>
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
            <View style={{marginTop:30}}>
                <View style={styles.icon_title}>
                    <Icon name='date'
                        type='fontisto'
                        color='#34495e'
                        size={25}
                    />
                    <Text style={styles.text}>Ngày báo cáo</Text>
                </View>

                <Text style={styles.text_input}>{createDate}</Text>
            </View>
            <View style={{marginTop:30}}>
            {statusImage &&(
                <View style={styles.icon_title}>
                    <Icon name='image'
                        type='font-awesome'
                        color='#f1c40f'
                        size={25}
                    />
                  <Text style={styles.text}>Hình ảnh</Text>
                </View>)}

                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: `${image}`,
                    }}
                />
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
    
    text_status:{
        marginTop:20,
        paddingTop:10
    },

    text_input: {
        color: '#34495e',
        fontSize: Text_Size.Text,
        marginTop:10,
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