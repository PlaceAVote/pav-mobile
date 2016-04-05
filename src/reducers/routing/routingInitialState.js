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
const {Record, Map} = require('immutable');
const {
  NAVIGATE_TO,
  ONBOARDING,
  FORGOT_PASSWORD
} = require('../../config/constants').ActionNames


/**
 * ## InitialState
 * The form is set
 */
const Router = new Record({
  state: NAVIGATE_TO,
  currentSchene: ONBOARDING,
  previousSchene: null,
  modalIsOpen: new Map([
    [FORGOT_PASSWORD, false]
  ])
});

/**
 * ## InitialState
 * The form is set
 */
export default  Router;
