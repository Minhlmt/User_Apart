import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity } from 'react-native';
import { Text_Size, URL } from '../../globals/constants'
import ImagePicker from 'react-native-image-crop-picker';
import {ScreenKey} from '../../globals/constants'

export default function ChooseImage(props) {
  const   pickSingleWithCamera=(cropping, mediaType = 'photo') =>{
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
      includeBase64:true
    })
      .then((image) => {
        const imageBase64=image;
        props.navigation.navigate(ScreenKey.Complain,{
          imageBase64:imageBase64,
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          path:image.path
        })
        
      })
      .catch((e) => alert(e));
  }
  const  pickSingle=(cropit, circular = false, mediaType)=> {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
      // includeBase64:true
    })
      .then((image) => {
        
        const imageBase64=image;
        props.navigation.navigate(ScreenKey.Complain,{
          imageBase64:imageBase64,
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          path:image.path
        })
      
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }
  const handleCancel=()=>{
    props.navigation.navigate(ScreenKey.HomeService);
  }
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
      <View style={{ height: "36%", width: '100%', backgroundColor: "#fff", justifyContent: "center", alignItems:'stretch' }}>

        <Text style={styles.font_title}>Chọn ảnh từ:</Text>
      
        <View style={styles.borderView}>
        <TouchableOpacity onPress={()=>pickSingleWithCamera(false)}>
            <View style={{alignItems:'center'}}>
            <Text style={styles.font_size}>Camera</Text>
            </View>
           
          </TouchableOpacity>
        </View>
         <View style={styles.borderView}>
         <TouchableOpacity onPress={() => pickSingle(false)}>
            <View style={{alignItems:'center'}}>
            <Text style={styles.font_size}>Thư viện</Text>
            </View>
           
          </TouchableOpacity>
         </View>
          <View style={styles.borderView}>
          <TouchableOpacity onPress={handleCancel}>
            <View style={{alignItems:'center'}}>
            <Text style={styles.font_size}>Hủy</Text>
            </View>
           
          </TouchableOpacity>

          </View>
         
      
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  font_size: {
    fontSize: Text_Size.Text,
    padding:7,
    paddingLeft:20,
   
  },
  borderView:{
    borderBottomWidth:0.3
  },
  font_title:{
    color:"#1abc9c",
    fontSize: Text_Size.Text_title,
    padding:10,
    borderBottomWidth:0.3,
    borderColor:"#1abc9c"
  }

});
