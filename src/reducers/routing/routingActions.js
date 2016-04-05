/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  NAVIGATE_TO,
  NAVIGATE_PREVIOUS
} = require('../../config/constants').ActionNames



/**
* Import our router
*/
import {Actions} from 'react-native-router-flux';

/**
 * Project requirements
 */

// import {Actions} from 'react-native-router-flux';
// const  _ = require('underscore');

export function navigateState(schene) {
  return {
    type: NAVIGATE_TO,
    payload: schene
  };
}

export function navigateToPreviousState() {
  return {
    type: NAVIGATE_PREVIOUS,
    payload: null
  };
}

// Actions[scheneName]();



/*
Action creators

*/

export function navigateTo(schene) {
  return (dispatch, getState) => {
    const state = getState()
    if(state.router.currentSchene!=schene){
      try{
        Actions[schene]();
      }catch(e){
        console.log("Schene: "+schene+ "nav error: "+e);
      }
    }else{
      console.log("We\'re already within "+schene);
    }

  }
}


export function navigateToPrevious() {
    return (dispatch, getState) => {
      const state = getState()
      if(!!state.router.previousSchene){
        Actions.pop()
      }else{
        //do somethong when there is NO previous state.
        console.log("ERROR: No previous state to head to.")
      }
    }
}
