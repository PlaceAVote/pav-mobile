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




let EmailSignIn = React.createClass({

  componentWillMount() {
      this.props.actions.lockOrientation("PORTRAIT");
  },

  async onFacebookBtnPress(){
    console.log("Facebook btn pressed : EmailSignIn");

    this.props.actions.setAuthMethod('facebook');
    let userFbData = await this.props.actions.facebookDataAcquisition(false);
    if(!!userFbData){
        // console.log("User data we got: "+JSON.stringify(userFbData));
        let success = await this.props.actions.loginFacebook(userFbData.userID, userFbData.accessToken);
        if(success){
          this.props.actions.navigateTo(NEWSFEED);
        }
    }
  },

  async onSignInBtnPress(){
    this.props.actions.setAuthMethod('email');
    console.log("Sign In btn pressed : EmailSignIn");
    let email = this.props.auth.form.fields.email, password = this.props.auth.form.fields.password;
    // console.log(" Email "+email+" password: "+password)
    // this.props.actions.login("belovedinbox@gmail.com", "NchIShOUsb");
    let success = await this.props.actions.login(email, password);
    if(success){
      this.props.actions.navigateTo(NEWSFEED);
    }

  },

  onForgotPasswordBtnPress(){
    this.props.actions.setModalVisibility(FORGOT_PASSWORD, true);
  },

  onForgotPasswordModalClosed(){
    this.props.actions.setModalVisibility(FORGOT_PASSWORD, false);
  },

  onForgotPasswordCloseBtnClicked(){
    this.props.actions.setModalVisibility(FORGOT_PASSWORD, false);
  },

  onForgotPasswordNextBtnClicked(){
    let forgotEmail = this.props.auth.form.fields.forgotPasswordEmail;
    this.props.actions.forgotPassword(forgotEmail);
  },


  render() {

    return(
      <EmailSignInRender
          onForgotPasswordCloseBtnClicked={this.onForgotPasswordCloseBtnClicked}
          onForgotPasswordNextBtnClicked={this.onForgotPasswordNextBtnClicked}
          onSignInBtnPress = {this.onSignInBtnPress}
          onForgotBtnPress = {this.onForgotPasswordBtnPress}
          onFbBtnPress = {this.onFacebookBtnPress}
          auth={ this.props.auth }
          global={ this.props.global }
          forgotPasswordModalOpen = {this.props.router.modalIsOpen.get(FORGOT_PASSWORD)}
          onForgotPasswordClosed = {this.onForgotPasswordModalClosed}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignIn);
