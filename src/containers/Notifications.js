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
import * as notificationActions from '../reducers/notifications/notificationActions'

import CONFIG from '../config/config';
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


import React from 'react';


import {ScheneKeys} from '../config/constants';
const {
MAIN
} = ScheneKeys


/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  // routingActions,
  deviceActions,
  // profileActions,
  notificationActions
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














class Notifications extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
  }


  componentWillMount(){
    if(this.props.notifications.items==null){
      this.getNotifications();
    }
  }

  async getNotifications(){
    // console.log("@@@ NEWS FEED - is dev: "+this.props.global.isDev);
    return await this.props.actions.getNotificationItems(this.TOKEN, this.props.global.isDev);
  }


  orientationDidChange(orientation) {
    // console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange.bind(this));
    this.props.actions.unlockOrientation();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange.bind(this));
  }

  render() {
    return(
      <NotificationsRender

          device={ this.props.device}
          notifications={this.props.notifications.items}
          isFetchingNotifications={this.props.notifications.get("isFetching").get("notificationData")}
          onFeedRefresh={()=>{}}
          onUserClick={()=>{}}
          onBillClick={()=>{}}
          onCommentClick={()=>{}}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
