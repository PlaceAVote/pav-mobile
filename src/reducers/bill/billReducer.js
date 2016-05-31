/**
 * # newsfeedReducer.js
 *
 * The reducer for the newsfeed actions
 */
'use strict';

/**
 * ## Imports
 *
 */


/**
 * ## Initial State
 *
 */
import InitialState from './billInitialState';
const initialState = new InitialState;

import {ActionNames, ScheneKeys} from '../../config/constants';
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

  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,

  DISLIKE_COMMENT_REQUEST,
  DISLIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT_FAILURE,

  CLEAR_PAST_BILL_DATA
} = ActionNames

import Immutable from 'immutable';

import {findCommentPath, findCommentBasedOnPath} from '../../lib/Utils/commentCrawler';
import {getCorrectLikeDislikeAndScore} from '../../lib/Utils/likeUpdater';




/**
 * ## newsfeedReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function newsfeedReducer(state = initialState, action) {
  let nextNewsFeedState = null;

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case CLEAR_PAST_BILL_DATA:
      return state
      .setIn(['comments'], null)
      .setIn(['data'], null);
    case LIKE_COMMENT_REQUEST:
    case DISLIKE_COMMENT_REQUEST:
    case POST_COMMENT_ON_BILL_REQUEST:
    case POST_COMMENT_ON_COMMENT_REQUEST:
      return state.setIn([ 'commentBeingTampered'], true)
        .setIn(['error'],null);

    case GET_BILL_REQUEST:
      return state.setIn([ 'isFetching', 'billData'], true)
        .setIn(['error'],null);

    case GET_BILL_COMMENTS_REQUEST:
      return state.setIn([ 'isFetching', 'billComments'], true)
        .setIn(['error'],null);

    case GET_BILL_TOP_COMMENTS_REQUEST:
      return state.setIn([ 'isFetching', 'billTopComments'], true)
        .setIn(['error'],null);

    case POST_COMMENT_ON_BILL_SUCCESS:
      let commentsNewList = state.comments.push(action.payload) //push the new comment to the comments array
      return state.setIn([ 'commentBeingTampered'], false)
        .setIn(['error'],null)
        .setIn(['comments'], commentsNewList);
    case POST_COMMENT_ON_COMMENT_SUCCESS:

      let commentArr = state.comments.toJS();
      let commentPath = findCommentPath(commentArr, action.payload.parentCommentId);//get the comment path of this comment
      // console.log("Comment path: "+commentPath);
      let {contentArray, refToCurObject} = findCommentBasedOnPath(commentPath, commentArr);//get the comment itself in order to tamper it
      refToCurObject.replies.push(action.payload.newComment);
      return state.setIn([ 'commentBeingTampered'], false)
        .setIn(['error'],null)
        .setIn(['comments'], Immutable.fromJS(contentArray));



    case LIKE_COMMENT_SUCCESS:
    case DISLIKE_COMMENT_SUCCESS:
    if(state.comments!=null){
      let tmpCommentArr = state.comments.toJS();
      let likeCommentPath = findCommentPath(tmpCommentArr, action.payload.parentCommentId);//get the comment path of this comment
      let l = findCommentBasedOnPath(likeCommentPath, tmpCommentArr); //get the comment itself in order to tamper it

      // console.log("Comment with comment id: "+l.refToCurObject.comment_id+" liked: "+l.refToCurObject.liked);
      let {newLiked, newDisliked, newScore} = getCorrectLikeDislikeAndScore(
        (action.payload.isLike==true?"liked":"disliked"),
        action.payload.newStatus,
        (action.payload.isLike==true?l.refToCurObject.disliked : l.refToCurObject.liked),
        l.refToCurObject.score);

        l.refToCurObject.liked = newLiked;
        l.refToCurObject.disliked = newDisliked;
        l.refToCurObject.score = newScore;
      return state.setIn([ 'commentBeingTampered'], false)
        .setIn(['error'],null)
        .setIn(['comments'], Immutable.fromJS(l.contentArray));
    }else{
      return state.setIn([ 'commentBeingTampered'], false)
        .setIn(['error'],null);
    }
    case GET_BILL_SUCCESS:
      return state.setIn([ 'isFetching', 'billData'], false)
      .setIn(['error'],null)
      .setIn(['data'], action.payload)
    case GET_BILL_COMMENTS_SUCCESS:
      let newCommentsArray = []
      let comments = action.payload.comments;
      if(!!comments){
        for(let ii=0,ll=comments.length;ii<ll;ii++){
            let curComment = comments[ii];
            newCommentsArray.push({...curComment, isTopCommentInFavor:(state.commentTopForId==curComment.comment_id), isTopCommentAgainst:(state.commentTopAgainstId==curComment.comment_id) });
        }
      }
      return state.setIn([ 'isFetching', 'billComments'], false)
      .setIn(['error'],null)
      // .setIn(['comments'], {total: comments.total, comments: newCommentsArray })
      .setIn(['comments'], Immutable.fromJS(newCommentsArray))

    case GET_BILL_TOP_COMMENTS_SUCCESS:
      let topComments = action.payload;
      let forComment = topComments["for-comment"];
      let againstComment = topComments["against-comment"];
      let newState = state.setIn([ 'isFetching', 'billTopComments'], false)
      .setIn(['error'],null)
      .setIn(['commentTopForId'],forComment.comment_id)
      .setIn(['commentTopAgainstId'],againstComment.comment_id);


      let curStateComments = newState.comments;
      if(!!curStateComments){ //if there are comments
        for(let ii=0,ll=curStateComments.size;ii<ll;ii++){  //iterate through them
            let curComment = curStateComments.get(ii);  //for each comment
            if(!!forComment && curComment.get("comment_id")==forComment.comment_id){  //check to see if its id is the same as the top for comment id
              newState = newState.setIn(['comments',ii, "isTopCommentInFavor"], true);  //if it is, go to the comments array, and update the comment to reflect that
            }
            if(!!againstComment && curComment.get("comment_id")==againstComment.comment_id){//check to see if its id is the same as the top against comment id
              newState = newState.setIn(['comments',ii, 'isTopCommentAgainst'], true);  //if it is, go to the comments array, and update the comment to reflect that
            }
        }
      }
      return newState;

    case LIKE_COMMENT_FAILURE:
    case DISLIKE_COMMENT_FAILURE:
    case POST_COMMENT_ON_BILL_FAILURE:
    case POST_COMMENT_ON_COMMENT_FAILURE:
      return state.setIn([ 'commentBeingTampered'], false)
        .setIn(['error'],action.payload);

    case GET_BILL_FAILURE:
      return state.setIn([ 'isFetching', 'billData'], false)
        .setIn(['error'], action.payload);

    case GET_BILL_COMMENTS_FAILURE:
      return state.setIn([ 'isFetching', 'billComments'], false)
        .setIn(['error'], action.payload);

    case GET_BILL_TOP_COMMENTS_FAILURE:
      return state.setIn([ 'isFetching', 'billTopComments'], false)
        .setIn(['error'], action.payload);


    default:
      return state;


  }//switch
  /**
   * # Default
   */

}
