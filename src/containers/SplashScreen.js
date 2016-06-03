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

  componentWillMount(){
    let exists = this.checkTokenExists();
    if(exists===true){
      let isValid = this.validateToken();
      if(isValid===true){
        this.loginAndNavigateToMain();
      }else{
        this.navigateToLogin();
      }
    }else{
      this.navigateToLogin();
    }
  }

  checkTokenExists(){

  }

  validateToken(){

  }

  navigateToLogin(){

  }

  loginAndNavigateToMain(){

  }


  render() {

    return(
      <PavSpinner/>
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
