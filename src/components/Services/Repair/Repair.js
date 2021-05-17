import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity, ImageBackground ,ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalDate from '../Bill/CalDate'
import { Text_Size, URL } from '../../../globals/constants'
import { ScreenKey } from '../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
export default function Repair(props) {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('123');
  const [token, setToken] = useState('');
  const [apartId,setApartId]=useState();
  const [image, setImage] = useState(null);
  const [nameImage, setNameImage] = useState();
  const [nameExtension, setNameExtension] = useState();
  const [iconDelete,setIconDelete]=useState(false);
  const [extension, setExtension] = useState();
  const [spinner, setSpinner] = useState(false);
  const [types3, settypes3] = useState([{ label: 'Khu vực chung', value: 0 }, { label: 'Khu vực riêng (tự sửa chữa)', value: 1 }, { label: 'Khu vực riêng (sử dụng dịch vụ sửa chữa)', value: 2 },]);

  const [value3Index, setvalue3Index] = useState(0);
  const { imageBase64, uri, width, height, mime, path } = props.route.params;


  const getData = async () => {

    try {

      const _token = await AsyncStorage.getItem('token');
      const _userId = await AsyncStorage.getItem('infoUser');
      const _apartId = await AsyncStorage.getItem('apartId');

      if (_token !== null && _userId !== null) {

        const _tokenObject = JSON.parse(_token);
        const _userIdObject = JSON.parse(_userId);
        const _apartIdObJect=JSON.parse(_apartId)
        // console.log(userId+" "+token+" "+apartId);
        setUserId(_userIdObject.id);
        setToken(_tokenObject);
        setApartId(_apartIdObJect);
      }

    } catch (e) {
      // error reading value
    }
  }
  const sendImage = async () => {
    if (imageBase64 !== '') {
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
          const res_2 = await fetch(URL + `api/repair/add`, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + `${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: topic,
              content: content,
              author: userId,
              apart_id:apartId,
              image: result.key,
              type:value3Index

            }),
          })
          console.log("STATUS_3", res_2.status);
          setSpinner(false);
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
          author: userId,
          apart_id:apartId,
          image: '',
          type:value3Index

        }),
      })
      setSpinner(false);
      if (res1.status === 200) {

        Alert.alert('Thông báo', 'Báo cáo thành công',
          [
            { text: "OK" }
          ]);
      }
    }
  }

  const checkTextInput = async () => {
    setSpinner(true);
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
    else {
      // setSpinner(true);
      await sendImage();
    }



  };

  useEffect(() => {
    if(path!==''){
      setIconDelete(true);
    }
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
  const deleteImage=()=>{
    setIconDelete(false);
    setImage({
      uri: '',
      width: '',
      height: '',
      mime: '',
    })
  }
  const renderAsset = (image) => {

    return (
      <TouchableOpacity style={styles.badgeIconView} onPress={deleteImage}>
        {iconDelete ? <Text style={styles.badge}> X </Text>:<></> }
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={image}
        />
        </TouchableOpacity>
    );
  }
  const hanldeChooseImage = () => {
          props.navigation.navigate(ScreenKey.ChooseImage)
        }

  return (
    <ScrollView>
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/background.jpg')}>
          <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
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


          <View>
            <Text style={styles.text2}>Loại thông báo sửa chữa</Text>
          </View>

          <View style={{ marginLeft: 20, marginTop: 10 }}>

            <RadioForm formHorizontal={false} animation={true}  >
              {types3.map((obj, i) => {
                var onPress = (value, index) => {

                  setvalue3Index(index);
                }
                return (
                  <RadioButton labelHorizontal={true} key={i} >
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value3Index === i}
                      onPress={onPress}
                      buttonInnerColor={'rgba(0, 0, 255, 0.7)'}
                      buttonOuterColor={value3Index === i ? '#2196f3' : '#000'}
                      buttonSize={15}
                      buttonStyle={{}}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      onPress={onPress}
                      labelStyle={{ fontWeight: 'bold', color: '#2c3e50' }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                )
              })}
            </RadioForm>
          </View>
          <View style={{ flexDirection: 'row' }}>

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

          {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}
        </ImageBackground>
        </ScrollView>
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
    marginLeft: 10,

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
  badgeIconView:{
    position:'relative',
    padding:5
  },
  badge:{
    color:'#fff',
    position:'absolute',
    zIndex:10,
    top:1,
    right:1,
    padding:1,
    backgroundColor:'red',
    borderRadius:5
  }

});