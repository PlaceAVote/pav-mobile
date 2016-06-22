/**
 * # settingsActions.js
 *
 * The actions to support the users settings
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
  SET_SETTINGS_REQUEST,
  SET_SETTINGS_SUCCESS,
  SET_SETTINGS_FAILURE,

  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,

  UPDATE_PHOTO_REQUEST,
  UPDATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_FAILURE,

  ON_SETTINGS_FORM_FIELD_CHANGE
} = ActionNames


/**
 * ## onSettingsFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onSettingsFormFieldChange(field, value) {
  return {
    type: ON_SETTINGS_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}


/**
 * ## retreiving user account settings
 */
export function getSettingsRequest() {
  return {
    type: GET_SETTINGS_REQUEST
  };
}
export function getSettingsSuccess(json) {
  return {
    type: GET_SETTINGS_SUCCESS,
    payload: json
  };
}
export function getSettingsFailure(json) {
  return {
    type: GET_SETTINGS_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getSettings(sessionToken=null, dev = null) {
  return async function (dispatch){
    dispatch(getSettingsRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      if(!sessionToken){
        let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
        token = tk.sessionToken;
      }
    }catch(e){
      console.log("Unable to fetch past token in settingsActions.getSettings() with error: "+e.message);
      dispatch(getSettingsFailure(e.message));
      return {data: null, error: e.message};
    }
    // console.log("TOK: "+token+ " isDev: "+dev);
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.getSettings();
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in settings call"+res.error);
      dispatch(getSettingsFailure("Unable to set user settings data with this token."));
      return {data: null, error: res.error};
    }else{
      dispatch(getSettingsSuccess(res.data));
      // if(userId==null){
        // saveBasicUserInfo({user_id:res.data.user_id, first_name:res.data.first_name, city:res.data.city || res.data.address})
      //   dispatch(setUserData(res.data));
      // }
      return {data: res.data, error: null};
    }
  };
}








/**
 * ## setting user account settings
 */
export function setSettingsRequest() {
  return {
    type: SET_SETTINGS_REQUEST
  };
}
export function setSettingsSuccess(json) {
  return {
    type: SET_SETTINGS_SUCCESS,
    payload: json
  };
}
export function setSettingsFailure(json) {
  return {
    type: SET_SETTINGS_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function setSettings(data, sessionToken=null, dev = null) {
  return async function (dispatch){
    dispatch(setSettingsRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      if(!sessionToken){
        let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
        token = tk.sessionToken;
      }
    }catch(e){
      console.log("Unable to fetch past token in settingsActions.setSettings() with error: "+e.message);
      dispatch(setSettingsFailure(e.message));
      return {data: null, error: e.message};
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.setSettings(data);
    console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in settings call"+res.error.error_message);
      dispatch(setSettingsFailure("Unable to set user settings data with this token."));
      return {data: null, error: res.error.error_message};
    }else{
      dispatch(setSettingsSuccess(res.data));
      // if(userId==null){
        // saveBasicUserInfo({user_id:res.data.user_id, first_name:res.data.first_name, city:res.data.city || res.data.address})
      //   dispatch(setUserData(res.data));
      // }
      return {data: res.data, error: null};
    }
  };
}










/**
 * ## Update the profile photo of the user
 */
export function updateProfilePhotoRequest() {
  return {
    type: UPDATE_PHOTO_REQUEST
  };
}
export function updateProfilePhotoSuccess(json) {
  return {
    type: UPDATE_PHOTO_SUCCESS,
    payload: json
  };
}
export function updateProfilePhotoFailure(json) {
  return {
    type: UPDATE_PHOTO_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function updateProfilePhoto(base64ImageObject, sessionToken=null, dev = null) {
  return async function (dispatch){
    dispatch(updateProfilePhotoRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      if(!sessionToken){
        let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
        token = tk.sessionToken;
      }
    }catch(e){
      console.log("Unable to fetch past token in settingsActions.updateProfilePhoto() with error: "+e.message);
      dispatch(updateProfilePhotoFailure(e.message));
      return {data: null, error: e.message};
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.updateProfilePhoto({imgData:base64ImageObject});
    console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in settings call"+res.error);
      dispatch(updateProfilePhotoFailure("Unable to update the user photo with this token."));
      return {data: null, error: res.error};
    }else{
      dispatch(updateProfilePhotoSuccess(res.data));
      return {data: res.data, error: null};
    }
  };
}
