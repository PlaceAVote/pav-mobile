'use strict';

// import init from './src/init';
// init('ios');


import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
// console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

import PlaceAVote from './src/init';
/**
* registerComponent to the AppRegistery and off we go....
*/
AppRegistry.registerComponent('PlaceAVoteApp', () => PlaceAVote);
