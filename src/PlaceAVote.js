'use strict';
/* @flow */


/**
*  The version of the app but not  displayed yet
*/


/*
  React and React native imports
*/
import React from 'react';
import {BackAndroid, Platform, Linking, NetInfo} from 'react-native';

import PushNotification from 'react-native-push-notification';

/*
  Our router imports
*/

import Routes from './router/Routes'


/**
* ### Redux
*
*/
import {
connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';

import Orientation from 'react-native-orientation';

import * as routingActions from './reducers/routing/routingActions';
import * as deviceActions from './reducers/device/deviceActions';

import {ScheneKeys} from './config/constants';
const {
NO_INTERNET_MODAL
} = ScheneKeys












/**
*   ## Redux boilerplate
*   Redux bindings so that we can use, this props.actions and this props.<
*
*/
const actions = [
  routingActions,
  deviceActions,
];
function routerStateToProps(state){
  return {
      curScene: state.router.currentSchene
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}



















/*
       \/    \/    \/     PROJECT STARTS HERE     \/    \/    \/
*/
class PlaceAVote extends React.Component {


    constructor(props){
      super(props)
    }







    componentWillMount(){



      //Connectivity handling
      NetInfo.fetch().done(this.handleConnectivityChange.bind(this));
      NetInfo.addEventListener('change', this.handleConnectivityChange.bind(this));


      //Android back button handling
      BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackBtnPress.bind(this));


      //Deep linking handling
      Linking.getInitialURL().then(this.handleDeepLink.bind(this)).catch(err => console.error('An error occurred', err));


      //Orientation handling
      let initialOrientation = Orientation.getInitialOrientation();
      this.props.actions.setOrientation(initialOrientation);

      //Push notifications
      PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: this.registerForPushNotifications.bind(this),

        // (required) Called when a remote or local notification is opened or received
        onNotification: this.onPushNotificationReceived.bind(this),

        // ANDROID ONLY: (optional) GCM Sender ID.
        senderID: "YOUR GCM SENDER ID",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * IOS ONLY: (optional) default: true
          * - Specified if permissions will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });
    }


    componentWillUnmount() {
      Orientation.removeOrientationListener(this.orientationDidChange.bind(this));
      NetInfo.removeEventListener('change', this.handleConnectivityChange.bind(this));
      BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBackBtnPress.bind(this));
    }

    componentDidMount() {
      Orientation.addOrientationListener(this.orientationDidChange.bind(this));
      this.props.actions.unlockOrientation();
    }

    registerForPushNotifications(deviceToken){
      console.log( 'Push Notifications token:'+ deviceToken );
    }

    onPushNotificationReceived(notification){
      console.log( 'Push Notifications received:'+ notification );
      /* This is a typical notification
      {
          foreground: false, // BOOLEAN: If the notification was received in foreground or not
          message: 'My Notification Message', // STRING: The notification message
          data: {}, // OBJECT: The push data
      }
      */
    }


    handleAndroidBackBtnPress(){
      switch(this.props.curScene){
        case ScheneKeys.SPLASH_SCREEN:
        case ScheneKeys.ONBOARDING:
        case ScheneKeys.MAIN:
        case ScheneKeys.TAB_NEWS:
        case ScheneKeys.TAB_NOTIFS:
        case ScheneKeys.TAB_PROFILE:
          return false;
        default:
          this.props.actions.navigateToPrevious();
          return true;
      }
    }


    handleConnectivityChange(newStatus){
      // console.log('@@ will mount '+this.props.router.currentSchene);
      if(newStatus=="none" || newStatus=="NONE"){ //if theres no connectivity
          if(this.props.curScene != NO_INTERNET_MODAL){ //if we're NOT currently on the NO_INTERNET_MODAL schene
              this.props.actions.navigateTo(NO_INTERNET_MODAL, {hide:false});
          }
      }else{
        if(this.props.curScene == NO_INTERNET_MODAL){ //if we're currently on the NO_INTERNET_MODAL schene
          this.props.actions.navigateToPrevious();  //Shut the no internet connectivity modal.
        }
      }
    }

    handleDeepLink(url){
      if (url) {
        console.log('Initial url is: ' + url);
      }else{
        console.log('NO initial url');
      }
    }

    orientationDidChange(orientation) {
      // alert("Orientation: "+orientation);
      this.props.actions.setOrientation(orientation);
    }






    render() {
      return (
        <Routes/>
      );
    }
}



export default connect(routerStateToProps, mapDispatchToProps)(PlaceAVote);