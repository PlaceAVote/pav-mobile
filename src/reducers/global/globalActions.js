/**
 * # globalActions.js
 *
 * Actions that are global in nature
 */
'use strict';

import {ActionNames} from '../../config/constants';
import FBSDK from 'react-native-fbsdk';
const {
  ShareApi,
  ShareDialog
} = FBSDK;
/**
 * ## Imports
 *
 * The actions supported
 */
const {
  // SET_SESSION_TOKEN,
  SET_DEV,
  SET_STORE,
  // SET_STATE,
  // GET_STATE,
  SET_NAVBAR_DIMENSIONS,

  SOCIAL_SHARE_FACEBOOK_REQUEST,
  SOCIAL_SHARE_FACEBOOK_FAILURE,
  SOCIAL_SHARE_FACEBOOK_SUCCESS,

} = ActionNames;

/**
 * ## set the sessionToken
 *
 */
// export function setSessionToken(sessionToken) {
//   return {
//     type: SET_SESSION_TOKEN,
//     payload: sessionToken
//   };
// }
/**
 * ## set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store) {
  return {
    type: SET_STORE,
    payload: store
  };
}




/**
 * ## set the environment
 *
 */
export function setEnvironmentIsDev(environmentIsDev) {
  return {
    type: SET_DEV,
    payload: environmentIsDev
  };
}


/**
 * ## set state
 *
 */
// export function setState(newState) {
//   return {
//     type: SET_STATE,
//     payload: newState
//   };
// }
/**
 * ## getState
 *
 */
// export function getState(toggle) {
//   return {
//     type: GET_STATE,
//     payload: toggle
//   };
// }



export function setNavBarDimensions(dimensions){
  return {
    type: SET_NAVBAR_DIMENSIONS,
    payload: dimensions
  }
}


















/**
 * ## sharing to facebook actions
 */
export function shareFacebookRequest() {
  return {
    type: SOCIAL_SHARE_FACEBOOK_REQUEST
  };
}
export function shareFacebookSuccess(json) {
  return {
    type: SOCIAL_SHARE_FACEBOOK_SUCCESS,
    payload: json
  };
}
export function shareFacebookFailure(json) {
  return {
    type: SOCIAL_SHARE_FACEBOOK_FAILURE,
    payload: json
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function shareFacebook(sharedData, sessionToken=null, dev = null) {
  console.log("shareFacebook called");
  return async function (dispatch){
    dispatch(shareFacebookRequest());

    if(!!sharedData){

          let shareLinkContent;
          switch(sharedData.type){
            case "bill":
              // Build up a shareable link.
              shareLinkContent = {
                contentType: 'link',
                contentUrl: "https://www.placeavote.com/#!/bill/"+sharedData.billId,
                contentDescription: "Do you agree or disagree? Join the discussion and place your vote today!",
              };
              break;
            default:
              break;
          }



          // await shareFacebookItem(shareLinkContent, userMessage)
          let fbRes = await showFacebooShareDialog(shareLinkContent);
          // console.log("FB response: "+JSON.stringify(fbRes));
          if(fbRes.postId!=null){
            dispatch(shareFacebookSuccess());
            return true;
          }else{
            dispatch(shareFacebookFailure());
            return null;
          }
    }
    dispatch(shareFacebookFailure());
    return null;
  };
}




//Opens the facebook share dialog
function showFacebooShareDialog(content){
  return new Promise(function(resolve, reject){
    ShareDialog.canShow(content).then(
      function(canShare) {
        if (canShare) {
          return ShareDialog.show(content);
        }
      }
    ).then(
      function(result) {
        resolve(result);
      },
      function(error) {
        reject(error);
      }
    );
  });
}


// Directly shares something to fb
// function shareFacebookItem(content, message){
//   return new Promise(function(resolve, reject){
//     ShareApi.canShare(content).then(
//       function(canShare) {
//         if (canShare) {
//           return ShareApi.share(content, '/me', message);
//         }
//       }
//     ).then(
//       function(result) {
//         resolve(result);
//       },
//       function(error) {
//         reject(result);
//       }
//     );
//   });
// }
