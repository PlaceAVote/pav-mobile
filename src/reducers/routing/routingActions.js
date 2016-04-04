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
  SET_NAV_PROPS,
  SET_LAST_RENDERED
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


export function markScheneAsRendered(schene) {
  return {
    type: SET_LAST_RENDERED,
    payload: schene
  };
}


export function setNavProps(currentScreen) {
  return {
    type: SET_NAV_PROPS,
    payload: {current:currentScreen}
  };
}

// export function navigateToPreviousState() {
//   return {
//     type: SET_NAV_PROPS,
//     payload: null
//   };
// }

// Actions[scheneName]();



/*
Action creators

*/
export function renderChangesIfNeeded() {
  var self = this;
  return (dispatch, getState) => {
    const state = getState()
    if(state.router.currentSchene!=state.router.lastScheneRendered){
      console.log("###################### Current is: "+state.router.lastScheneRendered+ " but should be: "+state.router.currentSchene);
      var schene = state.router.currentSchene;
      if(schene!=state.router.previousSchene){
        try{
          console.log("Push"+schene);
          Actions[schene]();
        }catch(e){
          console.log("Schene: "+schene+ "nav error: "+e);
        }
      }else{
        console.log("Pop"+schene);
        Actions.pop();
      }

    }else{
      console.log("ALL GOOD");
    }

  }
}

export function navigateTo(schene) {
  return (dispatch, getState) => {
    dispatch(setNavProps(schene))
    // const state = getState()
    // if(state.router.currentSchene!=schene){
    //   try{
    //     // Actions[schene]();
    //   }catch(e){
    //     console.log("Schene: "+schene+ "nav error: "+e);
    //   }
    // }else{
    //   console.log("We\'re already within "+schene);
    // }

  }
}


export function navigateToPrevious() {
    return (dispatch, getState) => {
      const state = getState()
      dispatch(setNavProps(state.router.previousSchene))

      // if(!!state.router.previousSchene){
      //   Actions.pop()
      // }else{
      //   //do somethong when there is NO previous state.
      //   console.log("ERROR: No previous state to head to.")
      // }
    }
}
