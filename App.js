import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/components/Welcome/Welcome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab_Home_Profile } from './src/globals/screen'
import Apartment from './src/components/Apartment/Apartment'
import { ScreenKey, URL, notifyBillContext } from './src/globals/constants';
import SignIn from './src/components/SignIn/SignIn'
// import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";
// import Firesase from '@react-native-firebase/app'
// import { PushNotify } from './src/globals/pushNotification'
const MainNavigationStack = createStackNavigator();

export default function App({ navigation }) {
  const [notifyBill, setNotifyBill] = useState();
  const [onRefesh,setOnRefesh]=useState(true);
  const [reloadBadge,setReloadBadge]=useState(true);
  const changeOnRefesh=()=>{
    setOnRefesh(!onRefesh);
  }
  const handleChangeNotifyBill = () => {

    setNotifyBill(false);
  }
  const updateTokenDevice = async (token_device, userId, token) => {
    const res = await fetch(URL + `api/auth/update-token-device`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        token_device: token_device

      })
    })
    console.log("STATUS ", res.status);
    if (res.status === 200) {
      const result = await res.json();
    }
  }
  const getStoragenotifyBill = async () => {
    try {
      const _notifyBill = await AsyncStorage.getItem('notifyBill');

      if (_notifyBill !== null) {
        setNotifyBill(true)
      }
      else {
        setNotifyBill(false);
      }
    }
    catch (e) {

    }
  }
  const getData = async (tokenDevice) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const infoUser = await AsyncStorage.getItem('infoUser')
      if (token !== null) {
        const _infoUser = JSON.parse(infoUser);
        const _token = JSON.parse(token);
        await updateTokenDevice(tokenDevice, _infoUser.id, _token)
      }
    } catch (e) {
      // error reading value
    }
  }
  const storeDataNotifyBill = async (notifyBill) => {
    try {
      const jsonNotifyBill = JSON.stringify(notifyBill);
      await AsyncStorage.setItem('notifyBill', jsonNotifyBill);

    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {
    // PushNotify();

    getStoragenotifyBill();
    // Firesase.initializeApp();

    // PushNotification.configure({

    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //     getData(token.token);

    //   },

    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    //     if (notification.data.type === "1") {
    //       storeDataNotifyBill(notification.data.type);
    //       setNotifyBill(true);
    //     }
    //     else{
    //       setReloadBadge(!reloadBadge);
    //     }
    //     console.log("TILTE ", notification.title);
    //     console.log("BODY ", notification.body);
    //     console.log("DATA ", notification.data.type)

    //     // setNotification(notification)

    //     // notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },

    //   onAction: function (notification) {
    //     console.log("ACTION:", notification.action);
    //     console.log("NOTIFICATION1:", notification);


    //   },


    //   onRegistrationError: function (err) {
    //     console.error(err.message, err);
    //   },


    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },


    //   popInitialNotification: true,


    //   requestPermissions: true,
    // });

  }, [onRefesh])




  return (
    <notifyBillContext.Provider value={{ notifyBill, handleChangeNotifyBill,changeOnRefesh,reloadBadge }}>
      <NavigationContainer>
        <MainNavigationStack.Navigator initialRouteName={ScreenKey.Welcome}>
          <MainNavigationStack.Screen name={ScreenKey.Home} component={Tab_Home_Profile} options={{ headerShown: false }} />
          <MainNavigationStack.Screen name={ScreenKey.Welcome} component={Welcome} options={{ headerShown: false }} initialParams={{ notifyBill }} />
          <MainNavigationStack.Screen name={ScreenKey.ChooseApart} component={Apartment} options={{ headerShown: false }} />
          <MainNavigationStack.Screen name={ScreenKey.SignIn} component={SignIn} options={{ headerShown: false }} />
        </MainNavigationStack.Navigator>
      </NavigationContainer >
    </notifyBillContext.Provider>
  );
}