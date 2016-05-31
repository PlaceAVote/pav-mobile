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
import AppAuthToken from '../../lib/Storage/AppAuthToken';
import PavClientSdk from 'pavclient';
// import {setUserData} from '../auth/authActions'

import {iterateThroughItemsAndPickTheOnesWithType, findFeedItem} from '../../lib/Utils/newsfeedCrawler';
import {getCorrectLikeDislikeAndScore} from '../../lib/Utils/likeUpdater';
import {ActionNames, ScheneKeys, NewsFeedUpdateTypes, Other} from '../../config/constants';
const {
  SET_ACTIVITY_FILTER,

  GET_DISCOVERY_REQUEST,
  GET_DISCOVERY_SUCCESS,
  GET_DISCOVERY_FAILURE,

  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,

  FILTER_ITEMS,
  UPDATE_ITEMS
} = ActionNames;
const {NEWS_FEED_FILTERS, TOPICS} = Other;




function filterItemsSuccess(itemsAfterFiltration) {
  return {
    type: FILTER_ITEMS,
    payload: itemsAfterFiltration
  };
}
export function filterFeedItems(filterName){
  return function (dispatch, getState){
    let state = getState();
    // console.log("@@@@@@@@@@@@@@"+JSON.stringify(state.newsfeed))
    let newItems = getFeedItemsDependingOnFilter(filterName, state.newsfeed.newsFeedData.items.toJS())
    dispatch(filterItemsSuccess({items:newItems,filterName:filterName}));
  }
}


function updateItemSuccess(itemsAfterUpdate) {
  return {
    type: UPDATE_ITEMS,
    payload: itemsAfterUpdate
  };
}


//This function now updates comment types, but it can later be tweaked to update anything, if needed.
export function updateNewsfeedData(updateType, data){
  return function (dispatch, getState){
    let state = getState();
    let {containingArray, foundObjectRef} = findFeedItem(state.newsfeed.newsFeedData.items.toJS(), "comment", "comment_id", data.commentId)

    let type, newStatus, oldOpposite, oldScore;
    switch(updateType){
      case NewsFeedUpdateTypes.COMMENT_CARD_LIKE:
        type = "like";
        newStatus = data.liked;
        oldOpposite = data.oldDisliked;
        oldScore = data.oldScore;
        break;
      case NewsFeedUpdateTypes.COMMENT_CARD_DISLIKE:
        type = "dislike";
        newStatus = data.disliked;
        oldOpposite = data.oldLiked;
        oldScore = data.oldScore;
        break;
    }
    let {newLiked, newDisliked, newScore} = getCorrectLikeDislikeAndScore(
      type,
      newStatus,
      oldOpposite,
      oldScore);

      foundObjectRef.liked = newLiked;
      foundObjectRef.disliked = newDisliked;
      foundObjectRef.score = newScore;
    dispatch(updateItemSuccess({items:containingArray}));
    //now change the filtered items as well
    dispatch(filterFeedItems(state.newsfeed.newsFeedData.curSelectedFilter));
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
    case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
      newItems = iterateThroughItemsAndPickTheOnesWithType(allItems, ["userissue"])
      break;
    case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
      newItems = iterateThroughItemsAndPickTheOnesWithType(allItems, ["bill", "comment", "vote"])
      break;
    case NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER:
      alert("Now implemented yet");
      newItems = allItems;
      break;
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
export function getFeedItems(sessionToken=null, dev = null) {
  console.log("Get feed called");
  return async function (dispatch){
    dispatch(getFeedRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getOrReplaceSessionToken(sessionToken);
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
export function getDiscoveryItems(topicsString, sessionToken=null, dev = null) {
  console.log("Get feed called");
  return async function (dispatch){
    dispatch(getDiscoveryRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getOrReplaceSessionToken(sessionToken);
          token = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in newsfeedActions.getDiscovery() with error: "+e.message);
      dispatch(getDiscoveryFailure(e.message));
    }

    let res = null;
    if(topicsString==TOPICS.TRENDING){
      res = await PavClientSdk({sessionToken:token, isDev:dev}).billApi.getTrendingBills();
    }else{
      res = await PavClientSdk({sessionToken:token, isDev:dev}).searchApi.searchBills({searchTag:topicsString});
    }
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      console.log("Error in feed call"+res.error.error_message);
      dispatch(getDiscoveryFailure("Unable to get user newsfeed data with this token."));
      return res.error;
    }else{
      dispatch(getDiscoverySuccess({data:res.data, topic:topicsString}));
      return res.data;
    }
  };
}
