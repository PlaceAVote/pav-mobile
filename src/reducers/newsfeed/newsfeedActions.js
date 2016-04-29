/**
 * # profileActions.js
 *
 * The actions to support the users profile
 */
'use strict';
/**
 * ## Imports
 *
 */



/**
 * AppAuthToken for localStorage sessionToken access
 */
const AppAuthToken = require('../../lib/Storage/AppAuthToken').default;
import PavClientSdk from 'pavclient';
// import {setUserData} from '../auth/authActions'



import {ActionNames, ScheneKeys} from '../../config/constants';
const {
  SET_ACTIVITY_FILTER,
} = ActionNames;


export function setActivityFilter(filterName) {
  return {
    type: SET_ACTIVITY_FILTER,
    payload: filterName
  };
}
