/**
 * # EmailSignUpStep1Fb.js
 *
 *  The container to display the EmailSignUpStep1Fb form
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
 *   EmailSignUpStep1FbRender
 */
import EmailSignUpStep1FbRender from '../components/EmailSignUp/EmailSignUpStep1FbRender';

import React from 'react';

import {ScheneKeys} from '../config/constants';
const {
REGISTER_STEP_1_FB,
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


class EmailSignUpStep1Fb extends React.Component {
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
    if (value.email != null) {
      this.props.actions.onAuthFormFieldChange('email',value.email, REGISTER_STEP_1_FB);
    }
  }


  async onNextBtnPressed(){
    this.props.actions.manuallyInvokeFieldValidationForScheme(REGISTER_STEP_1_FB);
    if(this.props.auth.form.isValid.get(REGISTER_STEP_1_FB)===true){
      let success = await this.props.actions.validateUserEmail(this.props.auth.form.fields.email, this.props.global.isDev);
      if(success){
        this.props.actions.navigateTo(REGISTER_STEP_2);
      }

    }
  }

  onBackBtnPress(){
    this.props.actions.navigateToPrevious();
  }


  render() {



    return(
      <EmailSignUpStep1FbRender
          authFormFields={this.props.auth.form.fields}
          error={this.props.auth.form.error}
          isFetchingAuth={this.props.auth.form.isFetching}
          regFormIsValid={this.props.auth.form.isValid.get(REGISTER_STEP_1_FB)}
          isUserLoggedIn={this.props.auth.user.isLoggedIn}
          onValueChange={this.onChange.bind(this)}
          onNextStep={ this.onNextBtnPressed.bind(this) }
          onBack={this.onBackBtnPress.bind(this)}
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep1Fb);
