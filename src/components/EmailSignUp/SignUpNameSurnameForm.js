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
const React = require('react');
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


  onNameFinishedEditing(){
    this.refs.form.getComponent('surname').refs.input.focus();
  },

  onSurnameFinishedEditing(){
    if(this.props.form.isValid.get(REGISTER_STEP_1) && !this.props.form.isFetching){
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
          // error: 'The name can be 3-12 characters.',
          placeholder: 'Gary',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing: this.onNameFinishedEditing,
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          // autoFocus: true

        },
        surname : {
          label: 'Surname',
          maxLength: 12,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.surnameHasError,
          // error: 'The surname can be 4-20 characters.',
          placeholder: 'Brown',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing:this.onSurnameFinishedEditing,
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,

        }

      }
    };


    var Name = t.refinement(t.String, s => !this.props.form.fields.nameHasError);
    var Surname = t.refinement(t.String, s => !this.props.form.fields.surnameHasError);


    Name.getValidationErrorMessage=(value, path, context)=>{
        return "The name should be 3-12 characters.";
    };
    Surname.getValidationErrorMessage=(value, path, context)=>{
      // if(this.props.form.fields.nameHasError){
      //   return "";
      // }else{
      //   return "The surname should be 4-20 characters.";
      // }
      return "The surname should be 4-20 characters.";
    };

    let nameSurnameForm = t.struct({
      name: Name,
      surname: Surname
    });


    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref="form"
        type={nameSurnameForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
});

module.exports = SignUpNameSurnameForm;
