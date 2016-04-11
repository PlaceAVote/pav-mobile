/**
 * # SignInForm.js
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
  PropTypes
} = React;


import { ScheneKeys, Colors } from '../../config/constants';
// import _ from 'lodash';
/**
 * States of login display
 */
// const {
//   LOGIN,
//   FORGOT_PASSWORD
// } = ScheneKeys

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
let Form = t.form.Form;

var SignInForm = React.createClass({
  /**
   * ## SignInForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    formType: PropTypes.string,
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

    let formType = this.props.formType;




    var INPUT_COLOR = Colors.thirdTextColor;
    var DISABLED_COLOR = '#777777';
    var DISABLED_BACKGROUND_COLOR = '#eeeeee';
    var FONT_SIZE = 17;
    var FONT_WEIGHT = '500';



    var stylesheet = Object.freeze({
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
        fontSize: 13,
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





    let secureTextEntry = !this.props.form.fields.showPassword;
    let options = {
      stylesheet: stylesheet,
      auto: 'placeholders',
      fields: {
        email: {
          label: 'Email Address',
          maxLength: 30,
          editable: !this.props.form.isFetching,
          hasError: !!this.props.form.error,//this.props.form.fields.emailHasError,
          // error: 'Please give us a valid email address.',
          placeholder: 'example@example.com'

        },
        password : {
          label: 'Password',
          maxLength: 20,
          secureTextEntry: secureTextEntry,
          editable: !this.props.form.isFetching,
          hasError: !!this.props.form.error,
          error: this.props.form.error,
          placeholder: '************'

        }

      }
    };


    let loginForm = t.struct({
      email: t.String,
      password: t.String
    });

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref="form"
        type={loginForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
});

module.exports = SignInForm;
