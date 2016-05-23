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

  GET_BILL_COMMENTS_REQUEST,
  GET_BILL_COMMENTS_SUCCESS,
  GET_BILL_COMMENTS_FAILURE,



  GET_BILL_TOP_COMMENTS_REQUEST,
  GET_BILL_TOP_COMMENTS_SUCCESS,
  GET_BILL_TOP_COMMENTS_FAILURE,

  POST_COMMENT_ON_BILL_REQUEST,
  POST_COMMENT_ON_BILL_SUCCESS,
  POST_COMMENT_ON_BILL_FAILURE,


  POST_COMMENT_ON_COMMENT_REQUEST,
  POST_COMMENT_ON_COMMENT_SUCCESS,
  POST_COMMENT_ON_COMMENT_FAILURE,

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

















/**
 * ## retreiving comment actions
 */
function getBillCommentsRequest() {
  return {
    type: GET_BILL_COMMENTS_REQUEST
  };
}
function getBillCommentsSuccess(json) {
  return {
    type: GET_BILL_COMMENTS_SUCCESS,
    payload: json
  };
}
function getBillCommentsFailure(json) {
  return {
    type: GET_BILL_COMMENTS_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getBillComments(billId, sortFilter, sessionToken=null, dev = null) {
  console.log("getBillComments called");
  return async function (dispatch){
    dispatch(getBillCommentsRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in billActions.getBillComments() with error: "+e.message);
      dispatch(getBillCommentsFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.getBillCommentsById({billId:billId, sortBy:sortFilter});
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getBillCommentsFailure("Unable to get user bill data with this token."));
      return res.error;
    }else{
      dispatch(getBillCommentsSuccess(res.data));
      return res.data;
    }
  };
}















/**
 * ## retreiving top comment
 */
function getBillTopCommentsRequest() {
  return {
    type: GET_BILL_TOP_COMMENTS_REQUEST
  };
}
function getBillTopCommentsSuccess(json) {
  return {
    type: GET_BILL_TOP_COMMENTS_SUCCESS,
    payload: json
  };
}
function getBillTopCommentsFailure(json) {
  return {
    type: GET_BILL_TOP_COMMENTS_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getBillTopComments(billId, sessionToken=null, dev = null) {
  console.log("getBillTopComments called");
  return async function (dispatch){
    dispatch(getBillTopCommentsRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in billActions.getBillTopComments() with error: "+e.message);
      dispatch(getBillTopCommentsFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.getBillTopCommentsById({billId:billId});
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getBillTopCommentsFailure("Unable to get user bill data with this token."));
      return res.error;
    }else{
      dispatch(getBillTopCommentsSuccess(res.data));
      return res.data;
    }
  };
}

















/**
 * ## Posting a comment on a bill actions
 */
function commentOnBillRequest() {
  return {
    type: POST_COMMENT_ON_BILL_REQUEST
  };
}
function commentOnBillSuccess(json) {
  return {
    type: POST_COMMENT_ON_BILL_SUCCESS,
    payload: json
  };
}
function commentOnBillFailure(json) {
  return {
    type: POST_COMMENT_ON_BILL_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function commentOnBill(commentText, billId, sessionToken=null, dev = null) {
  console.log("commentOnBill called");
  return async function (dispatch){
    dispatch(commentOnBillRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in billActions.commentOnBill() with error: "+e.message);
      dispatch(commentOnBillFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.commentOnBill({body:commentText, billId:billId});
    console.log("Comment on bill RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(commentOnBillFailure("Unable to get user bill data with this token."));
      return null;
    }else{
      dispatch(commentOnBillSuccess(res.data));
      return res.data;
    }
  };
}











/**
 * ## Posting a comment on a bill actions
 */
function commentOnCommentRequest() {
  return {
    type: POST_COMMENT_ON_COMMENT_REQUEST
  };
}
function commentOnCommentSuccess(json) {
  return {
    type: POST_COMMENT_ON_COMMENT_SUCCESS,
    payload: json
  };
}
function commentOnCommentFailure(json) {
  return {
    type: POST_COMMENT_ON_COMMENT_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function commentOnComment(commentText, billId, commentId, commentLvl, sessionToken=null, dev = null) {
  console.log("commentOnComment called");
  return async function (dispatch){
    dispatch(commentOnCommentRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in billActions.commentOnComment() with error: "+e.message);
      dispatch(commentOnCommentFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.commentOnComment({body:commentText, billId:billId, commentId:commentId});
    // console.log("Comment on comment RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(commentOnCommentFailure("Unable to get user bill data with this token."));
      return null;
    }else{
      dispatch(commentOnCommentSuccess({newComment: res.data, parentCommentId: commentId, newCommentLvl:commentLvl}));
      return res.data;
    }
  };
}
