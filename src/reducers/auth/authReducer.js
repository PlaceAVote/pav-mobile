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
import moment from 'moment';
import {List} from 'immutable';

/**
 * ## Auth actions
 */
const {
  // SESSION_TOKEN_REQUEST,
  // SESSION_TOKEN_SUCCESS,
  // SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  TOKEN_VALIDATE_REQUEST,
  TOKEN_VALIDATE_SUCCESS,
  TOKEN_VALIDATE_FAILURE,

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
  SET_USER_DATA,
  SET_PASSWORD_VISIBILITY
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

  case SET_PASSWORD_VISIBILITY:
    return state.setIn(['form', 'fields', 'showPassword'], action.payload)
  case TOKEN_VALIDATE_REQUEST:
    return state.setIn(['form', 'isFetching'], true)
      .setIn(['form','error'],null);
  case TOKEN_VALIDATE_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)
      .setIn(['form','error'],null)
      .setIn(['user', 'isLoggedIn'], true)
      // .setIn(['user', 'id'], action.payload.user_id)
      // .setIn(['user', 'firstName'], action.payload.first_name)
      // .setIn(['user', 'city'], action.payload.city)
  case TOKEN_VALIDATE_FAILURE:
    return state.setIn(['form', 'isFetching'], false)
      .setIn(['form','error'],null);


    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
  case VALIDATE_REQUEST:
  // case SESSION_TOKEN_REQUEST:
  case LOGOUT_REQUEST:
  case LOGIN_REQUEST:
  case RESET_PASSWORD_REQUEST:
  case FORGOT_PASSWORD_REQUEST:
    return state.setIn(['form', 'isFetching'], true)
      .setIn(['form','error'],null);
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
    if(scheneName==LOGIN){  //we don't want to validate the fields in the login screen
      return formValidation(nextState, scheneName);
    }else{
      return formValidation(fieldValidation( nextState, action), scheneName);
    }
  }

  case LOGOUT_SUCCESS:
    return initialState;

    break;
    /**
     * ### Requests end, good or bad
     * Set the fetching flag so the forms will be enabled
     */
   // case SESSION_TOKEN_SUCCESS:
   // case SESSION_TOKEN_FAILURE:
  case VALIDATE_SUCCESS:
  case RESET_PASSWORD_SUCCESS:
  case FORGOT_PASSWORD_SUCCESS:
    return state.setIn(['form', 'isFetching'], false);
    break;
  case SIGNUP_SUCCESS:
  case SIGNUP_FACEBOOK_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)
    .setIn(['user', 'isLoggedIn'], true)
    .setIn(['user', 'id'], action.payload.user_id)
    .setIn(['user', 'firstName'], action.payload.first_name)
    .setIn(['user', 'city'], action.payload.city)
    break;
  case LOGIN_SUCCESS:
  case LOGIN_FACEBOOK_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)
    // .setIn(['form', 'isLoggedIn'], true);
    .setIn(['user', 'isLoggedIn'], true)
    .setIn(['user', 'id'], action.payload.user_id)
    .setIn(['user', 'firstName'], action.payload.first_name)
    .setIn(['user', 'city'], action.payload.city)
  case SET_USER_DATA:
    // console.log("ITEMZ: "+JSON.stringify(action.payload))
    let dt = action.payload;
    return state.setIn(['form', 'isFetching'], false)
    // .setIn(['form', 'isLoggedIn'], true);
    .setIn(['user', 'id'], dt.user_id)
    .setIn(['user', 'email'], dt.email)
    .setIn(['user', 'city'], dt.city)
    .setIn(['user', 'address'], dt.address)
    .setIn(['user', 'confirmationToken'], dt["confirmation-token"])
    .setIn(['user', 'countryCode'], dt.country_code)
    .setIn(['user', 'createdAt'], dt.created_at)
    .setIn(['user', 'district'], dt.district)
    .setIn(['user', 'birthday'], dt.dob || moment())
    .setIn(['user', 'firstName'], dt.first_name)
    .setIn(['user', 'lastName'], dt.last_name)
    .setIn(['user', 'gender'], dt.gender || 'they')
    .setIn(['user', 'zipCode'], dt.zipcode)
    .setIn(['user', 'stateProvince'], dt.state)
    .setIn(['user', 'latitude'], dt.lat)
    .setIn(['user', 'longitude'], dt.lng)
    .setIn(['user', 'publicProfile'], dt.public)
    .setIn(['user', 'registered'], dt.registered)
    .setIn(['user', 'topics'], new List(dt.topics))
    .setIn(['user', 'photoUrl'], dt.img_url)


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
          .setIn(['form','fields','dateOfBirth'],dob || moment())
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
