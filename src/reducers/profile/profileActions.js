/**
 * # profileActions.js
 *
 * The actions to support the users profile
 */
'use strict';
/**
 * ## Imports
 *
 */

import {ActionNames, ScheneKeys} from '../../config/constants';

/**
 * AppAuthTokenStore for localStorage sessionToken access
 */
import AppAuthTokenStore from '../../lib/Storage/AppAuthTokenStore';
import PavClientSdk from 'pavclient';
import {setUserData} from '../auth/authActions'
import UserInfoStore from '../../lib/Storage/UserInfoStore';




const {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  GET_TIMELINE_REQUEST,
  GET_TIMELINE_SUCCESS,
  GET_TIMELINE_FAILURE,

  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,

  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

} = ActionNames






/**
 * ## retreiving profile actions
 */
export function getProfileRequest() {
  return {
    type: GET_PROFILE_REQUEST
  };
}
export function getProfileSuccess(json, shouldUpdateState=true) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: json,
    shouldUpdateState: shouldUpdateState
  };
}
export function getProfileFailure(json) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile(userId = null, dev = null, sessionToken=null) {
  return async function (dispatch){
    dispatch(getProfileRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      if(!sessionToken){
        let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
        token = tk.sessionToken;
      }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.getProfile() with error: "+e.message);
      dispatch(getProfileFailure(e.message));
      return {data: null, error: e.message};
    }
    // console.log("Get profile called for userId: "+userId+" dev?: "+dev+" and token: "+(sessionToken!=null)+" oo token: "+token);
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.profile({
      userId: userId
    });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in profile call"+res.error.error_message);
      dispatch(getProfileFailure("Unable to get user profile data with this token."));
      return {data: null, error: res.error.error_message};
    }else{
      dispatch(getProfileSuccess(res.data, (userId == null)));
      if(userId==null){
        saveBasicUserInfo({user_id:res.data.user_id, first_name:res.data.first_name, city:res.data.city || res.data.address})
        dispatch(setUserData(res.data));    
      }
      return {data: res.data, error: null};
    }
  };
}





















/**
 * ## retreiving profile actions
 */
export function getTimelineRequest() {
  return {
    type: GET_TIMELINE_REQUEST
  };
}
export function getTimelineSuccess(json, shouldUpdateState=true) {
  return {
    type: GET_TIMELINE_SUCCESS,
    payload: json,
    shouldUpdateState: shouldUpdateState
  };
}
export function getTimelineFailure(json) {
  return {
    type: GET_TIMELINE_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getTimeline(userId = null, dev = null, sessionToken=null) {
  console.log("Get timeline called");
  return async function (dispatch){
    dispatch(getTimelineRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.getTimeline() with error: "+e.message);
      dispatch(getTimelineFailure(e.message));
      return e.message;
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.timeline({
      userId: userId
    });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in timeline call"+res.error.error_message);
      dispatch(getTimelineFailure("Unable to get user profile data with this token."));
      return res.error;
    }else{
      dispatch(getTimelineSuccess(res.data, (userId == null)));
      return res.data;
    }
  };
}















/**
 * ## retreiving profile actions
 */
export function followUserRequest() {
  return {
    type: FOLLOW_USER_REQUEST
  };
}
export function followUserSuccess(json) {
  return {
    type: FOLLOW_USER_SUCCESS,
    payload: json
  };
}
export function followUserFailure(json) {
  return {
    type: FOLLOW_USER_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function followUser(userId = null, dev = null, sessionToken=null) {
  console.log("followUser called");
  return async function (dispatch){
    dispatch(followUserRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.followUser() with error: "+e.message);
      dispatch(followUserFailure(e.message));
      return false;
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.followUser({
      userId: userId
    });
    console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      alert(res.error);
      dispatch(followUserFailure(res.error));
      return false;
    }else{
      dispatch(followUserSuccess(res.data));
      return true;
    }
  };
}










/**
 * ## retreiving profile actions
 */
export function unfollowUserRequest() {
  return {
    type: UNFOLLOW_USER_REQUEST
  };
}
export function unfollowUserSuccess(json) {
  return {
    type: UNFOLLOW_USER_SUCCESS,
    payload: json
  };
}
export function unfollowUserFailure(json) {
  return {
    type: UNFOLLOW_USER_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function unfollowUser(userId = null, dev = null, sessionToken=null) {
  console.log("unfollowUser called");
  return async function (dispatch){
    dispatch(unfollowUserRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.unfollowUser() with error: "+e.message);
      dispatch(unfollowUserFailure(e.message));
      return false;
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.unfollowUser({
      userId: userId
    });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      dispatch(unfollowUserFailure(res.error));
      return false;
    }else{
      dispatch(unfollowUserSuccess(res.data));
      return true;
    }
  };
}



/**
 * ## saveBasicUserInfo
 * @param {Object} basicInfo - An object that contains basic user info such as user_id, city, first_name
 */
function saveBasicUserInfo(basicInfo=null) {
  if(basicInfo!=null){
    // console.log("NOW saving session token with basic info: "+JSON.stringify(basicInfo))
    return new UserInfoStore().storeUserInfo(basicInfo);
  }
}
