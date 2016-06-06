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
import {ActionNames, ScheneKeys, Modals} from '../../config/constants';
import {LoginManager, AccessToken, GraphRequestManager, GraphRequest} from 'react-native-fbsdk';
import moment from 'moment';
import {validateEmail, validatePassword} from '../../lib/Utils/fieldValidation';
import PavClientSdk from 'pavclient';
import {setModalVisibility, navigateTo} from '../routing/routingActions'
import {Actions} from 'react-native-router-flux';

import AppAuthTokenStore from '../../lib/Storage/AppAuthTokenStore';
import UserInfoStore from '../../lib/Storage/UserInfoStore';


import _ from 'underscore';



/**
 * ## Imports
 *
 * The actions supported
 */
 /**
  * ## Auth actions
  */
 const {
  //  SESSION_TOKEN_REQUEST,
  //  SESSION_TOKEN_SUCCESS,
  //  SESSION_TOKEN_FAILURE,

   DELETE_TOKEN_REQUEST,
   DELETE_TOKEN_SUCCESS,

   TOKEN_VALIDATE_REQUEST,
   TOKEN_VALIDATE_SUCCESS,
   TOKEN_VALIDATE_FAILURE,

   LOGOUT_REQUEST,
   LOGOUT_SUCCESS,
   LOGOUT_FAILURE,

   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_FAILURE,

   LOGIN_FACEBOOK_REQUEST,
   LOGIN_FACEBOOK_SUCCESS,
   LOGIN_FACEBOOK_FAILURE,

   VALIDATE_REQUEST,
   VALIDATE_SUCCESS,
   VALIDATE_FAILURE,

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

   SIGNUP_FACEBOOK_REQUEST,
   SIGNUP_FACEBOOK_SUCCESS,
   SIGNUP_FACEBOOK_FAILURE,

   RESET_ERROR_STATE,

   SET_STATE,
   SET_USER_DATA,
   SET_AUTH_METHOD
 } = ActionNames;


 const {
   LOGOUT,
   REGISTER_STEP_1,
   REGISTER_STEP_2,
   REGISTER_STEP_3,
   REGISTER_STEP_4,
   LOGIN,
 } = ScheneKeys;

const {
  WELCOME,
  FORGOT_PASSWORD,
} = Modals
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
//     return new AppAuthTokenStore().getOrReplaceSessionToken()
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
 * ## Signup actions
 */
export function validateTokenRequest() {
  return {
    type: TOKEN_VALIDATE_REQUEST
  };
}
export function validateTokenSuccess(json) {
  return {
    type: TOKEN_VALIDATE_SUCCESS,
    payload: json
  };
}
export function validateTokenFailure(error) {
  return {
    type: TOKEN_VALIDATE_FAILURE,
    payload: error
  };
}
export function validateToken(sessionToken=null, dev = null) {
  return async function(dispatch){
    dispatch(validateTokenRequest());


    let tok = sessionToken;
    try{
        if(!sessionToken){
          let tk = await new AppAuthTokenStore().getOrReplaceSessionToken(sessionToken);
          tok = tk.sessionToken;
        }
    }catch(e){
      console.log("Unable to fetch past token in authActions.validateToken() with error: "+e.message);
      dispatch(validateTokenFailure("No past token exists."));
      return null;
    }

    var res = await PavClientSdk({isDev:dev}).userApi.validateToken({
      token: tok,
    });
    // console.log("Got res in authActions.login with error: "+res.error+" and data: "+res.data);
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      if(res.multipleErrors){
        dispatch(validateTokenFailure(res.error[0].email));
        // alert(res.error[0].email);
        return null;
      }else{
        // console.log("authActions.login :: Error msg: "+res.error)
        dispatch(validateTokenFailure(res.error));
        return null;
      }
    }else{
      dispatch(validateTokenSuccess(res.data));
      // dispatch(loginSuccess(res.data));
      return res.data;
    }
}
}
















/*
  This function sets the authentication method.
  The value of the method can be EITHER  "facebook"  or "email" and nothing else.
*/
export function setAuthMethod(method) {
  return {
    type: SET_AUTH_METHOD,
    payload: method
  };
}


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
 * @param {string} dayOfBirth - user's day of birth (timestamp)
 * @param {string} zipcode - user's zipcode
 * @param {string} topics - user's topics of interest (array of strings)
 * @param {string} gender - user's gender
 *
 * Call PavClientSdk.signup and if good, save the sessionToken,
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup(email, password, first_name, last_name, dayOfBirth, zipcode, topics, gender, isDev=null) {
  return async function (dispatch){
    dispatch(signupRequest());
    var res = await PavClientSdk({isDev:dev}).userApi.signup({
        "email": email,
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
        "dob": dayOfBirth.format("x"),
        "zipcode": zipcode,
        "topics": topics,
        "gender": gender
      });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      if(res.multipleErrors){
        let err = res.error[0];
        let errObj = err[Object.keys(err)[0]];  //the first property of the error object returned by the server
        dispatch(signupFailure(errObj));
      }else{
        dispatch(signupFailure(res.error));
      }
    }else{
      // console.log("Signup success");
      saveSessionTokenAndBasicInfo(res.data.token, {
        user_id: res.data.user_id,
        city: res.data.city || "",
        first_name: first_name
      })
      dispatch(signupSuccess(Object.assign({}, res.data,
  			{
  			  email: email,
          first_name: first_name
  			})));
    }
    return dispatch(setModalVisibility(WELCOME, true));
  };
}



export function setUserData(userData){
  return {
    type: SET_USER_DATA,
    payload: userData
  }
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

  export function login(email,  password, dev) {
    return async function(dispatch){

      let emailIsInvalid = validateEmail(email), passwordIsInvalid = validatePassword(password);

      if(emailIsInvalid || passwordIsInvalid){   //if any of the two credentials were invalid
        // console.log("emailIsInvalid"+emailIsInvalid+"passwordIsInvalid"+passwordIsInvalid);
        dispatch(loginFailure("Please provide us with a valid username and password."));
        return null;
      }else{ //if the login credentials given by the user were BOTH valid
        dispatch(loginRequest());
        var res = await PavClientSdk({isDev:dev}).userApi.login({
          email: email,
          password: password
        });
        // console.log("Got res in authActions.login with error: "+res.error+" and data: "+res.data);
        // console.log("RES: "+JSON.stringify(res));
        if(!!res.error){
          if(dev){
            alert("Thats wrong man.. Keep in mind that we are calling the apidev and not the api endpoint.");
          }
          if(res.multipleErrors){
            // console.log("authActions.login :: Error msg: "+res.error[0].email)
            dispatch(loginFailure(res.error[0].email));
            return null;
          }else{
            // console.log("authActions.login :: Error msg: "+res.error)
            dispatch(loginFailure(res.error));
            return null;
          }
        }else{
          if(dev){
            alert("Good that was right, the cake was a lie though..");
          }
          // console.log("Login gave us the token"+res.data.token);
          saveSessionTokenAndBasicInfo(res.data.token, {
            user_id: res.data.user_id,
            city: res.data.city,
            first_name: res.data.first_name
          })
          dispatch(loginSuccess(res.data));
          return res.data;
        }
      }
  }
}













/**
 * ## FACEBOOK Login actions
 */

export function facebookLoginRequest() {
  return {
    type: LOGIN_FACEBOOK_REQUEST
  };
}

export function facebookLoginSuccess(data) {
  return {
    type: LOGIN_FACEBOOK_SUCCESS,
    payload: data
  };
}

export function facebookLoginFailure(error) {
  return {
    type: LOGIN_FACEBOOK_FAILURE,
    payload: error
  };
}

export function loginFacebook(facebookUserId,  facebookAccessToken, isDev=null) {
  return async function(dispatch){
    dispatch(facebookLoginRequest());

    var res = await PavClientSdk({isDev:dev}).userApi.loginFacebook({
      fbUserId: facebookUserId,
      fbAccessToken: facebookAccessToken
    });
    // console.log("Got res in authActions.login with error: "+res.error+" and data: "+res.data);
    console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      if(res.multipleErrors){
        // console.log("authActions.login :: Error msg: "+res.error[0].email)
        dispatch(facebookLoginFailure(res.error[0].email));
        alert(res.error[0].email);
        return null;
      }else{
        // console.log("authActions.login :: Error msg: "+res.error)
        dispatch(facebookLoginFailure(res.error));
        alert(res.error);
        return null;
      }
    }else{
      alert("Good that was right, the cake was a lie though..");
      // console.log(res.data.token);
      saveSessionTokenAndBasicInfo(res.data.token, {
        user_id: res.data.user_id,
        city: res.data.city,
        first_name: res.data.first_name
      });
      dispatch(facebookLoginSuccess(res.data));
      return res.data;
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
  export function forgotPassword(email, isDev=null) {
    return async function(dispatch){
      dispatch(forgotPasswordRequest());

      var res = await PavClientSdk({isDev:dev}).userApi.forgotPassword({
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
 * ## FACEBOOK Login actions
 */

export function facebookSignupRequest() {
  return {
    type: SIGNUP_FACEBOOK_REQUEST
  };
}

export function facebookSignupSuccess(data) {
  return {
    type: SIGNUP_FACEBOOK_SUCCESS,
    payload: data
  };
}

export function facebookSignupFailure(error) {
  return {
    type: SIGNUP_FACEBOOK_FAILURE,
    payload: error
  };
}

/**
 * ## Facebook signup
 *
 * We call this action to sign the user up using facebook oAuth
 *
 * @param {string} fbUserId - facebook user id
 * @param {string} fbUserToken - facebook user token
 * @param {string} imgUrl - user photo we fetch from facebook
 * @param {string} email - user's email
 * @param {string} firstName - user's first_name
 * @param {string} lastName - user's last_name
 * @param {string} dayOfBirth - user's day of birth (timestamp)
 * @param {string} zipCode - user's zipcode
 * @param {string} topics - user's topics of interest (array of strings)
 * @param {string} gender - user's gender
 *
 */
 export function signupFacebook(fbUserId, fbUserToken, imgUrl, email, firstName, lastName, dayOfBirth, zipCode, topics, gender, isDev=null) {
   return async function (dispatch){
     dispatch(facebookSignupRequest());
     var res = await PavClientSdk({isDev:dev}).userApi.signupFacebook({
         "fbUserId": fbUserId,
         "fbToken": fbUserToken,
         "fbImgUrl": imgUrl,
         "email": email,
         "firstName": firstName,
         "lastName": lastName,
         "birthday": dayOfBirth,
         "zipCode": zipCode,
         "topics": topics,
         "gender": gender
       });
     console.log("RES: "+JSON.stringify(res));
     let curUser = null;
     if(!!res.error){
       if(res.multipleErrors){
         // console.log("authActions.login :: Error msg: "+res.error[0].email)
         let err = res.error[0];
         let errObj = err[Object.keys(err)[0]];  //the first property of the error object returned by the server
         dispatch(facebookSignupFailure(errObj));
       }else{
         // console.log("authActions.login :: Error msg: "+res.error)
         dispatch(facebookSignupFailure(res.error));
       }
     }else{
       // console.log("Signup success");
       saveSessionTokenAndBasicInfo(res.data.token, {
         user_id: res.data.user_id,
         city: res.data.city || "",
         first_name: firstName
       })
        curUser = Object.assign({}, res.data,
   			{
   			    email: email,
            first_name: firstName
   			});
       dispatch(facebookSignupSuccess(curUser));
     }
     dispatch(setModalVisibility(WELCOME, true));
     return curUser;
   };
 }












 /**
  * ## VALIDATE actions
  */

 export function validateRequest() {
   return {
     type: VALIDATE_REQUEST
   };
 }

 export function validateSuccess() {
   return {
     type: VALIDATE_SUCCESS
   };
 }

 export function validateFailure(error) {
   return {
     type: VALIDATE_FAILURE,
     payload: error
   };
 }
 /**
  * ## validateUserEmail
  *
  * We call this action to check wether the users email already exists in the backend
  *
  * @param {string} email - user's email to validate
  *
  */
export function validateUserEmail(emailToValidate, isDev=null){
  return async function (dispatch){
    dispatch(validateRequest());
    var res = await PavClientSdk({isDev:dev}).userApi.validate({
      email: emailToValidate
    });
    // console.log("RES: "+JSON.stringify(res));
    if(!!res.error){
      dispatch(validateFailure("Theres already a user registered with this email address."));
    }else{
      // console.log(res.data.token);
      dispatch(validateSuccess(res.data));
      return res.data;

    }
  }
}




//TODO: Write the reducer for this

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


export function facebookDataAcquisition(fetchAllAvailableUserData = true){
  return async function (dispatch, getState){
    var fbUserData = {};
    dispatch(facebookDataAcqRequest());
    var {data:permDt, error:permErr} = await getFacebookReadPermissions(['public_profile', 'email', 'user_birthday']); //request those read permissions from fb
    if(!!permErr){ //if there was an error getting the read permissions
      dispatch(facebookDataAcqFailure(permErr));
      return null;
    }else{  //if there was no error getting the read permissions
      // console.log("Success on requesting read permissionss: "+JSON.stringify(permDt))
      if(permDt.isCancelled){ //if permissions window was cancelled
        dispatch(facebookDataAcqFailure("User cancelled fb authentication."));
        return null;
      }else{  //if permissions window was NOT cancelled
        // console.log("Permission req Successful");
        var {data:tokenNUsIdData, error:tokenNUsIdErr} = await getFacebookTokenAndUserId(); //request the fb token and the user id
        if(!!tokenNUsIdErr){  //if there was an error on the token and uid request
          dispatch(facebookDataAcqFailure(tokenNUsIdErr));
          return null;
        }else{//if the token and uid request was successful
          fbUserData.accessToken = tokenNUsIdData.accessToken;
          fbUserData.userID = tokenNUsIdData.userID;
          if(fetchAllAvailableUserData===true){   //if we want to fetch all the available user data (name, lastname, email, photo whatever)

            try{
                let userData = await getUserFacebookProfileData(fbUserData.token);
                fbUserData.firstName = userData.first_name || null;
                fbUserData.lastName = userData.last_name || null;
                fbUserData.picUrl = userData.picture.data.url || null;
                fbUserData.gender = userData.gender || null;
                fbUserData.email = userData.email || null;
                fbUserData.dob = parseFbBirthdayToUnixTimestamp(userData.birthday) || null; // facebook returns either MM/DD/YYYY, MM/DD, or YYYY so we have to convert it to DD/MM/YYYY
                // console.log("Done gathering user data: "+JSON.stringify(fbUserData));
                dispatch(facebookDataAcqSuccess(fbUserData));
                return fbUserData;
            }catch(e){
              console.log("Error fetching user data: "+JSON.stringify(userDataErr));
              dispatch(facebookDataAcqFailure(userDataErr));
              return null;
            }


          }else{  //if we are NOT interested in all the available user data (name, lastname, email, photo whatever) but just the user id and token
            dispatch(facebookDataAcqSuccess(fbUserData));
            return fbUserData;
          }
        }
      }
    }
  }
}

/*
* Parameter
* either:
*  - MM/DD/YYYY, OR
*  - MM/DD, OR
*  - YYYY
* Returns Output
* either :
*   - a Date() object , OR
*   - same as input , OR
*   - null
*/
function parseFbBirthdayToUnixTimestamp(birthdayString){
  if(!!birthdayString){
    if(birthdayString.length==10){ // full date MM/DD/YYYY
      return moment(birthdayString, 'MM/DD/YYYY').format("x");
    }else if(birthdayString.length==4){  //year only YYYY
      return moment(birthdayString, 'YYYY').format("x");
    }else if(birthdayString.length==5){  //no year MM/DD
      return moment(birthdayString, 'MM/DD').format("x");
    }
  }else{
    // console.log("No birthday received from fb graph.");
    return null;
  }
  // console.log("ERROR while parsing birthday string. Unknown format: "+birthdayString);
  return birthdayString;
}

 async function getFacebookReadPermissions(readPermissions){
     let res = {
       data:null,
       error
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
       error
     };
     try{
       res.data = await AccessToken.getCurrentAccessToken();
     }catch(e){res.error = e}
    //  console.log("token n user id : "+JSON.stringify(res));
     return res;
 }

 function getUserFacebookProfileData(token){
   return new Promise(function(resolve, reject){
     let userDataRequest = new GraphRequest(
        '/me', //  graphPath: string,
        {
          httpMethod:'GET', //http method,
          version: "v2.6",
          parameters: {fields: {string:"email,first_name,last_name,birthday,picture,gender"}},
          accessToken:token
        },  //  config: object,
        (userDataErr, userData)=>{
          if(!!userDataErr){
            reject(userDataErr);
          }else{
            resolve(userData);
          }
        }   //  callback: function
     );
     new GraphRequestManager().addRequest(userDataRequest).start();
   });
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
//  * Call the AppAuthTokenStore deleteSessionToken
//  */
// export function deleteSessionToken() {
//   return dispatch => {
//     dispatch(deleteTokenRequest());
//     return new  AppAuthTokenStore().deleteSessionToken()
//       .then(() => {
//         dispatch(deleteTokenRequestSuccess());
//       });
//   };
// }
// /**
//  * ## Token
//  * If AppAuthTokenStore has the sessionToken, the user is logged in
//  * so set the state to logout.
//  * Otherwise, the user will default to the login in screen.
//  */
// export function getOrReplaceSessionToken() {
//   return dispatch => {
//     dispatch(sessionTokenRequest());
//     return new AppAuthTokenStore().getOrReplaceSessionToken()
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
 * ## saveSessionTokenAndBasicInfo
 * @param {Object} token - Our session token
 * @param {Object} basicInfo - An object that contains basic user info such as user_id, city, first_name
 */
export function saveSessionTokenAndBasicInfo(token, basicInfo=null) {

  if(basicInfo!=null){
    console.log("NOW saving session token with basic info: "+JSON.stringify(basicInfo))
    new UserInfoStore().storeUserInfo(basicInfo);
  }
  return new AppAuthTokenStore().storeSessionToken(token);
}
