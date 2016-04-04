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
const {Record} = require('immutable');
const {
  // SET_NAV_PROPS,
  ONBOARDING
} = require('../../config/constants').ActionNames


/**
 * ## InitialState
 * The form is set
 */
const Router = Record({
  lastScheneRendered: null,
  currentSchene: ONBOARDING,
  previousSchene: null,

});

/**
 * ## InitialState
 * The form is set
 */
export default Router;
