/**
 * ProfileButtons.js
 *
 * Our nav bar icons in the profile page
 */
'use strict';






/**
 *           Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as routingActions from '../../reducers/routing/routingActions';
import * as deviceActions from '../../reducers/device/deviceActions';
import * as profileActions from '../../reducers/profile/profileActions'


/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';



import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform
} from 'react-native';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import {
  ScheneKeys,
  Colors
} from '../../config/constants';
const {
  SETTINGS
} = ScheneKeys




/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  routingActions,
  // deviceActions,
  // profileActions
];

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}






const BTN_HEIGHT = 36;
const NAV_BAR_HEIGHT = (Platform.OS === 'ios')? 64 : 54;   //nav bar height



class ProfileButtons extends React.Component {

  onSettingsBarBtnClicked(){
    this.props.actions.navigateTo(SETTINGS);
  }

  render(){
      return (
        <View style={{flex:1, alignSelf:'flex-end', justifyContent:'flex-end', paddingBottom: 8}}>
          <TouchableOpacity style={{
            borderColor: Colors.mainBorderColor,
            // paddingHorizontal: w*0.076,
            // marginTop: NAV_BAR_HEIGHT-BTN_HEIGHT-8,
            marginRight: 10,
            borderRadius: 2,}} onPress={this.onSettingsBarBtnClicked.bind(this)}>
            <PavIcon name='gear' size={getCorrectFontSizeForScreen(30)} style={{color:'white'}}/>
          </TouchableOpacity>
        </View>

      );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(ProfileButtons);
