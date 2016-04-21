/**
 * # AppAuthToken.js
 *
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux  & the config file
 */
import store from 'react-native-simple-store';
import {Other} from '../../config/constants';


export default class AppAuthToken {
  /**
   * ## AppAuthToken
   *
   * set the key from the config
   */
  constructor () {
    this.SESSION_TOKEN_STORAGE_KEY = Other.SESSION_TOKEN_STORAGE_KEY;
  }

  /**
   * ### storeSessionToken
   * Store the session key
   */
  storeSessionToken(sessionToken) {
    return store.save(this.SESSION_TOKEN_STORAGE_KEY,{
      sessionToken: sessionToken
    });

  }
  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object from pav backend
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {
    if (sessionToken) {
      return store.save(this.SESSION_TOKEN_STORAGE_KEY,{
          sessionToken: sessionToken
      }).then(() => {
        return store.get(this.SESSION_TOKEN_STORAGE_KEY);
      });
    }
    return store.get(this.SESSION_TOKEN_STORAGE_KEY);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return store.delete(this.SESSION_TOKEN_STORAGE_KEY);
  }
}
