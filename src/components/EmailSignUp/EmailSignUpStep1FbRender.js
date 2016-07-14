/**
 * # EmailSignUpStep1.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
/*A react native button*/
import Button from 'sp-react-native-iconbutton'

/**
 *  The SignUpForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUp1FbForm from './SignUp1FbForm';

import {Colors} from '../../config/constants';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableHighlight, View, Image, PixelRatio, Platform} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation



/**
 * The states were interested in
 */
 import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
 import icomoonConfig from '../../../assets/fonts/icomoon.json';
 const PavIcon = createIconSetFromIcoMoon(icomoonConfig);



/**
 * ## Styles
 */
var styles = StyleSheet.create({

  baseContainer: {
    flex:1,
    backgroundColor: 'white',
    // backgroundColor: 'pink',
    paddingTop:(Platform.OS === 'ios')? 64 : 54,   //nav bar height
    paddingHorizontal: w*0.04,
    paddingVertical: h*0.02,
  },

  inputsContainer:{
    flex:1,
    // paddingVertical: w*.04,
    justifyContent:'center',
    backgroundColor: 'white'
  },


  facebookBtn:{
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    marginTop:h*0.02,
    height: 45
  },
  facebookBtnText:{
    color: Colors.primaryColor,
    textAlign: 'center',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(11),
  },

  orTextContainer:{
    paddingVertical:w*0.05,
  },
  orText:{
    fontFamily: 'Whitney-SemiBold', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    color: "#000000BB",
    alignSelf:"center",
  },

  signInBtn:{
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.mainBorderColor,
    height: 45
  },
  signInBtnText:{
    color: Colors.thirdTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(12),
  },



});





class EmailSignUpStep1FbRender extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      keyboardOpen: false,
      value: {
        email: this.props.authFormFields.email,
      	password: this.props.authFormFields.password
      }
    };
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    this.setState({
      value: {
      	email: nextprops.authFormFields.email,
      	password: nextprops.authFormFields.password
      }
    });
  }

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
    if (!!this.props.onValueChange) {
      this.props.onValueChange(value);
    }

    this.setState(
      {value}
    );
  }




  renderKeyboardSpacer(){
    if(Platform.OS==="ios"){
      return (<KeyboardSpacer android={false} onToggle={(keyboardState, keyboardHeight)=>{
        this.setState({
          keyboardOpen: keyboardState
        });
      }}/>)
    }else{
      return <View></View>;
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {


    // var onButtonPress = this.props.onButtonPress;


    return(
      <View style={styles.baseContainer}>


        <View style={styles.inputsContainer}>
          <SignUp1FbForm
            isFetchingAuth={this.props.isFetchingAuth}
            authFormFields={this.props.authFormFields}
            value={this.state.value}
            error={this.props.error}
            onChange={this.onChange.bind(this)}
            onNext={this.props.onNextStep}
            regFormIsValid={this.props.regFormIsValid}
          />

        </View>



        <Button
            key="loginBtn"
            textStyle={styles.signInBtnText}
            style={styles.signInBtn}
            isDisabled={(this.props.isFetchingAuth===true)}
            isLoading={(this.props.isFetchingAuth===true)}
            activityIndicatorColor={Colors.mainTextColor}
            onPress={this.props.onNextStep}>
          Next >
        </Button>

        {this.renderKeyboardSpacer()}

      </View>
    );
  }
// this.props.regFormIsValid===false ||
  shouldComponentUpdate(nextProps) {
    return (nextProps.isUserLoggedIn===false);
  }
}

EmailSignUpStep1FbRender.propTypes= {
  regFormIsValid: React.PropTypes.bool.isRequired,
  authFormFields: React.PropTypes.object.isRequired,
  error: React.PropTypes.string,
  isFetchingAuth: React.PropTypes.bool.isRequired,
  isUserLoggedIn: React.PropTypes.bool.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onBack: React.PropTypes.func.isRequired,
  onNextStep: React.PropTypes.func.isRequired,
};
export default EmailSignUpStep1FbRender;
