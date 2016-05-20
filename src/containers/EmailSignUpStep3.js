/**
 * # EmailSignUpStep3.js
 *
 *  The container to display the EmailSignUpStep3 form
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
 *   EmailSignUpStep3Render
 */
import EmailSignUpStep3Render from '../components/EmailSignUp/EmailSignUpStep3Render';

import React from 'react';


const {
  REGISTER_STEP_3,
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

let EmailSignUpStep3 = React.createClass({



  render() {
    let onButtonPress = ()=>{
        this.props.actions.navigateUserToTheCorrectNextOnboardingStep(REGISTER_STEP_3);
    },
    onBackBtnPress = ()=>{
        this.props.actions.navigateToPrevious();
    }

    // buttonPressHandler.bind(null,
    //     this.props.actions.login,
    //     this.props.auth.form.fields.username,
    //     this.props.auth.form.fields.password
    // );

    return(
      <EmailSignUpStep3Render
          onNextStep={ onButtonPress }
          onBack={onBackBtnPress}
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep3);
