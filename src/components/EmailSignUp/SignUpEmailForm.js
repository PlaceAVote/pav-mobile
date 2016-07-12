/**
 * # SignUpEmailForm.js
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

import { Colors, ScheneKeys } from '../../config/constants';
// import _ from 'lodash';
/**
 * States of login display
 */


/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
let Form = t.form.Form;

var SignUpEmailForm = React.createClass({
  /**
   * ## SignUpEmailForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  },


  onEmailFinishedEditing(){
    if(this.props.form.isValid.get(ScheneKeys.REGISTER_STEP_2) && !this.props.form.isFetching){
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
    var FONT_SIZE = getCorrectFontSizeForScreen(11);
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
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          color: Colors.secondaryTextColor,
          fontSize: getCorrectFontSizeForScreen(13),
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
          color: Colors.helpTextColor,
          fontSize: FONT_SIZE,
          marginBottom: 2
        },
        // the style applied when a validation error occours
        error: {
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
        fontSize: getCorrectFontSizeForScreen(13),
        justifyContent: 'center',
        textAlign: 'center',
        color: Colors.errorTextColor

      },
      textbox: {
        normal: {
          fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
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
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
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
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          fontSize: FONT_SIZE,
          height: 36,
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
          marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
          marginBottom: 4
        }
      },
      datepicker: {
        normal: {
          marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
          marginBottom: 4
        }
      }
    });


    // console.log("Email ERROR: "+this.props.form.fields.emailHasError);


    let options = {
      stylesheet: stylesheet,
      auto: 'placeholders',
      fields: {
        email: {
          label: 'Email',
          maxLength: 50,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.emailHasError || this.props.form.error,
          error: this.props.form.error || 'Please give us a valid email address.',
          placeholder: 'yourmail@example.com',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing: this.onEmailFinishedEditing,
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          autoCapitalize:'none',
          placeholderTextColor: Colors.secondaryTextColor,
          // autoFocus: true,
          keyboardType: "email-address"

        }
      }
    };

    // var Email = t.refinement(t.String, s => !this.props.form.fields.emailHasError);
    // var EmailConfirmation = t.refinement(t.String, s => this.props.form.fields.email!=s);


    // Email.getValidationErrorMessage=(value, path, context)=>{
    //     return "Please give a valid email address.";
    // };
    // EmailConfirmation.getValidationErrorMessage=(value, path, context)=>{
    //   // if(this.props.form.fields.nameHasError){
    //   //   return "";
    //   // }else{
    //   //   return "The surname should be 4-20 characters.";
    //   // }
    //   return "The surname should be 4-20 characters.";
    // };

    let emailForm = t.struct({
      email: t.String
      // emailConfirmation: Surname
    });


    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref="form"
        type={emailForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
});

module.exports = SignUpEmailForm;
