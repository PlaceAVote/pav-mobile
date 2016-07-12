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
import {formValidation} from './settingsFormValidation';
import {fieldValidation} from '../../lib/Utils/fieldValidation';
import {isOfObjectType, OBJECT_TYPES} from '../../lib/Utils/genericUtils';
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

  UPDATE_PHOTO_REQUEST,
  UPDATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_FAILURE,

  ON_SETTINGS_FORM_FIELD_CHANGE
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

    case UPDATE_PHOTO_REQUEST:
      return state.setIn([ 'form', 'isFetching', 'photoUpdate'], true)
      .setIn(['form', 'error'], null);

    case ON_SETTINGS_FORM_FIELD_CHANGE:
      const {field, value} = action.payload;
      let nextState =  state.setIn(['form', 'fields', field], value)
            .setIn(['form', 'error'],null);
      return formValidation(fieldValidation( nextState, action));

    case SET_SETTINGS_REQUEST:
    case GET_SETTINGS_REQUEST:
      return state.setIn([ 'form', 'isFetching', 'settings'], true)
      .setIn(['form', 'error'], null);
      break;

    case UPDATE_PHOTO_SUCCESS:

      // if(!!action.payload && isOfObjectType(action.payload, OBJECT_TYPES.STRING)){
      //   return state.setIn([ 'form', 'isFetching', 'photoUpdate'], false)
      //   .setIn(['form', 'fields', 'imgUrl'], action.payload)
      //   .setIn(['form', 'error'], null);
      // }else{
      //
      // }
      return state.setIn([ 'form', 'isFetching', 'photoUpdate'], false)
      .setIn(['form', 'fields', 'imgUrl'], action.payload)
      .setIn(['form', 'error'], null);


    case GET_SETTINGS_SUCCESS:
      return state.setIn([ 'form', 'isFetching', 'settings'], false)
      .setIn(['form', 'fields', 'email'], action.payload.email)
      .setIn(['form', 'fields', 'name'], action.payload.first_name)
      .setIn(['form', 'fields', 'surname'], action.payload.last_name)
      .setIn(['form', 'fields', 'gender'], action.payload.gender)
      .setIn(['form', 'fields', 'dateOfBirth'], action.payload.dob)
      .setIn(['form', 'fields', 'isPrivate'], (action.payload.public===false))
      .setIn(['form', 'fields', 'city'], action.payload.city)
      .setIn(['form', 'fields', 'zipCode'], action.payload.zipcode)
      .setIn(['form', 'fields', 'imgUrl'], action.payload.img_url)
      .setIn(['form', 'error'], null);
      // .setIn(['form', 'fields', 'district'], action.payload.district)
      // .setIn(['form', 'fields', 'state'], action.payload.state)

      break;
    case UPDATE_PHOTO_FAILURE:
      return state.setIn([ 'form', 'isFetching', 'photoUpdate'], false)
      .setIn(['form', 'error'], action.payload);
    case SET_SETTINGS_SUCCESS:
      return state.setIn([ 'form', 'isFetching', 'settings'], false)
      .setIn(['form', 'error'], null);
      break;
    case SET_SETTINGS_FAILURE:
    case GET_SETTINGS_FAILURE:
    return state.setIn([ 'form', 'isFetching', 'settings'], false)
    .setIn(['form', 'error'], action.payload);
      break;
  }//switch

  /**
   * # Default
   */
  return state;
}
