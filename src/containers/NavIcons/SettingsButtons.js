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





const BTN_HEIGHT = 36;
const NAV_BAR_HEIGHT = (Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44;   //nav bar height



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
      <View style={{flex:1, alignSelf:'flex-end', justifyContent:'flex-end', paddingHorizontal:w*0.025, paddingVertical:h*0.008,}}>
        <Button
        onPress={this.onSaveClicked.bind(this)}
        isDisabled={isFetchingSettings}
        isLoading={isFetchingSettings}
        style={{
          backgroundColor: Colors.accentColor,
          alignSelf:'flex-end',
          borderColor: Colors.mainBorderColor,
          height:BTN_HEIGHT,
          width: w*0.25,
          // paddingHorizontal: w*0.076,
          // marginTop: NAV_BAR_HEIGHT-BTN_HEIGHT-8,
          // marginRight: 10,
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
    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(SettingsButtons);
