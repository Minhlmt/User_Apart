import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { URL } from '../../../../../globals/constants'
import Item from '../NotifyRepairPublic/Item'
import { useLinkProps } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const ItemSeparatorView = () => {
  return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
  )
}


export default function App(props) {
  const {token,userId,apartId}=props.route.params;
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false)

  const ItemView = (item) => {
    return (
      <Item item={item.item} navigation={props.navigation} token={token}/>
    );
  };
  const getdata = async () => {
    const res = await fetch(URL + `api/repair/notices?apart_id=${apartId}&type=1&status=0`, {
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
      getdata();
  }, []);


  const element = (data.length === 0) ? <View style={styles.emptyContainer}><Text style={styles.textEmpty}>Không có dữ liệu</Text></View> :
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={ItemSeparatorView}
      renderItem={(item) => ItemView(item)}
    />

  return (
    <ImageBackground  style={{ flex: 1, resizeMode: 'cover' }}  source={require('../../../../../../image/repairNotify1.jpg')}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ flex: 1, justifyContent: 'center',}}>
        {element}
      </View>
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
  textEmpty: {
    fontSize: 20
  },
  emptyContainer: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
  }
});