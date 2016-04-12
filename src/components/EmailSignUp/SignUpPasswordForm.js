/**
 * # SignUpPasswordForm.js
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
const React = require('react-native');
const {
  PropTypes,
  PixelRatio
} = React;

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import { ScheneKeys, Colors } from '../../config/constants';
// import _ from 'lodash';
/**
 * States of login display
 */
const {
  LOGIN,
  FORGOT_PASSWORD
} = ScheneKeys

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
let Form = t.form.Form;

var SignUpPasswordForm = React.createClass({
  /**
   * ## SignUpPasswordForm class
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
    var FONT_SIZE = getCorrectFontSizeForScreen(PixelRatio, w,h,17);
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
        fontSize: getCorrectFontSizeForScreen(PixelRatio, w,h,13),
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





    let options = {
      stylesheet: stylesheet,
      auto: 'placeholders',
      fields: {
        password: {
          label: 'Password',
          maxLength: 12,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.passwordHasError,
          error: 'Password length 6-20 characters, containing both a number and a capital letter.',
          placeholder: '*******'

        },
        passwordAgain : {
          label: 'Confirmation',
          maxLength: 12,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.passwordAgainHasError,
          error: 'The passwords don\'t match. Try again.',
          placeholder: '*******'

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

    let passwordForm = t.struct({
      password: t.String,
      passwordAgain: t.String
    });


    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref="form"
        type={passwordForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
});

module.exports = SignUpPasswordForm;
