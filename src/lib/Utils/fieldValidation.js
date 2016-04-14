/**
 * # Login.js
 *
 * This class is a little complicated as it handles 4 states. It's also
 * a container so there is boilerplate from Redux similiar to ```App```.
 */
'use strict';

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js';
import _ from 'underscore';
import moment from 'moment';

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  presence: true,
  email: {
    email: true
  }
};
const forgotPasswordEmailConstraints = {
  presence: true,
  forgotPasswordEmail: {
    email: true
  }
}




const birthdateConstraints = {
  dateOfBirth: {
    datetime: {
      dateOnly: true
      // ,latest: moment.utc().subtract(13, 'years'),
      // message: "Wrong date"
    }
  }
};


/**
* ## username validation rule
* read the message.. ;)
*/
// const usernamePattern = /^[a-zA-Z0-9]{6,12}$/;
// const usernameConstraints = {
//   username: {
//     presence: true,
//     format: {
//       pattern: usernamePattern,
//       flags: 'i',
//       message: "must have 6-12 numbers, letters or special characters"
//     }
//   }
// };

/**
* ## name validation rule
* read the message.. ;)
*/
const namePattern = /^[a-zA-Z]{3,12}$/;
const nameConstraints = {
  name: {
    presence: true,
    format: {
      pattern: namePattern,
      flags: 'i',
      message: "must have 3-12 letters."
    }
  }
};

/**
* ## name validation rule
* read the message.. ;)
*/
const surnamePattern = /^[a-zA-Z]{4,20}$/;
const surnameConstraints = {
  surname: {
    presence: true,
    format: {
      pattern: surnamePattern,
      flags: 'i',
      message: "must have 4-20 letters."
    }
  }
};

/**
* ## password validation rule
* read the message... ;)
*/
const passwordPattern =  /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
const passwordConstraints = {
  password: {
    presence: true,
    format: {
      pattern: passwordPattern,
      flags: "i",
      message: "Password length 6-20 characters, containing both a digit and a capital letter."
    }
  }
};

const passwordAgainConstraints = {
  confirmPassword: {
    equality: "password"
  }
};

const usZipCodePattern =  /^\d{5}(-\d{4})?$/;
const usZipCodeConstraints = {
  zipCode: {
    presence: true,
    format: {
      pattern: usZipCodePattern,
      flags: "i",
      message: "Please provide us with a valid US zip code"
    }
  }
};








function validateName(value){
  return  (!_.isUndefined(validate({name: value}, nameConstraints)));
}

function validateSurname(value){
  return (!_.isUndefined(validate({surname: value},surnameConstraints)));
}

function validateForgotPasswordEmail(value){
  return (!_.isUndefined(validate({forgotPasswordEmail: value},forgotPasswordEmailConstraints)));
}

function validateEmail(value){
  return (!_.isUndefined(validate({email: value},emailConstraints)));
}

function validatePassword(value){
  return (!_.isUndefined(validate({password: value},passwordConstraints)));
}

function validatePasswordAgain(password, confirmPassword){
  return (!_.isUndefined(validate({password: password,confirmPassword: confirmPassword}, passwordAgainConstraints)));
}

function validateZipCode(value){
  return (!_.isUndefined(validate({zipCode: value},usZipCodeConstraints)));
}

export function validateAllFields(state){
  let validatedState = state
  .setIn(['form', 'fields', 'nameHasError'], validateName(state.form.fields.name))
  .setIn(['form', 'fields', 'surnameHasError'], validateSurname(state.form.fields.surname))
  .setIn(['form', 'fields', 'forgotPasswordEmailHasError'], validateForgotPasswordEmail(state.form.fields.forgotPasswordEmail))
  .setIn(['form', 'fields', 'emailHasError'], validateEmail(state.form.fields.email))
  .setIn(['form', 'fields', 'passwordHasError'], validatePassword(state.form.fields.password))
  .setIn(['form', 'fields', 'passwordAgainHasError'], validatePasswordAgain(state.form.fields.passwordAgain))
  .setIn(['form', 'fields', 'zipCodeHasError'], validateZipCode(state.form.fields.zipCode));
  // console.log("Now validating ALL fields: "+JSON.stringify(validatedState));
  return validatedState;
}
/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function fieldValidation(state, action ) {
  if(!!action){
    const {field, value} = action.payload;
    switch(field) {
    case('name'):
      return state.setIn(['form', 'fields', 'nameHasError'], validateName(value));
      break;
    case('surname'):
      return state.setIn(['form', 'fields', 'surnameHasError'], validateSurname(value));
      break;
    case('forgotPasswordEmail'):
      return state.setIn(['form', 'fields', 'forgotPasswordEmailHasError'], validateForgotPasswordEmail(value));
      break;
    case('email'):
      return state.setIn(['form', 'fields', 'emailHasError'], validateEmail(value));
      break;
    case('password'):
      return state.setIn(['form', 'fields', 'passwordHasError'], validatePassword(value));
      break;
    case('passwordAgain'):
      return state.setIn(['form', 'fields', 'passwordAgainHasError'], validatePasswordAgain(state.form.fields.password, value));
      break;
    case('zipCode'):
      return state.setIn(['form', 'fields', 'zipCodeHasError'], validateZipCode(value));
      break;
    default:
      break;
    }
    return state;
  }else{
    return validateAllFields(state);
  }
}
