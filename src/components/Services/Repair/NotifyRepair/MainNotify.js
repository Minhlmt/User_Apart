import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScreenKey, URL, notifyBillContext } from '../../../../globals/constants'
import { Icon } from 'react-native-elements'
export default function MainNotify(props) {
    const { token, userId, apartId } = props.route.params;
    const reload = useContext(notifyBillContext).reloadBadge;
    const [countSelf, setCountSelf] = useState(0);
    const [statusCountSelf, setStatusCountSelf] = useState(false);
    const [countServices, setCountServices] = useState(0);
    const [statusCountServices, setStatusCountServices] = useState(false);

    const countMessSelf = async () => {
        console.log("APART ", apartId);
        const res = await fetch(URL + `api/repair/count-notices/${apartId}?type=1&is_read_user=false`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })
        console.log(res.status);
        if (res.status === 200) {
            const result = await res.json();
            console.log("COUNTMESS ", result)
            setCountSelf(result.count);
            if (result.count === 0) {
                setStatusCountSelf(false)
            }
            else {
                setStatusCountSelf(true);
            }

        }
    }

    const countMessServices = async () => {
        console.log("APART ", apartId);
        const res = await fetch(URL + `api/repair/count-notices/${apartId}?type=2&is_read_user=false`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })
        console.log(res.status);
        if (res.status === 200) {
            const result = await res.json();
            setCountServices(result.count);
            if (result.count === 0) {
                setStatusCountServices(false)
            }
            else {
                setStatusCountServices(true);
            }

        }
    }
    useEffect(() => {
        countMessSelf();
        countMessServices();
        const unsubscribe = props.navigation.addListener('focus', () => {
            countMessSelf();
            countMessServices();
         });
       
         return unsubscribe;

    }, [reload,props.navigation])




    const notifyPublic = () => {
        props.navigation.navigate(ScreenKey.NotifyRepairPublic, {
            token,
            userId,
            apartId
        })
    }
    const notifySelfRepair = () => {
        props.navigation.navigate(ScreenKey.NotifySelfRepair, {
            token,
            userId,
            apartId
        });
    }
    const notifyServivesRepair = () => {
        props.navigation.navigate(ScreenKey.NotifyServiceRepair, {
            token,
            userId,
            apartId
        });
    }
    return (
        <View>
            <View style={styles._title}>
                <Text style={styles._text_title} >{`Thông báo`}</Text>

            </View>
            <TouchableOpacity style={styles.container1} onPress={notifyPublic}>

                {/* <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} resizeMode='contain' source={require('../../../../image/createuser.png')} /> */}
                <Text style={styles.text}>Thông báo chung</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container1} onPress={notifySelfRepair}>

                {/* <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} resizeMode='contain' source={require('../../../../image/billHistory.png')} /> */}
                <Text style={styles.text}>Tự sữa chữa </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>

                    <View style={styles.badgeIconView}>
                        {statusCountSelf && (<Text style={styles.badge}>{countSelf}</Text>)}
                    </View>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container1} onPress={notifyServivesRepair}>

                {/* <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} resizeMode='contain' source={require('../../../../image/billHistory.png')} /> */}
                <Text style={styles.text}>Sử dụng dịch vụ </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
                    <View style={styles.badgeIconView}>
                        {statusCountServices && (<Text style={styles.badge}>{countServices}</Text>)}
                    </View>

                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 20,
        paddingHorizontal: 12,
        elevation: 8,
    },
    _text_title: {
        fontSize: 20,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
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
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10
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
        padding: 3,
        backgroundColor: 'red',
        borderRadius: 5
    }
})