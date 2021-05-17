import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity, ImageBackground } from 'react-native';

import { Text_Size, URL, ScreenKey } from '../../../../globals/constants'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
export default function Parking(props) {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('123');
  const [token, setToken] = useState('');
  const [image, setImage] = useState(null);
  const [nameImage, setNameImage] = useState();
  const [nameExtension, setNameExtension] = useState();
  const [extension, setExtension] = useState();
  const [spinner, setSpinner] = useState(false);
  const { imageBase64, uri, width, height, mime, path } = props.route.params;
  const getData = async () => {
    try {
      const _token = await AsyncStorage.getItem('token');
      const _userId = await AsyncStorage.getItem('infoUser');


      if (_token !== null && _userId !== null) {

        const _tokenObject = JSON.parse(_token);
        const _userIdObject = JSON.parse(_userId);
        // console.log(userId+" "+token+" "+apartId);
        setUserId(_userIdObject.id);
        setToken(_tokenObject);


      }

    } catch (e) {
      // error reading value
    }
  }
  const sendImage = async () => {
    if (imageBase64 !== '') {
      console.log("filename ", nameImage);
      console.log("extension ", extension);
      console.log("token ", token);
      const res = await fetch(URL + `api/uploadv2/signed-url?fileName=${nameImage}&extension=${extension}&mediaType=image`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + `${token}`,
          'Content-Type': 'application/json',
        },
      })
      console.log("STATUS_1", res.status);
      if (res.status === 200) {
        // var body = new FormData();
        // body.append('file', imageBase64);
        const result = await res.json()

        const localFile = await fetch(path);

        // then create a blob out of it (only works with RN 0.54 and above)
        const fileBlob = await localFile.blob();

        // then send this blob to filestack
        const serverRes = await fetch(`${result.uploadUrl}`, { // Your POST endpoint
          method: 'PUT',
          headers: {
            'Content-Type': fileBlob && fileBlob.type,
          },
          body: fileBlob, // This is your file object
        });
        console.log("STATUS_2", serverRes.status);
        if (serverRes.status === 200) {
          const res_2 = await fetch(URL + `api/noti-parking/create`, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + `${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: topic,
              content: content,
              user_id: userId,
              image: result.key
            }),
          })
          console.log("STATUS_3", res_2.status);
          if (res_2.status === 200) {
            Alert.alert('Thông báo', 'Báo cáo thành công',
              [
                { text: "OK" }
              ]);
          }
          else {
            Alert.alert('Thông báo', 'Server đang bảo trì ! Vui lòng thử lại sau',
              [
                { text: "OK" }
              ]);
          }

        }
        else {
          Alert.alert('Thông báo', 'upload S3 fail',
            [
              { text: "OK" }
            ]);
        }
      }
    }
    else {
      const res1 = await fetch(URL + 'api/repair/add', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: topic,
          content: content,
          user_id: userId,
          image: ''
        }),
      })
      if (res1.status === 200) {
        Alert.alert('Thông báo', 'Báo cáo thành công',
          [
            { text: "OK" }
          ]);
      }
    }
  }

  const checkTextInput = async () => {
    //Check for the Name TextInput
    if (!topic.trim()) {
      Alert.alert('Thông báo', 'Chủ đề không được trống');
      return;
    }
    //Check for the Email TextInput
    if (!content.trim()) {
      Alert.alert('Thông báo', 'Nội dung không được trống');
      return;
    }
    if(path===''){
      Alert.alert('Thông báo', 'Bắt buộc phải có hình ảnh');
      return;
    }
    else {
      // setSpinner(true);
      await sendImage();
    }



  };

  useEffect(() => {
    var filename = path.replace(/^.*[\\\/]/, '')
    setNameExtension(filename);
    const nameimage = filename.split('.');

    setNameImage(nameimage[0])
    var extension = mime.replace(/^.*[\\\/]/, '');
    setExtension(extension);
    setImage({
      uri: uri,
      width: width,
      height: height,
      mime: mime,
    });
    getData();
  }, [props.route.params?.imageBase64])
  const renderAsset = (image) => {
    return (<Image
      style={{ width: 100, height: 100, resizeMode: 'contain' , marginLeft:15}}
      source={image}
    />);
  }
  const hanldeChooseImage = () => {
    props.navigation.navigate(ScreenKey.ChooseImageParking)
  }

  return (
    <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/background.jpg')}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles._title}>
        <Text style={styles._text_title} >Báo cáo xe vi phạm</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.text2}>Chủ đề</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <Icon name={'phone-portrait-outline'} size={28} color={'rgba(255,255,255,0.7)'}
            style={styles.inputIcon} /> */}
          <TextInput
            style={styles.input2}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={(text) => setTopic(text)}
            multiline
          />
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.text2}>Nội dung</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <Icon name={'phone-portrait-outline'} size={28} color={'rgba(255,255,255,0.7)'}
            style={styles.inputIcon} /> */}
          <TextInput
            style={styles.input2}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            multiline
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </View>
      <View style={styles.container}>
      <View>
          <Text style={styles.text2}>Hình ảnh xe vi phạm</Text>
        </View>
        <View style={styles.button_image}>
          <Button
            onPress={hanldeChooseImage}
            title="Chọn ảnh"
            color="#841584"

          />

        </View>
        {image ? renderAsset(image) : null}

      </View>

      <TouchableOpacity onPress={checkTextInput} style={styles.appButtonContainer}>
        <View style={styles.myButtonLogOut}>

          <Text style={styles.appButtonText}>Gửi</Text>

        </View>
      </TouchableOpacity>
    </ImageBackground>
  )


}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 10,

  },
  button_image: {
    flexDirection: 'column',
    marginTop: 10,
    width:100,
    marginLeft:25
    // justifyContent:'center'

  },
  text: {
    color: 'rgba(206, 0, 255, 1)',
    fontSize: 20,

    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 25,

  },
  text2: {
    color: 'rgba(72, 100, 106, 1)',
    fontSize: 20,

    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 25,

  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    // height: 45,
    borderRadius: 10,
    fontSize: 20,

    backgroundColor: ' rgba(255, 255, 255, 0.3)',
    color: 'rgba(206, 0, 255, 1)',
    marginHorizontal: 25
  },
  input2: {
    width: WIDTH - 55,
    // height: 45,
    borderRadius: 10,
    fontSize: 16,

    backgroundColor: ' rgba(255, 255, 255, 0.3)',
    color: 'rgba(72, 100, 106, 1)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12, marginTop: 10,

  },






  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",

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