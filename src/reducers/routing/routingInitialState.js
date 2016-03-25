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
  NAVIGATE_TO
} = require('../../config/constants').ActionNames


/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  state: NAVIGATE_TO,
  currentSchene: null
  )
});

export default InitialState;
