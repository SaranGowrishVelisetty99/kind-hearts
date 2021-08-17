import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/myheader'
import db from '../config'
import firebase from 'firebase'

export default class OrphanageScreen extends Component {

    constructor(){
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            itemWanted: '',
            reasonToRequest: ''
        }
    }

    createUniqueId() {
      return Math.random().toString(36).substring(7);
    }

    addRequest = async (itemWanted, reasonToRequest) => {
      var userId = this.state.userId
      var randomRequestId = this.createUniqueId()
      db.collection('requestedItems').add({
        "userId": userId,
        "itemWanted": itemWanted,
        "reasonToRequest": reasonToRequest,
        "requestId": randomRequestId,
        "bookStatus": "requested",
        "date": firebase.firestore.FieldValue.serverTimestamp(),
      })

      this.setState({
        itemWanted: '',
        reasonToRequest: '',
      })

    }


    render(){
        console.log("17: ",this.state);
        return(
            <View>
                <MyHeader navigation={this.props.navigation}/>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <TextInput
                    style={styles.formTextInput}
                    label={"request item"}
                    placeholder={"enter What your orphanage is in need of?"}
                    containerStyle={{ marginTop: RFValue(60) }}
                    onChangeText={text => this.setState({
                        itemWanted: text
                    })}
                    value={this.state.itemWanted}
                    />
                  <TextInput
                    style={[styles.formTextInput, { height: 300 }]}
                    containerStyle={{ marginTop: RFValue(30) }}
                    multiline
                    numberOfLines={8}
                    label={"Reason"}
                    placeholder={"Why do you need the particular thing"}
                    onChangeText={(text) => {
                      this.setState({
                        reasonToRequest: text
                      })
                    }}
                    value={this.state.reasonToRequest}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.addRequest(this.state.itemWanted, this.state.reasonToRequest);
                    }}
                  >
                    <Text>Request</Text>
                  </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyBoardStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formTextInput: {
      width: "75%",
      height: 35,
      alignSelf: 'center',
      borderColor: '#ffab91',
      borderRadius: 10,
      borderWidth: 1,
      marginTop: 20,
      padding: 10,
    },
    button: {
      width: "75%",
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: "#ff5722",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: 20
    },
  }
  )