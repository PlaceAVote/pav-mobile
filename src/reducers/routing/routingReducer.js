/**
 * # deviceReducer.js
 *
 * The reducer for all the actions from the various log states
 */

'use strict';
import AnalyticsReporter from '../../lib/Utils/analyticsReporter';
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


  let previousSchene = state.previousSchene, currentSchene = state.currentSchene;

  switch (action.type) {

   case ActionConst.JUMP:
      AnalyticsReporter().trackScreenView(action.key);
      state = closeOpenModalsIfPossible(state);
      return state.set('currentTab', action.key);
   case ActionConst.REPLACE:
   case ActionConst.PUSH: //react native router flux action
      AnalyticsReporter().trackScreenView(action.key);
      state = closeOpenModalsIfPossible(state);
      return state.set('previousSchene', currentSchene).set('currentSchene', action.key);

   case ActionConst.BACK://react native router flux action
   case ActionConst.BACK_ACTION://react native router flux action
   case MANUAL_NAVIGATE_TO_PREVIOUS:
      AnalyticsReporter().trackScreenView(previousSchene);
      state = closeOpenModalsIfPossible(state);
      return state.set('previousSchene', currentSchene).set('currentSchene', previousSchene);
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
