/**
* # notificationReducer.js
*
* The reducer for the notification actions
*/
'use strict';



/**
* ## Imports & Initial State
*
*/
import InitialState from './notificationInitialState';
const initialState = new InitialState;
import Immutable from 'immutable';

import {ActionNames, ScheneKeys, NewsFeedUpdateTypes} from '../../config/constants';
const {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,

} = ActionNames





/**
* ## notificationReducer function
* @param {Object} state - initialState
* @param {Object} action - type and payload
*/
export default function notificationReducer(state = initialState, action) {

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {


    case GET_NOTIFICATIONS_REQUEST:
      return state.setIn([ 'isFetching', 'notificationData'], true)
      .setIn(['error'],null);

    case GET_NOTIFICATIONS_SUCCESS:
      let newItems = Immutable.fromJS(action.payload.data.results);
      // console.log("@@@@@@@@ OLD ITEMZ? "+(!!state.items&&state.items.size) )
      // console.log("@@@@@@@@ NEW ITEMZ? "+(!!state.items && state.items.concat(newItems, state.items)).size)
      if(action.payload.incrementalUpdate===true){
        return state.setIn([ 'isFetching', 'notificationData'], false)
        .setIn(['lastNotificationTimestamp'], action.payload.data.last_timestamp)
        .setIn(['items'], state.items.concat(newItems, state.items))
        .setIn(['error'],null);
      }else{
        return state.setIn([ 'isFetching', 'notificationData'], false)
        .setIn(['lastNotificationTimestamp'], action.payload.data.last_timestamp)
        .setIn(['items'], newItems)
        .setIn(['error'],null);
      }
    case GET_NOTIFICATIONS_FAILURE:
      return state.setIn([ 'isFetching', 'notificationData'], false)
      .setIn(['error'],action.payload);

    }//switch
    /**
    * # Default
    */
    return state;
  }
