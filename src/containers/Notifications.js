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
import * as newsfeedActions from '../reducers/newsfeed/newsfeedActions';

import CONFIG from '../config/config';

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
import {timeout} from '../lib/Utils/genericUtils'

import React from 'react';

// import _ from 'underscore';

import {ScheneKeys, NEWS_FEED_FILTERS} from '../config/constants';
const {
PROFILE,
BILL,
TAB_NEWS,
TAB_PROFILE,
TAB_NOTIFS
} = ScheneKeys


/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  routingActions,
  deviceActions,
  newsfeedActions,
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


  async componentWillMount(){
    if(this.props.notifications.items==null){   //when there are NO notifications
      await this.getNotifications(false);
      this.markAllNotificationsRead();
    }
  }


  componentDidMount(){
    if(this.props.notifications.items!=null){ //when there ARE notifications
      this.markAllNotificationsRead();
    }
  }

  async markAllNotificationsRead(){
    await timeout(1500);
    if(this.props.router.currentTab==TAB_NOTIFS){

      let res = await this.props.actions.markNotificationsRead(null, this.TOKEN, this.props.global.isDev);
      // alert("Marking read"+JSON.stringify(res))
    }
  }

  async getNotifications(getOlder){
    // console.log("@@@ NEWS FEED - is dev: "+this.props.global.isDev);
    return await this.props.actions.getNotificationItems(getOlder, this.TOKEN, this.props.global.isDev);
  }


  onItemsRefresh(e){

    if(this.props.notifications.get("isFetching").get("olderNotificationData")===false && this.props.notifications.get("isFetching").get("notificationData")===false){
      this.getNotifications(false);
    }

  }

  onFetchOlderNotifications(){
    if(this.props.notifications.items!=null && this.props.notifications.get("lastNotificationTimestamp")!=null && this.props.notifications.get("isFetching").get("olderNotificationData")===false &&  this.props.notifications.get("isFetching").get("notificationData")===false){
      this.getNotifications(true);
    }
  }


  onUserClickedUser(userId){
    // this.props.actions.refreshCurrentShene({userId:userId, isTab:false});
    if(userId==this.props.auth.user.id ){
      this.props.actions.navigateTo(TAB_PROFILE, {userId:userId, isTab:true}, false);
    }else{
      // alert("@@@ "+this.props.auth.user.id+"="+userId)
      this.props.actions.navigateTo(PROFILE, {userId:userId, isTab:false}, false);
    }
  }

  onUserClickedBill(billId){
    this.props.actions.navigateTo(BILL, {billId:billId});
    // alert("Tapped bill with id: "+billId);
  }

  onTakeMeThereClick(){
    this.props.actions.setActivityFilter(NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER);
    this.props.actions.navigateTo(TAB_NEWS, {}, false);
  }


  render() {
    // console.log("Notifs: "+this.props.notifications.items);
    return(
      <NotificationsRender
          device={ this.props.device}
          notifications={this.props.notifications.items}
          isFetchingNotifications={this.props.notifications.get("isFetching").get("notificationData")}
          isFetchingOlderNotifications={this.props.notifications.get("isFetching").get("olderNotificationData")}
          curUser={this.props.auth.user}
          onFetchOlderNotifications={this.onFetchOlderNotifications.bind(this)}
          onItemsRefresh={this.onItemsRefresh.bind(this)}
          onUserClick={this.onUserClickedUser.bind(this)}
          onBillClick={this.onUserClickedBill.bind(this)}
          onCommentClick={()=>{}}
          onTakeMeThereClick={this.onTakeMeThereClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
