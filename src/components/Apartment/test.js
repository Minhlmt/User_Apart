import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity ,ScrollView} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, Text_Size } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import { Dimensions } from 'react-native';
const window = Dimensions.get('window');
export default function Apartment(props) {
    // const { token, userId } = props.route.params;
    const[token,setToken]=useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYwMTQxOTk3MDkwMThhNWJkNGEwZGMwYiIsImlhdCI6MTYxNjE0NjQxMn0.azsSwM3EFd4ZqZ7DTmBlOBg3NAvhjxOXgq_f8Jz5C-E');
    const[userId,setUserId]=useState('603d0a6087e8ae0434c29f2d');
    const [apart, setApart] = useState([]);
    const [apartId, setApartId] = useState();
    const [types3, settypes3] = useState([{ label: 'param1', value: 0 }, { label: 'param2', value: 1 }, { label: 'param3', value: 2 },]);
    const [value3, setvalue3] = useState(0);
    const [value3Index, setvalue3Index] = useState(0);
    const getInfoApart = async () => {

        const res = await fetch(URL + `api/apart/all-aparts/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },

        })
        const result = await res.json();
        if (res.status === 200) {
            let block_Id = [];
            let name_apart=[];
            let block_name=[];
            let apart_Id=[];
            for (let t of result.data) {
                block_Id.push(t.block);
                name_apart.push(t.name);
                apart_Id.push(t._id);
            }
            for(let block_id of block_Id){
                const res_1 = await fetch(URL + `api/block/${block_id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + `${token}`,
                        'Content-Type': 'application/json',
                    },
        
                })
                const result_1 = await res_1.json();
                if(res_1.status===200){
                    block_name.push(result_1.data.name);
                }
               
            }
            let temp_apart=[]
            for (var i = 0; i < apart_Id.length; i++) {
                const temp = {
                            label: "toa: " + block_name[i] + " " + " nha: " + name_apart[i],
                            value: apart_Id[i]
                        }
                temp_apart.push(temp);
              }
            setApartId(temp_apart[0].value);
            setApart(temp_apart);
        }

    }

    useEffect(() => {
        getInfoApart();

    }, [token])

    const storeData = async (apartId) => {
        try {
            const jsonApartId = JSON.stringify(apartId);
            await AsyncStorage.setItem('apartId', jsonApartId);
        } catch (e) {
            // saving error
        }
    }
    const handleClick = () => {

        storeData(apartId);
        props.navigation.navigate(ScreenKey.Home);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.welcome}>Mời bạn chọn căn hộ</Text>
              
              
            
                <View style={styles.component}>
                    <RadioForm formHorizontal={false} animation={true}  >
                        {apart.map((obj, i) => {
                            var onPress = (value, index) => {
                                console.log("value ",value);
                                setApartId(value);
                                // setvalue3(value);
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
                                        buttonInnerColor={'#f39c12'}
                                        buttonOuterColor={value3Index === i ? '#2196f3' : '#000'}
                                        buttonSize={20}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginLeft: 10 }}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        onPress={onPress}
                                        labelStyle={{ fontWeight: 'bold', color: '#2ecc71',fontSize:20 }}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            )
                        })}
                    </RadioForm>
                    <Text>selected: {types3[value3Index].label}</Text>
                </View>
                

            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    component: {
        alignItems: 'center',
        marginBottom: 50,
    },
    radioStyle: {
        borderRightWidth: 1,
        borderColor: '#2196f3',
        paddingRight: 10
    },
    radioButtonWrap: {
        marginRight: 5
    },
});