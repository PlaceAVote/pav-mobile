/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict';
/**
 * ## Imports
 *
 * our 4 reducers
 */
import auth from './auth/authReducer';
import device from './device/deviceReducer';
import global from './global/globalReducer';
import profile from './profile/profileReducer';
import router from './routing/routingReducer';
import newsfeed from './newsfeed/newsfeedReducer';
import bill from './bill/billReducer';
import notifications from './notifications/notificationReducer';
import settings from './settings/settingsReducer';

import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
  device,
  global,
  profile,
  router,
  newsfeed,
  bill,
  notifications,
  settings
});

export default rootReducer;
