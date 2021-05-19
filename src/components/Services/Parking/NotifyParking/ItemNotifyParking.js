import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScreenKey, URL ,notifyBillContext} from '../../../../globals/constants'
import { Icon } from 'react-native-elements'
function ItemNotifyParking(props) {
    const changeReload=useContext(notifyBillContext).changeReload;
    const [status, setStatus] = useState();
    const [create_date,setCreate_date]=useState();
    const changeStatusNotify = async () => {
        const res = await fetch(URL + `api/noti-parking/change-is-read`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${props.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notice_id: props.item._id,
            })
        })
    }
    useEffect(() => {
        

        if (props.item.is_read_user) {
            setStatus(false);
         

        }
        else if (!props.item.is_read_user) {
            setStatus(true);
           
        }
        var date = new Date(props.item.create_date);
        setCreate_date(date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() + ":" + date.getSeconds());


    }, [props.status])
    const handleClick = () => {
        setStatus(false);
        changeStatusNotify();
        changeReload();
        props.navigation.navigate(ScreenKey.DetailNotifyParking, {
            item: props.item,
            token: props.token,
            create_date
        })
    }

    return (
        <View style={{ flexDirection: 'column', elevation: 2 }}>
            <TouchableOpacity style={styles.container1} onPress={handleClick}>
                <View style={{ flexDirection: 'column' }}>
                <Text style={styles.text}>{props.item.title}</Text>
                    <Text>{create_date}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 30 }}>

                    {status && (<Icon name='circle'
                        type='font-awesome'
                        color='#3498db'
                        size={20}
                    />)}

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
        marginTop: 7,
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
        justifyContent: 'space-between'


    },
    container2: {
        flexDirection: 'row',
        backgroundColor: "#BBBBBB",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
    },
    text: {
        flex: 1,
        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 10,
        fontSize: 20
    },
    status_wait: {
        fontSize: 12,
        color: '#e74c3c',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 0.3,
        textShadowColor: '#c0392b'
    },
    status: {
        fontSize: 12,
        color: '#f1c40f',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 0.3,
        textShadowColor: '#f1c40f'
    },
    status_done: {
        fontSize: 12,
        color: '#2ecc71',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 0.3,
        textShadowColor: '#2ecc71'
    },
});
export default React.memo(ItemNotifyParking);