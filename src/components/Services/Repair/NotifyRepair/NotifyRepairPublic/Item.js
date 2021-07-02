import React, { useEffect, useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScreenKey, URL, notifyBillContext } from '../../../../../globals/constants'
function ItemParking(props) {
    const [create_date, setCreate_date] = useState();
    const [rate, setRate] = useState('');
    const [isreaduser, setIsReadUser] = useState();
    const changeReload = useContext(notifyBillContext).changeReload;
    useEffect(() => {
        var date = new Date(props.item.create_date);

        setCreate_date(date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() + ":" + date.getSeconds());


        if (props.item.is_read_user)
            setIsReadUser(false);
        else
            setIsReadUser(true);
        if (props.item.type === 2 && props.item.status === 2 && !props.item.evaluation.is_evaluate) {

            setRate(<Icon name='star'
                type='antdesign'
                color='#f39c12'
                size={30}
            />)
        }
        else {
            setRate('');
        }


    }, [props.item.create_date])
    const changeIsRead = async () => {
        const res = await fetch(URL + `api/repair/user/update-is-read`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${props.token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                notice_id: props.item._id,
                user_status: true

            })
        })

        if (res.status === 200) {
            const result = await res.json();

        }
    }
    const handleDetail = () => {

        if (props.item.type === 0) {
            props.navigation.navigate(ScreenKey.DetailPublic, {
                item: props.item,
                create_date,
                token: props.token
            })
        }
        else if (props.item.type === 1) {
            if (props.item.status === 1) {
                changeIsRead();
                // changeReload();
                setIsReadUser(false);
            }

            props.navigation.navigate(ScreenKey.DetailSelf, {
                item: props.item,
                create_date,
                token: props.token
            })
        }
        else {
            if (props.item.status === 1 || props.item.status === 2 || props.item.status === 3) {
                changeIsRead();
                // changeReload();
                setIsReadUser(false);
            }

            props.navigation.navigate(ScreenKey.DetailServices, {
                item: props.item,
                create_date,
                token: props.token
            })
        }

    }
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.container1} onPress={handleDetail}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{props.item.title} </Text>
                    <Text style={styles.sumPrice}>{create_date} </Text>

                </View>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontWeight: 'bold',alignSelf:'center' }}>{rate}</Text>
                    <View style={{ flexDirection: 'column' }}>
                        <Icon name='arrow-forward-ios'
                            type='material'
                            color='#3498db'
                            size={20}
                            style={{ alignItems: 'flex-end' }}
                        />
                        {isreaduser && (<Icon name='circle'
                            type='font-awesome'
                            color='#2980b9'
                            size={20}
                        />)}
                    </View>
                </View>


            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        padding: 8,
        paddingVertical: 14,
        paddingHorizontal: 15,
        elevation: 3,
        justifyContent: 'space-between'


    },
    text: {
        flex: 1,
        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 5,
        fontSize: 20
    },
    status_done: {
        color: 'red'
    },
    status_false: {
        color: 'red'
    },
    sumPrice: {
        color: '#800000'
    }
});
export default React.memo(ItemParking);