'use strict';

// import init from './src/init';
// init('ios');

console.log("@@@@@@@@@@@@@@@@@@@@ before rn");
import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
// console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];
console.log("@@@@@@@@@@@@@@@@@@@@ before init");
import PlaceAVote from './src/init';
/**
* registerComponent to the AppRegistery and off we go....
*/
console.log("@@@@@@@@@@@@@@@@@@@@ before appregistry");
AppRegistry.registerComponent('PlaceAVoteApp', () => PlaceAVote);
