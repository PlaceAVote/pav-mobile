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


} = ActionNames





//
// /**
//  * ## retreiving profile actions
//  */
// export function getProfileRequest() {
//   return {
//     type: GET_PROFILE_REQUEST
//   };
// }
// export function getProfileSuccess(json, shouldUpdateState=true) {
//   return {
//     type: GET_PROFILE_SUCCESS,
//     payload: json,
//     shouldUpdateState: shouldUpdateState
//   };
// }
// export function getProfileFailure(json) {
//   return {
//     type: GET_PROFILE_FAILURE,
//     payload: json
//   };
// }
// /**
//  * ## State actions
//  * controls which form is displayed to the user
//  * as in login, register, logout or reset password
//  */
// export function getProfile(userId = null, dev = null, sessionToken=null) {
//   return async function (dispatch){
//     dispatch(getProfileRequest());
//     //store or get a sessionToken
//     let token = sessionToken;
//     try{
//       if(!sessionToken){
//         let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
//         token = tk.sessionToken;
//       }
//     }catch(e){
//       console.log("Unable to fetch past token in profileActions.getProfile() with error: "+e.message);
//       dispatch(getProfileFailure(e.message));
//       return {data: null, error: e.message};
//     }
//     // console.log("Get profile called for userId: "+userId+" dev?: "+dev+" and token: "+(sessionToken!=null)+" oo token: "+token);
//     let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.profile({
//       userId: userId
//     });
//     // console.log("RES: "+JSON.stringify(res));
//     if(!!res.error){
//       console.log("Error in profile call"+res.error.error_message);
//       dispatch(getProfileFailure("Unable to get user profile data with this token."));
//       return {data: null, error: res.error.error_message};
//     }else{
//       dispatch(getProfileSuccess(res.data, (userId == null)));
//       if(userId==null){
//         saveBasicUserInfo({user_id:res.data.user_id, first_name:res.data.first_name, city:res.data.city || res.data.address})
//         dispatch(setUserData(res.data));
//       }
//       return {data: res.data, error: null};
//     }
//   };
// }
//
//
//
