/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import
 */
import {ScheneKeys, Modals} from '../../config/constants';
import {Record, Map, List} from 'immutable';
const {
  SPLASH_SCREEN,
  TAB_NEWS,
  TAB_NOTIFS,
  TAB_PROFILE,
} = ScheneKeys;
const {
  WELCOME,
  FORGOT_PASSWORD,
  SEARCH_BILL,
  ATTACH_URL,
  GENDER_PICK,
  DATE_PICK
} = Modals;


/**
 * ## InitialState
 * The form is set
 */
const Router = new Record({
  currentSchene: SPLASH_SCREEN,
  currentTab: TAB_NEWS,
  previousSchenes: new List([]),
  modalIsOpen: new Map([
    [FORGOT_PASSWORD, false],
    [WELCOME, false],
    [SEARCH_BILL, false],
    [ATTACH_URL, false],
    [GENDER_PICK, false],
    [DATE_PICK, false],
  ]),
  currentModal: null
});

/**
 * ## InitialState
 * The form is set
 */
export default  Router;
