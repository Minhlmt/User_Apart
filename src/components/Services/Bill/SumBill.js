import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
import { Text_Size, URL } from '../../../globals/constants'
import MonthPicker from 'react-native-month-year-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
var numeral = require('numeral');
import CalDate from './CalDate'
export default function SumBill({ route }) {
    const [electric, setElectric] = useState(0);
    const [water, setWater] = useState(0);
    const [other, setOther] = useState(0);
    const [sumPrice, setSumPrice] = useState(0);
    const [flag,setFlag]=useState(true);
    const [spinner, setSpinner] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const { monthYear, apartId, token } = route.params;
    
    const showPicker = useCallback((value) => setShow(value), []);
    let tempSum=0;
    const onValueChange = useCallback(
        (event, newDate) => {
            const selectedDate = newDate || date;

            showPicker(false);
            setDate(selectedDate);
            let mydate = CalDate(selectedDate);
            if (mydate.mm === monthYear.mm && mydate.yyyy === monthYear.yyyy) {


            }
            else {
                setMonth(mydate.mm);
                setYear(mydate.yyyy);
            }
           

        },
        [date, showPicker],
    );
    const getdata = async () => {
        /*get electric bill*/
        const res = await fetch(URL + `api/all-bill/bill/${apartId}/${month}/${year}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if(res.status===200){
            const result=await res.json();
            if(result.data.length!==0){
                setElectric(numeral(result.data.electric_bill.toString()).format('0,0'));
                setWater(numeral(result.data.water_bill.toString()).format('0,0'));
                setOther(numeral(result.data.other_bill.toString()).format('0,0'));
                setSumPrice(numeral(result.data.total_money.toString()).format('0,0'))
            }
            else{
                setElectric(0);
                setWater(0);
                setOther(0);
                setSumPrice(0);
            }
          
        }
        else{
            setElectric(0);
            setWater(0);
            setOther(0);
            setSumPrice(0);
        }
        setSpinner(false)

        
     
 
         


    }
    useEffect(() => {
        let monthtoday, yeartoday;

        let preMonth = (monthYear.mm - 1).toString();
        if (preMonth.length < 2)
            preMonth = '0' + preMonth;
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
        setSpinner(true);
        setFlag(false);
        getdata();
       

    }, [flag]);
    const handleClick = () => {
        setSpinner(true);
        getdata();
        
    }

    return (
        <ImageBackground  style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/bill1.jpg')}>
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
                <Text style={styles.text_title}>Thông số</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Tiền điện</Text>
                <Text style={styles.text}>{electric} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Tiền nước</Text>
                <Text style={styles.text}>{water} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Phí khác</Text>
                <Text style={styles.text}>{other} đ</Text>
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
        color: '#3498db'
    },
    text_sum: {
        color: 'black',
        fontSize: Text_Size.Text_sum,
        color: '#e67e22'
    }
});