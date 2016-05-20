/**
 * # SignUpBirthZipcodeForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
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
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import moment from 'moment';
import { ScheneKeys, Colors } from '../../config/constants';
// import _ from 'lodash';
/**
 * States of login display
 */
const {
  REGISTER_STEP_4
} = ScheneKeys

import AccordionPicker from './AccordionPicker';

/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
let Form = t.form.Form;

var SignUpBirthZipcodeForm = React.createClass({
  /**
   * ## SignUpBirthZipcodeForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    currentOs: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  },



  onZipCodeFinishedEditing(){
    if(this.props.form.isValid.get(REGISTER_STEP_4) && !this.props.form.isFetching){
        this.props.onNext();
    }
  },
  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {


    var INPUT_COLOR = Colors.thirdTextColor;
    var DISABLED_COLOR = '#777777';
    var DISABLED_BACKGROUND_COLOR = '#eeeeee';
    var FONT_SIZE = getCorrectFontSizeForScreen(w,h,17);
    var FONT_WEIGHT = '500';

    var stylesheet = Object.freeze({
      fieldset: {
        flexDirection: 'row'
      },

      // the style applied to the container of all inputs
      formGroup: {
        normal: {
          flex:1,
          marginBottom: 10
        },
        error: {
          flex:1,
          marginBottom: 10
        }
      },
      controlLabel: {
        normal: {
          fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          color: Colors.secondaryTextColor,
          fontSize: FONT_SIZE,
          marginBottom: 7,
          fontWeight: FONT_WEIGHT
        },
        // the style applied when a validation error occours
        error: {
          fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          color: Colors.errorTextColor,
          fontSize: FONT_SIZE,
          marginBottom: 7,
          fontWeight: FONT_WEIGHT
        }
      },
      helpBlock: {
        normal: {
          fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          color: Colors.helpTextColor,
          fontSize: FONT_SIZE,
          marginBottom: 2
        },
        // the style applied when a validation error occours
        error: {
          fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          color: Colors.helpTextColor,
          fontSize: FONT_SIZE,
          marginBottom: 2
        }
      },
      errorBlock: {
        fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
        flexWrap: 'wrap',
        // position: 'absolute',
        // backgroundColor: 'red',
        fontSize: getCorrectFontSizeForScreen(w,h,13),
        justifyContent: 'center',
        textAlign: 'center',
        color: Colors.errorTextColor

      },
      textbox: {
        normal: {
          fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          color: INPUT_COLOR,
          fontSize: FONT_SIZE,
          height: 45,
          padding: 7,
          borderRadius: 4,
          borderColor: Colors.mainBorderColor,
          borderWidth: 1,
          marginBottom: 5
        },
        // the style applied when a validation error occours
        error: {
          fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          color: INPUT_COLOR,
          fontSize: FONT_SIZE,
          height: 45,
          padding: 7,
          borderRadius: 4,
          borderColor: Colors.errorTextColor,
          borderWidth: 1,
          marginBottom: 5
        },
        // the style applied when the textbox is not editable
        notEditable: {
          fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          fontSize: FONT_SIZE,
          height: 45,
          padding: 7,
          borderRadius: 4,
          borderColor: Colors.mainBorderColor,
          borderWidth: 1,
          marginBottom: 5,
          color: DISABLED_COLOR,
          backgroundColor: DISABLED_BACKGROUND_COLOR
        }
      },
      select: {
        normal: {
          backgroundColor: 'red',
          marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
          marginBottom: 4
        }
      },
      datepicker: {
        normal: {
          backgroundColor: 'red',
          marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
          marginBottom: 4
        }
      }
    });




    let options = {
      // stylesheet: stylesheet,
      // auto: 'placeholders',
      fields: {
        dateOfBirth:
        // {
        //   label: 'Birthdate',
        //   maxLength: 10,
        //   editable: true,
        //   hasError: this.props.form.fields.dateOfBirthIsCurBeingPicked,
        //   error: 'Please give us a valid birthdate DD/MM/YYYY',
        //   placeholder: '14/11/1955'
        // },
        {
          factory: AccordionPicker,
          config:{
              format: (value)=>{
                return moment(value).format('Do MMMM YYYY');
              },
              currentOs: this.props.currentOs,
              dateBeingPickedNow:this.props.form.fields.dateOfBirthIsCurBeingPicked,
              onCollapsedChange: (isNowCollapsed)=>{
                this.props.onChange({dateOfBirthIsCurBeingPicked: !isNowCollapsed})
              }
          }

        },
        zipCode : {
          label: 'Zip code',
          maxLength: 10,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.zipCodeHasError,
          error: 'Please provide us with your 5 digit US zip code.',
          placeholder: 'i.e: 20001',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing: this.onZipCodeFinishedEditing,
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          keyboardType: "numeric"
        }

      }
    };


    // var Password = t.refinement(t.String, s => !this.props.form.fields.passwordHasError);
    // var PasswordAgain = t.refinement(t.String, s => !this.props.form.fields.passwordAgainHasError);
    //
    //
    // Password.getValidationErrorMessage=(value, path, context)=>{
    //     return "The password should be 3-12 characters.";
    // };
    // PasswordAgain.getValidationErrorMessage=(value, path, context)=>{
    //   // if(this.props.form.fields.passwordHasError){
    //   //   return "";
    //   // }else{
    //   //   return "The passwordAgain should be 4-20 characters.";
    //   // }
    //   return "The passwordAgain should be 4-20 characters.";
    // };


    let dateZipcodeForm = t.struct({
      dateOfBirth: t.Date,//t.Date, // a date field
      // dateOfBirth: t.String,
      zipCode: t.String
    });

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref="form"
        type={dateZipcodeForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
});

  module.exports = SignUpBirthZipcodeForm;
