import React, { useEffect, useState, useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey, URL,notifyBillContext} from './constants'
import Home from '../components/Home/Home'
import BillScreen from '../components/Services/Bill/Screen/Screen';
import RepairScreen from '../components/Services/Repair/Screen/Screen';
import ScreenInfo from '../components/Info/ScreenInfo'
import ScreenNotifyManage from '../components/Notify/ScreenNotifyManage'
import ScreenNotifyRepair from '../components/Services/NotifyRepair/ScreenNotifyRepair'
// import Intro from '../components/Introduce/snippets'
import ChooseImageHome from '../components/Home/ChooseImage'
import Complain from '../components/Complain/Complain'
import Screen_Apart_Empty from '../components/Services/Apart_Empty/Screen'
import Parking from '../components/Services/Parking/Screen/Screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterFestival from '../components/Services/PublicPlace/Screen/Screen'
import Post from '../components/Services/Post/Screen/Screen'
const ServiceNavigationStack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
export const Stack_Home_Service = () => {
  return (
    <ServiceNavigationStack.Navigator initialRouteName={ScreenKey.HomeService}>
      <ServiceNavigationStack.Screen name={ScreenKey.HomeService} component={Home} options={{ title: 'Trang chủ', headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Bill} component={BillScreen} options={{ title: 'Hóa đơn', headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Repair} component={RepairScreen} options={{ title: 'Sửa chữa' ,headerShown: false}} />
      <ServiceNavigationStack.Screen name={ScreenKey.NotifyRepair} component={ScreenNotifyRepair} options={{ title: 'TB sửa chữa' }} />
      {/* <ServiceNavigationStack.Screen name={ScreenKey.Intro} component={Intro} options={{ title: 'Giới thiệu', headerShown: false }} /> */}
      <ServiceNavigationStack.Screen name={ScreenKey.ChooseImageHome} component={ChooseImageHome} options={{ headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Complain} component={Complain} options={{ headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Apart_Empty} component={Screen_Apart_Empty} options={{ headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.MainParking} component={Parking} options={{ headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.MainRegister} component={RegisterFestival} options={{ headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Post} component={Post} options={{ headerShown: false }} />
    </ServiceNavigationStack.Navigator>
  )
}
export const Tab_Home_Profile = (props) => {

  const reload = useContext(notifyBillContext).reloadBadge;
  const [count, setCount] = useState(0);
  
  const updateBadge = () => {
    getData()
  }
  const getData = async () => {
    try {
     
      const token = await AsyncStorage.getItem('token');
      const infoUser = await AsyncStorage.getItem('infoUser')
      if (token !== null) {
        const _infoUser = JSON.parse(infoUser);
        const _token = JSON.parse(token);
        await fetchData(_infoUser.id, _token)

      }

    } catch (e) {
      // error reading value
    }
  }
  const fetchData = async (userId, token) => {
    
    const res = await fetch(URL + `api/noti/unread/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      const result = await res.json();
      if (result.num_unread !== count)
   
        setCount(result.num_unread)
    }
  }
  useEffect(() => {
  
    getData();
  }, [reload])
  return (
      <Tab.Navigator
        initialRouteName={ScreenKey.TabHome}
        activeColor="#fff"

        shifting={true}
      >
        <Tab.Screen
          name={ScreenKey.TabHome}
          component={Stack_Home_Service}

          options={{
            tabBarLabel: 'Home',
            tabBarColor: ' rgba(0, 184, 255, 1)',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),

          }}
        />
        <Tab.Screen
          name={ScreenKey.TabNotify}
          component={ScreenNotifyManage}
          options={{
            tabBarLabel: 'Thông báo',
            tabBarColor: '#1f65ff',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-notifications" color={color} size={26} />
            ),
            tabBarBadge: `${count}`
          }}
          initialParams={{ updateBadge }}
        />
        <Tab.Screen
          name={ScreenKey.TabProfile}
          component={ScreenInfo}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#694fad',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
   
  )
}
const styles = StyleSheet.create({
  button_tab: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 5,
    backgroundColor: 'white'
  }
});
