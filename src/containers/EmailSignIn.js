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



  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange(value) {
    if (value.email != '') {
      this.props.actions.onAuthFormFieldChange('email',value.email, LOGIN);
    }
    if (value.password != '') {
      this.props.actions.onAuthFormFieldChange('password',value.password, LOGIN);
    }
  }

  async onFacebookBtnPress(){
    console.log("Facebook btn pressed : EmailSignIn");
    this.props.actions.setAuthMethod('facebook');
    let userFbData = await this.props.actions.facebookDataAcquisition(false);
    if(!!userFbData){
        console.log("User data we got: "+JSON.stringify(userFbData));
        let success = await this.props.actions.loginFacebook(userFbData.userID, userFbData.accessToken, this.props.global.isDev);
        if(success){
          this.props.actions.navigateTo(MAIN);
        }
    }
  }

  async onSignInBtnPress(){
    this.props.actions.manuallyInvokeFieldValidationForScheme(LOGIN);
    if(this.props.auth.form.isValid.get(LOGIN) && this.props.auth.form.isFetching===false){
      this.props.actions.setAuthMethod('email');
      console.log("Sign In btn pressed : EmailSignIn");
      let email = this.props.auth.form.fields.email, password = this.props.auth.form.fields.password;
      // console.log(" Email "+email+" password: "+password)
      // this.props.actions.login("belovedinbox@gmail.com", "NchIShOUsb");
      let success = await this.props.actions.login(email, password, this.props.global.isDev);
      // console.log("Success: "+success);
      if(success){
        this.props.actions.navigateTo(MAIN);
      }
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

  onForgotPasswordTextChange(value){
    this.props.actions.onAuthFormFieldChange('forgotPasswordEmail',value, FORGOT_PASSWORD);
  }
  togglePasswordHidden(isHidden){
    this.props.actions.setPasswordVisibility(!isHidden);
  }

  render() {

    // console.log("OK: "+JSON.stringify(this.props.navigationState));
    return(
      <EmailSignInRender
          authForm={this.props.auth.form}
          email={this.props.auth.form.fields.email}
          password={this.props.auth.form.fields.password}
          error={this.props.auth.form.error}
          formIsValid={this.props.auth.form.isValid.get(LOGIN)}
          mailFieldError={((this.props.auth.form.fields.emailHasError===true) && (this.props.auth.form.authMethod!="facebook"))}
          passwordFieldError={((this.props.auth.form.fields.passwordHasError===true)  && (this.props.auth.form.authMethod!="facebook"))}
          showPassword={!this.props.auth.form.fields.showPassword}
          authMethod={this.props.auth.form.authMethod}
          isFetchingAuth={this.props.auth.form.isFetching}
          forgotPasswordModalOpen = {this.props.router.modalIsOpen.get(FORGOT_PASSWORD)}
          forgotPasswordTextValue = {this.props.auth.form.fields.forgotPasswordEmail}
          forgotPasswordErrorValue = {this.props.auth.form.fields.forgotPasswordEmailHasError}
          forgotPasswordDisabled = {!this.props.auth.form.isValid.get(FORGOT_PASSWORD) || this.props.auth.form.isFetching}
          togglePasswordHidden={this.togglePasswordHidden.bind(this)}
          onValueChange={this.onChange.bind(this)}
          onForgotPasswordClosed = {this.onForgotPasswordModalClosed.bind(this)}
          onForgotPasswordTextChange = {this.onForgotPasswordTextChange.bind(this)}
          onForgotPasswordCloseBtnClicked={this.onForgotPasswordCloseBtnClicked.bind(this)}
          onForgotPasswordNextBtnClicked={this.onForgotPasswordNextBtnClicked.bind(this)}
          onSignInBtnPress = {this.onSignInBtnPress.bind(this)}
          onForgotBtnPress = {this.onForgotPasswordBtnPress.bind(this)}
          onFbBtnPress = {this.onFacebookBtnPress.bind(this)}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignIn);
