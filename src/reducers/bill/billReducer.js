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
 * ## Actions
 *
 */
// const {
//
// } = require('../../config/constants').ActionNames

/**
 * ## Initial State
 *
 */
const InitialState = require('./billInitialState').default;
const initialState = new InitialState;

import {ActionNames, ScheneKeys} from '../../config/constants';
const {
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_BILL_FAILURE,

  GET_BILL_COMMENTS_REQUEST,
  GET_BILL_COMMENTS_SUCCESS,
  GET_BILL_COMMENTS_FAILURE,
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


    case GET_BILL_REQUEST:
      return state.setIn([ 'isFetching', 'billData'], true)
        .setIn(['error'],null);
      break;
    case GET_BILL_COMMENTS_REQUEST:
      return state.setIn([ 'isFetching', 'billComments'], true)
        .setIn(['error'],null);
      break;

    case GET_BILL_SUCCESS:
      return state.setIn([ 'isFetching', 'billData'], false)
      .setIn(['error'],null)
      .setIn(['data'], action.payload)
    case GET_BILL_COMMENTS_SUCCESS:
      return state.setIn([ 'isFetching', 'billComments'], false)
      .setIn(['error'],null)
      .setIn(['comments'], action.payload)

    case GET_BILL_FAILURE:
      return state.setIn([ 'isFetching', 'billData'], false)
        .setIn(['error'], action.payload);
      break;
    case GET_BILL_COMMENTS_FAILURE:
      return state.setIn([ 'isFetching', 'billComments'], false)
        .setIn(['error'], action.payload);
      break;

    default:
      return state;
      break;

  }//switch
  /**
   * # Default
   */

}
