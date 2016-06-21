/**
 * # settingsInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

import  {Record, List, Map} from 'immutable';
import {Other} from '../../config/constants';
// const {NEWS_FEED_FILTERS, TOPICS} = Other;

/**
 * ##
 * This Record contains the state of the news feed and the
 * fields it contains.
 *
 */
var InitialState = Record({
  disabled: false,
  error: null,
  // isValid: false,
  isFetching: new (Record({
    settings: false,
  })),
  form: new (Record({
    email: null,
    firstName:null,
    lastName:null,
    gender:null,
    dob:null,
    isPrivate: null,
    state:null,
    district:null,
    zipCode:null,
    city: null,
    imgUrl: null,

    emailHasError: false,
    firstNameHasError: false,
    lastNameHasError: false,
    genderHasError: false,
    dobHasError: false,
    isPrivate: false,
    stateHasError: false,
    districtHasError: false,
    zipCodeHasError: false,
    cityHasError: false,
    imgUrlHasError: false

  })),
});

export default InitialState;
