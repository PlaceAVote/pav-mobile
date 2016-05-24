/**
 * # EmailSignUpStep2.js
 *
 *  The container to display the EmailSignUpStep2 form
 *
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

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   EmailSignUpStep2Render
 */
import EmailSignUpStep2Render from '../components/EmailSignUp/EmailSignUpStep2Render';

import React from 'react';

import {ScheneKeys} from '../config/constants';
const {
REGISTER_STEP_2
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







// function buttonPressHandler(name, surname) {
//
// }

let EmailSignUpStep2 = React.createClass({


  async onNextBtnPress(){
    let success = await this.props.actions.validateUserEmail(this.props.auth.form.fields.email);
    if(success){
      this.props.actions.navigateUserToTheCorrectNextOnboardingStep(REGISTER_STEP_2);
    }
  },

  onBackBtnPress(){
    this.props.actions.navigateToPrevious();
  },


  render() {


    // buttonPressHandler.bind(null,
    //     this.props.actions.login,
    //     this.props.auth.form.fields.username,
    //     this.props.auth.form.fields.password
    // );

    return(
      <EmailSignUpStep2Render
          onNextStep={ this.onNextBtnPress }
          onBack={this.onBackBtnPress}
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep2);
