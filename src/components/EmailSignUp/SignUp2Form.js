/**
 * # SignUp2Form.js
 *
 *  This class utilizes the ```tcomb-form-native``` library and just lets
 *  the user provide his email and password in order to register.
 */
'use strict';
/**
 * ## Import
 *
 * React
 */
import React from 'react';
const {
  PropTypes,
  PixelRatio
} = React;


import { ScheneKeys, Colors } from '../../config/constants';
// import _ from 'lodash';
/**
 * States of login display
 */
const {
  LOGIN,
  REGISTER_STEP_1
} = ScheneKeys


import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import moment from 'moment';
import AccordionPicker from './AccordionPicker';
/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
let Form = t.form.Form;







const INPUT_COLOR = Colors.thirdTextColor;
const DISABLED_COLOR = '#777777';
const DISABLED_BACKGROUND_COLOR = '#eeeeee';
const FONT_SIZE = getCorrectFontSizeForScreen(11);
const FONT_WEIGHT = '500';

const stylesheet = Object.freeze({
  fieldset: {
    flexDirection: 'column'
  },

  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      flex:0,
      marginBottom: 10
    },
    error: {
      flex:0,
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      // backgroundColor:'red',
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: Colors.fourthTextColor,
      fontSize: getCorrectFontSizeForScreen(11),
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: Colors.errorTextColor,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: Colors.helpTextColor,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: Colors.helpTextColor,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    flexWrap: 'wrap',
    // position: 'absolute',
    // backgroundColor: 'red',
    fontSize: getCorrectFontSizeForScreen(12),
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.errorTextColor

  },
  textbox: {
    normal: {
      fontFamily: 'Whitney-SemiBold', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: INPUT_COLOR,
      fontSize: getCorrectFontSizeForScreen(10),
      height: 45,
      padding: 7,
      borderRadius: 4,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,
      // marginBottom: 5
    },
    // the style applied when a validation error occours
    error: {
      fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 45,
      padding: 7,
      borderRadius: 4,
      borderColor: Colors.errorTextColor,
      borderWidth: 1,
      // marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,
      // marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  datepicker: {
    normal: {
      // marginBottom: 4
      // backgroundColor:'pink'
    },
    // the style applied when a validation error occours
    error: {
      // marginBottom: 4
    }
  }

});




class SignUp2Form extends React.Component {






  onNameFinishedEditing(){
     this.refs.form.getComponent('surname').refs.input.focus();
   }

   onSurnameFinishedEditing(){
     this.refs.form.getComponent('zipCode').refs.input.focus();
   }


  onZipCodeFinishedEditing(){
    if(this.props.zipCodeIsValid && !this.props.isFetchingAuth){
        this.props.onChange({dateOfBirthIsCurBeingPicked: true})
    }
  }


  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {


    let options = {
      stylesheet: stylesheet,
      auto: 'placeholders',
      fields: {
        name: {
          label: 'Name',
          maxLength: 12,
          editable: !this.props.isFetchingAuth,
          hasError: this.props.authFormFields.nameHasError,
          error: 'The name can be 3-12 characters.',
          placeholder: 'Gary',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing: this.onNameFinishedEditing.bind(this),
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          placeholderTextColor: Colors.secondaryTextColor
          // autoFocus: true

        },
        surname : {
          label: 'Surname',
          maxLength: 12,
          editable: !this.props.isFetchingAuth,
          hasError: this.props.authFormFields.surnameHasError,
          error: 'The surname can be 4-20 characters.',
          placeholder: 'Brown',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing:this.onSurnameFinishedEditing.bind(this),
          underlineColorAndroid: Colors.accentColor,
          placeholderTextColor: Colors.secondaryTextColor,
          autoCorrect: false,

        },

        zipCode : {
          label: 'Zip code',
          maxLength: 10,
          editable: !this.props.isFetchingAuth,
          hasError: this.props.authFormFields.zipCodeHasError,
          error: 'Please provide us with your 5 digit US zip code.',
          placeholder: 'i.e: 20001',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing: this.onZipCodeFinishedEditing.bind(this),
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          keyboardType: "numeric",
          autoCapitalize:'none',
          placeholderTextColor: Colors.secondaryTextColor,
        },
        dateOfBirth:
        // {
        //   label: 'Birthdate',
        //   maxLength: 10,
        //   editable: true,
          // hasError: this.props.birthdayBeingPicked
          // error: 'Please give us a valid birthdate DD/MM/YYYY',
        //   placeholder: '14/11/1955'
        // },
        {
          hasError: this.props.authFormFields.dateOfBirthHasError,
          error: 'Please give us a valid birthdate DD/MM/YYYY',
          factory: AccordionPicker,
          config:{
              format: (value)=>{
                return moment(value).format('Do MMMM YYYY');
              },
              dateBeingPickedNow:this.props.birthdayBeingPicked,
              onCollapsedChange: (isNowCollapsed)=>{
                this.props.onChange({dateOfBirthIsCurBeingPicked: !isNowCollapsed})
              }
          }

        },


      }
    };



    let reg2StepForm = t.struct({
      name: t.String,
      surname: t.String,
      zipCode: t.String,
      dateOfBirth: t.Date//t.Date, // a date field

    });


    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref="form"
        type={reg2StepForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}


SignUp2Form.propTypes= {
  authFormFields: React.PropTypes.object.isRequired,

  isFetchingAuth: React.PropTypes.bool.isRequired,
  value: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  regFormIsValid: React.PropTypes.bool.isRequired,
  onNext: React.PropTypes.func.isRequired,

  birthdayBeingPicked: React.PropTypes.bool.isRequired,
};
export default SignUp2Form;
