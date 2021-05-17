import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { URL } from '../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemNotifyManger from '../../components/Home/Items/ItemNotifyManger'
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

export default function App(props) {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [token, setToken] = useState();
  const [flag, setFlag] = useState(true);
  const [load, setLoad] = useState(false);
  const [userId, setUserId] = useState();
  const [alive, setAlive] = useState();
  const [spinner, setSpinner] = useState(false);
  const {updateBadge}=props.route.params;
  const renderItem = ({ item }) => {
    let is_read;
    for (let receivers of item.receivers) {
      if (receivers.user_id === userId) {
        is_read = receivers.is_read;
      }
    }

    return (

      <ItemNotifyManger id={item._id} title={item.title} content={item.content} create_date={item.create_date}
        image={item.image} link={item.link}
        status={is_read} navigation={props.navigation} token={token} userId={userId} updateBadge={updateBadge}/>
    );
  };
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const infoUser = await AsyncStorage.getItem('infoUser');
      if (token !== null) {
        const _token = JSON.parse(token);
        const _info = JSON.parse(infoUser);
        setUserId(_info.id);
        setToken(_token);
        setFlag(false);
      }
    } catch (e) {
      // error reading value
    }
  }
  const fetchData = async () => {
    console.log("USERID ",userId);
    const res = await fetch(URL + `api/noti/user/${userId}/${page}/10`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },

    })
    console.log("STATUS ",res.status)

    setSpinner(false);
    if (res.status === 200) {

      const result = await res.json();
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
    fetchData();
    const unsubscribe = props.navigation.addListener('focus', () => {
      setSpinner(true);
      getData();
      fetchData();
    });

    return unsubscribe;

  }, [flag]);

  const handleOnEndReached = async () => {
    setPage(page + 1);
    console.log(page);
    if (page !== 1) {
      fetchData();
    }


  };

  return (
    <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.container1} >
        <View style={styles.background} >
          {/* <Image style={styles.image} source={require('../../../image/sea.jpg')} /> */}
          <ImageBackground source={require('../../../image/notify.jpg')} style={styles.image}>
            <Text style={styles.text1} adjustsFontSizeToFit>Thông báo</Text>
          </ImageBackground>
        </View>
      </View>
      {/* <ImageBackground source={require('../../../image/notify1.png')} style={styles.image1}> */}
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
      {/* </ImageBackground> */}

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
});