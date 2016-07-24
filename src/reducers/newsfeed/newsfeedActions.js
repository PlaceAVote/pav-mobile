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
 * AppAuthTokenStore for localStorage sessionToken access
 */
import AppAuthTokenStore from '../../lib/Storage/AppAuthTokenStore';
import PavClientSdk from 'pavclient';
// import {setUserData} from '../auth/authActions'

import {iterateThroughItemsAndPickTheOnesWithType, findFeedItem} from '../../lib/Utils/newsfeedCrawler';

import {ActionNames, ScheneKeys, NewsFeedUpdateTypes, NEWS_FEED_FILTERS, TOPICS} from '../../config/constants';
const {
  SET_ACTIVITY_FILTER,
  SET_TOPIC_NAME,

  GET_DISCOVERY_REQUEST,
  GET_DISCOVERY_SUCCESS,
  GET_DISCOVERY_FAILURE,

  GET_TRENDING_REQUEST,
  GET_TRENDING_SUCCESS,
  GET_TRENDING_FAILURE,

  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,

  UPDATE_ITEMS,

  REACT_TO_ISSUE_REQUEST,
  REACT_TO_ISSUE_SUCCESS,
  REACT_TO_ISSUE_FAILURE,

  DEL_REACTION_FROM_ISSUE_REQUEST,
  DEL_REACTION_FROM_ISSUE_SUCCESS,
  DEL_REACTION_FROM_ISSUE_FAILURE,

  LIKE_COMMENT_FEED_REQUEST,
  LIKE_COMMENT_FEED_SUCCESS,
  LIKE_COMMENT_FEED_FAILURE,

  DISLIKE_COMMENT_FEED_REQUEST,
  DISLIKE_COMMENT_FEED_SUCCESS,
  DISLIKE_COMMENT_FEED_FAILURE,

  NEW_ISSUE_REQUEST,
  NEW_ISSUE_SUCCESS,
  NEW_ISSUE_FAILURE,


  SCRAPE_URL_REQUEST,
  SCRAPE_URL_SUCCESS,
  SCRAPE_URL_FAILURE,

} = ActionNames;





function updateItems(items) {
  return {
    type: UPDATE_ITEMS,
    payload: items
  };
}

export function filterFeedItems(filterName){
  return function (dispatch, getState){
    let state = getState();
    // console.log("@@@@@@@@@@@@@@"+JSON.stringify(state.newsfeed))
    let newItems = getFeedItemsDependingOnFilter(filterName, state.newsfeed.newsFeedData.items.toJS())
    dispatch(updateItems({items:newItems,filterName:filterName}));
  }
}



/*
  All Activity: Comments, Votes, Issues
  Following: Issues
  Bill Activity: Votes, Comments
*/
function getFeedItemsDependingOnFilter(activityFilter, allItems){
  // this.props.actions.setNewsFeedDataAvailable(false);
  let newItems = [];
  switch(activityFilter){
    case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
      newItems = allItems;
      break;
    // case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
    //   newItems = iterateThroughItemsAndPickTheOnesWithType(allItems, ["userissue"])
    //   break;
    // case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
    //   newItems = iterateThroughItemsAndPickTheOnesWithType(allItems, ["bill", "comment", "vote"])
    //   break;
    // case NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER:
    //   alert("Now implemented yet");
    //   newItems = allItems;
    //   break;
  }
  // this.props.actions.setNewsFeedDataAvailable(true);
  return newItems;
}









export function setActivityFilter(filterName) {
  return {
    type: SET_ACTIVITY_FILTER,
    payload: filterName
  };
}

// export function setTopicName(topicName) {
//   return {
//     type: SET_TOPIC_NAME,
//     payload: topicName
//   };
// }






/**
 * ## retreiving newsfeed actions
 */
export function getFeedRequest(isFetchingOldData) {
  return {
    type: GET_FEED_REQUEST,
    payload: {isFetchingOldData}
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
export function getFeedItems(getOlderItems=false, sessionToken=null, dev = null) {
  console.log("Get feed called");
  return async function (dispatch, getState){
    let lastTimestamp = getState().newsfeed.newsFeedData.lastFeedItemTimeStamp;
    let willFetchOlderItems = (getOlderItems===true && lastTimestamp!=null);
    dispatch(getFeedRequest(willFetchOlderItems));
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.getFeed() with error: "+e.message);
      dispatch(getFeedFailure({error:e.message, isFetchingOldData:getOlderItems}));
    }

    let res;
    // console.log("TOKEN: ."+token);
    if(getOlderItems==true && willFetchOlderItems===false){
      console.log("Unable to fetch older feed data, we don't seem to have a valid lastFeedItemTimeStamp."+lastTimestamp);
      dispatch(getFeedFailure({error:"Unable to fetch older feed data, we don't seem to have a valid lastFeedItemTimeStamp.", isFetchingOldData:getOlderItems}));
      return null;
    }else{
      res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.feed(willFetchOlderItems===true?{fromTimestamp:lastTimestamp}:null);
    }


    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getFeedFailure({error:"Unable to get user newsfeed data with this token.", isFetchingOldData:getOlderItems}));
      return res.error;
    }else{
      dispatch(getFeedSuccess({data: res.data, isFetchingOldData:getOlderItems}));
      return res.data;
    }
  };
}













/**
 * ## retreiving newsfeed actions
 */
export function getDiscoveryRequest() {
  return {
    type: GET_DISCOVERY_REQUEST
  };
}
export function getDiscoverySuccess(json) {
  return {
    type: GET_DISCOVERY_SUCCESS,
    payload: json
  };
}
export function getDiscoveryFailure(json) {
  return {
    type: GET_DISCOVERY_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getDiscoveryItems(topicsKey, sessionToken=null, dev = null) {
  console.log("Get discovery called");
  return async function (dispatch){
    dispatch(getDiscoveryRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.getDiscovery() with error: "+e.message);
      dispatch(getDiscoveryFailure(e.message));
    }
    let tagString = TOPICS[topicsKey].tag;
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).searchApi.searchBillsByTag({tag:tagString});

    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error);
      dispatch(getDiscoveryFailure(res.error));
      return res.error;
    }else{
      dispatch(getDiscoverySuccess({data:res.data, topic:topicsKey}));
      return res.data;
    }
  };
}









/**
 * ## retreiving newsfeed actions
 */
export function getTrendingRequest() {
  return {
    type: GET_TRENDING_REQUEST
  };
}
export function getTrendingSuccess(json) {
  return {
    type: GET_TRENDING_SUCCESS,
    payload: json
  };
}
export function getTrendingFailure(json) {
  return {
    type: GET_TRENDING_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getTrendingItems(sessionToken=null, dev = null) {
  console.log("Get discovery called");
  return async function (dispatch){
    dispatch(getTrendingRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.getTrendingItems() with error: "+e.message);
      dispatch(getTrendingFailure(e.message));
    }

    // console.log("About to call trending bills with token: "+token+" is dev: "+dev);
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.getTrendingBills();

    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error);
      dispatch(getTrendingFailure(res.error));
      return res.error;
    }else{
      dispatch(getTrendingSuccess({data:res.data}));
      return res.data;
    }
  };
}














/**
 * ## adding an emotional reaction to a user issue
 */
export function reactToIssueRequest() {
  return {
    type: REACT_TO_ISSUE_REQUEST
  };
}
export function reactToIssueSuccess(json) {
  return {
    type: REACT_TO_ISSUE_SUCCESS,
    payload: json
  };
}
export function reactToIssueFailure(json) {
  return {
    type: REACT_TO_ISSUE_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function reactToIssueItem(issueId, reaction, sessionToken=null, dev = null) {
  console.log("reactToIssueItem called");
  return async function (dispatch, getState){
    let state = getState();
    dispatch(reactToIssueRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.reactToIssue() with error: "+e.message);
      dispatch(reactToIssueFailure(e.message));
    }

    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.newIssueResponse({issueId:issueId, response:reaction });

    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in reactToIssueItem: "+res.error);
      dispatch(reactToIssueFailure(res.error));
      return res.error;
    }else{
      dispatch(reactToIssueSuccess({data:res.data, parentIssueId:issueId }));
      dispatch(filterFeedItems(state.newsfeed.newsFeedData.curSelectedFilter));
      return res.data.emotional_response;
    }
  };
}








/**
 * ## deleting an emotional reaction from a user issue
 */
export function deleteReactionFromIssueRequest() {
  return {
    type: DEL_REACTION_FROM_ISSUE_REQUEST
  };
}
export function deleteReactionFromIssueSuccess(json) {
  return {
    type: DEL_REACTION_FROM_ISSUE_SUCCESS,
    payload: json
  };
}
export function deleteReactionFromIssueFailure(json) {
  return {
    type: DEL_REACTION_FROM_ISSUE_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function deleteReactionFromIssueItem(issueId, oldReaction, sessionToken=null, dev = null) {
  console.log("deleteReactionFromIssueItems called");
  return async function (dispatch, getState){
    let state = getState();
    dispatch(deleteReactionFromIssueRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.deleteReactionFromIssue() with error: "+e.message);
      dispatch(deleteReactionFromIssueFailure(e.message));
    }

    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.deleteIssueResponse({issueId:issueId});

    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in deleteReactionFromIssueItems: "+res.error);
      dispatch(deleteReactionFromIssueFailure(res.error));
      return res.error;
    }else{
      dispatch(deleteReactionFromIssueSuccess({data:res.data, parentIssueId:issueId }));
      dispatch(filterFeedItems(state.newsfeed.newsFeedData.curSelectedFilter));
      return res.data.emotional_response;
    }
  };
}











/**
 * ## Liking a comment on a bill actions
 */
function likeCommentFeedRequest() {
  return {
    type: LIKE_COMMENT_FEED_REQUEST
  };
}
function likeCommentFeedSuccess(json) {
  return {
    type: LIKE_COMMENT_FEED_SUCCESS,
    payload: json
  };
}
function likeCommentFeedFailure(json) {
  return {
    type: LIKE_COMMENT_FEED_FAILURE,
    payload: json
  };
}
export function likeCommentFeed(commentId, billId, isLiked, sessionToken=null, dev = null) {
  console.log("likeCommentFeed called");
  return async function (dispatch, getState){
    let state = getState();
    dispatch(likeCommentFeedRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.likeCommentFeed() with error: "+e.message);
      dispatch(likeCommentFeedFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.likeComment({isAlreadyLiked:isLiked, billId:billId, commentId:commentId});
    // console.log("likeCommentFeed RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(likeCommentFeedFailure("Unable to like this comment."));
      return null;
    }else{
      dispatch(likeCommentFeedSuccess({parentCommentId:commentId, newStatus:!isLiked, isLike:true}));
      dispatch(filterFeedItems(state.newsfeed.newsFeedData.curSelectedFilter));
      return res.data;
    }
  };
}







/**
 * ## Disliking a comment on a bill actions
 */
function dislikeCommentFeedRequest() {
  return {
    type: DISLIKE_COMMENT_FEED_REQUEST
  };
}
function dislikeCommentFeedSuccess(json) {
  return {
    type: DISLIKE_COMMENT_FEED_SUCCESS,
    payload: json
  };
}
function dislikeCommentFeedFailure(json) {
  return {
    type: DISLIKE_COMMENT_FEED_FAILURE,
    payload: json
  };
}
export function dislikeCommentFeed(commentId, billId, isDisliked, sessionToken=null, dev = null) {
  console.log("dislikeCommentFeed called");
  return async function (dispatch, getState){
    let state = getState();
    dispatch(dislikeCommentFeedRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in billActions.dislikeCommentFeed() with error: "+e.message);
      dispatch(dislikeCommentFeedFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.dislikeComment({isAlreadyDisliked:isDisliked, billId:billId, commentId:commentId});
    // console.log("dislikeCommentFeed RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(dislikeCommentFeedFailure("Unable dislike this comment."));
      return null;
    }else{
      dispatch(likeCommentFeedSuccess({parentCommentId:commentId, newStatus:!isDisliked, isLike:false}));
      dispatch(filterFeedItems(state.newsfeed.newsFeedData.curSelectedFilter));
      return res.data;
    }
  };
}














/**
 * ## Posting a new issue
 */
function createNewIssueRequest() {
  return {
    type: NEW_ISSUE_REQUEST
  };
}
function createNewIssueSuccess(json) {
  return {
    type: NEW_ISSUE_SUCCESS,
    payload: json
  };
}
function createNewIssueFailure(json) {
  return {
    type: NEW_ISSUE_FAILURE,
    payload: json
  };
}
export function createNewIssue(comment, billId = null, articleUrl = null, sessionToken=null, dev = null) {
  console.log("createNewIssue called");
  return async function (dispatch, getState){
    let state = getState();
    dispatch(createNewIssueRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
      let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
      token = tk.sessionToken;
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.createNewIssue() with error: "+e.message);
      dispatch(createNewIssueFailure(e.message));
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).userApi.createNewIssue({comment:comment, billId:billId, articleUrl:articleUrl});
    // console.log("createNewIssue RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(createNewIssueFailure("Unable create this issue."));
      return null;
    }else{
      dispatch(createNewIssueSuccess(res.data));
      dispatch(getFeedItems(sessionToken, dev));
      return res.data;
    }
  };
}




















/**
 * ## Searches for a bill or bills using a search term
 */
export function scrapeUrlRequest() {
  return {
    type: SCRAPE_URL_REQUEST
  };
}
export function scrapeUrlSuccess(json) {
  return {
    type: SCRAPE_URL_SUCCESS,
    payload: json
  };
}
export function scrapeUrlFailure(json) {
  return {
    type: SCRAPE_URL_FAILURE,
    payload: json
  };
}

export function scrapeUrlItems(urlToBeScraped, sessionToken=null, dev = null) {
  console.log("scrapeUrlItems called");
  return async function (dispatch){
    dispatch(scrapeUrlRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.scrapeUrl() with error: "+e.message);
      dispatch(scrapeUrlFailure(e.message));
      return null;
    }
    let res = await PavClientSdk({sessionToken:token, isDev:dev}).utilsApi.scrapeUrl({url:urlToBeScraped});
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in scrapeUrlItems call"+res.error.error_message);
      dispatch(scrapeUrlFailure("Unable to scrape a url with this token."));
      return null;
    }else{
      dispatch(scrapeUrlSuccess(res.data));
      return res.data;
    }
  };
}
