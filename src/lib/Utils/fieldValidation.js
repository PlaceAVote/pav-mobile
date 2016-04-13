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




/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function fieldValidation(state, action ) {
  const {field, value} = action.payload;

  switch(field) {


    /**
     * ### dateOfBirth validation
     * set the form field error
     */
  // case('dateOfBirth'):
  //   // let validBirthdate  = _.isUndefined(validate({dateOfBirth: value},birthdateConstraints));
  //
  //   let validBirthdate = moment(value, 'DD-MM-YYYY').isValid();
  //   // console.log('Date is: '+validBirthdate);
  //   if (validBirthdate) {
  //     return state.setIn(['form', 'fields', 'dateOfBirthIsCurBeingPicked'], false);
  //   } else {
  //     return state.setIn(['form', 'fields', 'dateOfBirthIsCurBeingPicked'], true);
  //   }
  //   break;

    /**
     * ### name validation
     * set the form field error
     */
  case('name'):
    let validName  = _.isUndefined(validate({name: value},
                                                nameConstraints));
    // console.log("Name valid if TRUE: "+validName);
    if (validName) {
      return state.setIn(['form', 'fields', 'nameHasError'], false);
    } else {
      return state.setIn(['form', 'fields', 'nameHasError'], true);
    }
    break;
    /**
     * ### surname validation
     * set the form field error
     */
  case('surname'):
    let validSurname  = _.isUndefined(validate({surname: value},
                                                surnameConstraints));
    if (validSurname) {
      return state.setIn(['form', 'fields', 'surnameHasError'], false);
    } else {
      return state.setIn(['form', 'fields', 'surnameHasError'], true);
    }
    break;


  case('forgotPasswordEmail'):
    let validForgotPasswordEmail  = _.isUndefined(validate({forgotPasswordEmail: value},
                                               forgotPasswordEmailConstraints));
    if (validForgotPasswordEmail) {
      return state.setIn(['form', 'fields', 'forgotPasswordEmailHasError'], false);
    } else {
      return state.setIn(['form', 'fields', 'forgotPasswordEmailHasError'], true);
    }
    break;
    /**
     * ### email validation
     * set the form field error
     */

  case('email'):
    let validEmail  = _.isUndefined(validate({email: value},
                                             emailConstraints));
    if (validEmail) {
      return state.setIn(['form', 'fields', 'emailHasError'], false);
    } else {
      return state.setIn(['form', 'fields', 'emailHasError'], true);
    }
    break;

    /**
     * ### password validation
     * set the form field error
     */
  case('password'):
    let validPassword = _.isUndefined(validate({password: value},
                                               passwordConstraints));
    if (validPassword) {
      return state.setIn(['form', 'fields', 'passwordHasError'], false);
    } else {
      return state.setIn(['form', 'fields', 'passwordHasError'], true);
    }
    break;

    /**
     * ### passwordAgain validation
     * set the form field error
     */
  case('passwordAgain'):
    var validPasswordAgain
      = _.isUndefined(validate({password: state.form.fields.password,
                                confirmPassword: value}, passwordAgainConstraints));
    if (validPasswordAgain) {
      return state.setIn(['form', 'fields', 'passwordAgainHasError'], false);
    } else {
      return  state.setIn(['form', 'fields', 'passwordAgainHasError'], true);
    }
    break;

  case('zipCode'):
    var validZipCode = _.isUndefined(validate({zipCode: value},
                                                usZipCodeConstraints));
    if (validZipCode) {
      return state.setIn(['form', 'fields', 'zipCodeHasError'], false);
    } else {
      return  state.setIn(['form', 'fields', 'zipCodeHasError'], true);
    }

    break;
    /**
     * ### showPassword
     * toggle the display of the password
     */
  case('showPassword'):
    return state.setIn(['form', 'fields',
                                'showPassword'], value);
    break;
  }

  return state;

}
