/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
'use strict';

/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const fieldValidation = require('../../lib/Utils/fieldValidation').default;
// const formValidation = require('./profileFormValidation').default;

/**
 * ## Actions
 *
 */
const {
  ON_PROFILE_FORM_FIELD_CHANGE,

  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  GET_TIMELINE_REQUEST,
  GET_TIMELINE_SUCCESS,
  GET_TIMELINE_FAILURE,

  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,

  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE
} = require('../../config/constants').ActionNames

/**
 * ## Initial State
 *
 */
const InitialState = require('./profileInitialState').default;
const initialState = new InitialState;

/**
 * ## profileReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function profileReducer(state = initialState, action) {
  let nextProfileState = null;

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
  case UNFOLLOW_USER_REQUEST:
  case FOLLOW_USER_REQUEST:
    return state.setIn(['form', 'isFetching', 'followUser'], true)
    .setIn(['form','error'],null);
    break;
  case GET_TIMELINE_REQUEST:
    return state.setIn(['form', 'isFetching', 'timelineData'], true)
      .setIn(['form','error'],null);
    break;
  case GET_PROFILE_REQUEST:
  // case PROFILE_UPDATE_REQUEST:
    return state.setIn(['form', 'isFetching', 'profileData'], true)
      .setIn(['form','error'],null);
    break;
    /**
     * ### Request end successfully
     * set the form to fetching as done
     */
  // case PROFILE_UPDATE_SUCCESS:
  //   return state.setIn(['form', 'isFetching', 'profileData'], false);

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalProfile
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
  case UNFOLLOW_USER_SUCCESS:
    return state.setIn(['form', 'isFetching', 'followUser'], false)
    .setIn(['form','error'],null)
    .setIn(['form', 'profileData', 'currentlyFollowingUser'], false)
  case FOLLOW_USER_SUCCESS:
    return state.setIn(['form', 'isFetching', 'followUser'], false)
    .setIn(['form','error'],null)
    .setIn(['form', 'profileData', 'currentlyFollowingUser'], true)
  case GET_TIMELINE_SUCCESS:
    return state.setIn(['form', 'isFetching', 'timelineData'], false)
    .setIn(['form','error'],null)
    .setIn(['form', 'profileData', 'timelineData'], action.payload.results);

  case GET_PROFILE_SUCCESS:
    // console.log("Profile reducer get profile SUCCESS with payload: "+JSON.stringify(action.payload));
    return state.setIn(['form', 'isFetching', 'profileData'], false)
      .setIn(['form','error'],null)
      .setIn(['form', 'profileData', 'followerCnt'], action.payload.total_followers)
      .setIn(['form', 'profileData', 'followingCnt'], action.payload.total_following)
      .setIn(['form', 'profileData', 'lastActivityTimestamp'], action.payload.last_activity)
      .setIn(['form', 'profileData', 'voteCnt'], action.payload.total_votes);

    // return formValidation(
    //   fieldValidation( nextProfileState, action)
    //   , action);
    //   break;

    /**
     * User logged out, so reset form fields and original profile.
     *
     */
  // case LOGOUT_SUCCESS:
  //   nextProfileState = state.setIn(['form','fields','username'], '')
  //     .setIn(['form','fields','email'], '')
  //     .setIn(['form','fields','emailVerified'], false)
  //     // .setIn(['form','originalProfile','email'],'')
  //     // .setIn(['form','originalProfile','emailVerified'],false)
  //     // .setIn(['form','originalProfile','objectId'],null)
  //     .setIn(['form','error'],null);
  //   return formValidation( nextProfileState, action);

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
  case UNFOLLOW_USER_FAILURE:
  case FOLLOW_USER_FAILURE:
    return state.setIn(['form', 'isFetching', 'followUser'], false)
     .setIn(['form','error'],action.payload);
  case GET_TIMELINE_FAILURE:
    return state.setIn(['form', 'isFetching', 'timelineData'], false)
      .setIn(['form','error'], action.payload);
    break;
  case GET_PROFILE_FAILURE:
  // case PROFILE_UPDATE_FAILURE:
    return state.setIn(['form', 'isFetching', 'profileData'], false)
      .setIn(['form','error'], action.payload);
    break;
    /**
     * ### form fields have changed
     *
     * Set the state with the fields, clear the form error
     * and perform field and form validation
     */
  // case ON_PROFILE_FORM_FIELD_CHANGE:
  //   let nextFormState =
  //     state.setIn(['form', 'fields', 'username'],
  //                 action.payload.field.username)
  //     // .setIn(['form', 'fields', 'email'], action.payload.field.email)
  //     .setIn(['form','error'],null);
  //
  //   return formValidation(
  //     fieldValidation( nextFormState, action)
  //     , action);

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
  // case SET_STATE:
  //   debugger;
  //   var profile  = JSON.parse(action.payload).profile.form;
  //   var next = state.setIn(['form','disabled'],profile.disabled)
  //         .setIn(['form','error'],profile.error)
  //         .setIn(['form','isValid', state.form.state],profile.isValid)
  //         .setIn(['form','isFetching', 'profileData'],profile.isFetching)
  //         // .setIn(['form','originalProfile','username'],profile.originalProfile.username)
  //         // .setIn(['form','originalProfile','email'],profile.originalProfile.email)
  //         // .setIn(['form','originalProfile',        'objectId'],profile.originalProfile.objectId)
  //         // .setIn(['form','originalProfile','emailVerified'],profile.originalProfile.emailVerified)
  //         // .setIn(['form','fields','email'],profile.fields.email)
  //         // .setIn(['form','fields','emailHasError'],profile.fields.emailHasError)
  //         // .setIn(['form','fields','emailVerified'],profile.fields.emailVerified);
  //   return next;

  }//switch
  /**
   * # Default
   */
  return state;
}
