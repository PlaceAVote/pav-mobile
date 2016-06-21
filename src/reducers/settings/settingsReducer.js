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
  SET_SETTINGS_REQUEST,
  SET_SETTINGS_SUCCESS,
  SET_SETTINGS_FAILURE,

  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
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

  switch (action.type) {

    case SET_SETTINGS_REQUEST:
    case GET_SETTINGS_REQUEST:
      return state.setIn([ 'isFetching', 'settings'], true)
      .setIn(['error'], null);
      break;

    case GET_SETTINGS_SUCCESS:
      return state.setIn([ 'isFetching', 'settings'], false)
      .setIn(['form', 'email'], action.payload.email)
      .setIn(['form', 'firstName'], action.payload.first_name)
      .setIn(['form', 'lastName'], action.payload.last_name)
      .setIn(['form', 'gender'], action.payload.gender)
      .setIn(['form', 'dob'], action.payload.dob)
      .setIn(['form', 'isPrivate'], (action.payload.public===false))
      .setIn(['form', 'city'], action.payload.city)
      .setIn(['form', 'district'], action.payload.district)
      .setIn(['form', 'zipCode'], action.payload.zipcode)
      .setIn(['form', 'state'], action.payload.state)
      .setIn(['form', 'imgUrl'], action.payload.img_url)
      .setIn(['error'], null);
      break;
    case SET_SETTINGS_SUCCESS:
      return state.setIn([ 'isFetching', 'settings'], false)
      .setIn(['error'], null);
      break;
    case SET_SETTINGS_FAILURE:
    case GET_SETTINGS_FAILURE:
    return state.setIn([ 'isFetching', 'settings'], false)
    .setIn(['error'], action.payload);
      break;
  }//switch

  /**
   * # Default
   */
  return state;
}
