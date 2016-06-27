/**
 * # notificationsActions.js
 *
 * The actions to support the users notifications
 */
'use strict';
/**
 * ## Imports
 *
 */



/**
 * AppAuthTokenStore for localStorage sessionToken access
 */
import AppAuthTokenStore from '../../lib/Storage/AppAuthTokenStore';
import PavClientSdk from 'pavclient';


import {ActionNames} from '../../config/constants';
const {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,

  MARK_NOTIFICATIONS_READ_REQUEST,
  MARK_NOTIFICATIONS_READ_SUCCESS,
  MARK_NOTIFICATIONS_READ_FAILURE,
} = ActionNames;







/**
 * ## retreiving notifications actions
 */
export function getNotificationRequest(isFetchingOldData) {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
    payload: {isFetchingOldData}
  };
}
export function getNotificationSuccess(json) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: json
  };
}
export function getNotificationFailure(json) {
  return {
    type: GET_NOTIFICATIONS_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getNotificationItems(getOlderItems, sessionToken=null, dev = null) {
  console.log("getNotificationItems called with getOlderItems: "+getOlderItems);
  return async function (dispatch, getState){
    let lastTimestamp = getState().notifications.lastNotificationTimestamp
    let willFetchOlderItems = (getOlderItems===true && lastTimestamp!=null);
    dispatch(getNotificationRequest(getOlderItems));
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in notificationActions.getNotificationItems() with error: "+e.message);
      dispatch(getNotificationFailure({error:e.message, isFetchingOldData:getOlderItems}));
      return null;
    }
    let res;
    if(getOlderItems==true && willFetchOlderItems===false){
      console.log("Unable to fetch older notifications, we don't seem to have a valid last_timestamp. "+lastTimestamp);
      dispatch(getNotificationFailure({error:"Unable to fetch older notifications, we don't seem to have a valid last_timestamp.", isFetchingOldData:getOlderItems}));
      return null;
    }else{
       res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.getNotifications(willFetchOlderItems?{lastKnownTimestamp:lastTimestamp}:null);
    }


    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in getNotificationItems call"+res.error.error_message);
      dispatch(getNotificationFailure({error:"Unable to get user notification data with this token.", isFetchingOldData:getOlderItems}));
      return null;
    }else{
      dispatch(getNotificationSuccess({data:res.data, isFetchingOldData:getOlderItems}));
      return res.data;
    }
  };
}









/**
 * ## Mark notifications as read actions
 */
export function markNotificationsReadRequest(isFetchingOldData) {
  return {
    type: MARK_NOTIFICATIONS_READ_REQUEST,
    payload: {isFetchingOldData}
  };
}
export function markNotificationsReadSuccess(json) {
  return {
    type: MARK_NOTIFICATIONS_READ_SUCCESS,
    payload: json
  };
}
export function markNotificationsReadFailure(json) {
  return {
    type: MARK_NOTIFICATIONS_READ_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function markNotificationsRead(notificationId=null, sessionToken=null, dev = null) {
  console.log("markNotificationsReadItems called with notificationId: "+notificationId);
  return async function (dispatch){
    dispatch(markNotificationsReadRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in notificationActions.markNotificationsReadItems() with error: "+e.message);
      dispatch(markNotificationsReadFailure(e.message));
      return null;
    }

    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.markNotificationsRead(notificationId);


    console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in markNotificationsReadItems call"+res.error.error_message);
      dispatch(markNotificationsReadFailure(res.error));
      return null;
    }else{
      dispatch(markNotificationsReadSuccess({notificationId}));
      return res.data;
    }
  };
}
