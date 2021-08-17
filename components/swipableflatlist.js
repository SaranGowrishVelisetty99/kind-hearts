import React, { Component } from 'react'
import { View, Text, Animated, Dimensions, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import {SwipeListView} from 'react-native-swipe-list-view'

export default class SwipeableFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotifications: this.props.allNotifications
        };
    }

    updateMarkAsread = (notification) => {
        db.collection('allNotifications').doc(notification.doc_id).update({
          notificationStatus: 'read',
        });
      };
    
      closeRow = (item, key) => {
        if (item[key]) {
          item[key].closeRow();
        }
      };
    
      deleteRow = (item, key) => {
        var allNotifications = this.state.allNotifications;
        this.closeRow(item, key);
        const newData = [...allNotifications];
        const prevIndex = allNotifications.findIndex((item) => item.key === key);
        this.updateMarkAsread(allNotifications[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({ allNotifications: newData });
      };
    
      onRowDidOpen = (key) => {
        console.log('This row opened', key);
      };
    
      renderItem = (data) => (
        <Animated.View>
          <ListItem
            leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
            title={data.item.itemName}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={data.item.message}
            bottomDivider
          />
        </Animated.View>
      );
    
      renderHiddenItem = (data, item) => (
        <View style={styles.rowBack}>
          <Text>Left</Text>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => this.closeRow(item, data.item.key)}>
            <Text style={styles.backTextWhite}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => this.deleteRow(item, data.item.key)}>
            <Text style={styles.backTextWhite}>Mark as Read</Text>
          </TouchableOpacity>
        </View>
      );

    // updateMarkAsread = notification => {
    //     db.collection("allNotifications")
    //         .doc(notification.doc_id)
    //         .update({
    //             notificationStatus: "read"
    //         });
    // };

    // onSwipeValueChange = swipeData => {
    //     var allNotifications = this.state.allNotifications;
    //     const { key, value } = swipeData;
    //     if (value < -Dimensions.get("window").width) {
    //         const newData = [...allNotifications];
    //         this.updateMarkAsread(allNotifications[key]);
    //         newData.splice(key, 1);
    //         this.setState({ allNotifications: newData });
    //     }
    // };
    // renderItem = data => (
    //     <Animated.View>
    //         <ListItem
    //             leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
    //             title={data.item.itemName}
    //             titleStyle={{ color: "black", fontWeight: "bold" }}
    //             subtitle={data.item.message}
    //             bottomDivider
    //         />
    //     </Animated.View>
    // );
    // renderHiddenItem = () => (
    //     <View style={styles.rowBack}>
    //         <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
    //             <Text style={styles.backTextWhite}>Mark as read</Text>
    //         </View>
    //     </View>
    // );

    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    disableRightSwipe
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get("window").width}
                    previewRowKey={"0"}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    backTextWhite: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        alignSelf: "flex-start"
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: "#29b6f6",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15
    },
    backRightBtn: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: 100
    },
    backRightBtnRight: {
        backgroundColor: "#29b6f6",
        right: 0
    }
});