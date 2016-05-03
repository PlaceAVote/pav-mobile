/**
 * # newsfeedActions.js
 *
 * The actions to support the users newsfeed
 */
'use strict';
/**
 * ## Imports
 *
 */



/**
 * AppAuthToken for localStorage sessionToken access
 */
const AppAuthToken = require('../../lib/Storage/AppAuthToken').default;
import PavClientSdk from 'pavclient';
// import {setUserData} from '../auth/authActions'



import {ActionNames, ScheneKeys} from '../../config/constants';
const {
  SET_ACTIVITY_FILTER,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
} = ActionNames;


export function setActivityFilter(filterName) {
  return {
    type: SET_ACTIVITY_FILTER,
    payload: filterName
  };
}






/**
 * ## retreiving newsfeed actions
 */
export function getFeedRequest() {
  return {
    type: GET_FEED_REQUEST
  };
}
export function getFeedSuccess(json) {
  return {
    type: GET_FEED_SUCCESS,
    payload: json
  };
}
export function getFeedFailure(json) {
  return {
    type: GET_FEED_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getFeed(sessionToken=null, dev = null) {
  console.log("Get feed called");
  return async function (dispatch){
    dispatch(getFeedRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.getFeed() with error: "+e.message);
      dispatch(getFeedFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.feed();
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getFeedFailure("Unable to get user newsfeed data with this token."));
      return res.error;
    }else{
      dispatch(getFeedSuccess(res.data));
      return res.data;
    }
  };
}
