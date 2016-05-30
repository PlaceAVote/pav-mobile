/**
 * # globalActions.js
 *
 * Actions that are global in nature
 */
'use strict';

import {ActionNames} from '../../config/constants';
/**
 * ## Imports
 *
 * The actions supported
 */
const {
  // SET_SESSION_TOKEN,
  SET_DEV,
  SET_STORE,
  // SET_STATE,
  // GET_STATE,
  SET_NAVBAR_DIMENSIONS
} = ActionNames;

/**
 * ## set the sessionToken
 *
 */
// export function setSessionToken(sessionToken) {
//   return {
//     type: SET_SESSION_TOKEN,
//     payload: sessionToken
//   };
// }
/**
 * ## set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store) {
  return {
    type: SET_STORE,
    payload: store
  };
}




/**
 * ## set the environment
 *
 */
export function setEnvironmentIsDev(environmentIsDev) {
  return {
    type: SET_DEV,
    payload: environmentIsDev
  };
}


/**
 * ## set state
 *
 */
// export function setState(newState) {
//   return {
//     type: SET_STATE,
//     payload: newState
//   };
// }
/**
 * ## getState
 *
 */
// export function getState(toggle) {
//   return {
//     type: GET_STATE,
//     payload: toggle
//   };
// }



export function setNavBarDimensions(dimensions){
  return {
    type: SET_NAVBAR_DIMENSIONS,
    payload: dimensions
  }
}
