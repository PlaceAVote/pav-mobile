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
} = ActionNames

import Immutable from 'immutable';

import {findCommentPath} from '../../lib/Utils/commentCrawler';




/**
 * ## newsfeedReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function newsfeedReducer(state = initialState, action) {
  let nextNewsFeedState = null;

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {



    case POST_COMMENT_ON_BILL_REQUEST:
    case POST_COMMENT_ON_COMMENT_REQUEST:
      return state.setIn([ 'isFetching', 'commentBeingPosted'], true)
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
      return state.setIn([ 'isFetching', 'commentBeingPosted'], false)
        .setIn(['error'],null)
        .setIn(['comments'], commentsNewList);
    case POST_COMMENT_ON_COMMENT_SUCCESS:
      // console.log("@@COMMENT on COMMENT: "+JSON.stringify(action.payload))
      // let commentsNewList = state.comments.push(action.payload) //push the new comment to the comments array
      let {newComment, parentCommentId, newCommentLvl} = action.payload;
      let commentArr = state.comments.toJS();
      let commentPath = findCommentPath(commentArr, parentCommentId);
      // console.log("Comment path: "+commentPath);
      let curComArr = commentArr;

      let lll = commentPath.length;
      for(let iii=0;iii<lll;iii++){
          let curCommentIt = commentPath[iii];
          // console.log("Crawling comment path level: "+iii+" that is replies["+curCommentIt+"]")
          // console.log("comment: "+curComArr[curCommentIt]+" with text: "+(curComArr[curCommentIt].body || ""));
          curComArr = curComArr[curCommentIt].replies || [];
      }
      curComArr.push(newComment);
      return state.setIn([ 'isFetching', 'commentBeingPosted'], false)
        .setIn(['error'],null)
        .setIn(['comments'], Immutable.fromJS(commentArr));






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

    case POST_COMMENT_ON_BILL_FAILURE:
    case POST_COMMENT_ON_COMMENT_FAILURE:
      return state.setIn([ 'isFetching', 'commentBeingPosted'], false)
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
