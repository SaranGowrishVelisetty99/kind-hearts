import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/myheader';
import db from '../config';
import SwipeableFlatList from '../components/swipableflatlist'

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        };

        this.notificationRef = null
    }

    getNotifications = () => {
        this.requestRef = db.collection("allNotifications")
            .where("notificationStatus", "==", "unread")
            .where("targetedUserId", '==', this.state.userId)
            .onSnapshot((snapshot) => {
                var allNotifications = []
                snapshot.docs.map((doc) => {
                    var notification = doc.data()
                    notification["docId"] = doc.id
                    allNotifications.push(notification)
                });
                this.setState({
                    allNotifications: allNotifications
                });
            })
            console.log();
    }

    componentDidMount() {
        this.getNotifications()
    }

    componentWillUnmount() {
        this.notificationRef;
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                leftElement={<Icon name="book" type="font-awesome" color='#696969' />}
                title={item.bookName}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitle={item.message}
                bottomDivider
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1 }}>
                    <MyHeader navigation={this.props.navigation} />
                </View>
                <View style={{ flex: 0.9 }}>
                    {
                        this.state.allNotifications.length === 0
                            ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 25 }}>You Have No Notifications</Text>
                                </View>
                            )
                            : (
                                <SwipeableFlatList allNotifications={this.state.allNotifications}/>
                            )
                    }
                </View>
                <TouchableOpacity
                style={styles.backbutton}
                >
                <Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})