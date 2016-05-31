/**
* # newsfeedReducer.js
*
* The reducer for the newsfeed actions
*/
'use strict';



/**
* ## Imports & Initial State
*
*/
import InitialState from './newsfeedInitialState';
const initialState = new InitialState;
import Immutable from 'immutable';
import {findFeedItem} from '../../lib/Utils/newsfeedCrawler';
import {getCorrectLikeDislikeAndScore} from '../../lib/Utils/likeUpdater';
import {ActionNames, ScheneKeys, NewsFeedUpdateTypes} from '../../config/constants';
const {
  SET_ACTIVITY_FILTER,

  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,

  GET_DISCOVERY_REQUEST,
  GET_DISCOVERY_SUCCESS,
  GET_DISCOVERY_FAILURE,

  UPDATE_ITEMS,

  REACT_TO_ISSUE_REQUEST,
  REACT_TO_ISSUE_SUCCESS,
  REACT_TO_ISSUE_FAILURE,

  LIKE_COMMENT_FEED_REQUEST,
  LIKE_COMMENT_FEED_SUCCESS,
  LIKE_COMMENT_FEED_FAILURE,

  DISLIKE_COMMENT_FEED_REQUEST,
  DISLIKE_COMMENT_FEED_SUCCESS,
  DISLIKE_COMMENT_FEED_FAILURE,

  DEL_REACTION_FROM_ISSUE_REQUEST,
  DEL_REACTION_FROM_ISSUE_SUCCESS,
  DEL_REACTION_FROM_ISSUE_FAILURE,

} = ActionNames





/**
* ## newsfeedReducer function
* @param {Object} state - initialState
* @param {Object} action - type and payload
*/
export default function newsfeedReducer(state = initialState, action) {
  let nextNewsFeedState = null;

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {


    case LIKE_COMMENT_FEED_REQUEST:
    case DISLIKE_COMMENT_FEED_REQUEST:
    case REACT_TO_ISSUE_REQUEST:
    case DEL_REACTION_FROM_ISSUE_REQUEST:
    return state.setIn([ 'newsFeedDataBeingAltered'], true)
    .setIn(['error'],null);


    case LIKE_COMMENT_FEED_FAILURE:
    case DISLIKE_COMMENT_FEED_FAILURE:
    case REACT_TO_ISSUE_FAILURE:
    case DEL_REACTION_FROM_ISSUE_FAILURE:
    return state.setIn([ 'newsFeedDataBeingAltered'], false)
    .setIn(['error'],action.payload);


    case DEL_REACTION_FROM_ISSUE_SUCCESS:
    case REACT_TO_ISSUE_SUCCESS:
    let {containingArray, foundObjectRef} = findFeedItem(state.newsFeedData.items.toJS(), "userissue", "issue_id", action.payload.parentIssueId)
    let newResponse = action.payload.data || "none";
    let oldResponse = foundObjectRef.emotional_response;
    console.log("newResponse found: "+newResponse);
    foundObjectRef.emotional_response = newResponse;
    // foundObjectRef.positive_responses = action.payload.positive_responses;
    // foundObjectRef.negative_responses = action.payload.negative_responses;
    // foundObjectRef.neutral_responses = action.payload.neutral_responses;
    // switch(newResponse){
    //
    //   case HAPPY:
    //     if(oldResponse==null){
    //       foundObjectRef.
    //     }
    //   case NEUTRAL:
    //   case SAD:
    //
    //   case NONE:
    //   default:
    //     break;
    // }
    return state.setIn([ 'newsFeedDataBeingAltered'], false)
    .setIn(['error'],null)
    .setIn(['newsFeedData', 'items'], Immutable.fromJS(containingArray));
    // .setIn(['error'],null);
    break;

    case DISLIKE_COMMENT_FEED_SUCCESS:
    case LIKE_COMMENT_FEED_SUCCESS:
      if(state.newsFeedData!=null){
        let {containingArray, foundObjectRef} = findFeedItem(state.newsFeedData.items.toJS(), "comment", "comment_id", action.payload.parentCommentId)
        // console.log("Comment found: "+JSON.stringify(foundObjectRef));
        let {newLiked, newDisliked, newScore} = getCorrectLikeDislikeAndScore(
          (action.payload.isLike==true?NewsFeedUpdateTypes.COMMENT_CARD_LIKE:NewsFeedUpdateTypes.COMMENT_CARD_DISLIKE),
          action.payload.newStatus,
          (action.payload.isLike==true?foundObjectRef.disliked : foundObjectRef.liked),
          foundObjectRef.score);
          foundObjectRef.liked = newLiked;
          foundObjectRef.disliked = newDisliked;
          foundObjectRef.score = newScore;
          return state.setIn([ 'newsFeedDataBeingAltered'], false)
          .setIn(['error'],null)
          .setIn(['newsFeedData', 'items'], Immutable.fromJS(containingArray));
      }else{
        return state.setIn([ 'newsFeedDataBeingAltered'], false)
        .setIn(['error'],null);
      }
    case GET_DISCOVERY_REQUEST:
      return state.setIn([ 'isFetching', 'discoveryData'], true)
      .setIn(['error'],null);

    case GET_DISCOVERY_SUCCESS:
      return state.setIn([ 'isFetching', 'discoveryData'], false)
      .setIn(['error'],null)
      .setIn([ 'newsFeedData', 'discoveryItems', action.payload.topic], Immutable.fromJS(action.payload.data))
      .setIn([ 'newsFeedData', 'discoveryAfterFiltration'], Immutable.fromJS(action.payload.data));

    case GET_DISCOVERY_FAILURE:
      return state.setIn([ 'isFetching', 'discoveryData'], false)
      .setIn(['error'], action.payload);




    case GET_FEED_REQUEST:
      return state.setIn([ 'isFetching', 'newsFeedData'], true)
      .setIn(['error'],null);

    case GET_FEED_SUCCESS:
      return state.setIn([ 'isFetching', 'newsFeedData'], false)
      .setIn(['error'],null)
      .setIn([ 'newsFeedData', 'items'], Immutable.fromJS(action.payload.results))
      .setIn([ 'newsFeedData', 'itemsAfterFiltration'], Immutable.fromJS(action.payload.results));

    case GET_FEED_FAILURE:
      return state.setIn([ 'isFetching', 'newsFeedData'], false)
      .setIn(['error'], action.payload);





    case SET_ACTIVITY_FILTER:
      return state.setIn(['newsFeedData', 'curSelectedFilter'], action.payload)

    case UPDATE_ITEMS:
      return state
      // .setIn([ 'isFetching', 'newsFeedData'], false)
      .setIn([ 'newsFeedData', 'itemsAfterFiltration'], Immutable.fromJS(action.payload.items))
      .setIn(['newsFeedData', 'curSelectedFilter'], action.payload.filterName);


    }//switch
    /**
    * # Default
    */
    return state;
  }
