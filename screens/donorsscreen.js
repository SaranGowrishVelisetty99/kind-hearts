import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList,TouchableOpacity,Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/myheader'

export default class DonorScreen extends Component {
    constructor(){
        super()
        this.state = {
          userId: firebase.auth().currentUser.email,
          requestedItemsList : []
        }
      this.requestRef= null
      }
    
      getRequestedItemsList =()=>{
        this.requestRef = db.collection("requestedItems")
        .onSnapshot((snapshot)=>{
          var requestedItemsList = snapshot.docs.map(document => document.data());
          this.setState({
            requestedItemsList : requestedItemsList
          });
        })
      }
    
      componentDidMount(){
        this.getRequestedItemsList()
      }
    
      componentWillUnmount(){
        this.requestRef;
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.itemWanted}
            subtitle={item.reasonToRequest}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
              <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                console.log("button pressed!");
                this.props.navigation.navigate("RecieverDetails",{"details":item})
              }}>
                <Text style={{color:'#ffff'}}>View</Text>
              </TouchableOpacity>
              }
            bottomDivider
          />
        )
      }
    
      render(){
        return(
          <View style={{flex:1}}>
            <MyHeader navigation={this.props.navigation}/>
            <View style={{flex:1}}>
              {
                this.state.requestedItemsList.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Requested</Text>
                  </View>
                )
                :(
                  <FlatList
                    style={{marginTop: 10}}
                    keyExtractor={this.keyExtractor}
                    data={this.state.requestedItemsList}
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
      subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "#ff5722"
      }
    })