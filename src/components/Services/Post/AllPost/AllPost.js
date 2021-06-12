import React, { Component, useEffect, useState, useCallback, useContext } from 'react';
import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Item from './Item'
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements'
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider, } from 'react-native-popup-menu';
import { ScreenKey, URL } from '../../../../globals/constants';
const ItemSeparatorView = () => {
    return (
        <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
    )
}

export default function AllPost(props) {
    const { token } = props.route.params;
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]);
    const ItemView = (item) => {
        return (
            <Item item={item.item} navigation={props.navigation} token={token} />

        )
    }

    const getdata = async () => {
        const res = await fetch(URL + `api/post/all-post?status=1`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })

        if (res.status === 200) {
            const result = await res.json();
            console.log("ALLPOST ", result.data.length);
            setData(result.data);
        }
    }
    const handleManage = () => {
        props.navigation.navigate(ScreenKey.ManagePost, {
            token
        })
    }
    useEffect(() => {
        // setSpinner(true);
        getdata();
        const unsubscribe = props.navigation.addListener('focus', () => {
            getdata()
        });

        return unsubscribe;
    }, [props.navigation]);

    const element = (data.length === 0) ? <View style={styles.emptyContainer}><Text style={styles.textEmpty}>Không có bài đăng</Text></View> :
        <View style={{ height: '89%' }}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={(item) => ItemView(item)}
            />
        </View>

    return (
        <MenuProvider style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/bgBlue.jpg')}>
                <View  >
                    <Spinner
                        visible={spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={styles._title}>
                        <Text>{`            `}</Text>
                        <Text style={styles._text_title} >{'Căn hộ bán/thuê'}</Text>
                        <Menu >
                            <MenuTrigger style={{ fontSize: 20 }}>
                                <Icon name='dots-three-vertical'
                                    type='entypo'
                                    color='black'
                                    size={30}
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption  >
                                    <TouchableOpacity onPress={handleManage}>
                                        <View style={{ padding: 10 }}>
                                            <Text style={styles.textMenu}>Quản lý bài viết</Text>
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>


                            </MenuOptions>
                        </Menu>



                    </View>
                    {/* <View style={styles.container}> */}
                  
                    {/* </View> */}

                </View>
                {element}
            </ImageBackground>
        </MenuProvider>
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
        backgroundColor: "#00a8ff",
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