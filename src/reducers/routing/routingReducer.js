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
   SET_NAV_PROPS,
   SET_LAST_RENDERED
 } = require('../../config/constants').ActionNames


const initialRouterState = new InitialRouterState

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function routingReducer(state = initialRouterState, action) {
  if (!(state instanceof InitialRouterState)) return initialRouterState.merge(state);

  // previousSchene = state.previousSchene,
  let currentSchene = state.currentSchene;

  switch (action.type) {

   case SET_NAV_PROPS:
      let {current} = action.payload;

    //  console.log("@@ NOW SETTING NAV PROPS"+JSON.stringify(action))

     return state.set('previousSchene', currentSchene).set('currentSchene', current);
     break;
   case SET_LAST_RENDERED:
     return state.set('lastScheneRendered', action.payload)
     break;
   default:
    break;
  }

  return state;
}
