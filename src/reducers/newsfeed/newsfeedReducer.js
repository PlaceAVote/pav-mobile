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
const InitialState = require('./newsfeedInitialState').default;
const initialState = new InitialState;

import {ActionNames, ScheneKeys} from '../../config/constants';
const {
  SET_ACTIVITY_FILTER,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
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
    case SET_ACTIVITY_FILTER:
    return state.setIn(['newsFeedData', 'curSelectedFilter'], action.payload)
    break;
  }//switch
  /**
   * # Default
   */
  return state;
}
