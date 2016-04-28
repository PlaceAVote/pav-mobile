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



/**
 * The necessary React
 */
import React, {
  Component,
  View,
  TouchableOpacity,
} from 'react-native';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

// const {} = require('../config/constants').ScheneKeys


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














class ProfileButtons extends Component {

  onSettingsBarBtnClicked(){
    console.log("Settings in profile page pressed.")
  }

  render(){
      return (
          <View style={{ flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10}}>
            <TouchableOpacity>
              <PavIcon name='logo' size={34} style={{color:'rgba(255,255,255,0.7)'}}/>
            </TouchableOpacity>
            <View style={{ flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
              <TouchableOpacity style={{paddingHorizontal:3}} onPress={this.onSettingsBarBtnClicked.bind(this)}>
                <PavIcon name='gear' size={35} style={{color:'white'}}/>
              </TouchableOpacity>
            </View>
          </View>
      );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(ProfileButtons);
