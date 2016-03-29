/**
 * # SignUpNameSurnameForm.js
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


import { ActionNames, Colors } from '../../config/constants';
// import _ from 'lodash';
/**
 * States of login display
 */
const {
  LOGIN,
  FORGOT_PASSWORD
} = ActionNames

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
let Form = t.form.Form;

var SignUpNameSurnameForm = React.createClass({
  /**
   * ## SignUpNameSurnameForm class
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
    var FONT_SIZE = 17;
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
          color: Colors.secondaryTextColor,
          fontSize: FONT_SIZE,
          marginBottom: 7,
          fontWeight: FONT_WEIGHT
        },
        // the style applied when a validation error occours
        error: {
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
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: FONT_SIZE,
        color: Colors.errorTextColor

      },
      textbox: {
        normal: {
          color: INPUT_COLOR,
          fontSize: FONT_SIZE,
          height: 52,
          padding: 7,
          borderRadius: 4,
          borderColor: Colors.mainBorderColor,
          borderWidth: 1,
          marginBottom: 5
        },
        // the style applied when a validation error occours
        error: {
          color: INPUT_COLOR,
          fontSize: FONT_SIZE,
          height: 52,
          padding: 7,
          borderRadius: 4,
          borderColor: Colors.errorTextColor,
          borderWidth: 1,
          marginBottom: 5
        },
        // the style applied when the textbox is not editable
        notEditable: {
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
        name: {
          label: 'Name',
          maxLength: 12,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.nameHasError,
          error: 'The name can be 3-12 characters.',
          placeholder: 'Gary'

        },
        surname : {
          label: 'Surname',
          maxLength: 12,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.surnameHasError,
          error: 'The surname can be 4-20 characters.',
          placeholder: 'Brown'

        }

      }
    };

    console.log("name has error")

    let loginForm = t.struct({
      name: t.String,
      surname: t.String
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

module.exports = SignUpNameSurnameForm;
