/**
 * # ForgotPassword.js
 *
 *  The container to display the ForgotPassword form
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
 *   ForgotPasswordRender
 */
import ForgotPasswordRender from '../components/EmailSignIn/ForgotPasswordRender';

/**
 * The necessary React components
 */
import React from 'react-native';


const {
  LOGIN,
  FORGOT_PASSWORD
} = require('../config/constants').ActionNames

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





function buttonPressHandler(login, username, password) {
  login (username, password);
}

let ForgotPassword = React.createClass({

  componentWillMount() {
      this.props.actions.lockOrientation("PORTRAIT");
      this.props.actions.forgotPasswordState();
  },

  render() {
    let onButtonPress = ()=>{

    };

    //  buttonPressHandler.bind(null,
		// 		                this.props.actions.login,
		// 		                this.props.auth.form.fields.username,
		// 		                this.props.auth.form.fields.password
		//                                );

    return(
      <ForgotPasswordRender
          onButtonPress={ onButtonPress }
          auth={ this.props.auth }
          global={ this.props.global }
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
