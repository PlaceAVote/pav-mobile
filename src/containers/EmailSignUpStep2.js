/**
 * # EmailSignUpStep2.js
 *
 *  The container to display the EmailSignUpStep2 form
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
 *   EmailSignUpStep2Render
 */
import EmailSignUpStep2Render from '../components/EmailSignUp/EmailSignUpStep2Render';
import moment from 'moment';
import React from 'react';

import {ScheneKeys} from '../config/constants';
const {
REGISTER_STEP_2
} = ScheneKeys

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





class EmailSignUpStep2 extends React.Component {



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

    // console.log("Changed"+JSON.stringify(value));
    if (value.name != ''&& value.name != null) {
      this.props.actions.onAuthFormFieldChange('name',value.name, REGISTER_STEP_2);
    }
    if (value.surname != '' && value.surname != null) {
      this.props.actions.onAuthFormFieldChange('surname',value.surname, REGISTER_STEP_2);
    }
    if (value.dateOfBirth != ''&& value.dateOfBirth != null) {
      // console.log("DATE value about to change to: "+value.dateOfBirth+ " is now: "+moment(value.dateOfBirth).format('x'));
      this.props.actions.onAuthFormFieldChange('dateOfBirth',moment(value.dateOfBirth).format('x'), REGISTER_STEP_2);
    }
    if (value.zipCode != '' && value.zipCode != null ) {
      this.props.actions.onAuthFormFieldChange('zipCode',value.zipCode, REGISTER_STEP_2);
    }

    if(value.dateOfBirthIsCurBeingPicked!=null){
      this.props.actions.onAuthFormFieldChange('dateOfBirthIsCurBeingPicked',value.dateOfBirthIsCurBeingPicked, REGISTER_STEP_2);
    }
  }

  async onNextBtnPress(){
    this.props.actions.manuallyInvokeFieldValidationForScheme(REGISTER_STEP_2);
    if(this.props.auth.form.isValid.get(REGISTER_STEP_2)===true){
        this.props.actions.navigateTo(REGISTER_STEP_3);
    }
  }

  onBackBtnPress(){
    this.props.actions.navigateToPrevious();
  }


  render() {


    return(
      <EmailSignUpStep2Render
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}

          birthdayBeingPicked={this.props.auth.form.fields.dateOfBirthIsCurBeingPicked}
          authFormFields={this.props.auth.form.fields}
          error={this.props.auth.form.error}
          isFetchingAuth={this.props.auth.form.isFetching}
          regFormIsValid={this.props.auth.form.isValid.get(REGISTER_STEP_2)}
          isUserLoggedIn={this.props.auth.user.isLoggedIn}
          onValueChange={this.onChange.bind(this)}
          onNextStep={ this.onNextBtnPress.bind(this) }
          onBack={this.onBackBtnPress.bind(this)}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep2);
