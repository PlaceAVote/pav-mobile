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
 * AppAuthToken for localStorage sessionToken access
 */
import AppAuthToken from '../../lib/Storage/AppAuthToken';
import PavClientSdk from 'pavclient';
import {setUserData} from '../auth/authActions'




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
export function getProfileSuccess(json) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: json
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
  console.log("Get profile called");
  return async function (dispatch){
    // dispatch(getProfileRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      if(!sessionToken){
        let tk = await new AppAuthToken().getOrReplaceSessionToken(sessionToken);
        token = tk.sessionToken;
      }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.getProfile() with error: "+e.message);
      dispatch(getProfileFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.profile({
      userId: userId
    });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in profile call"+res.error.error_message);
      dispatch(getProfileFailure("Unable to get user profile data with this token."));
      return res.error;
    }else{
      dispatch(getProfileSuccess(res.data));
      dispatch(setUserData(res.data));
      return res.data;
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
export function getTimelineSuccess(json) {
  return {
    type: GET_TIMELINE_SUCCESS,
    payload: json
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
          let tk = await new AppAuthToken().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.getTimeline() with error: "+e.message);
      dispatch(getTimelineFailure(e.message));
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
      dispatch(getTimelineSuccess(res.data));
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
          let tk = await new AppAuthToken().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.followUser() with error: "+e.message);
      dispatch(followUserFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.followUser({
      userId: userId
    });
    console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      alert(res.error);
      dispatch(followUserFailure(res.error));
      return res.error;
    }else{
      dispatch(followUserSuccess(res.data));
      return res.data;
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
          let tk = await new AppAuthToken().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in profileActions.unfollowUser() with error: "+e.message);
      dispatch(unfollowUserFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.unfollowUser({
      userId: userId
    });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      dispatch(unfollowUserFailure(res.error));
      return res.error;
    }else{
      dispatch(unfollowUserSuccess(res.data));
      return res.data;
    }
  };
}
