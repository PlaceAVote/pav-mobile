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

import React from 'react';

import {ScheneKeys} from '../config/constants';
const {
REGISTER_STEP_1,
REGISTER_STEP_2
} = ScheneKeys;

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


class EmailSignUpStep1 extends React.Component {
  componentWillMount(){
    // this.props.actions.registerState(1);
  }

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

    console.log("Changed"+JSON.stringify(value));
    // if (value.name != '') {
    //   this.props.actions.onAuthFormFieldChange('name',value.name, REGISTER_STEP_1);
    // }
    // if (value.surname != '') {
    //   this.props.actions.onAuthFormFieldChange('surname',value.surname, REGISTER_STEP_1);
    // }
    if (value.email != '') {
      this.props.actions.onAuthFormFieldChange('email',value.email, REGISTER_STEP_1);
    }

    if (value.password != '') {
      this.props.actions.onAuthFormFieldChange('password',value.password, REGISTER_STEP_1);
    }

  }

  togglePasswordHidden(isHidden){
    this.props.actions.setPasswordVisibility(!isHidden);
  }


  async onFacebookBtnPressed(){
    this.props.actions.setAuthMethod('facebook');
    let userFbData = await this.props.actions.facebookDataAcquisition(true);
    if(!!userFbData){
      this.props.actions.navigateUserToTheCorrectNextOnboardingStep();
    }
  }

  async onNextBtnPressed(){
    this.props.actions.manuallyInvokeFieldValidationForScheme(REGISTER_STEP_1);
    if(this.props.auth.form.isValid.get(REGISTER_STEP_1)===true){
        this.props.actions.navigateTo(REGISTER_STEP_2);
    }
  }

  onBackBtnPress(){
    this.props.actions.navigateToPrevious();
  }


  render() {



    return(
      <EmailSignUpStep1Render
          onNextStep={ this.onNextBtnPressed.bind(this) }
          onBack={this.onBackBtnPress.bind(this)}
          isUserLoggedIn={this.props.auth.user.isLoggedIn}

          authFormFields={this.props.auth.form.fields}
          error={this.props.auth.form.error}
          isFetchingAuth={this.props.auth.form.isFetching}
          regFormIsValid={this.props.auth.form.isValid.get(REGISTER_STEP_1)}
          onValueChange={this.onChange.bind(this)}
          togglePasswordHidden={this.togglePasswordHidden.bind(this)}
          onSignUpFacebookBtnPress={ this.onFacebookBtnPressed.bind(this) }
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep1);
