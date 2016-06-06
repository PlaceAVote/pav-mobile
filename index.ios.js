'use strict';

// import init from './src/init';
// init('ios');
import React from 'react';
import { AppRegistry, DatePickerIOS } from 'react-native';

/*
  Avoiding invalid rn 26 warnings
*/
DatePickerIOS.propTypes.date = React.PropTypes.any.isRequired;
DatePickerIOS.propTypes.onDateChange = React.PropTypes.func;
DatePickerIOS.propTypes.maximumDate = React.PropTypes.any;
DatePickerIOS.propTypes.minimumDate = React.PropTypes.any;



// @todo remove when RN upstream is fixed
// console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];
import PlaceAVote from './src/init';

/**
* registerComponent to the AppRegistery and off we go....
*/
AppRegistry.registerComponent('PlaceAVote', () => PlaceAVote);
