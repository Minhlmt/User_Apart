import React, { Component, useEffect, useState, useCallback, useContext } from 'react';
import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert, TouchableOpacity,ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Item from './Item'
import Spinner from 'react-native-loading-spinner-overlay';
import { URL,ScreenKey } from '../../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemSeparatorView = () => {
    return (
        <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
    )
}

export default function MainManage(props) {
    const {token} = props.route.params;
    const [spinner, setSpinner] = useState(false);
    const [refesh,setRefesh]=useState(true);
    const [data, setData] = useState([]);
    const ItemView = (item) => {
        return (
            <Item item={item.item} navigation={props.navigation} token={token} handleRefesh={handleRefesh}/>

        )
    }
    const handleRefesh=()=>{
        setRefesh(!refesh);
    }
    const getData = async () => {
        try {
          const infoUser = await AsyncStorage.getItem('infoUser');
          if (infoUser != null) {
            const _infoUser = JSON.parse(infoUser);
            await fetchData(_infoUser.id)
          }
        } catch (e) {
          // error reading value
        }
      }

    const fetchData = async (userId) => {
      
        const res = await fetch(URL + `api/post/all-post?user_id=${userId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })
       
        setSpinner(false);
        if (res.status === 200) {
            const result = await res.json();
            setData(result.data);
        }
    }

    useEffect(() => {
        setSpinner(true);
        getData();
        const unsubscribe = props.navigation.addListener('focus', () => {
            getData()
          });
        
          return unsubscribe;
    }, [props.navigation,refesh])
    const handleCreate=()=>{
        props.navigation.navigate(ScreenKey.CreatePost)
    }
    const element = (data.length === 0) ? <View style={styles.emptyContainer}><Text style={styles.textEmpty}>Không có bài viết</Text></View> :
        <View style={{ height: '89%' }}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={(item) => ItemView(item)}
            />
        </View>

    return (
      
       <ImageBackground  style={{ flex: 1, resizeMode: 'cover' }}  source={require('../../../../../image/bgPost.jpg')}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles._title}>
                <Text>{`            `}</Text>
                <Text style={styles._text_title} >{'Quản lý bài viết'}</Text>
                <TouchableOpacity onPress={handleCreate}>
                <Text style={[styles._text_title,{fontSize:18,color:'#d35400'}]}>Tạo bài</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.container}> */}
            {element}
            {/* </View> */}

      </ImageBackground>
      
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    itemStyle: {
        padding: 10
    }, textInput: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: 'white',
        flex: 1

    }, chooseDate: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 25,
        backgroundColor: "rgba(46, 142, 45, 0.8)",
        paddingVertical: 20,
        paddingHorizontal: 12,
      
    },
    _text_title: {
        fontSize: 20,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
    textEmpty: {
        fontSize: 20
    },
    emptyContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    textMenu: {
        color: 'black', fontSize: 17
    },
})