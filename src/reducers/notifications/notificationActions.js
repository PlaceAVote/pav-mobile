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
} = ActionNames;







/**
 * ## retreiving notifications actions
 */
export function getNotificationRequest() {
  return {
    type: GET_NOTIFICATIONS_REQUEST
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
export function getNotificationItems(sessionToken=null, dev = null) {
  console.log("getNotificationItems called");
  return async function (dispatch){
    dispatch(getNotificationRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in notificationActions.getNotificationItems() with error: "+e.message);
      dispatch(getNotificationFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.getNotifications();
    console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in getNotificationItems call"+res.error.error_message);
      dispatch(getNotificationFailure("Unable to get user notification data with this token."));
      return res.error;
    }else{
      dispatch(getNotificationSuccess(res.data.results));
      return res.data;
    }
  };
}
