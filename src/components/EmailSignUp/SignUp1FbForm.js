/**
 * # SignUp1FbForm.js
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
  passwordTextboxStyleContainer:{
    normal: {
      // height: 45,
      // padding: 7,
      borderRadius: 4,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,

      // marginBottom: 5
    },
    // the style applied when a validation error occours
    error: {
      borderRadius: 4,
      borderColor: Colors.errorTextColor,
      borderWidth: 1,
      // marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {

      borderRadius: 4,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  passwordTextboxBtn:{
    paddingHorizontal:w*.025
  },
  passwordTextboxBtnTxt:{
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(12),
    color: Colors.primaryColor
  }

});




class SignUp1FbForm extends React.Component {



  onEmailFinishedEditing(){
    if(this.props.regFormIsValid && !this.props.isFetchingAuth){
        this.props.onNext();
    }
  }






  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {



    let secureTextEntry = !this.props.authFormFields.showPassword;
    let options = {
      stylesheet: stylesheet,
      auto: 'placeholders',
      fields: {
        email: {
          label: 'Enter Email Address',
          maxLength: 50,
          editable: !this.props.isFetchingAuth,
          hasError: this.props.authFormFields.emailHasError || this.props.error,
          error: this.props.error || 'Please give us a valid email address.',
          placeholder: 'mail@example.com',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing: this.onEmailFinishedEditing.bind(this),
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          autoCapitalize:'none',
          placeholderTextColor: Colors.secondaryTextColor,
          // autoFocus: true,
          keyboardType: "email-address"

        }

      }
    };



    let emailForm = t.struct({
      email: t.String,
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
}


SignUp1FbForm.propTypes= {
  authFormFields: React.PropTypes.object.isRequired,
  isFetchingAuth: React.PropTypes.bool.isRequired,
  value: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  regFormIsValid: React.PropTypes.bool.isRequired,
  onNext: React.PropTypes.func.isRequired,
};
export default SignUp1FbForm;
