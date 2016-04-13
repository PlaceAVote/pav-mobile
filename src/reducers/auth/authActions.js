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
import {ActionNames, ScheneKeys} from '../../config/constants';
import {LoginManager, AccessToken, GraphRequestManager, GraphRequest} from 'react-native-fbsdk';
import moment from 'moment';
/**
 * ## Imports
 *
 * The actions supported
 */
 /**
  * ## Auth actions
  */
 const {
   SESSION_TOKEN_REQUEST,
   SESSION_TOKEN_SUCCESS,
   SESSION_TOKEN_FAILURE,

   DELETE_TOKEN_REQUEST,
   DELETE_TOKEN_SUCCESS,

   LOGOUT_REQUEST,
   LOGOUT_SUCCESS,
   LOGOUT_FAILURE,

   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_FAILURE,

   LOGIN_FACEBOOK_REQUEST,
   LOGIN_FACEBOOK_SUCCESS,
   LOGIN_FACEBOOK_FAILURE,


   FACEBOOK_DATA_ACQ_REQUEST,
   FACEBOOK_DATA_ACQ_SUCCESS,
   FACEBOOK_DATA_ACQ_FAILURE,

   FORGOT_PASSWORD_REQUEST,
   FORGOT_PASSWORD_SUCCESS,
   FORGOT_PASSWORD_FAILURE,

   ON_AUTH_FORM_FIELD_CHANGE,
   ON_TOPICS_FORM_FIELD_CHANGE,
   SIGNUP_REQUEST,
   SIGNUP_SUCCESS,
   SIGNUP_FAILURE,


   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAILURE,
   RESET_ERROR_STATE,

   SET_STATE
 } = ActionNames;


 const {
   LOGOUT,
   REGISTER_STEP_1,
   REGISTER_STEP_2,
   REGISTER_STEP_3,
   REGISTER_STEP_4,
   LOGIN,
   FORGOT_PASSWORD,
   TOPIC_PICK
 } = ScheneKeys;

/**
 * Project requirements
 */


import PavClientSdk from 'pavclient';
import {setModalVisibility} from '../routing/routingActions'
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
 * ## onSelectedTopicsChange
 * Set the payload so the reducer can work on it
 */
export function onSelectedTopicsChange(topics) {
  return {
    type: ON_TOPICS_FORM_FIELD_CHANGE,
    payload: topics
  };
}

export function resetErrorState(){
  return {
    type: RESET_ERROR_STATE
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
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup(email, password, first_name, last_name, dayOfBirth, zipcode, topics, gender) {
  return async function (dispatch){
    dispatch(signupRequest());
    var res = await PavClientSdk().userApi.signup({
        "email": email,
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
        "dob": dayOfBirth,
        "zipcode": zipcode,
        "topics": topics,
        "gender": gender
      });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      if(res.multipleErrors){
        // console.log("authActions.login :: Error msg: "+res.error[0].email)
        let err = res.error[0];
        let errObj = err[Object.keys(err)[0]];  //the first property of the error object returned by the server
        dispatch(signupFailure(errObj));
      }else{
        // console.log("authActions.login :: Error msg: "+res.error)
        dispatch(signupFailure(res.error));
      }
    }else{
      // console.log("Signup success");
      saveSessionToken(res.data.token)
      dispatch(signupSuccess(Object.assign({}, res.data,
  			{
  			  email: email,
          first_name: first_name
  			})));
    }
    return dispatch(setModalVisibility(TOPIC_PICK, true));
  };
}












/**
 * ## LOGIN actions
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

      var res = await PavClientSdk().userApi.login({
        email: email,
        password: password
      });
      // console.log("Got res in authActions.login with error: "+res.error+" and data: "+res.data);
      console.log("RES: "+JSON.stringify(res));
      if(!!res.error){
        alert("Thats wrong man.. Keep in mind that we are calling the apidev and not the api endpoint.");
        if(res.multipleErrors){
          // console.log("authActions.login :: Error msg: "+res.error[0].email)
          return dispatch(loginFailure(res.error[0].email));
        }else{
          // console.log("authActions.login :: Error msg: "+res.error)
          return dispatch(loginFailure(res.error));
        }
      }else{
        alert("Good that was right, the cake was a lie though..");
        // console.log(res.data.token);
        saveSessionToken(res.data.token)
        return dispatch(loginSuccess(res.data));
        //TODO: Perhaps navigate to the newsfeed screen now?
      }
  }
}


















/**
 * ## FORGOT_PASSWORD actions
 */

export function forgotPasswordRequest() {
  return {
    type: FORGOT_PASSWORD_REQUEST
  };
}

export function forgotPasswordSuccess() {
  return {
    type: FORGOT_PASSWORD_SUCCESS
  };
}

export function forgotPasswordFailure() {
  return {
    type: FORGOT_PASSWORD_FAILURE
  };
}

/**
 * ## Forgot password
 *
 * We call this action to send an email to the user to help him reset his password if he does not remember it.
 *
 * @param {string} email - user's email
 *
 */
  export function forgotPassword(email) {
    return async function(dispatch){
      dispatch(forgotPasswordRequest());

      var res = await PavClientSdk().userApi.forgotPassword({
        email: email
      });
      // console.log("Got res in authActions.forgotPassword with error: "+res.error+" and data: "+res.data);
      // console.log("RES: "+JSON.stringify(res));
      if(!!res.error){
        alert("We could not find an account with that email address.");
        dispatch(forgotPasswordFailure());
      }else{
        alert("Check your inbox for the reset password link.");
        dispatch(forgotPasswordSuccess());
      }
      return dispatch(setModalVisibility(FORGOT_PASSWORD, false));
  }
}

























/**
 * ## FACEBOOK AUTH actions
 */

export function facebookAuthRequest() {
  return {
    type: LOGIN_FACEBOOK_REQUEST
  };
}

export function facebookAuthSuccess() {
  return {
    type: LOGIN_FACEBOOK_SUCCESS
  };
}

export function facebookAuthFailure() {
  return {
    type: LOGIN_FACEBOOK_FAILURE
  };
}

/**
 * ## Facebook authentication
 *
 * We call this action to authenticate the user using facebook oAuth
 *
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
 */
 export function facebookAuth(fbUserId, fbUserToken, email, firstName, lastName, dayOfBirth, zipcode, imgUrl, topics, gender) {
   return async function (dispatch){
     dispatch(facebookAuthRequest());
     var res = await PavClientSdk().userApi.facebookAuth({
         "id": fbUserId,
         "token": fbUserToken,
         "email": email,
         "first_name": firstName,
         "last_name": lastName,
         "dob": dayOfBirth,
         "zipcode": zipcode,
         "img_url": imgUrl,
         "topics": topics,
         "gender": gender
       });
     // console.log("RES: "+JSON.stringify(res));
     if(!!res.error){
       if(res.multipleErrors){
         // console.log("authActions.login :: Error msg: "+res.error[0].email)
         let err = res.error[0];
         let errObj = err[Object.keys(err)[0]];  //the first property of the error object returned by the server
         return dispatch(facebookAuthFailure(errObj));
       }else{
         // console.log("authActions.login :: Error msg: "+res.error)
         return dispatch(facebookAuthFailure(res.error));
       }
     }else{
       // console.log("Signup success");
       saveSessionToken(res.data.token)
       return dispatch(facebookAuthSuccess(Object.assign({}, res.data,
   			{
   			    email: email,
            first_name: first_name
   			})));
     }
   };
 }




//TODO: Right the reducer for this

 /**
  * ## FACEBOOK DATA ACQUISITION actions
  */

 export function facebookDataAcqRequest() {
   return {
     type: FACEBOOK_DATA_ACQ_REQUEST
   };
 }

 export function facebookDataAcqSuccess(data) {
   return {
     type: FACEBOOK_DATA_ACQ_SUCCESS,
     payload: data
   };
 }

 export function facebookDataAcqFailure(error) {
   return {
     type: FACEBOOK_DATA_ACQ_FAILURE,
     payload: error
   };
 }

export function facebookDataAcquisition(){
  return async function (dispatch){
    var fbUserData = {};
    dispatch(facebookDataAcqRequest());
    var {data:permDt, error:permErr} = await getFacebookReadPermissions(['public_profile', 'email']); //request those read permissions from fb
    if(!!permErr){ //if there was an error getting the read permissions
      dispatch(facebookDataAcqSuccess(permErr))
    }else{  //if there was no error getting the read permissions
      // console.log("Success on requesting read permissionss: "+JSON.stringify(permDt))
      if(permDt.isCancelled){ //if permissions window was cancelled
        dispatch(facebookDataAcqSuccess("User cancelled fb authentication."))
      }else{  //if permissions window was NOT cancelled
        // console.log("Permission req Successful");
        var {data:tokenNUsIdData, error:tokenNUsIdErr} = await getFacebookTokenAndUserId(); //request the fb token and the user id
        if(!!tokenNUsIdErr){  //if there was an error on the token and uid request
          dispatch(facebookDataAcqSuccess(tokenNUsIdErr))
        }else{//if the token and uid request was successful
          fbUserData.token = tokenNUsIdData.accessToken;
          fbUserData.id = tokenNUsIdData.userID;
        }
        getUserProfileData(fbUserData.token, (userDataErr, userData)=>{
          if(!!userDataErr){  //if there was an error getting the user data
            console.log("Error fetching user data: "+JSON.stringify(userDataErr));
            dispatch(facebookDataAcqSuccess(userDataErr))
          }else{
              fbUserData.firstName = userData.first_name || null;
              fbUserData.lastName = userData.last_name || null;
              fbUserData.id = userData.id || null;
              fbUserData.picUrl = userData.picture.data.url || null;
              fbUserData.gender = userData.gender || null;
              fbUserData.email = userData.email || null;
              fbUserData.dob = parseFbBirthday(userData.birthday) || null; // facebook returns either MM/DD/YYYY, MM/DD, or YYYY so we have to convert it to DD/MM/YYYY
              console.log("Done gathering user data: "+JSON.stringify(fbUserData));
              dispatch(facebookDataAcqSuccess(fbUserData))
          }
        });
      }
    }
  }
}

// Input MM/DD/YYYY, MM/DD, or YYYY output DD/MM/YYYY, same as input or null
function parseFbBirthday(birthdayString){
  if(!!birthdayString){
    if(birthdayString.length==10){ // full date MM/DD/YYYY
      return moment(birthdayString, 'MM/DD/YYYY').format('DD/MM/YYYY');
    }else if(birthdayString.length==4){  //year only YYYY
      return moment(birthdayString, 'YYYY').format('01/01/YYYY');
    }else if(birthdayString.length==5){  //no year MM/DD
      return moment(birthdayString, 'MM/DD').format('DD/MM/1980');
    }
  }else{
    // console.log("No birthday received from fb graph.");
    return null;
  }
  console.log("ERROR while parsing birthday string. Unknown format: "+birthdayString);
  return birthdayString;
}

 async function getFacebookReadPermissions(readPermissions){
     let res = {
       data:null,
       error: null
     };
     try{
       res.data = await LoginManager.logInWithReadPermissions(readPermissions);
     }catch(e){res.error = e}
    //  console.log("permissions: "+JSON.stringify(res));
     return res;
 }

 async function getFacebookTokenAndUserId(){
     let res = {
       data:null,
       error: null
     };
     try{
       res.data = await AccessToken.getCurrentAccessToken();
     }catch(e){res.error = e}
     console.log("token n user id : "+JSON.stringify(res));
     return res;
 }

 function getUserProfileData(token, next){



   let userDataRequest = new GraphRequest(
      '/me', //  graphPath: string,
      {
        httpMethod:'GET', //http method,
        version: "v2.6",
        parameters: {fields: {string:"email,first_name,last_name,birthday,picture,gender"}},
        accessToken:token
      },  //  config: object,
      next   //  callback: function
   );
   new GraphRequestManager().addRequest(userDataRequest).start();
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
 * ## ResetPassword actions
 */
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
