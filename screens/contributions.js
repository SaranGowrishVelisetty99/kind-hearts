import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import MyHeader from '../components/myheader'
import firebase from 'firebase'
import { ListItem, Icon } from 'react-native-elements';
import db from '../config'

export default class Contributions extends Component {
    static navigationOptions = { header: null };
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allDonations: [],
            donorName: ''
        }
        this.requestRef = null;
    }
    getDonorDetails = (userId) => {
        db.collection("donors").where("emailId", "==", userId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        "donorName": doc.data().FirstName + " " + doc.data().LastName
                    })
                });
            })
    }

    getAllDonations =()=>{
        this.requestRef = db.collection("allDonations").where("donorId" ,'==', this.state.userId)
        .onSnapshot((snapshot)=>{
          //var allDonations = snapshot.docs.map(document => document.data());
          var allDonations = [];
           snapshot.docs.map((doc) => {
             var donation = doc.data();
             donation['docId'] = doc.id;
             allDonations.push(donation);
           });
          this.setState({
            allDonations : allDonations,
          });
        })
      }
    sendItem = (itemDetails) => {
        if (itemDetails.requestStatus === "Item sent") {
            var requestStatus = "Donor Interested";
            console.log(itemDetails)
            db.collection("allDonations").doc(itemDetails.docSd).update({
                'requestStatus': "Donor Interested"
            })
            this.sendNotification(itemDetails, requestStatus)
            console.log('Here')
        }
        else {
            var requestStatus = "item Sent";
            console.log("item Send: ", itemDetails.docId)
            db.collection("allDonations").doc(itemDetails.docId).update({
                'requestStatus': "item Sent"
            })
            this.sendNotification(itemDetails, requestStatus)
            console.log('Here item Send')
        }
    }

    sendNotification = (itemDetails, requestStatus) => {
        var requestId = itemDetails.requestId;
        var donorId = itemDetails.donorId;
        db.collection("allNotifications")
            .where("requestId", "==", requestId)
            .where("donorId", "==", donorId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var message = ""
                    if (requestStatus === "item Sent") {
                        message = this.state.donorName + " sent you the item you want"
                    } else {
                        message = this.state.donorName + " has shown interest in donating the the item you want"
                    }
                    db.collection("allNotifications").doc(doc.id).update({
                        "message": message,
                        "notificationStatus": "unread",
                        "date": firebase.firestore.FieldValue.serverTimestamp()
                    })
                });
            })
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => (
        <ListItem
            key={i}
            title={item.itemName}
            subtitle={"Requested By: " + item.requestedBy + "\nStatus : " + item.requestStatus}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor: item.requestStatus === "item Sent" ? "green" : "#ff5722"
                        }
                    ]}
                    onPress={() => {
                        this.sendItem(item)
                    }}
                >
                    <Text style={{ color: '#ffff' }}>
                        {
                            item.requestStatus === "item Sent" ? "item Sent" : "Send item"
                        }
                    </Text>
                </TouchableOpacity>
            }
            bottomDivider
        />
    )


    componentDidMount() {
        this.getDonorDetails(this.state.userId);
        this.getAllDonations();
    }

    componentWillUnmount() {
        this.requestRef();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader navigation={this.props.navigation}/>
                <View style={{ flex: 1 }}>
                    {
                        this.state.allDonations.length === 0
                            ? (
                                <View style={styles.subtitle}>
                                    <Text style={{ fontSize: 20 }}>List Of All Donations</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allDonations}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 16
    },
    subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})