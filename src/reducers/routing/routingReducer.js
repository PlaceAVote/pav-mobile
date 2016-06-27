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
   SET_MODAL_VISIBILITY,
   MANUAL_NAVIGATE_TO_PREVIOUS
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

   case "jump":
      return state.set('currentTab', action.key);

   case "push": //react native router flux action
      return state.set('previousSchene', currentSchene).set('currentSchene', action.key);

   case "back"://react native router flux action
   case "BackAction"://react native router flux action
   case MANUAL_NAVIGATE_TO_PREVIOUS:
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
