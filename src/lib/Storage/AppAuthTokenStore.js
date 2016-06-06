/**
 * # AppAuthTokenStoreStore.js
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
import {StorageKeys} from '../../config/constants';


export default class AppAuthTokenStoreStore {
  /**
   * ## AppAuthTokenStoreStore
   *
   * set the key from the config
   */
  constructor () {
    this.SESSION_TOKEN_STORAGE_KEY = StorageKeys.SESSION_TOKEN_STORAGE_KEY;
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
   * ### getOrReplaceSessionToken
   * @param {Object} sessionToken the currentUser object from pav backend
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  async getOrReplaceSessionToken(sessionToken) {
    if (!!sessionToken) {
      await store.save(this.SESSION_TOKEN_STORAGE_KEY,{sessionToken: sessionToken})
      return await store.get(this.SESSION_TOKEN_STORAGE_KEY);
    }
    return await store.get(this.SESSION_TOKEN_STORAGE_KEY);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    store.delete(this.SESSION_TOKEN_STORAGE_KEY);
  }
}
