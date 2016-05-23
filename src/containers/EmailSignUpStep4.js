/**
 * # EmailSignUpStep4.js
 *
 *  The container to display the EmailSignUpStep4 form
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
 *   EmailSignUpStep4Render
 */
import EmailSignUpStep4Render from '../components/EmailSignUp/EmailSignUpStep4Render';

import React from 'react';

/**
 * The states were interested in
 */

const {
  REGISTER_STEP_4
} = require('../config/constants').ScheneKeys

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

let EmailSignUpStep4 = React.createClass({


  render() {
    let onButtonPress = ()=>{
        this.props.actions.navigateUserToTheCorrectNextOnboardingStep(REGISTER_STEP_4);
    },
    onBackBtnPress = ()=>{
        this.props.actions.navigateToPrevious();
    }

    return(
      <EmailSignUpStep4Render
          onNextStep={ onButtonPress }
          onBack={onBackBtnPress}
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep4);
