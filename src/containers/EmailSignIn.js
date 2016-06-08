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

import React from 'react';

import {ScheneKeys, Modals} from '../config/constants';
const {
  LOGIN,
  MAIN
} = ScheneKeys;
const {
  FORGOT_PASSWORD,
} = Modals;

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





class EmailSignIn extends React.Component {

  componentWillMount() {
      this.props.actions.lockOrientation("PORTRAIT");
  }

  async onFacebookBtnPress(){
    console.log("Facebook btn pressed : EmailSignIn");
    this.props.actions.setAuthMethod('facebook');
    let userFbData = await this.props.actions.facebookDataAcquisition(false);
    if(!!userFbData){
        // console.log("User data we got: "+JSON.stringify(userFbData));
        let success = await this.props.actions.loginFacebook(userFbData.userID, userFbData.accessToken, this.props.global.isDev);
        if(success){
          this.props.actions.navigateTo(MAIN);
        }
    }
  }

  async onSignInBtnPress(){
    this.props.actions.setAuthMethod('email');
    console.log("Sign In btn pressed : EmailSignIn");
    let email = this.props.auth.form.fields.email, password = this.props.auth.form.fields.password;
    console.log(" Email "+email+" password: "+password)
    // this.props.actions.login("belovedinbox@gmail.com", "NchIShOUsb");
    let success = await this.props.actions.login(email, password, this.props.global.isDev);
    console.log("Success: "+success);
    if(success){
      this.props.actions.navigateTo(MAIN);
    }

  }

  onForgotPasswordBtnPress(){
    this.props.actions.setModalVisibility(FORGOT_PASSWORD, true);
  }

  onForgotPasswordModalClosed(){
    this.props.actions.setModalVisibility(FORGOT_PASSWORD, false);
  }

  onForgotPasswordCloseBtnClicked(){
    this.props.actions.setModalVisibility(FORGOT_PASSWORD, false);
  }

  onForgotPasswordNextBtnClicked(){
    let forgotEmail = this.props.auth.form.fields.forgotPasswordEmail;
    this.props.actions.forgotPassword(forgotEmail);
  }


  render() {

    // console.log("OK: "+JSON.stringify(this.props.navigationState));
    return(
      <EmailSignInRender
          onForgotPasswordCloseBtnClicked={this.onForgotPasswordCloseBtnClicked.bind(this)}
          onForgotPasswordNextBtnClicked={this.onForgotPasswordNextBtnClicked.bind(this)}
          onSignInBtnPress = {this.onSignInBtnPress.bind(this)}
          onForgotBtnPress = {this.onForgotPasswordBtnPress.bind(this)}
          onFbBtnPress = {this.onFacebookBtnPress.bind(this)}
          auth={ this.props.auth }
          global={ this.props.global }
          forgotPasswordModalOpen = {this.props.router.modalIsOpen.get(FORGOT_PASSWORD)}
          onForgotPasswordClosed = {this.onForgotPasswordModalClosed}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignIn);
