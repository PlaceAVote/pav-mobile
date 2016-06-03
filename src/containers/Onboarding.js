/**
 * Onboarding.js
 *
 * Allow user to register
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
import * as deviceActions from '../reducers/device/deviceActions';


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
 *   LoginRender
 */
// import LoginRender from '../components/LoginRender';
import OnboardingRender from '../components/Onboarding/OnboardingRender'
import React from 'react';
import {ScheneKeys} from '../config/constants';
const {
REGISTER_STEP_1,
LOGIN
} = ScheneKeys


/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  deviceActions
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






class Onboarding extends React.Component{

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange);
    this.props.actions.unlockOrientation();
  }

  orientationDidChange(orientation) {
    // console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  onSignInBtnPressed(){
    this.props.actions.navigateTo(LOGIN);
  }
  onSignUpBtnPressed(){
    this.props.actions.setAuthMethod('email');
    this.props.actions.navigateTo(REGISTER_STEP_1);
  }
  async onFacebookBtnPressed(){
    this.props.actions.setAuthMethod('facebook');
    let userFbData = await this.props.actions.facebookDataAcquisition(true);
    if(!!userFbData){
      this.props.actions.navigateUserToTheCorrectNextOnboardingStep();
    }
  }
  render() {

    return(
      <OnboardingRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device}
          onSignUpBtnPress={ this.onSignUpBtnPressed }
          onSignUpFacebookBtnPress={ this.onFacebookBtnPressed }
          onSignInBtnPress={ this.onSignInBtnPressed }
      />

    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
