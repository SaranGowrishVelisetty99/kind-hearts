import React, { Component } from 'react';
import { View, Text, Image} from 'react-native'
import {Header, Icon, Badge} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'


export default class MyHeader extends Component {

    constructor(props){
        super(props)
        this.state={
          value:"",
          userId:firebase.auth().currentUser.email,
        }
      }
    
    getNumberOfUnreadNotifications(){
      db.collection('allNotifications').where('notificationStatus','==',"unread").where("targetedUserId", '==', this.state.userId)
      .onSnapshot((snapshot)=>{
        var unreadNotifications = snapshot.docs.map((doc) => doc.data())
        this.setState({
          value: unreadNotifications.length
        })
      })
    }
    
    componentDidMount(){
      this.getNumberOfUnreadNotifications()
    }

    BellIconWithBadge=()=>{
        return(
          <View>
            <Icon name='bell' type='font-awesome' color='#696969' size={25}
              onPress={() =>this.props.navigation.navigate('Notifications')}/>
             <Badge
              value={this.state.value}
             containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
          </View>
        )
      }

    render(){
        return(
            <View>
                <Header
                leftComponent={<Image style={{height: 80, width:80}} source={require('../assets/icon.png')}/>}
                centerComponent={<Text style={{fontWeight: 'bold', fontSize: 30}}>Kind Hearts</Text>} 
                rightComponent={<this.BellIconWithBadge {...this.props}/>}
                backgroundColor={'skyblue'}
                />
            </View>
        );
    }
}