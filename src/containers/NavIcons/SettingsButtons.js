/**
 * SettingsButtons.js
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
import * as settingsActions from '../../reducers/settings/settingsActions'


import Orientation from 'react-native-orientation';
/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

import Button from 'sp-react-native-iconbutton'

import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import {
Colors
} from '../../config/constants';
import CONFIG from '../../config/config';

/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  // routingActions,
  // deviceActions,
  // profileActions
  settingsActions
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










class SettingsButtons extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
  }

  onSaveClicked(){
    this.props.actions.setSettings(this.TOKEN, this.props.global.isDev);
  }

  render(){
    let isFetchingSettings = (this.props.settings.get("form").get("isFetching").get("settings")===true);
    return (
        <View style={{ flex:1, flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end', paddingBottom:h*0.008}}>
          <View style={{ flexDirection:'row', justifyContent:'flex-end', alignItems:'center', paddingHorizontal: w*0.012, }}>
            <Button
            onPress={this.onSaveClicked.bind(this)}
            isDisabled={isFetchingSettings}
            isLoading={isFetchingSettings}
            style={{
              backgroundColor: Colors.accentColor,
              borderColor: Colors.mainBorderColor,
              height:36,
              paddingHorizontal: w*0.076,
              borderRadius: 2,
            }}
            textStyle={{
              color: Colors.mainTextColor,
              textAlign: 'center',
              fontFamily: 'Whitney',
              fontSize: getCorrectFontSizeForScreen(w,h,13)
            }}>
            Save
            </Button>
          </View>
        </View>
    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(SettingsButtons);
