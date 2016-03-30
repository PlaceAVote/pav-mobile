/**
 * # EmailSignUpStep1.js
 *
 *  The container to display the EmailSignUpStep1 form
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
 *   EmailSignUpStep1Render
 */
import EmailSignUpStep1Render from '../components/EmailSignUp/EmailSignUpStep1Render';

/**
 * The necessary React components
 */
import React from 'react-native';


// const {
//   REGISTER_STEP_1,
//   FORGOT_PASSWORD
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







// function buttonPressHandler(name, surname) {
//
// }

let EmailSignUpStep1 = React.createClass({

  render() {
    let onButtonPress = ()=>{
        console.log("Next button pressed")
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
      <EmailSignUpStep1Render
          onNextStep={ onButtonPress }
          onBack={onBackBtnPress}
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep1);
