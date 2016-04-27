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
const AppAuthToken = require('../../lib/Storage/AppAuthToken').default;
import PavClientSdk from 'pavclient';
import {setUserData} from '../auth/authActions'




const {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  GET_TIMELINE_REQUEST,
  GET_TIMELINE_SUCCESS,
  GET_TIMELINE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE
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
export function getProfile(userId = null, sessionToken=null, dev = null) {
  console.log("Get profile called");
  return async function (dispatch){
    dispatch(getProfileRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      if(!sessionToken){
        token = await new AppAuthToken().getSessionToken(sessionToken);
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
      console.log("Error in profile call");
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
export function getTimeline(userId = null, sessionToken=null, dev = null) {
  console.log("Get timeline called");
  return async function (dispatch){
    // dispatch(getTimelineRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          token = await new AppAuthToken().getSessionToken(sessionToken);
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
      dispatch(getTimelineFailure("Unable to get user profile data with this token."));
      return res.error;
    }else{
      dispatch(getTimelineSuccess(res.data));
      dispatch(setUserData(res.data));
      return res.data;
    }
  };
}

















/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function profileUpdateRequest() {
  return {
    type: PROFILE_UPDATE_REQUEST
  };
}
export function profileUpdateSuccess() {
  return {
    type: PROFILE_UPDATE_SUCCESS
  };
}
export function profileUpdateFailure(json) {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json
  };
}
/**
 * ## updateProfile
 * @param {string} userId -  objectId
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} sessionToken - the sessionToken from the pav backend
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the pav backend is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on the pav backend
 *
 */
export function updateProfile(userId, username, email, sessionToken) {
  return dispatch => {
    dispatch(profileUpdateRequest());
    return new AppAuthToken().getSessionToken(sessionToken)
      .then((token) => {
        return PavClientSdk({sessionToken:token}).updateProfile(userId,
          {
            username: username,
            email: email
          }
        );
      })
      .then(() => {
          dispatch(profileUpdateSuccess());
          dispatch(getProfile());
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error));
      });
  };
}
/**
 * ## onProfileFormFieldChange
 *
 */
export function onProfileFormFieldChange(field,value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}
