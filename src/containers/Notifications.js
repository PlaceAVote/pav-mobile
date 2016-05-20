/**
 * Notifications.js
 *
 * Our main pav screen
 */
'use strict';






/**
 *           Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
import * as deviceActions from '../reducers/device/deviceActions';
import * as profileActions from '../reducers/profile/profileActions'

import Orientation from 'react-native-orientation';
/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   NotificationsRender
 */
import NotificationsRender from '../components/Notifications/NotificationsRender'


import React, {Component} from 'react';


import {ScheneKeys} from '../config/constants';
const {
MAIN
} = ScheneKeys


/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  deviceActions,
  profileActions
];

function mapStateToProps(state) {
  return {
      ...state
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














class Notifications extends Component {

  constructor(props) {
    super(props);
    // console.log("Now calling the get profile data action"+JSON.stringify(this.props));
    // this.loginAndGetNotifications();
  }


  // async loginAndGetNotifications(){
  //   await this.props.actions.login("whatevah@placeavote.com", "Asdasd1");
  //   await this.props.actions.getNotifications();
  // }
  // orientationDidChange(orientation) {
  //   // console.log("Orientation: "+orientation);
  //   this.props.actions.setOrientation(orientation);
  // }
  //
  // componentDidMount() {
  //   Orientation.addOrientationListener(this.orientationDidChange.bind(this));
  //   this.props.actions.unlockOrientation();
  // }
  //
  // componentWillUnmount() {
  //   Orientation.removeOrientationListener(this.orientationDidChange.bind(this));
  // }

  render() {
    return(
      <NotificationsRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
