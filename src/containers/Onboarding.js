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
/**
 * The necessary React
 */
import React from 'react-native';

// const {

// } = require('../config/constants').ActionNames


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

function buttonPressHandler(scheneName) {
  switch(scheneName){
    case "facebook":
      this.props.actions.navigateTo("FacebookSignIn");
      break;
    case "emailSignUp":
      this.props.actions.registerState(1);
      this.props.actions.navigateTo("EmailSignUp");
      break;
    case "emailSignIn":
      this.props.actions.navigateTo("EmailSignIn");
      break;
    default:
      console.log("Invalid selector provided, Onboarding cannot issue a navigation action with schene name of: "+scheneName);
      break;
  }
}

let Onboarding = React.createClass({

  orientationDidChange: function(orientation) {
    // console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  },

  componentDidMount: function() {
    Orientation.addOrientationListener(this.orientationDidChange);
    this.props.actions.unlockOrientation();
  },

  componentWillUnmount: function() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  },

  render() {
    let onButtonPress = buttonPressHandler.bind(this);
    return(
      <OnboardingRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device}
          onButtonPress={ onButtonPress }
      />

    );
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
