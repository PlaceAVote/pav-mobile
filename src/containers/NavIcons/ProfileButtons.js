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

import Orientation from 'react-native-orientation';
/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';



import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
// const {} = ScheneKeys


/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  deviceActions,
  profileActions
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










class ProfileButtons extends React.Component {

  onSettingsBarBtnClicked(){
    console.log("Settings in profile page pressed.")
  }

  render(){
      return (
          <View style={{ flex:1,flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end', paddingVertical:h*0.013}}>
            <TouchableOpacity style={{paddingHorizontal:w*0.020}}>
              <PavIcon name='logo' size={34} style={{color:'rgba(255,255,255,0.7)'}}/>
            </TouchableOpacity>
            <View style={{ flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
              <TouchableOpacity style={{paddingHorizontal:w*0.020}} onPress={this.onSettingsBarBtnClicked.bind(this)}>
                <PavIcon name='gear' size={35} style={{color:'white'}}/>
              </TouchableOpacity>
            </View>
          </View>
      );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(ProfileButtons);
