/**
 * # deviceReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 *
 * InitialState
 */
import InitialState from './deviceInitialState';
import {ActionNames} from '../../config/constants';
/**
 * Device actions to test
 */
const {
  SET_PLATFORM,
  SET_VERSION,
  SET_ORIENTATION,
  SET_ORIENTATION_LOCK
} = ActionNames;

const initialState = new InitialState;

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function deviceReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {

  /**
   * ### set the orientation in the state
   *
   */
  case SET_ORIENTATION:
    const orientation = action.payload;
    // console.log("NEW orientation: "+orientation);
    return state.set('orientation', orientation);


  case SET_ORIENTATION_LOCK:
    const isLocked = action.payload;
    // console.log("NEW orientation: "+orientation);
    return state.set('orientationLocked', isLocked);



  /**
   * ### set the platform in the state
   *
   */
  case SET_PLATFORM:
    const platform = action.payload;
    return state.set('platform', platform);

    /**
     * ### set the version in the state
     *
     */
  case SET_VERSION:
    const version = action.payload;
    return state.set('version', version);
  }

  return state;
}
