

import React, { Component, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';



const App = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  const [imagebase64,setImageBase64]=useState('');
  const pickMultiple=()=> {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then((images) => {
        setImage(null);
        setImages(images.map((i) => {
          console.log('received image', i);
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
          };
        }),)
        
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
      includeBase64:true
    })
      .then((image) => {
       
        // console.log('received image', image);
       
        setImage({
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
        });
        setImageBase64('data:image/png;base64,'+image.data);
        setImages(null);
      
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }
  const   pickSingleWithCamera=(cropping, mediaType = 'photo') =>{
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
      
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        })
        setImages(null)
      })
      .catch((e) => alert(e));
  }
  const renderAsset = (image) => {
    // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
    //   return this.renderVideo(image);
    // }

    return renderImage(image);
  }
  const renderImage = (image) => {
    return (
      <Image
        style={{ width: 100, height: 100, resizeMode: 'contain' }}
        source={image}
      />
    );
  }
  const uploadImage = async (base64EncodedImage) => {
    try {
        const res=await fetch('https://qlcc-api.herokuapp.com/api/upload-image/upload', {
            method: 'POST',
            body:JSON.stringify({ data: base64EncodedImage }),
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYwMTQxOTk3MDkwMThhNWJkNGEwZGMwYiIsImlhdCI6MTYxNjE0NjQxMn0.azsSwM3EFd4ZqZ7DTmBlOBg3NAvhjxOXgq_f8Jz5C-E' ,
               'Content-Type': 'application/json' },
        });
        const result=await res.json();
        console.log(res.status);
        console.log(result);
       
    } catch (err) {
        console.error(err);
        setErrMsg('Something went wrong!');
    }
};
  const hanldeSubmit=()=>{
    console.log(imagebase64)
   uploadImage(imagebase64)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {image ? renderAsset(image) : null}
        {images
          ? images.map((i) => (
            <View key={i.uri}>{renderAsset(i)}</View>
          ))
          : null}
      </ScrollView>
      <TouchableOpacity
        onPress={() => pickSingleWithCamera(false)}
        style={styles.button}
      >
        <Text style={styles.text}>Select Single Image With Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => pickSingle(false)}
          style={styles.button}
        >
          <Text style={styles.text}>Select Single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickMultiple}
          style={styles.button}
        >
          <Text style={styles.text}>Select Multiple</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={hanldeSubmit}>
          <Text>upload image</Text>

        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
