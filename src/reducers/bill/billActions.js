/**
 * # billActions.js
 *
 * The actions to support the users bill
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



import {ActionNames, ScheneKeys, Other} from '../../config/constants';
const {

  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_BILL_FAILURE,

} = ActionNames;







/**
 * ## retreiving bill actions
 */
function getBillRequest() {
  return {
    type: GET_BILL_REQUEST
  };
}
function getBillSuccess(json) {
  return {
    type: GET_BILL_SUCCESS,
    payload: json
  };
}
function getBillFailure(json) {
  return {
    type: GET_BILL_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getBill(billId, sessionToken=null, dev = null) {
  console.log("getBill called");
  return async function (dispatch){
    dispatch(getBillRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in billActions.getBill() with error: "+e.message);
      dispatch(getBillFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.getBillById({billId:billId});
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getBillFailure("Unable to get user bill data with this token."));
      return res.error;
    }else{
      dispatch(getBillSuccess(res.data));
      return res.data;
    }
  };
}
