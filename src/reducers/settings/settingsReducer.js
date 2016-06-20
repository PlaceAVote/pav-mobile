/**
 * # settingsReducer.js
 *
 * The reducer user settings actions
 */
'use strict';

/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
import fieldValidation from '../../lib/Utils/fieldValidation';
import Immutable from 'immutable';
/**
 * ## Actions
 *
 */
import {ActionNames} from '../../config/constants';
const {

} = ActionNames;

/**
 * ## Initial State
 *
 */
import InitialState from './settingsInitialState';
const initialState = new InitialState;

/**
 * ## settingsReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function settingsReducer(state = initialState, action) {

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  // switch (action.type) {
  //
  // }//switch

  /**
   * # Default
   */
  return state;
}
