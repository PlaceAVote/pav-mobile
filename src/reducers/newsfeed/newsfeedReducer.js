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

  GET_DISCOVERY_REQUEST,
  GET_DISCOVERY_SUCCESS,
  GET_DISCOVERY_FAILURE,

  FILTER_ITEMS,

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


    case GET_DISCOVERY_REQUEST:
      return state.setIn([ 'isFetching', 'discoveryData'], true)
        .setIn(['error'],null);
      break;

    case GET_DISCOVERY_SUCCESS:
      return state.setIn([ 'isFetching', 'discoveryData'], false)
      .setIn(['error'],null)
      .setIn([ 'newsFeedData', 'discoveryItems', action.payload.topic], action.payload.data)
      .setIn([ 'newsFeedData', 'discoveryAfterFiltration'], action.payload.data);

    case GET_DISCOVERY_FAILURE:
      return state.setIn([ 'isFetching', 'discoveryData'], false)
        .setIn(['error'], action.payload);
      break;

    case GET_FEED_REQUEST:
      return state.setIn([ 'isFetching', 'newsFeedData'], true)
        .setIn(['error'],null);
      break;

    case GET_FEED_SUCCESS:
      return state.setIn([ 'isFetching', 'newsFeedData'], false)
      .setIn(['error'],null)
      .setIn([ 'newsFeedData', 'items'], action.payload.results)
      .setIn([ 'newsFeedData', 'itemsAfterFiltration'], action.payload.results);

    case GET_FEED_FAILURE:
      return state.setIn([ 'isFetching', 'newsFeedData'], false)
        .setIn(['error'], action.payload);
      break;
    case FILTER_ITEMS:
      return state
      // .setIn([ 'isFetching', 'newsFeedData'], false)
      .setIn([ 'newsFeedData', 'itemsAfterFiltration'], action.payload.items)
      .setIn(['newsFeedData', 'curSelectedFilter'], action.payload.filterName);
      break;

  }//switch
  /**
   * # Default
   */
  return state;
}
