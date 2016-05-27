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
import InitialRouterState from './routingInitialState';

import {ActionNames, Modals} from '../../config/constants';

/**
 * Routing actions to test
 */
 const {
   NAVIGATE_TO,
   NAVIGATE_PREVIOUS,
   SET_MODAL_VISIBILITY
 } = ActionNames;


const initialRouterState = new InitialRouterState

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function routingReducer(state = initialRouterState, action) {
  if (!(state instanceof InitialRouterState)) return initialRouterState.merge(state);


  let previousSchene = state.previousSchene, currentSchene = state.currentSchene;

  switch (action.type) {

   case "push":
     return state.set('previousSchene', currentSchene).set('currentSchene', action.key);
   case NAVIGATE_TO:
     const newSchene = action.payload;
     return state.set('previousSchene', currentSchene).set('currentSchene', newSchene);
   case "back":
   case "BackAction":
   case NAVIGATE_PREVIOUS:
     return state.set('previousSchene', currentSchene).set('currentSchene', previousSchene);
   case SET_MODAL_VISIBILITY:
     const {name, visibility} = action.payload;
     return state.setIn(['modalIsOpen', name], visibility);
     default:
    //  console.log("Routing reducer running with no valid action type: "+action.type);
     return state;
      break;
  }
}
