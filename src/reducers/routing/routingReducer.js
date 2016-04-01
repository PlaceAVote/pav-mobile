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



/**
 * Routing actions to test
 */
 const {
   NAVIGATE_TO,
   NAVIGATE_PREVIOUS
 } = require('../../config/constants').ActionNames


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

   case NAVIGATE_TO:
     const newSchene = action.payload;
     return state.set('previousSchene', currentSchene).set('currentSchene', newSchene);
     break;


   case NAVIGATE_PREVIOUS:

     return state.set('previousSchene', currentSchene).set('currentSchene', previousSchene);
     break;
  }

  return state;
}
