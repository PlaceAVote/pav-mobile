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
 * AppAuthTokenStore for localStorage sessionToken access
 */
import AppAuthTokenStore from '../../lib/Storage/AppAuthTokenStore';
import PavClientSdk from 'pavclient';
// import {setUserData} from '../auth/authActions'



import {ActionNames, ScheneKeys, Other} from '../../config/constants';
const {
  CLEAR_PAST_BILL_DATA,

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

  LIKE_COMMENT_BILL_REQUEST,
  LIKE_COMMENT_BILL_SUCCESS,
  LIKE_COMMENT_BILL_FAILURE,

  DISLIKE_COMMENT_BILL_REQUEST,
  DISLIKE_COMMENT_BILL_SUCCESS,
  DISLIKE_COMMENT_BILL_FAILURE,

  VOTE_BILL_REQUEST,
  VOTE_BILL_SUCCESS,
  VOTE_BILL_FAILURE,

  SEARCH_BILL_BY_TERM_REQUEST,
  SEARCH_BILL_BY_TERM_SUCCESS,
  SEARCH_BILL_BY_TERM_FAILURE,

} = ActionNames;



export function clearPastBillData(){
  return {
    type: CLEAR_PAST_BILL_DATA
  }
}



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
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
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
export function getBillComments(billId, sortFilter, sessionToken, dev) {
  console.log("getBillComments called");
  return async function (dispatch){
    dispatch(getBillCommentsRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.getBillComments() with error: "+e.message);
      dispatch(getBillCommentsFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.getBillCommentsById({billId:billId, sortBy:sortFilter});
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getBillCommentsFailure(res.error.error_message));
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
        let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
        token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.getBillTopComments() with error: "+e.message);
      dispatch(getBillTopCommentsFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.getBillTopCommentsById({billId:billId});
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getBillTopCommentsFailure(res.error.error_message));
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
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.commentOnBill() with error: "+e.message);
      dispatch(commentOnBillFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.commentOnBill({body:commentText, billId:billId});
    // console.log("Comment on bill RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(commentOnBillFailure(res.error.error_message));
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
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.commentOnComment() with error: "+e.message);
      dispatch(commentOnCommentFailure("Unable to fetch past token in billActions.commentOnComment() with error: "+e.message));
    }

    console.log("ABOUT TO COMMENTONCOMMENT with: "+JSON.stringify({body:commentText, billId:billId, commentId:commentId}))
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.commentOnComment({body:commentText, billId:billId, commentId:commentId});
    console.log("Comment on comment RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(commentOnCommentFailure(res.error.error_message));
      return null;
    }else{
      dispatch(commentOnCommentSuccess({newComment: res.data, parentCommentId: commentId, newCommentLvl:commentLvl}));
      return res.data;
    }
  };
}










/**
 * ## Liking a comment on a bill actions
 */
function likeCommentBillRequest() {
  return {
    type: LIKE_COMMENT_BILL_REQUEST
  };
}
function likeCommentBillSuccess(json) {
  return {
    type: LIKE_COMMENT_BILL_SUCCESS,
    payload: json
  };
}
function likeCommentBillFailure(json) {
  return {
    type: LIKE_COMMENT_BILL_FAILURE,
    payload: json
  };
}
export function likeCommentBill(commentId, billId, isLiked, sessionToken=null, dev = null) {
  console.log("likeCommentBill called");
  return async function (dispatch){
    dispatch(likeCommentBillRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.likeCommentBill() with error: "+e.message);
      dispatch(likeCommentBillFailure(e.message));
    }
    console.log("dev: "+dev);
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.likeComment({isAlreadyLiked:isLiked, billId:billId, commentId:commentId});
    console.log("likeCommentBill RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(likeCommentBillFailure("Unable to like this comment."));
      return null;
    }else{
      dispatch(likeCommentBillSuccess({parentCommentId:commentId, newStatus:!isLiked, isLike:true}));
      return res.data;
    }
  };
}







/**
 * ## Disliking a comment on a bill actions
 */
function dislikeCommentBillRequest() {
  return {
    type: DISLIKE_COMMENT_BILL_REQUEST
  };
}
function dislikeCommentBillSuccess(json) {
  return {
    type: DISLIKE_COMMENT_BILL_SUCCESS,
    payload: json
  };
}
function dislikeCommentBillFailure(json) {
  return {
    type: DISLIKE_COMMENT_BILL_FAILURE,
    payload: json
  };
}
export function dislikeCommentBill(commentId, billId, isDisliked, sessionToken=null, dev = null) {
  console.log("dislikeCommentBill called");
  return async function (dispatch){
    dispatch(dislikeCommentBillRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.dislikeCommentBill() with error: "+e.message);
      dispatch(dislikeCommentBillFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.dislikeComment({isAlreadyDisliked:isDisliked, billId:billId, commentId:commentId});
    console.log("dislikeCommentBill RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(dislikeCommentBillFailure("Unable dislike this comment."));
      return null;
    }else{
      dispatch(likeCommentBillSuccess({parentCommentId:commentId, newStatus:!isDisliked, isLike:false}));
      return res.data;
    }
  };
}












/**
 * ## Disliking a comment on a bill actions
 */
function voteBillRequest() {
  return {
    type: VOTE_BILL_REQUEST
  };
}
function voteBillSuccess(json) {
  return {
    type: VOTE_BILL_SUCCESS,
    payload: json
  };
}
function voteBillFailure(json) {
  return {
    type: VOTE_BILL_FAILURE,
    payload: json
  };
}
export function voteBill(billId, vote, sessionToken=null, dev = null) {
  console.log("voteBill called");
  return async function (dispatch){
    dispatch(voteBillRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.voteBill() with error: "+e.message);
      dispatch(voteBillFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).voteApi.voteOnBill({billId:billId, vote:vote});
    console.log("voteBill RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(voteBillFailure("Unable vote for this bill: "+res.error.error_message));
      return null;
    }else{
      dispatch(voteBillSuccess({billId:billId, vote:vote}));
      return res.data;
    }
  };
}












/**
 * ## Searches for a bill or bills using a search term
 */
export function searchBillByTermRequest() {
  return {
    type: SEARCH_BILL_BY_TERM_REQUEST
  };
}
export function searchBillByTermSuccess(json) {
  return {
    type: SEARCH_BILL_BY_TERM_SUCCESS,
    payload: json
  };
}
export function searchBillByTermFailure(json) {
  return {
    type: SEARCH_BILL_BY_TERM_FAILURE,
    payload: json
  };
}

export function searchBillByTermItems(searchString, sessionToken=null, dev = null) {
  console.log("searchBillByTermItems called");
  return async function (dispatch){
    dispatch(searchBillByTermRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.searchBillByTerm() with error: "+e.message);
      dispatch(searchBillByTermFailure(e.message));
      return null;
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).searchApi.searchBillsByTerm({term:searchString});
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in searchBillByTermItems call"+res.error.error_message);
      dispatch(searchBillByTermFailure("Unable to search for a Bill By a Term this token."));
      return null;
    }else{
      dispatch(searchBillByTermSuccess({data:res.data, term:searchString}));
      return res.data;
    }
  };
}
