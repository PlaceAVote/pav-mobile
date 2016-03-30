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
import InitialState from './routingInitialState';



/**
 * Routing actions to test
 */
 const {
   NAVIGATE_TO,
   NAVIGATE_PREVIOUS
 } = require('../../config/constants').ActionNames


const initialState = new InitialState;

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function routingReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {

    /**
     * ### set the platform in the state
     *
     */
   case NAVIGATE_TO:
     const scheneName = action.payload;
     let previousSchene = state.currentSchene;
     return state.set('previousSchene', previousSchene).set('currentSchene', scheneName);



   case NAVIGATE_PREVIOUS:
     let previousSchene = state.currentSchene;
     let currentSchene = state.previousSchene;
     return state.set('previousSchene', currentSchene).set('currentSchene', previousSchene);
  }

  return state;
}
