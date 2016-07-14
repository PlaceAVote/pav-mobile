/**
 * NewsFeedButtons.js
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
import {View, TouchableOpacity, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {
ScheneKeys,
Modals
} from '../../config/constants';
const {
  NEWISSUE
} = ScheneKeys
const {
  SEARCH_BILL
} = Modals;


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













{/*<TouchableOpacity style={{paddingHorizontal:w*0.020}}>
  <PavIcon name='logo' size={34} style={{color:'rgba(255,255,255,0.1)'}}/>
</TouchableOpacity>*/}
class NewsFeedButtons extends React.Component {


  render(){
      return (
          <View style={{ flex:1,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <TouchableOpacity style={{flex:0, paddingHorizontal:w*0.020}} onPress={
              ()=>{this.props.actions.setModalVisibility(SEARCH_BILL, !this.props.router.modalIsOpen.get(SEARCH_BILL))}
            }>
              <PavIcon name='ios-search-strong' size={30} style={{color:'white'}}/>
            </TouchableOpacity>
            <View style={{ flex:0, flexDirection:'row', justifyContent:'flex-end'}}>
              <TouchableOpacity style={{paddingHorizontal:w*0.020}} onPress={
                ()=>{this.props.actions.navigateTo(NEWISSUE)}
              }>
                <PavIcon name='issues' size={26} style={{color:'white'}}/>
              </TouchableOpacity>
            </View>
          </View>
      );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedButtons);
