import React, { useEffect, useState, useCallback } from 'react';
import {Alert} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/components/Welcome/Welcome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab_Home_Profile } from './src/globals/screen'
import Apartment from './src/components/Apartment/Apartment'
import { ScreenKey, URL, notifyBillContext } from './src/globals/constants';
import SignIn from './src/components/SignIn/SignIn'
import messaging from '@react-native-firebase/messaging';
const MainNavigationStack = createStackNavigator();

export default function App({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [notifyBill, setNotifyBill] = useState();
  const [onRefesh,setOnRefesh]=useState(true);
  const [reloadBadge,setReloadBadge]=useState(false);
  const changeReload=()=>{
    setReloadBadge({...reloadBadge,reloadBadge:!reloadBadge})
  }
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log(fcmToken);
      getData(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  }
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken()
      // console.log('Authorization status:', authStatus);
    }
  }
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
    getStoragenotifyBill();
    requestUserPermission();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      if (remoteMessage.data.type === "1") {
        storeDataNotifyBill(remoteMessage.data.type);
        setNotifyBill(true);
      }
      else{
        console.log("RELOAD");
        console.log(reloadBadge);
        setReloadBadge({...reloadBadge,reloadBadge:!reloadBadge})
      }
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );

    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
        setLoading(false);
      });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;

  }, [onRefesh])

  if (loading) {
    return null;
  }



  return (
    <notifyBillContext.Provider value={{ notifyBill, handleChangeNotifyBill,changeOnRefesh,reloadBadge,changeReload }}>
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