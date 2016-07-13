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

import {ScheneKeys, Modals} from '../config/constants';
const {
REGISTER_STEP_2,
MAIN
} = ScheneKeys
const {
  WELCOME
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
      let {name, surname, email, password, dateOfBirth, zipCode, topicsList, gender, fbAuthUID, fbAuthToken, fbAuthImgUrl} = this.props.auth.form.fields.toJS();

      let topics = [];
      for (var topicKey in topicsList){
        // console.log("Topic "+topicKey+" is: "+topicsList[topicKey].isSelected);
        if(topicsList[topicKey].isSelected){
          topics.push(topicKey);
        }
      }
      // console.log("Fields: "+name+surname+email+password+dateOfBirth+zipCode+topics);
      //  console.log("DOB topicpick: "+dateOfBirth);
      if(dateOfBirth.isMoment==null){
        dateOfBirth = moment(dateOfBirth,'x');
      }
      let curAuthMethod = this.props.auth.form.authMethod;
      if(curAuthMethod=="email"){
        this.props.actions.signup(email, password, name, surname, dateOfBirth, zipCode, topics, gender, this.props.global.isDev);
        // this.props.actions.signup('aRandomUzah4@placeavote.com', 'maPazzw00rt', 'Ioannis', 'DaTester', dateOfBirth, '20001', ['sex','drugs','rockNroll'], 'male');
      }else if(curAuthMethod=="facebook"){
        // this.props.actions.signup(email, password, name, surname, moment(dateOfBirth).format('DD/MM/YYYY'), zipCode, topics, 'they');
        this.props.actions.signupFacebook(fbAuthUID, fbAuthToken, fbAuthImgUrl, email, name, surname, dateOfBirth, zipCode, topics, gender, this.props.global.isDev);
      }else{
        throw new Error("PAV :: The auth.form.authMethod property should be defined (either email, or facebook) before finishing the signup process.");
      }
    }
  }


  onBackBtnPress(){
    this.props.actions.navigateToPrevious();
  }

  onWelcomeModalClosed(){
    // console.log("On welcome modal closed");
    if(!!this.props.auth.form.error){
      // this.props.actions.resetErrorState();
      this.props.actions.setModalVisibility(WELCOME, false);
    }else{
      this.props.actions.setModalVisibility(WELCOME, false);
      this.props.actions.navigateTo(MAIN)
    }
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

          modalPopupEnabled={this.props.router.modalIsOpen.get(WELCOME)}
          modalPopupErrorMsg={this.props.auth.form.error}
          onModalClosed={this.onWelcomeModalClosed.bind(this)}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep2);
