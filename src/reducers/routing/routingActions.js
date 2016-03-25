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
  NAVIGATE_TO
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

// Actions[scheneName]();



/*
Action creators

*/

export function navigateToRequested(schene) {

  return dispatch => {
    // Actions.iterate(schene, {});
    console.log("WILL NAGIVATE TO "+schene);
    try{
      Actions[schene]();
    }catch(e){
      console.log("Schene: "+schene+ " does not exist.");
    }
    // console.log(typeof );
    dispatch(navigateState(schene));
  }

}
