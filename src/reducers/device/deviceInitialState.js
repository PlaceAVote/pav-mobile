/**
 * # deviceInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import immutable record
 */
import {Record} from 'immutable';
import Dimensions from 'Dimensions';
// import Orientation from 'react-native-orientation';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {updateScreenSizesByOrientation} from '../../lib/Utils/multiResolution'





/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  isMobile: false,
  platform: '',
  version: null,
  orientation: 'PORTRAIT',//Orientation.getInitialOrientation()    //can be PORTRAITUPSIDEDOWN, PORTRAIT, LANDSCAPE
  orientationLocked: false,
  screenWidth: w,
  screenHeight: h,
});

export default InitialState;
