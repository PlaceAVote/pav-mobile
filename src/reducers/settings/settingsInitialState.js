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

import moment from 'moment';
/**
 * ##
 * This Record contains the state of the news feed and the
 * fields it contains.
 *
 */
const Form = Record({


    disabled: false,
    error: null,
    isValid: false,
    isFetching: new (Record({
      settings: false,
      photoUpdate: false
    })),

    fields: new (Record({
      name: null,
      nameHasError:false,
      surname: null,
      surnameHasError:false,

      email: null,
      emailHasError: false,
      dateOfBirth: moment().format('x'),
      dateOfBirthIsCurBeingPicked: false,
      zipCode: null,
      zipCodeHasError: false,
      gender:null,
      genderIsCurBeingPicked: false,
      isPrivate: null,

      city: null,
      cityHasError: null,

      imgUrl: null,
      imgHasError: null


    }))
});

var InitialState = Record({
  form: new Form,
});
export default InitialState;
