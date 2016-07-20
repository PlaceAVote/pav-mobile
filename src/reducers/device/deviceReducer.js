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

import {updateScreenSizesByOrientation} from '../../lib/Utils/multiResolution';

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

    let newSizes = updateScreenSizesByOrientation({w:state.screenWidth,h:state.screenHeight}, (orientation!="LANDSCAPE"))
    return state.set('orientation', orientation)
    .set('screenHeight', newSizes.h)
    .set('screenWidth', newSizes.w);


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
