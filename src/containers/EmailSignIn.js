/**
 * # EmailSignIn.js
 *
 *  The container to display the EmailSignIn form
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
 *   EmailSignInRender
 */
import EmailSignInRender from '../components/EmailSignIn/EmailSignInRender';

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

let EmailSignIn = React.createClass({

  componentWillMount() {
      this.props.actions.lockOrientation("PORTRAIT");
  },

  render() {
    let onBtnPress = (type)=>{
      switch(type){
        case "facebook":
          break;
        case "signIn":
          break;
        case FORGOT_PASSWORD:
          this.props.actions.setModalVisibility(FORGOT_PASSWORD, true);
          break
        default:
          break;
      }
    },
    onForgotPasswordModalClosed = ()=>{
      this.props.actions.setModalVisibility(FORGOT_PASSWORD, false);
    },
    onForgotPasswordCloseBtnClicked = ()=>{
      this.props.actions.setModalVisibility(FORGOT_PASSWORD, false);
    },
    onForgotPasswordNextBtnClicked = ()=>{
      this.props.actions.setModalVisibility(FORGOT_PASSWORD, false);
      //DO something on forgot password next clicked
      alert("Check your inbox for the reset password link.")
    };


    return(
      <EmailSignInRender
          onForgotPasswordCloseBtnClicked={onForgotPasswordCloseBtnClicked}
          onForgotPasswordNextBtnClicked={onForgotPasswordNextBtnClicked}
          onButtonPress={ onBtnPress }
          auth={ this.props.auth }
          global={ this.props.global }
          forgotPasswordModalOpen = {this.props.router.modalIsOpen.get(FORGOT_PASSWORD)}
          onForgotPasswordClosed = {onForgotPasswordModalClosed}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignIn);
