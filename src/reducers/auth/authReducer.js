/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
import InitialState from './authInitialState';
import fieldValidation from '../../lib/Utils/fieldValidation';
import {formValidation, arrayContainsObject} from './authFormValidation';
import {ActionNames, ScheneKeys} from '../../config/constants';

import {List} from 'immutable'

/**
 * ## Auth actions
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAILURE,

  FACEBOOK_DATA_ACQ_REQUEST,
  FACEBOOK_DATA_ACQ_SUCCESS,
  FACEBOOK_DATA_ACQ_FAILURE,

  VALIDATE_REQUEST,
  VALIDATE_SUCCESS,
  VALIDATE_FAILURE,

  ON_TOPICS_FORM_FIELD_CHANGE,
  ON_AUTH_FORM_FIELD_CHANGE,

  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  SIGNUP_FACEBOOK_REQUEST,
  SIGNUP_FACEBOOK_SUCCESS,
  SIGNUP_FACEBOOK_FAILURE,

  RESET_ERROR_STATE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,

  SET_STATE,
  SET_AUTH_METHOD,
  SET_USER_DATA
} = ActionNames;


const {
  LOGOUT,
  REGISTER_STEP_1,
  REGISTER_STEP_2,
  REGISTER_STEP_3,
  REGISTER_STEP_4,
  LOGIN,
  FORGOT_PASSWORD,
} = ScheneKeys;




const initialState = new InitialState;






/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
  case VALIDATE_REQUEST:
  case SESSION_TOKEN_REQUEST:
  case LOGOUT_REQUEST:
  case LOGIN_REQUEST:
  case RESET_PASSWORD_REQUEST:
  case FORGOT_PASSWORD_REQUEST:
    return state.setIn(['form', 'isFetching'], true)
      .setIn(['form','error'],null);
     nextState;
  case SIGNUP_REQUEST:
    return state.setIn(['form', 'isFetching'], true)
    .setIn(['form','error'], null)
    .setIn(['form','authMethod'], "email");
    break;
  case SIGNUP_FACEBOOK_REQUEST:
  case FACEBOOK_DATA_ACQ_REQUEST:
    return state.setIn(['form', 'isFetching'], true)
    .setIn(['form','error'], null)
    .setIn(['form','authMethod'], "facebook");
  break;
    /**
     * ### Logout state
     * The user has successfully access Parse.com
     * Clear the form's error and all the fields
     */
  case LOGOUT:
    return formValidation(
      state
        // .setIn(['form', 'state'], action.type)
        .setIn(['form','error'],null)
        .setIn(['form','fields','name'],'')
        .setIn(['form','fields','surname'],'')
        .setIn(['form','fields','email'],'')
        .setIn(['form','fields','password'],'')
        .setIn(['form','fields','passwordAgain'],'')
    );
  case ON_TOPICS_FORM_FIELD_CHANGE:
    let curTopic = action.payload;
    let isSelected = state.form.fields.topicsList.get(curTopic).isSelected;
    // console.log("Is selected "+state.form.fields.topicsList.get(newSelectedTopic).set('isSelected', !isSelected));
    return state.setIn(['form','fields', 'topicsList', curTopic], state.form.fields.topicsList.get(curTopic).set('isSelected', !isSelected));
    break;

    /**
     * ### Auth form field change
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidation
     */
  case SET_AUTH_METHOD:
    if(action.payload == "facebook" || action.payload == "email"){
        return state.setIn(['form','authMethod'], action.payload);
    }
    return state;
    break;
  case ON_AUTH_FORM_FIELD_CHANGE: {

    const {field, value, scheneName} = action.payload;
    let nextState =  state.setIn(['form', 'fields', field], value)
          .setIn(['form','error'],null);
    // console.log("Validation in auth reducer next state "+nextState);
    if(scheneName==LOGIN){  //we don't want to validate in the login screen
      return formValidation(nextState, scheneName);
    }else{
      return formValidation(fieldValidation( nextState, action), scheneName);
    }
  }
    /**
     * ### Requests end, good or bad
     * Set the fetching flag so the forms will be enabled
     */
  case VALIDATE_SUCCESS:
  case SESSION_TOKEN_SUCCESS:
  case SESSION_TOKEN_FAILURE:
  case LOGOUT_SUCCESS:
  case RESET_PASSWORD_SUCCESS:
  case FORGOT_PASSWORD_SUCCESS:
    return state.setIn(['form', 'isFetching'], false);
    break;
  case SIGNUP_SUCCESS:
  case SIGNUP_FACEBOOK_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)
    break;
  case LOGIN_SUCCESS:
  case LOGIN_FACEBOOK_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)
    // .setIn(['form', 'isLoggedIn'], true);
    .setIn(['form', 'user', 'isLoggedIn'], true)
    .setIn(['form', 'user', 'id'], action.payload.user_id)
  case SET_USER_DATA:
    // console.log("ITEMZ: "+JSON.stringify(action.payload))
    let dt = action.payload;
    return state.setIn(['form', 'isFetching'], false)
    // .setIn(['form', 'isLoggedIn'], true);
    .setIn(['form', 'user', 'id'], dt.user_id)
    .setIn(['form', 'user', 'email'], dt.email)
    .setIn(['form', 'user', 'address'], dt.address)
    .setIn(['form', 'user', 'confirmationToken'], dt["confirmation-token"])
    .setIn(['form', 'user', 'countryCode'], dt.country_code)
    .setIn(['form', 'user', 'createdAt'], dt.created_at)
    .setIn(['form', 'user', 'district'], dt.district)
    .setIn(['form', 'user', 'birthday'], dt.dob || new Date())
    .setIn(['form', 'user', 'firstName'], dt.first_name)
    .setIn(['form', 'user', 'lastName'], dt.last_name)
    .setIn(['form', 'user', 'gender'], dt.gender || 'they')
    .setIn(['form', 'user', 'zipCode'], dt.zipcode)
    .setIn(['form', 'user', 'stateProvince'], dt.state)
    .setIn(['form', 'user', 'latitude'], dt.lat)
    .setIn(['form', 'user', 'longitude'], dt.lng)
    .setIn(['form', 'user', 'publicProfile'], dt.public)
    .setIn(['form', 'user', 'registered'], dt.registered)
    .setIn(['form', 'user', 'topics'], new List(dt.topics))
    .setIn(['form', 'user', 'photoUrl'], dt.img_url)


    break;
  case FACEBOOK_DATA_ACQ_SUCCESS:
    let {firstName, lastName, id, picUrl, gender, email, dob, accessToken, userID} = action.payload;
    return formValidation(
      fieldValidation(
        state
          .setIn(['form','error'],null)
          .setIn(['form', 'isFetching'], false)
          .setIn(['form','fields','name'],firstName || '')
          .setIn(['form','fields','surname'],lastName || '')
          .setIn(['form','fields','email'],email || '')
          .setIn(['form','fields','dateOfBirth'],dob || new Date())
          .setIn(['form','fields','gender'],gender || 'they')
          .setIn(['form', 'fields', 'fbAuthUID'], userID || '')
          .setIn(['form', 'fields', 'fbAuthToken'], accessToken || '')
          .setIn(['form', 'fields', 'fbAuthImgUrl'], picUrl || '')
      )
    );
    break;

  case VALIDATE_FAILURE:
  case SIGNUP_FAILURE:
  case SIGNUP_FACEBOOK_FAILURE:
  case LOGOUT_FAILURE:
  case LOGIN_FAILURE:
  case RESET_PASSWORD_FAILURE:
  case FORGOT_PASSWORD_FAILURE:
  case FACEBOOK_DATA_ACQ_FAILURE:
    return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload);

  case RESET_ERROR_STATE:
    return state.setIn(['form', 'error'], null);
    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
  case SET_STATE:
    debugger;
    var form = JSON.parse(action.payload).auth.form;

    var next = state
          // .setIn(['form','state'],form.state)
          .setIn(['form','disabled'],form.disabled)
          .setIn(['form','error'], form.error)
          .setIn(['form','isValid', form.state],form.isValid)
          .setIn(['form','isFetching'], form.isFetching)
          .setIn(['form','fields','username'],form.fields.username)
          .setIn(['form','fields','usernameHasError'],form.fields.usernameHasError)
          .setIn(['form','fields','name'],form.fields.name)
          .setIn(['form','fields','surname'],form.fields.surname)
          .setIn(['form','fields','email'],form.fields.email)
          .setIn(['form','fields','emailHasError'],form.fields.emailHasError)
          .setIn(['form','fields','password'],form.fields.password)
          .setIn(['form','fields','passwordHasError'],form.fields.passwordHasError)
          .setIn(['form','fields','passwordAgain'],form.fields.passwordAgain)
          .setIn(['form','fields','passwordAgainHasError'],form.fields.passwordAgainHasError);

    return next;

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
        /**
         * no state change, just an ability to track action requests...
         */
        return state;

  }
  /**
   * ## Default
   */
  return state;
}
