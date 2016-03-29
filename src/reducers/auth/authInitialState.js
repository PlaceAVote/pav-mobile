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
  REGISTER_STEP_1
} = require('../../config/constants').ActionNames

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  state: REGISTER_STEP_1,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    name: '',
    nameHasError:'',
    surname: '',
    surnameHasError:'',
    email: '',
    emailHasError: false,
    password: '',
    passwordHasError: false,
    passwordAgain: '',
    passwordAgainHasError: false,
    dateOfBirth: '',
    dateOfBirthHasError: false,
    zipCode: '',
    zipCodeHasError: false
  }))
});

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  form: new Form
});
export default InitialState;
