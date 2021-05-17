import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Alert, BackHandler } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { URL } from '../../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemNotifyBill from './ItemNotify'
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');



let stopFetchMore = true;

const ListFooterComponent = () => (
    <Text
        style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 5,
        }}
    >
        Loading...
    </Text>
);
const renderItem = ({ item }) => {

    return (

        <ItemNotifyBill item={item} />
    );
};

export default function App(props) {
    const [data, setData] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [token, setToken] = useState();
    const [apartId, setApartId] = useState();
    const [load, setLoad] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const apartId = await AsyncStorage.getItem('apartId');
            if (apartId !== null && token !== null) {
                const _token = JSON.parse(token);
                const _apartId = JSON.parse(apartId);
                setApartId(_apartId);
                setToken(_token);
                await fetchData(_token, _apartId)

            }

        } catch (e) {
            // error reading value
        }
    }
    const fetchData = async (token, apartId) => {


        const res = await fetch(URL + `api/bill-noti/all/${apartId}?page=${page}&limit=10`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },

        })
        setSpinner(false);
        if (res.status === 200) {
            //   const result = await res.json();
            const result = {
                "data": [
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e6f0d2ea0d01b702b76b9",
                        "title": "Thông báo cắt điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 4:21:17 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    },
                    {
                        "receiver": "606b255ce3d0f52d84fbec45",
                        "is_delete": false,
                        "_id": "608e69236f9ebd2e9c73d963",
                        "title": "Thông báo quá hạn đóng tiền điện nước",
                        "content": "Căn hộ A315 đã quá thời hạn đóng điện nước. Đề nghị chủ căn hộ đóng tiền đầy đủ trước ngày 5/5. Nếu không thực hiện BQL sẽ tiến hành cắt điện nước theo quy định của chung cư.",
                        "create_date": "5/2/2021, 3:56:02 PM",
                        "__v": 0
                    }
                ]

            }

            if (result.data.length === 0) {
                setPage(1);
                setLoad(true);
            }
            else {
                if (!load) {
                    setData(data.concat(result.data));
                }
            }
        }
    }
    useEffect(() => {
        setSpinner(true);
        getData();

    }, []);

    const handleOnEndReached = async () => {
        setPage(page + 1);
        console.log(page);
        if (page !== 1) {
            fetchData(token, apartId);
        }


    };

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/background.jpg')}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles._title}>
                <Text style={styles._text_title} >Thông báo hóa đơn</Text>
            </View>


            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.1}
                onScrollBeginDrag={() => {

                }}
                ListFooterComponent={() => loadingMore && <ListFooterComponent />}
            />
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
        flexDirection: 'row',
        backgroundColor: "#EEEEEE",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
    },
    container2: {
        flexDirection: 'row',
        backgroundColor: "#BBBBBB",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
    },
    text: {
        flex: 1,
        color: 'black',
        marginBottom: 10,
        fontSize: 20, marginLeft: 5
    },
    container1: {
        alignSelf: 'center',
        width: window.width,
        overflow: 'hidden',
        height: window.width / 2
    },
    background: { // this shape is a circle 
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    image: {
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
        backgroundColor: '#9DD6EB'
    },
    text1: {
        marginTop: window.height / 9.5,
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        // backgroundColor: "#000000a0"
    },
    image1: {
        height: window.width * 1.08,
        width: window.width,
        // position: 'absolute',
        bottom: 0,
        // marginLeft: window.width / 2,
        backgroundColor: '#9DD6EB'
    },
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
});