import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';
import MyHeader from '../components/myheader.js';

export default class RecieverDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      recieverId: this.props.navigation.getParam('details')["userId"],
      requestId: this.props.navigation.getParam('details')["requestId"],
      itemWanted: this.props.navigation.getParam('details')["itemWanted"],
      reasonForRequesting: this.props.navigation.getParam('details')["reasonToRequest"],
      recieverName: '',
      recieverContact: '',
      recieverAddress: '',
      recieverRequestDocId: '',
      username: ''
    }
  }
  getUserDetails = (userId) => {
    db.collection("donors").where('emailId', '==', userId).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            username: doc.data().FirstName
          })
        })
      })
      console.log("Line 33 ",this.state.username);
  }

  getRecieverDetails() {
    db.collection('orphanages').where('emailId', '==', this.state.recieverId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
            recieverName: doc.data().orphanageName,
            recieverContact: doc.data().contact,
            recieverAddress: doc.data().Address,
          })
        })
      });

    db.collection('requestedItems').where('requestId', '==', this.state.requestId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({ recieverRequestDocId: doc.id })
        })
      })
  }

 updateItemsStatus = () => {
    console.log("Update");
    db.collection('allDonations').add({
      itemName: this.state.itemWanted,
      requestId: this.state.requestId,
      requestedBy: this.state.recieverName,
      donorId: this.state.userId,
      requestStatus: "Donor Interested"
    })
  }



  componentDidMount() {
    this.getRecieverDetails();
    this.getUserDetails(this.state.userId)
  }

  addNotification = () => {
    var message = this.state.username + ' has shown interest in donating the book!';
    db.collection("allNotifications").add({
      targetedUserId: this.state.recieverId,
      donorId: this.state.userId,
      requestId: this.state.requestId,
      itemName: this.state.itemWanted,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notificationStatus: "unread",
      message: message
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <MyHeader navigation={this.props.navigation}/>
        </View>
        <ScrollView style={{flex: 1, height: '100%'}}>
        <View>
          <Card
            title={"Item In Need"}
            titleStyle={{ fontSize: 20 }}
          >
            <Card >
              <Text style={{ fontWeight: 'bold' }}>Name : {this.state.itemWanted}</Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Reason : {this.state.reasonForRequesting}</Text>
            </Card>
          </Card>
        </View>
        <View>
          <Card
            title={"Reciever Information"}
            titleStyle={{ fontSize: 20 }}
          >
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
              ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    console.log("Button Pressed");
                    this.updateItemsStatus()
                    this.addNotification()
                    this.props.navigation.navigate('Contributions')
                  }}>
                  <Text>I want to Donate</Text>
                </TouchableOpacity>
              )
              : null
          }
        </View>
        </ScrollView>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'orange',
    elevation: 16
  }
})