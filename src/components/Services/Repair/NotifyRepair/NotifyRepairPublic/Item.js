import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScreenKey } from '../../../../../globals/constants'
function ItemParking(props) {
    const [create_date, setCreate_date] = useState();
    useEffect(() => {
        var date = new Date(props.item.create_date);

        setCreate_date(date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() + ":" + date.getSeconds());
    }, [props.item.create_date])

    const handleDetail = () => {
        console.log(props.item.type);
        if (props.item.type === 0) {
            props.navigation.navigate(ScreenKey.DetailPublic, {
                item: props.item,
                create_date,
                token: props.token
            })
        }
        else if (props.item.type === 1) {
            props.navigation.navigate(ScreenKey.DetailSelf, {
                item: props.item,
                create_date,
                token: props.token
            })
        }
        else {
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
                <View style={{ flexDirection: 'column' }}>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                        style={{ alignItems: 'flex-end' }}
                    />
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