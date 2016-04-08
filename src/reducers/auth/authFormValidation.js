/**
 * # authFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict';

import {ScheneKeys} from '../../config/constants';
/**
 * ## Imports
 * the actions being addressed
 */
const {
  LOGOUT,
  REGISTER_STEP_1,
  REGISTER_STEP_2,
  REGISTER_STEP_3,
  REGISTER_STEP_4,
  LOGIN,
  FORGOT_PASSWORD
} = ScheneKeys;




function isFormValid(scheneName, fields){
  let isValid = false;

  // console.log(fields)
  switch (scheneName) {
    case REGISTER_STEP_1:
      // console.log("surname: "+fields.surname+"er: "+fields.surnameHasError+ " name: "+fields.name+"er: "+fields.nameHasError);
      isValid = (!!fields.surname && !!fields.name && !fields.nameHasError && !fields.surnameHasError);
      break;
    case REGISTER_STEP_2:
      isValid = (fields.email != '' && !fields.emailHasError);
      break;
    case REGISTER_STEP_3:
      isValid = (fields.password != '' && !fields.passwordHasError && fields.passwordAgain != '' && !fields.passwordAgainHasError);
      break;
    case REGISTER_STEP_4:
      isValid = (fields.dateOfBirth!='' && !fields.dateOfBirthIsCurBeingPicked && fields.zipCode!='' && !fields.zipCodeHasError);
      break;
    case LOGIN:
      isValid = (fields.email!='' && fields.password!='' && !fields.emailHasError && !fields.passwordHasError);
      break;
    case FORGOT_PASSWORD:
      isValid = (fields.forgotPasswordEmail != '' && !fields.forgotPasswordEmailHasError);
      // console.log("ForgotEmail: "+fields.forgotPasswordEmail+" forgot pass has error: "+fields.forgotPasswordEmailHasError);
      break;
    case LOGOUT:  //TODO: Implement this when the time is right
      break;
    default:
      break;
  }
  return isValid;
}


/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state, scheneName) {
    let isValid = isFormValid(scheneName, state.form.fields);
    return state.setIn(['form','isValid', scheneName],isValid);
}
