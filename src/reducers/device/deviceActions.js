/**
 * # deviceActions.js
 *
 * What platform are we running on, ie ```ios``` or ```android```
 *
 * What version is the app?
 *
 */
'use strict';
import Orientation from 'react-native-orientation';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SET_PLATFORM,
  SET_VERSION,
  SET_ORIENTATION,
  SET_ORIENTATION_LOCK
} = require ('../../config/constants').ActionNames

/**
 * ## Set the platformState
 *
 */
export function setPlatform(platform) {
  return {
    type: SET_PLATFORM,
    payload: platform
  };
}
/**
 * ## set the version
 *
 */
export function setVersion(version) {
  return {
    type: SET_VERSION,
    payload: version
  };
}


/**
* Set the device orientation
*/
export function setOrientation(orientation){
  return {
    type: SET_ORIENTATION,
    payload: orientation
  }
}

export function setOrientationLock(isLocked){
  return {
    type: SET_ORIENTATION_LOCK,
    payload: isLocked
  }
}


export function lockOrientation(orientation){
  switch (orientation) {
    case "PORTRAIT":
      Orientation.lockToPortrait(); //this will lock the view to Portrait
      break;
    case "LANDSCAPE":
      Orientation.lockToLandscape(); //this will lock the view to Portrait
      break;
    default:
      Orientation.unlockAllOrientations();//unlocks all orientations
  }
  return setOrientationLock(true);
}

export function unlockOrientation(){
  Orientation.unlockAllOrientations();//unlocks all orientations
  return setOrientationLock(false);
}
