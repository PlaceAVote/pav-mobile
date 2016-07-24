/**
 * # deviceReducer.js
 *
 * The reducer for all the actions from the various log states
 */

'use strict';
import AnalyticsReporter from '../../lib/Utils/analyticsReporter';

import {List} from 'immutable';
/**
 * ## Imports
 *
 * InitialState
 */
import InitialRouterState from './routingInitialState';
import {ActionConst} from 'react-native-router-flux';
import {ActionNames, Modals} from '../../config/constants';

/**
 * Routing actions to test
 */
 const {
   SET_MODAL_VISIBILITY,
   MANUAL_NAVIGATE_TO_PREVIOUS
 } = ActionNames;


const initialRouterState = new InitialRouterState


function closeOpenModalsIfPossible(state){
  if(state.currentModal!=null){ //if a modal is open while going to the previous screen
    return state = state.setIn(['modalIsOpen', state.currentModal], false).set('currentModal', null);    //stop showing the modal, and set the currentModal to null
  }
  return state;
}
/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function routingReducer(state = initialRouterState, action) {
  if (!(state instanceof InitialRouterState)) return initialRouterState.merge(state);


  let previousSchenes = state.previousSchenes, currentSchene = state.currentSchene;

  switch (action.type) {

   case ActionConst.JUMP:
      AnalyticsReporter().trackScreenView(action.key);
      state = closeOpenModalsIfPossible(state);
      return state.set('currentTab', action.key);
   case ActionConst.REPLACE:
   case ActionConst.PUSH: //react native router flux action
      AnalyticsReporter().trackScreenView(action.key);
      state = closeOpenModalsIfPossible(state);


      if(currentSchene=="SPLASH_SCREEN"){
        return state.set('currentSchene', action.key);
      }

      // if(!!previousSchenes && List.isList(previousSchenes) ){
      //   prev;
      // }
      let prev = previousSchenes.push(currentSchene);
      return state.set('previousSchenes', prev).set('currentSchene', action.key);


   case ActionConst.BACK://react native router flux action
   case ActionConst.BACK_ACTION://react native router flux action
   case MANUAL_NAVIGATE_TO_PREVIOUS:
      let previousScheneThatBecomesCurrent = previousSchenes.last();  //get the previous screen from the list (last() is like calling pop in an js array)
      AnalyticsReporter().trackScreenView(previousScheneThatBecomesCurrent);
      state = closeOpenModalsIfPossible(state);
      let prevSc = previousSchenes.pop(); //remove last schene from the list
      return state.set('previousSchenes', prevSc).set('currentSchene', previousScheneThatBecomesCurrent);
   case SET_MODAL_VISIBILITY:
      AnalyticsReporter().trackScreenView(name);

      const {name, visibility} = action.payload;
      return state.setIn(['modalIsOpen', name], visibility)
      .set('currentModal', visibility===true?name:null);
   default:
    //  console.log("Routing reducer running with no valid action type: "+action.type);
      return state;
      break;
  }
}
