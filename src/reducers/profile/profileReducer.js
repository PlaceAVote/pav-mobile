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
import {fieldValidation} from '../../lib/Utils/fieldValidation';
import Immutable from 'immutable';
/**
 * ## Actions
 *
 */
import {ActionNames} from '../../config/constants';
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
} = ActionNames;

/**
 * ## Initial State
 *
 */
import InitialState from './profileInitialState';
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

    if(action.payload.isFetchingOldData===false){
      return state.setIn(['form', 'isFetching', 'timelineData'], true)
        .setIn(['form','error'],null);
    }else{
      return state.setIn(['form', 'isFetching', 'timelineData'], true)
      .setIn(['form', 'isFetching', 'olderTimelineData'], true)
      .setIn(['form','error'],null);
    }
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

  let timelineResponse = action.payload;
  let newItems = Immutable.fromJS(timelineResponse.data.results);

  if(timelineResponse.isFetchingOldData===false){
    if(timelineResponse.shouldUpdateState===true){
      return state.setIn(['form', 'isFetching', 'timelineData'], false)
      .setIn(['form','error'],null)
      .setIn(['form', 'lastKnownItemTimestamp'], timelineResponse.data.last_timestamp)
      .setIn(['form', 'timelineData'], newItems);
    }else{
      return state.setIn(['form', 'isFetching', 'timelineData'], false)
      .setIn(['form','error'],null)
    }
  }else{
    if(timelineResponse.shouldUpdateState===true){
      let oldItems = state.get("form").get("timelineData");
      newItems = oldItems.concat(newItems);

      return state.setIn(['form', 'isFetching', 'timelineData'], false)
      .setIn(['form','error'],null)
      .setIn(['form', 'isFetching', 'olderTimelineData'], false)
      .setIn(['form', 'lastKnownItemTimestamp'], timelineResponse.data.last_timestamp)
      .setIn(['form', 'timelineData'], newItems);
    }else{
      return state.setIn(['form', 'isFetching', 'timelineData'], false)
      .setIn([ 'form', 'isFetching', 'olderTimelineData'], false)
      .setIn(['form','error'],null)
    }
  }






  case GET_PROFILE_SUCCESS:
    // console.log("Profile reducer get profile SUCCESS with payload: "+JSON.stringify(action.payload));
    let profResponse = action.payload;
    if(profResponse.shouldUpdateState===true){
      return state.setIn(['form', 'isFetching', 'profileData'], false)
        .setIn(['form','error'],null)
        .setIn(['form', 'profileData', 'followerCnt'], profResponse.data.total_followers)
        .setIn(['form', 'profileData', 'followingCnt'], profResponse.data.total_following)
        .setIn(['form', 'profileData', 'lastActivityTimestamp'], profResponse.data.last_activity)
        .setIn(['form', 'profileData', 'voteCnt'], profResponse.data.total_votes);
    }else{
      return state.setIn(['form', 'isFetching', 'profileData'], false)
        .setIn(['form','error'],null)
    }

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
    if(action.payload.isFetchingOldData===false){
      return state.setIn(['form', 'isFetching', 'timelineData'], false)
        .setIn(['form','error'], action.payload);
    }else{
      return state.setIn(['form', 'isFetching', 'timelineData'], false)
      .setIn(['form', 'isFetching', 'olderTimelineData'], false)
      .setIn(['form','error'], action.payload);
    }
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
