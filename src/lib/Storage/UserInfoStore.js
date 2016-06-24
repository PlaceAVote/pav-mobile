/**
 * # UserInfoStore.js
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


export default class UserInfoStore {
  /**
   * ## UserInfoStore
   *
   * set the key from the config
   */
  constructor () {
    this.USER_INFO_STORAGE_KEY = StorageKeys.USER_INFO_STORAGE_KEY;
  }

  /**
   * ### storeSessionToken
   * Store the user info object
   */
  storeUserInfo(userInfo) {
    store.save(this.USER_INFO_STORAGE_KEY, userInfo);
  }
  /**
   * ### getOrReplaceUserInfo
   * @param {Object} userInfo the currentUser user info we retreived from  pav backend
   *
   */
  async getOrReplaceUserInfo(userInfo) {
    if (!!userInfo) {
      await store.save(this.USER_INFO_STORAGE_KEY,userInfo);
      return await store.get(this.USER_INFO_STORAGE_KEY);
    }
    return await store.get(this.USER_INFO_STORAGE_KEY);
  }

  /**
   * ### deleteUserInfo
   * Deleted during log out
   */
  deleteUserInfo() {
    store.delete(this.USER_INFO_STORAGE_KEY);
  }
}
