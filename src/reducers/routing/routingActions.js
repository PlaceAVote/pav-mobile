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
/**
 * ## Imports
 *
 * The actions supported
 */
const {
  NAVIGATE_TO,
  NAVIGATE_PREVIOUS,
  SET_MODAL_VISIBILITY
} = ActionNames;

const {
  REGISTER_STEP_1,
  REGISTER_STEP_2,
  REGISTER_STEP_3,
  REGISTER_STEP_4,
  TOPIC_PICK,
  MAIN,
  ACCOUNT_SETTINGS
} = ScheneKeys;


/**
* Import our router
*/
import {Actions} from 'react-native-router-flux';

/**
 * Project requirements
 */

// import {Actions} from 'react-native-router-flux';
// const  _ = require('underscore');

export function navigateState(schene) {
  return {
    type: NAVIGATE_TO,
    payload: schene
  };
}

export function navigateToPreviousState() {
  return {
    type: NAVIGATE_PREVIOUS,
    payload: null
  };
}

// Actions[scheneName]();





export function navigateUserToTheCorrectNextOnboardingStep(currentStep){
  return (dispatch, getState) => {
    let curState = getState();

    //this part is the same no matter the auth method
    switch(currentStep){
      case REGISTER_STEP_1: //theres no way for the user to be here but anyway, just correct the mistake if he ever gets here
          if(curState.auth.form.authMethod=="email"){//if we're currently signin up using the email signup process
            dispatch(navigateTo(REGISTER_STEP_2));
          }else if(curState.auth.form.authMethod=="facebook"){//if we're currently signin up using the facebook process
            let isValid = curState.auth.form.isValid.toJS();
            if(!isValid[REGISTER_STEP_2]){  //if the email of the user that we got through the graph api is not valid
              dispatch(navigateTo(REGISTER_STEP_2));  //take him to the email form (REGISTER step 2)
            }else{  //if the email we got was valid take him to step 4 for zipcode and birthday
              dispatch(navigateTo(REGISTER_STEP_4));
            }
          }else{
            throw new Error("PAV :: The auth.form.authMethod property should be defined (either email, or facebook) before starting the signup process.");
          }
        break;
      case REGISTER_STEP_2: //theres no way for the user to be here but anyway, just correct the mistake if he ever gets here
        if(curState.auth.form.authMethod=="email"){//if we're currently signin up using the email signup process
          dispatch(navigateTo(REGISTER_STEP_3));
        }else if(curState.auth.form.authMethod=="facebook"){//if we're currently signin up using the facebook process
          dispatch(navigateTo(REGISTER_STEP_4));
        }else{
          throw new Error("PAV :: The auth.form.authMethod property should be defined (either email, or facebook) before starting the signup process.");
        }
        break;
      case REGISTER_STEP_3: //theres no way for the user to be here but anyway, just correct the mistake if he ever gets here
        dispatch(navigateTo(REGISTER_STEP_4));
        break;
      case REGISTER_STEP_4:
        dispatch(navigateTo(TOPIC_PICK));
        break;
      case TOPIC_PICK:
        dispatch(navigateTo(MAIN));
        break;
      default:
        let isValid = curState.auth.form.isValid.toJS();
        if(!isValid[REGISTER_STEP_1]){  //if we were not able to fetch the user name or surname from the facebook graph api
          dispatch(navigateTo(REGISTER_STEP_1));  //take him to the name and surname form
        }else if(!isValid[REGISTER_STEP_2]){  //if we were not able to fetch the users email from the facebook graph api
          dispatch(navigateTo(REGISTER_STEP_2));  //take him to the email form
        }else{  //if we got both the name, surname and email from the facebook graph api
          dispatch(navigateTo(REGISTER_STEP_4));  //take him to the zipcode and birthday form (we surely didn't get a zipcode from fb)
        }
        break;
    }
  }
}


/*
Action creators

*/

export function navigateTo(schene, dataToTransferToNewShene) {
  return (dispatch, getState) => {
    const state = getState()
    if(state.router.currentSchene!=schene){
      try{
        Actions[schene](dataToTransferToNewShene);
      }catch(e){
        throw new Error("Schene: "+schene+ "nav error: "+e);
      }
    }else{
      throw new Error("We\'re already within "+schene);
    }

  }
}


export function navigateToPrevious() {
    return (dispatch, getState) => {
      const state = getState()
      if(!!state.router.previousSchene){
        Actions.pop()
      }else{
        //do somethong when there is NO previous state.
        throw new Error("ERROR: No previous state to head to.")
      }
    }
}


export function setModalVisibility(modalName, visible) {
  return {
    type: SET_MODAL_VISIBILITY,
    payload: {name: modalName, visibility: visible}
  };
}
