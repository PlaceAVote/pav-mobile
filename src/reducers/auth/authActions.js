/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  REGISTER_STEP_1,
  REGISTER_STEP_2,
  REGISTER_STEP_3,
  REGISTER_STEP_4,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE

} = require('../../config/constants').ActionNames

/**
 * Project requirements
 */


import PavClientSdk from 'pavclient';

import {Actions} from 'react-native-router-flux';

const  AppAuthToken = require('../../lib/Storage/AppAuthToken').default;

const  _ = require('underscore');


// /**
//  * ## Logout actions
//  */
// export function logoutRequest() {
//   return {
//     type: LOGOUT_REQUEST
//   };
// }
//
// export function logoutSuccess() {
//   return {
//     type: LOGOUT_SUCCESS
//   };
// }
// export function logoutFailure(error) {
//   return {
//     type: LOGOUT_FAILURE,
//     payload: error
//   };
// }
// /**
//  * ## Login
//  * After dispatching the logoutRequest, get the sessionToken
//  * and call Parse
//  *
//  * When the response from Parse is received and it's valid
//  * change the state to register and finish the logout
//  *
//  * But if the call to Parse fails, like expired token or
//  * no network connection, just send the failure
//  *
//  * And if you fail due to an invalid sessionToken, be sure
//  * to delete it so the user can log in.
//  *
//  * How could there be an invalid sessionToken?  Maybe they
//  * haven't used the app for a long time.  Or they used another
//  * device and logged out there.
//  */
// export function logout() {
//   return dispatch => {
//     dispatch(logoutRequest());
//     return new AppAuthToken().getSessionToken()
//
//       .then((token) => {
//         return PavClientSdk(token).logout();
//       })
//
//       .then(() => {
//         // dispatch(loginState()); //TODO
//         dispatch(logoutSuccess());
//         dispatch(deleteSessionToken());
//         Actions.Login();
//       })
//
//       .catch((error) => {
//         // dispatch(loginState()); //TODO
//         dispatch(logoutFailure(error));
//         Actions.Login();
//       });
//   };
// }


/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value, scheneName) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value, scheneName: scheneName}
  };
}



/**
 * ## Signup actions
 */
export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  };
}
export function signupSuccess(json) {
  return {
    type: SIGNUP_SUCCESS,
    payload: json
  };
}
export function signupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error
  };
}
// /**
//  * ## SessionToken actions
//  */
// export function sessionTokenRequest() {
//   return {
//     type: SESSION_TOKEN_REQUEST
//   };
// }
// export function sessionTokenRequestSuccess(token) {
//   return {
//     type: SESSION_TOKEN_SUCCESS,
//     payload: token
//   };
// }
// export function sessionTokenRequestFailure(error) {
//   return {
//     type: SESSION_TOKEN_FAILURE,
//     payload: _.isUndefined(error) ? null:error
//   };
// }
//
// /**
//  * ## DeleteToken actions
//  */
// export function deleteTokenRequest() {
//   return {
//     type: DELETE_TOKEN_REQUEST
//   };
// }
// export function deleteTokenRequestSuccess() {
//   return {
//     type: DELETE_TOKEN_SUCCESS
//   };
// }

// /**
//  * ## Delete session token
//  *
//  * Call the AppAuthToken deleteSessionToken
//  */
// export function deleteSessionToken() {
//   return dispatch => {
//     dispatch(deleteTokenRequest());
//     return new  AppAuthToken().deleteSessionToken()
//       .then(() => {
//         dispatch(deleteTokenRequestSuccess());
//       });
//   };
// }
// /**
//  * ## Token
//  * If AppAuthToken has the sessionToken, the user is logged in
//  * so set the state to logout.
//  * Otherwise, the user will default to the login in screen.
//  */
// export function getSessionToken() {
//   return dispatch => {
//     dispatch(sessionTokenRequest());
//     return new AppAuthToken().getSessionToken()
//
//       .then((token) => {
//         if (token) {
//           dispatch(sessionTokenRequestSuccess(token));
//           // dispatch(logoutState());  //TODO:
//           Actions.Tabbar();
//         } else {
//           dispatch(sessionTokenRequestFailure());
//           Actions.Onboarding();
//         }
//       })
//
//       .catch((error) => {
//         dispatch(sessionTokenRequestFailure(error));
//         // dispatch(loginState());//TODO:
//         Actions.Onboarding();
//       });
//   };
// }

/**
 * ## saveSessionToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with sessionToken
 */
export function saveSessionToken(token) {
  return new AppAuthToken().storeSessionToken(token);
}


/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 * @param {string} first_name - user's first_name
 * @param {string} last_name - user's last_name
 * @param {string} dayOfBirth - user's day of birth
 * @param {string} zipcode - user's zipcode
 * @param {string} topics - user's topics of interest (array of strings)
 * @param {string} gender - user's gender
 *
 * Call PavClientSdk.signup and if good, save the sessionToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup(email, password, first_name, last_name, dayOfBirth, zipcode, topics, gender) {
  return async function (dispatch){
    dispatch(signupRequest());
    var res = await PavClientSdk().userApi().signup({
        "email": email,
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
        "dob": dayOfBirth,
        "zipcode": zipcode,
        "topics": topics,
        "gender": gender
      });

    if(!!res.error){
      var errorMessage = null;
      return dispatch(signupFailure(res.error));
    }else{
      // console.log(res.data.token);
      saveSessionToken(res.data.token)
      return dispatch(signupSuccess(Object.assign({}, res.data,
  			{
  			  email: email
  			})));
      //TODO: Perhaps navigate to the newsfeed screen now?
    }
  };
}



/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
}

/**
 * ## Login
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

  export function login(email,  password) {
  return async function(dispatch){
    dispatch(loginRequest());

    var res = await PavClientSdk().login({
      email: email,
      password: password
    });
    // console.log("Got res in authActions.login with error: "+res.error+" and data: "+res.data);
    if(!!res.error){
      var errorMessage = null;
      console.log("Error type: "+res.errorType)
      if(res.errorType=="text"){
        errorMessage = res.error;
        console.log("Error msg TEXt authActions.login: "+errorMessage)
      }else{
        errorMessage = res.error.errors[0].email;
        console.log("Error msg JSON authActions.login: "+errorMessage)
      }
      return dispatch(loginFailure(errorMessage));
    }else{
      // console.log(res.data.token);
      saveSessionToken(res.data.token)
      return dispatch(loginSuccess(res.data));
      //TODO: Perhaps navigate to the newsfeed screen now?
    }
}

// /**
//  * ## ResetPassword actions
//  */
// export function resetPasswordRequest() {
//   return {
//     type: RESET_PASSWORD_REQUEST
//   };
// }
//
// export function resetPasswordSuccess() {
//   return {
//     type: RESET_PASSWORD_SUCCESS
//   };
// }
//
// export function resetPasswordFailure(error) {
//   return {
//     type: RESET_PASSWORD_FAILURE,
//     payload: error
//   };
// }
/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on setting Parse.com
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
// export function resetPassword(email) {
//   return dispatch => {
//     dispatch(resetPasswordRequest());
//     return PavClientSdk().resetPassword({
//       email: email
//     })
//       .then(() => {
//         // dispatch(loginState());//TODO
//         dispatch(resetPasswordSuccess());
//         Actions.Login();
//       })
//       .catch((error) => {
//         dispatch(resetPasswordFailure(error));
//       });
//
//   };

}
