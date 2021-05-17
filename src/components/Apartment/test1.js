import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text,PixelRatio, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, Text_Size } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import { Dimensions } from 'react-native';
const window = Dimensions.get('window');
export default function App() {
    return (
        <ScrollView>
            <View style={styles.container} >
                <View style={styles.background} >
                    {/* <Image style={styles.image} source={require('../../../image/sea.jpg')} /> */}
                    <ImageBackground source={require('../../../image/sea.jpg')} style={styles.image} imageStyle={{ borderRadius: 100}}>
                        <Text style={styles.text} adjustsFontSizeToFit>Thông tin cá nhân</Text>
                    </ImageBackground>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = {
    container: {
        alignSelf: 'center',
        width: window.width,
        overflow: 'hidden',
        height: window.width / 2.5
    },
    background: { // this shape is a circle 
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    image: {
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
        backgroundColor: '#9DD6EB'
    },
    text: {
        marginTop: window.height/9.5,
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
}