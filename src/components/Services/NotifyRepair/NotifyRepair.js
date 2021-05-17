import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Item from '../../Home/Items/ItemNotification'
import {URL} from '../../../globals/constants'
import ItemNotification from '../../Home/Items/ItemNotification'
import { useLinkProps } from '@react-navigation/native';




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
  const [limit,setLimit]=useState(1);
  const [load,setLoad]=useState(false);
  const {token,userId}=props.route.params;
  const renderItem = ({ item }) => {
    return (
      <ItemNotification id={item._id} title={item.title} is_read_user={item.is_read_user} 
      status={item.status} navigation={props.navigation} token={token}/>
    );
  };

const fetchData=async()=>{
  const res = await fetch(URL + `api/repair/all/${userId}/${page}/10`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + `${token}`,
      'Content-Type': 'application/json',
    },
  })
  
  if(res.status===200){
    const result=await res.json();
    if(result.data.length===0){
     setPage(1);
     setLoad(true);
    }
    else{
      if(!load){
        setData(data.concat(result.data));
      }
     
    }
   
  }
}
  useEffect(() => {
    fetchData();
  }, []);

  const handleOnEndReached = async () => {
    console.log("het trang");
    setPage(page+1);
    console.log(page);
    if(page!==1){
      fetchData();
    }
   
    // setPage(page + 1);
    // console.log(page);
    // setLoadingMore(true);
    // if (!stopFetchMore) {
    //   const response = await fakeServer(20);
    //   if (response === 'done') return setLoadingMore(false);
    //   setData([...data, ...response]);
    //   stopFetchMore = true;
    // }
    // setLoadingMore(false);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item,index) => index.toString()}
      renderItem={renderItem}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.1}
      onScrollBeginDrag={() => {
        stopFetchMore = false;
      }}
      ListFooterComponent={() => loadingMore && <ListFooterComponent />}
    />
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
    padding:10,
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
    padding:10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  text: {
    flex: 1,
    color: 'black',
    marginBottom: 10,
    fontSize: 20,marginLeft:5
  }
});