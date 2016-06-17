/**
 * # profileInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

import  {Record, List} from 'immutable';

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The originalProfile is what Parse.com provided and has the objectId
 * The fields are what display on the UI
 */
const Form = Record({
  disabled: false,
  error: null,
  // isValid: false,
  isFetching: new (Record({
    profileData: false,
    timelineData: false,
    olderTimelineData: false,
    followUser: false,

  })),

  profileData: new (Record({
    // email: '',
    // emailHasError: false,
    // emailVerified: false,
    lastActivityTimestamp: null,
    voteCnt: "-",
    followerCnt: "-",
    followingCnt: "-",
    currentlyFollowingUser: false
  })),
  timelineData: null, //array of items
  lastKnownItemTimestamp: null
});


var InitialState = Record({
  form: new Form
});

export default InitialState;
