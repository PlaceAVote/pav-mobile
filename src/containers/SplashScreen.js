/**
 * SplashScreen.js
 *
 * Allow user to register
 */
'use strict';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';
import PavSpinner from '../lib/UI/PavSpinner'

import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
import {Map} from 'immutable';
import React from 'react';
import {ScheneKeys} from '../config/constants';
const {
MAIN,
ONBOARDING
} = ScheneKeys


/**
 * ## Redux boilerplate
 */
const actions = [
  routingActions,
  authActions
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






class SplashScreen extends React.Component{

  async componentWillMount(){
    let isValid = await this.props.actions.validateToken("dawd", this.props.global.isDev);
    if(isValid!=null){
      console.log("Old token found, and is VALID.");
      this.navigateToMain();
    }else{
      console.log("No valid token was found.");
      this.navigateToLogin();
    }
  }



  navigateToLogin(){
    this.props.actions.navigateTo(ONBOARDING);
  }

  navigateToMain(){
    this.props.actions.navigateTo(MAIN);
  }


  render() {

    return(
      <PavSpinner/>
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);