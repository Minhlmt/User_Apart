import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Alert, Modal, FlatList, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { URL } from '../../../../globals/constants'
import { SliderBox } from "react-native-image-slider-box";
const { width: WIDTH } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
export default function Create(props) {
    const { token, userId } = props.route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState('');
    const [namePlace, setNamePlace] = useState('<trống>');
    const [idPlace, setIdPlace] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [minimumDate, setMinimumDate] = useState();
    const [dateString, setDateString] = useState('<trống>');
    const [idDate, setIdDate] = useState('');
    const [term, setTerm] = useState('<trống>');
    const [types3, settypes3] = useState([{ label: 'Cả ngày', value: 0 }, { label: 'Buổi sáng', value: 1 }, { label: 'Buổi chiều', value: 2 },]);
    const [value3, setvalue3] = useState(0);
    const [value3Index, setvalue3Index] = useState(0);
    const [dataPlace, setDataPlace] = useState([]);
    const [dataRegisted,setDataRegisted]=useState([]);
    const [spinner,setSpinner]=useState(false);
    const [_image,setImage]=useState(['https://i.pinimg.com/originals/9a/7a/6f/9a7a6f2b9c7b8433e7c947fb38d4f067.jpg']);
    const getPlace = async () => {
        const res = await fetch(URL + `api/service/all-services`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
     
        if (res.status === 200) {
            const result = await res.json();
            setDataPlace(result.data);
        }


    }
    const getRegistered=async(id)=>{
        const res = await fetch(URL+`api/register-service/all-register?service_id=${id}&status=0`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            console.log("RESULT ",result);
            setDataRegisted(result.data);
            console.log("IdDate ",idDate);
            getTerm(result.data, idDate);

          
        }
    }
    const sendRegister=async()=>{
        const res = await fetch(URL + `api/register-service/create`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                content:content,
                user_id:userId,
                service_id:idPlace,
                date:idDate,
                term:value3Index
            })
        })
        setSpinner(false);
        if (res.status === 200) {
            Alert.alert("Thông báo","Đăng kí thành công")
            const result = await res.json();
            console.log("RESULT ",result);
        }
        else{
            Alert.alert("Thông báo","Server bảo trì")
        }
    }
    const getImageFromData= async(idService)=>{
        const newData = dataPlace.filter((item) => {
            return (item._id === idService);
        });
        let arrImage=[];
        for (let temp of newData[0].images)
        {
            console.log("image place ",temp);
         
           await getImageFromApi(temp,arrImage);
        }
        setImage(arrImage)
    }
    const getImageFromApi=async(image,arrImage)=>{
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
            arrImage.push(result.imageUrl);
            // setImage(oldArray => [...oldArray, result.imageUrl]);
        }
        else {
           arrImage.push('')
        }
    }
    useEffect(() => {
        var date = new Date();
        date.setDate(date.getDate() + 2);
        setMinimumDate(date);
        getPlace();
    }, [])

    const onChange = useCallback((event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log("date ", Date.parse(currentDate));
        setIdDate(Date.parse(currentDate));
        var month = currentDate.getUTCMonth() + 1; //months from 1-12
        var day = currentDate.getUTCDate();
        var year = currentDate.getUTCFullYear();
        setDateString(day + "/" + month + "/" + year);
        setShow(false);
    }, [showPicker]);


    const getTerm = (arrRegister,idDate) => {
        console.log("IdDate ",idDate);
        const arr = [];
        let chooseDate = '';
        for (let temp of arrRegister) {
            if (new Date(temp.date).getDate() === new Date(idDate).getDate() && new Date(temp.date).getMonth() === new Date(idDate).getMonth()) {
                arr.push(temp.term)
            }
        }
        let uniqueArray = Array.from(new Set(arr));
        for (let term of uniqueArray) {
            console.log(term);
            if (term === 0) {
                chooseDate = chooseDate + " cả ngày"
            }
            else if (term === 1) {
                chooseDate = chooseDate + " buổi sáng"
            }
            else {
                chooseDate = chooseDate + " buổi chiều"
            }
        }
        if (chooseDate !== '') {
            setTerm(chooseDate);
        }
        else{
            setTerm("<trống>")
        }
    }
    const ItemView = (item) => {
        return (
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                    console.log("abc ", item.item._id);
                    setIdPlace(item.item._id);
                    getRegistered(item.item._id);
                    getImageFromData(item.item._id);
                    // setIdApart(oldArray => [...oldArray, item.item._id]);
                    setNamePlace(item.item.name)
                    setModalVisible(false);
                }}
            >
                <Text style={{ alignSelf: 'center' }} >{item.item.name}</Text>
            </TouchableOpacity>

        )
    }
    const choosePlace = () => {
        setModalVisible(true);
    }
    const hanldeSend = () => {
        setSpinner(true);
        sendRegister();
    }
    const showPicker = useCallback((value) => setShow(value), []);
    return (
        <ScrollView>
            <ImageBackground style={{ flex: 1, resizeMode: 'contain' }} source={require('../../../../../image/bgFestival.jpg')}>
            <Spinner
                        visible={spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>

                            <Text style={styles.modalText}>Mời bạn chọn nơi tổ chức</Text>
                            <FlatList
                                data={dataPlace}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(item) => ItemView(item)}

                            />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose, { flexDirection: 'row', width: 200, justifyContent: 'center', backgroundColor: '#c0392b' }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text >Thoát</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <View style={styles._title}>
                    <Text style={styles._text_title} >Đăng kí dịch vụ</Text>
                </View>
                <View style={styles._marginTop}>
                    <Text style={styles._label}>Ngày tổ chức</Text>
                    <TouchableOpacity onPress={() => showPicker(true)}>
                        <View style={[styles.selectView, { flexDirection: 'row', justifyContent: 'flex-end' }]}>

                            <Text style={[styles.text, { marginRight: 15 }]}>{dateString}</Text>
                            <View style={{ marginRight: 15, marginTop: 10 }}>
                                {/* <Fontisto name='date' size={25} /> */}
                                <Icon name='date'
                                    type='fontisto'
                                    color='#3498db'
                                    size={25}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles._marginTop}>
                    <Text style={styles._label}>Địa điểm</Text>
                    <TouchableOpacity onPress={choosePlace}>
                        <View style={[styles.selectView, { flexDirection: 'row', justifyContent: 'flex-end' }]}>

                            <Text style={[styles.text, { marginRight: 15 }]}>{namePlace}</Text>
                            <View style={{ marginRight: 15, marginTop: 10 }}>
                                <Icon name='arrowdown'
                                    type='antdesign'
                                    color='#34495e'
                                    size={25}
                                />
                                {/* <AntDesign name='arrowdown' size={25} /> */}
                            </View>

                        </View>
                    </TouchableOpacity>
                   
                </View>
                <View style={{marginTop:10}}>
                <SliderBox resizeMode='contain' images={_image} />
                </View>
             


                <View style={styles._marginTop}>
                    <Text style={styles._label}>Các buổi đã có người chọn trước đó</Text>
                    <View>
                        <View style={[styles.selectView, { flexDirection: 'row', justifyContent: 'flex-end' }]}>

                            <Text style={[styles.text, { marginRight: 15 }]}>{term}</Text>
                            <View style={{ marginRight: 15, marginTop: 10 }}>
                                {/* <Fontisto name='date' size={25} /> */}
                                <Icon name='timelapse'
                                    type='material-community'
                                    color='#16a085'
                                    size={25}
                                />
                            </View>

                        </View>
                    </View>

                </View>

                <View style={styles._marginTop}>
                    <Text style={styles._label}>Mời bạn chọn buổi</Text>
                    <Text style={styles._label}>Lưu ý: Nếu bạn chọn trùng với người khác, quản lý sẽ sắp xếp theo độ ưu tiên</Text>
                    <View>
                        <RadioForm formHorizontal={true} animation={true}  >
                            {types3.map((obj, i) => {
                                var onPress = (value, index) => {
                                    setvalue3Index(index);

                                }
                                return (
                                    <RadioButton labelHorizontal={true} key={i} >
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={value3Index === i}
                                            onPress={onPress}
                                            buttonInnerColor={'rgba(0, 0, 255, 0.7)'}
                                            buttonOuterColor={value3Index === i ? '#2196f3' : '#e74c3c'}
                                            buttonSize={15}
                                            buttonStyle={{}}
                                            buttonWrapStyle={{ marginLeft: 10, marginTop: 10 }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            onPress={onPress}
                                            labelStyle={{ color: 'rgba(114, 0, 157, 1)', fontSize: 18 }}
                                            labelWrapStyle={{ marginTop: 10 }}
                                        />
                                    </RadioButton>
                                )
                            })}
                        </RadioForm>
                    </View>
                </View>
                <View style={styles._marginTop}>
                    <Text style={styles._label}>Nội dung</Text>



                    <TextInput
                        style={[styles.selectView, { flexDirection: 'row', justifyContent: 'flex-end', fontSize: 20 }]}
                        placeholderTextColor={'rgba(114, 0, 157, 1)'}
                        color={'rgba(114, 0, 157, 0.9)'}
                        underlineColorAndroid='transparent'
                        multiline
                        onChangeText={text => setContent(text)}

                    />





                </View>
                <View style={styles.myButtonContainer}>
                    <TouchableOpacity style={styles.appButtonContainerLogOut} onPress={hanldeSend} >
                        <View style={styles.myButtonLogOut}>
                            <Text style={styles.appButtonText}>Đăng kí</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={minimumDate}
                    />
                )}
            </ImageBackground>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    selectView: {
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 0.5,
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        paddingVertical: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    _marginTop: {
        marginTop: 20,
        marginHorizontal: 10
    },


    text: {
        color: 'rgba(114, 0, 157, 0.6)',
        fontSize: 20,
        // fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
    },
    _label: {
        fontSize: 18,
        fontStyle: 'italic',
        color: 'rgba(142, 0, 196, 1)'
    },




    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        marginTop: 10
        // backgroundColor:'red'
    },
    appButtonContainerLogOut: {
        // elevation: 8,
        backgroundColor: "rgba(114, 0, 157, 0.3)",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10
    },
    myButtonLogOut: {
        alignItems: 'center',
        // marginTop:10,

    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 5,
        marginTop: 10
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#rgba(142, 0, 196, 0.5)",
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 2,
    },
    _text_title: {
        fontSize: 25,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
    input: {
        width: WIDTH - 55,
        height: 45,

        fontSize: 16,

        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',

    },

});