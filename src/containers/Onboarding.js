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

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender';
import OnboardingSelector from '../components/Onboarding/OnboardingSelector'
/**
 * The necessary React
 */
import React from 'react-native';

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../config/constants').default;

/**
 * ## Redux boilerplate
 */
const actions = [
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

function buttonPressHandler(signup, username, email, password) {
  signup (username, email, password);
}

let Onboarding = React.createClass({

  render() {

    let loginButtonText = 'Onboarding';
    let onButtonPress = buttonPressHandler.bind(null,
      this.props.actions.signup,
      this.props.auth.form.fields.username,
      this.props.auth.form.fields.email,
      this.props.auth.form.fields.password
    );




    return(
      <OnboardingSelector
          auth={ this.props.auth }
          global={ this.props.global }
      />

    );
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
