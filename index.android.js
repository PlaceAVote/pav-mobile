'use strict';

// import init from './src/init';
// init('android');


import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
// console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

import init from './src/init';
/**
* registerComponent to the AppRegistery and off we go....
*/
AppRegistry.registerComponent('PlaceAVote', () => init);
