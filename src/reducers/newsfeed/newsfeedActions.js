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
const AppAuthToken = require('../../lib/Storage/AppAuthToken').default;
import PavClientSdk from 'pavclient';
// import {setUserData} from '../auth/authActions'



import {ActionNames, ScheneKeys, Other} from '../../config/constants';
const {
  SET_ACTIVITY_FILTER,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  FILTER_ITEMS_START,
  FILTER_ITEMS_END
} = ActionNames;
const {NEWS_FEED_FILTERS} = Other;




function filterItemsRequest(activityName) {
  return {
    type: FILTER_ITEMS_START,
    payload: activityName
  };
}
function filterItemsSuccess(itemsAfterFiltration) {
  return {
    type: FILTER_ITEMS_END,
    payload: itemsAfterFiltration
  };
}
export function filterFeedItems(filterName, topicType){
  return function (dispatch, getState){
    dispatch(filterItemsRequest(filterName));
    let state = getState();
    // console.log("@@@@@@@@@@@@@@"+JSON.stringify(state.newsfeed))
    let newItems = getFeedItemsDependingOnFilter(filterName, state.newsfeed.newsFeedData.items, topicType)
    dispatch(filterItemsSuccess(newItems));
  }
}

/*
  All Activity: Comments, Votes, Issues
  Following: Issues
  Bill Activity: Votes, Comments
*/
function getFeedItemsDependingOnFilter(activityFilter, allItems, topicFilter){
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
    case NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER:
      if(topicFilter!=null){
        //TODO: set the new items with the fetched data of the trending endpoint
      }else{
        newItems = iterateThroughItemsAndPickTheOnesWithTypeAndSubtype(allItems, ["bill"], "Crime")
      }
      break;
    case NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER:
      alert("Now implemented yet");
      newItems = allItems;
      break;
  }
  // this.props.actions.setNewsFeedDataAvailable(true);
  return newItems;
}

function iterateThroughItemsAndPickTheOnesWithType(items, typeArray){
  if(!!items && !!typeArray && typeArray.length>0){
    let pickedArray = [];
    for(let zz=0, lll=items.length; zz<lll;zz++){
        let curItem = items[zz];
        for (let xx=0, kkk=typeArray.length;xx<kkk;xx++){
          let curType = typeArray[xx];
          if(curItem.type==curType){
            pickedArray.push(curItem);
          }
        }
    }
    // for(var i=0;i<999999999;i++){
    //
    // }
    return pickedArray;
  }else{
    return items;
  }
}

function iterateThroughItemsAndPickTheOnesWithTypeAndSubtype(items, typeArray, topicArray){
  if(!!items && !!typeArray && typeArray.length>0){
    let pickedArray = [];
    for(let zz=0, lll=items.length; zz<lll;zz++){
        let curItem = items[zz];
        for (let xx=0, kkk=typeArray.length;xx<kkk;xx++){
          let curType = typeArray[xx];
            // for( let yy=0, jjj=topicArray.length;yy<jjj;yy+){
            //   let curTopic = topicArray[yy];
            //   if(curItem.type==curType && curItem.pav_topic==curTopic){
            //     pickedArray.push(curItem);
            //   }
            // }
        }
    }
    return pickedArray;
  }else{
    return items;
  }
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
export function getFeed(sessionToken=null, dev = null) {
  console.log("Get feed called");
  return async function (dispatch){
    dispatch(getFeedRequest());
    //store or get a sessionToken
    let token = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthToken().getSessionToken(sessionToken);
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
