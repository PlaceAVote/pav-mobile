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
import {ScheneKeys} from '../../config/constants';
const {Record, Map} = require('immutable');
const {
  REGISTER_STEP_1,
  REGISTER_STEP_2,
  REGISTER_STEP_3,
  REGISTER_STEP_4,
  LOGIN,
  FORGOT_PASSWORD
} = ScheneKeys;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  disabled: false,
  error: null,
  isValid: new Map([
    [REGISTER_STEP_1, false],
    [REGISTER_STEP_2, false],
    [REGISTER_STEP_3, false],
    [REGISTER_STEP_4, false],
    [LOGIN, false],
    [FORGOT_PASSWORD, false],
  ]),
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
    dateOfBirth: new Date(),
    dateOfBirthIsCurBeingPicked: false,
    zipCode: '',
    zipCodeHasError: false,
    forgotPasswordEmail: '',
    forgotPasswordEmailHasError: false
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
