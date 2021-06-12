import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, SectionList, Text, View, FlatList, Image } from 'react-native';
import ItemNotification from './Items/ItemNotification';
import ItemService from './Items/ItemService';
import { ScreenKey, notifyBillContext, Tab_Home_ProfileBillContext } from '../../globals/constants'
import { ImageBackground } from 'react-native';
import CalDate from '../Services/Bill/CalDate'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { URL } from '../../globals/constants'
import { TouchableOpacity } from 'react-native';
var numeral = require('numeral');
const window = Dimensions.get('window');
export default function Home(props) {
  const _notifyBill = useContext(notifyBillContext).notifyBill;
  const [newMessBill, setnewMessBill] = useState(_notifyBill);
  const reload = useContext(notifyBillContext).reloadBadge;
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [apartId, setApartId] = useState();
  const [token, setToken] = useState();
  const [flag, setFlag] = useState(true);
  const [sumMoney, setSumMoney] = useState();
  const [ruleDate, setRuleDate] = useState(10);
  const [bntComplain, setbtnComplain] = useState();
  const [is_pay, setIsPay] = useState();
  const [billId, setBillId] = useState();
  const [userId, setUserId] = useState();
  const [countMessParking, setCountMessParking] = useState();
  const [statusMessParking, setStatusMessParking] = useState(false);
  const [countMessRepair, setCountMessRepair] = useState();
  const [statusMessRepair, setStatusMessRepair] = useState(false);
  const [countMessFes, setCountMessFes] = useState();
  const [statusMessFes, setStatusMessFes] = useState(false);
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const apartId = await AsyncStorage.getItem('apartId');
      const infoUser = await AsyncStorage.getItem('infoUser');
      if (token != null) {
        const _token = JSON.parse(token);
        const _apartId = JSON.parse(apartId);
        const _infoUser = JSON.parse(infoUser);
        setUserId(_infoUser.id)
        setApartId(_apartId);
        setToken(_token);
        setFlag(false);
        getcountMessParking(_infoUser.id, _token);
        getcountMessRepair(_apartId, _token);
        getcountFestival(_infoUser.id, _token);

      }
    } catch (e) {
      // error reading value
    }
  }
  const fetchData1 = async () => {

    const res = await fetch(URL + `api/all-bill/bill/${apartId}/${month}/${year}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) {
      const result = await res.json();

      if (result.data.length === 0) {

        setSumMoney(0);
        setIsPay("Chưa có dữ liệu");

      }
      else {
        setSumMoney(numeral(result.data.total_money.toString()).format('0,0'));
        setBillId(result.data.id);

        if (result.data.is_pay) {
          setIsPay("Đã thanh toán");
        }
        else {
          setIsPay("Chưa thanh toán")
        }
        var today = new Date("2021-08-11");
        let date = CalDate(today);
        if (parseInt(date.dd) >= ruleDate && (!result.data.is_pay))
          return setbtnComplain(true);
        return setbtnComplain(false);

      }
    }
  }
  const getcountMessRepair = async (_apartId, _token) => {

    const res = await fetch(URL + `api/repair/count-notices/${_apartId}?is_read_user=false`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${_token}`,
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      const result = await res.json();
      setCountMessRepair(result.count);
      if (result.count === 0) {
        setStatusMessRepair(false);
      }
      else {
        setStatusMessRepair(true);
      }
    }
    else {
      setCountMessRepair(0);

    }



  }
  const getcountMessParking = async (_userId, _token) => {

    const res = await fetch(URL + `api/noti-parking/unread/${_userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${_token}`,
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) {
      const result = await res.json();
      setCountMessParking(result.unread);
      if (result.unread === 0) {
        setStatusMessParking(false);
      }
      else {
        setStatusMessParking(true);
      }


    }
    else {
      setCountMessParking(0);

    }
  }
  const getcountFestival = async (_userId, _token) => {
    const res = await fetch(URL + `api/register-service/all-register?user_id=${_userId}&is_read_user=false`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${_token}`,
        'Content-Type': "application/json",
      },
    })
    if (res.status === 200) {
      const result = await res.json();
      setCountMessFes(result.data.length);
      
      if (result.data.length === 0) {
        setStatusMessFes(false);
      }
      else {
        setStatusMessFes(true);
      }

    }
    else {
      setCountMessFes(0);

    }
  }
  const fetchData = async () => {
    await getData();
    await fetchData1()
  }

  useEffect(() => {

    var today = new Date("2021-08-11");


    let date = CalDate(today);
    let monthtoday, yeartoday;
    let preMonth = (date.mm - 1).toString();
    if (preMonth.length < 2) {
      preMonth = '0' + preMonth;
    }
    if (preMonth != 0) {
      monthtoday = preMonth;
      yeartoday = date.yyyy;
    }
    else {
      monthtoday = 12
      yeartoday = date.yyyy - 1;
    }
    setMonth(monthtoday);
    setYear(yeartoday);
    fetchData();
    getData();
  }, [month, year, flag])
  useEffect(() => {
    getcountMessParking(userId, token);
    getcountMessRepair(apartId, token);
    getcountFestival(userId, token)
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;

  }, [reload, props.navigation])
  useEffect(() => {
    setnewMessBill(_notifyBill);
  }, [_notifyBill])
  const handleUploadImage = () => {
    props.navigation.navigate(ScreenKey.Complain, {
      imageBase64: '',
      uri: '',
      width: '',
      height: '',
      mime: '',
      path: '',
      billId: billId
    });
  }
  const handleClickBill = () => {
    props.navigation.navigate(ScreenKey.Bill)

  }
  const handleClickRepair = () => {
    props.navigation.navigate(ScreenKey.Repair, {
      countMess: countMessRepair
    })
  }
  const handleClickApartEmpty = () => {
    props.navigation.navigate(ScreenKey.Apart_Empty, {
      token: token
    })
  }
  const handleClickParking = () => {
    props.navigation.navigate(ScreenKey.MainParking, {
      countMess: countMessParking
    })
  }
  const handleClickRegister = () => {
    props.navigation.navigate(ScreenKey.MainRegister)
  }
  const handleClickPost=()=>{
    props.navigation.navigate(ScreenKey.Post, {
      token: token
    })
  }
  return (
    // <Tab_Home_ProfileBillContext.Provider value={newMessBill}>
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
        <View style={styles.container1} >
          <View style={styles.background} >
            {/* <Image style={styles.image} source={require('../../../image/sea.jpg')} /> */}
            <ImageBackground source={require('../../../image/home.jpg')} style={styles.image}>
              <Text style={styles.text1} adjustsFontSizeToFit>Tiền cần thanh toán </Text>
              <Text style={styles.text2} adjustsFontSizeToFit>{sumMoney} VND</Text>
              <Text style={styles.text2} adjustsFontSizeToFit>{is_pay}</Text>
              {bntComplain && (<TouchableOpacity onPress={handleUploadImage}>
                <Text style={styles.text3} adjustsFontSizeToFit>Khiếu nại</Text>
              </TouchableOpacity>)}

            </ImageBackground>
          </View>
        </View>

        <View style={styles.margin_top}>
          <View style={styles.service_h}>
            <View style={styles.shadow_button}>
              <TouchableOpacity style={styles.container} onPress={handleClickBill}>
                <View style={styles.badgeIconView}>
                  {newMessBill && (<Text style={styles.badge}> N </Text>)}
                  <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/billHome.png')} />
                  <View>
                    <Text style={styles.text}>Hóa đơn</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.shadow_button}>
              <TouchableOpacity style={styles.container} onPress={handleClickRepair}>
                <View style={styles.badgeIconView}>
                  {statusMessRepair && (<Text style={styles.badge}> {countMessRepair} </Text>)}
                  <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/repairHome.png')} />
                  <View>
                    <Text style={styles.text}>Sửa chữa</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.shadow_button}>
              <TouchableOpacity style={styles.container} onPress={handleClickApartEmpty}>
                <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/apart-empty.png')} />
                <View>
                  <Text style={styles.text}>Căn hộ trống</Text>
                </View>
              </TouchableOpacity>
            </View>




          </View>
        </View>
        <View style={styles.service_v}>
          <View style={styles.service_h}>
            <View style={styles.shadow_button}>
              <TouchableOpacity style={styles.container} onPress={handleClickParking}>
                <View style={styles.badgeIconView}>
                  {statusMessParking && (<Text style={styles.badge}> {countMessParking} </Text>)}
                  <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/parking.png')} />
                  <View>
                    <Text style={styles.text}>Bãi xe</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.shadow_button}>
              <TouchableOpacity style={styles.container} onPress={handleClickRegister}>
                <View style={styles.badgeIconView}>
                  {statusMessFes && (<Text style={styles.badge}> {countMessFes} </Text>)}
                  <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/festival.png')} />
                  <View>
                    <Text style={styles.text}>Dịch vụ</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>







            <View style={styles.shadow_button}>
              <TouchableOpacity style={styles.container} onPress={handleClickPost}>
              
                  <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/post.png')} />
                  <View>
                    <Text style={styles.text}>Bài đăng</Text>
                  </View>
              
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
    // </Tab_Home_ProfileBillContext.Provider>
  )
}
const styles = StyleSheet.create({

  service_h: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  service_v: {
    marginTop: 40
  },
  margin_top: {
    marginTop: 15
  },
  container1: {
    alignSelf: 'center',
    width: window.width,
    overflow: 'hidden',
    height: window.width / 2
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
  text1: {
    marginTop: window.height / 20,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
    // backgroundColor: "#000000a0"
  },
  text2: {
    marginTop: 10,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#000000a0"
  },
  text3: {
    marginTop: 10,
    color: "red",
    fontSize: 20,

    textAlign: "center",
    // backgroundColor: "#000000a0"
    textDecorationLine: 'underline'
  },
  container: {
    display: 'flex',
    //   justifyContent:'center',
    alignItems: 'center',
    // backgroundColor:'transparent'

  },
  tinyLogo: {
    width: 80,
    height: 80,


  },
  logo: {
    width: 66,
    height: 58,
  },
  text: {
    color: 'black',
    marginBottom: 10,
    fontSize: 20
  },
  shadow_button: {
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 4,
    // backgroundColor:'red',

  },
  badgeIconView: {
    position: 'relative',
    padding: 5
  },
  badge: {
    color: '#fff',
    position: 'absolute',
    zIndex: 10,
    top: 1,
    right: 1,
    padding: 1,
    backgroundColor: 'red',
    borderRadius: 5
  }
});