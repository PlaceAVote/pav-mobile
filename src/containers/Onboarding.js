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
/**
 * The necessary React
 */
import React from 'react-native';

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../config/constants').ActionNames

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions
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

function buttonPressHandler(scheneName) {
  switch(scheneName){
    case "facebook":
      // this.props.actions.navigateToRequested("FacebookSignIn");
      break;
    case "emailSignUp":
      // this.props.actions.navigateToRequested("EmailSignUp");
      break;
    case "emailSignIn":
      this.props.actions.navigateToRequested("EmailSignIn");
      break;
    default:
      console.log("Invalid selector provided, Onboarding cannot issue a navigation action with schene name of: "+scheneName);
      break;
  }
}

let Onboarding = React.createClass({

  render() {
    let onButtonPress = buttonPressHandler.bind(this);
    return(
      <OnboardingRender
          auth={ this.props.auth }
          global={ this.props.global }
          onButtonPress={ onButtonPress }
      />

    );
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
