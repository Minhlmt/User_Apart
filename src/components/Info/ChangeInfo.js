import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button, TextInput, Alert, Dimensions } from 'react-native';
import { Text_Size, URL } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Fumi } from 'react-native-textinput-effects';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH } = Dimensions.get('window')
export default function ChangeInfo(props) {
  const { name, user_id, email, phone, identify_card, native_place, token } = props.route.params;
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [spinner, setSpinner] = useState(false);
  const getData = async () => {
    try {
      const infoUser = await AsyncStorage.getItem('infoUser');


    } catch (e) {
      // error reading value
    }
  }
  const sendDataUpdate = async () => {
    const storeData = async (infoUser) => {
      try {
        const jsonInfoUser = JSON.stringify(infoUser);
        await AsyncStorage.setItem('infoUser', jsonInfoUser);
      } catch (e) {
        // saving error
      }
    }

    const res = await fetch(URL + `api/auth/update-info`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id, name,
        phone: newPhone,
        email: newEmail,
        identify_card, native_place
      })

    })

    if (res.status === 200) {
      const result = await res.json();
      setSpinner(false);
      storeData(result.data);
      getData();
      Alert.alert(
        "Thông báo",
        "Cập nhật thành công",
        [
          {
            text: "Ok",
            onPress: () => props.navigation.navigate(ScreenKey.TabProfile),

          },

        ]
      );

    }

  }
  const handleUpdateInfo = () => {
    setSpinner(true);
    sendDataUpdate();

  }
  return (
    <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View>
        <Text style={styles.text}>Email</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon name={'mail-outline'} size={28} color={'rgba(255,255,255,0.7)'}
          style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid='transparent'
          defaultValue={email}
          onChangeText={(text)=>setNewEmail(text)}

        />
      </View>
      <View>
        <Text style={styles.text}>Phone</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon name={'phone-portrait-outline'} size={28} color={'rgba(255,255,255,0.7)'}
          style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid='transparent'
          defaultValue={phone}
          onChangeText={(text)=>setNewPhone(text)}
          keyboardType={'numeric'}

        />

      </View>
      <View style={styles.myButtonContainer}>
        <TouchableOpacity onPress={handleUpdateInfo} style={styles.appButtonContainerLogOut}>
          <View style={styles.myButtonLogOut}>
            <Text style={styles.appButtonText}>Cập nhật</Text>
          </View>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,1)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  text:{
    color: 'rgba(255,255,255,0.7)',
    fontSize:20,
   
    fontWeight:'bold',
    marginTop:10,
    marginHorizontal: 25,
  },




  myButtonContainer: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    // backgroundColor:'red'
  },
  appButtonContainerLogOut: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12, marginTop: 15,
    marginLeft: 10,
    marginRight: 10
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
});