import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
import { Text_Size, URL } from '../../../globals/constants'
import MonthPicker from 'react-native-month-year-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
var numeral = require('numeral');
import CalDate from './CalDate'
export default function ElectricBill({ route }) {
  const [park,setPark]=useState(0);
  const [garbage,setGarbage]=useState(0);
  const [maintenance,setMaintenance]=useState(0);
  const [apart_manage,setApartManage]=useState(0);
  const [other,setOther]=useState(0);
  const [note,setNote]=useState('');
  const [spinner, setSpinner] = useState(false);
  const [sumPrice,setSumPrice]=useState(0);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [flag,setFlag]=useState(true);
  
  const { monthYear,apartId,token } = route.params;
  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
      (event, newDate) => {
          const selectedDate = newDate || date;

          showPicker(false);
          setDate(selectedDate);
          let mydate=CalDate(selectedDate);
          if(mydate.mm===monthYear.mm && mydate.yyyy===monthYear.yyyy){
              

          }
          else{
              setMonth(mydate.mm);
              setYear(mydate.yyyy);
          }
         
       
      },
      [date, showPicker],
  );
  const senddata = async () => {
      const res = await fetch(URL+`api/other-bill/month-bill/${apartId}/${month}/${year}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + `${token}`,
          'Content-Type': 'application/json',
        },
      })
     
  
      setSpinner(false);
      if(res.status===200)
      {
        const result = await res.json();
       
         if(result.data!==null){
            let _apart_manage=numeral(result.data.apart_management.toString()).format('0,0');
            setApartManage(_apart_manage);
            let _park=numeral(result.data.parking_fees.toString()).format('0,0');
            setPark(_park);
            let _maintenance=numeral(result.data.maintenance_fee.toString()).format('0,0');
            setMaintenance(_maintenance);
            let _garbage=numeral(result.data.service_charge.toString()).format('0,0');
            setGarbage(_garbage);
            let _other=numeral(result.data.other_fees.toString()).format('0,0');
            setOther(_other);
            let _sumPrice= result.data.apart_management+result.data.parking_fees+result.data.maintenance_fee
            +result.data.service_charge+result.data.other_fees;
            let _sumPriceFormat=numeral(_sumPrice.toString()).format('0,0');
            setNote(result.data.note);
           setSumPrice(_sumPriceFormat);
         }
         else{
            setApartManage(0);
            setPark(0);
            setMaintenance(0);
            setGarbage(0);
            setOther(0);
            setSumPrice(0);

         }
        
      }
    
  
    }
  useEffect(() => {
      let monthtoday, yeartoday;
      let preMonth = (monthYear.mm - 1).toString();
      if (preMonth.length < 2)
      {
          preMonth = '0' + preMonth;
         
      }
      if (preMonth != 0) {
          monthtoday = preMonth;
          yeartoday = monthYear.yyyy;
      }
      else {
          monthtoday = 12
          yeartoday = monthYear.yyyy - 1;
      }
      
      setMonth(monthtoday);
      setYear(yeartoday);
      setFlag(false);
      senddata();
    
  }, [flag]);
  const handleClick=()=>{
    setSpinner(true);
      senddata();
  }
    return (
        <ImageBackground  style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/bill4.jpg')}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => showPicker(true)}>
                    <Text style={styles.text}>Tháng {month}, năm {year}</Text>
                </TouchableOpacity>
                

                <TouchableOpacity onPress={handleClick}>
                <Icon name='search1'
                        type='antdesign'
                        color='#f1c40f'
                        size={25}
                />
                </TouchableOpacity>
                {show && (
                    <MonthPicker
                        onChange={onValueChange}
                        value={date}
                        minimumDate={new Date(2019, 0)}
                        maximumDate={new Date()}

                    />
                )}
            </View>
            <View style={styles.container}>
                <Text style={styles.text_title}>Danh mục</Text>
                <Text style={styles.text_title}>Số tiền</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Giữ xe</Text>
                <Text style={styles.text}>{park} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Phí đổ rác</Text>
                <Text style={styles.text}>{garbage} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Quản lý chung cư</Text>
                <Text style={styles.text}>{apart_manage} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Bảo trì chung cư</Text>
                <Text style={styles.text}>{maintenance} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Phí khác</Text>
                <Text style={styles.text}>{other} đ</Text>
            </View>
            <View style={styles.container}>
             
                <Text style={styles.text}>Ghi chú: {note} </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text_sum}>Tổng tiền</Text>
                <Text style={styles.text_sum}>{sumPrice} đ</Text>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: Text_Size.Text
    },
    text_title: {
        color: 'black',
        fontSize: Text_Size.Text_title,
       color:'#3498db'
    },
    text_sum: {
        color: 'black',
        fontSize: Text_Size.Text_sum,
       color:'#e67e22'
    }
});