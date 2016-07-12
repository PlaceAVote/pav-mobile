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
import SignUp1Form from './SignUp1Form';

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
    marginTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,  //nav bar height
    paddingHorizontal: w*0.04,
    paddingVertical: h*0.02,
  },

  inputsContainer:{
    flex:1,
    // paddingVertical: w*.04,
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





class EmailSignUpStep1Render extends React.Component {
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



  renderText(styles){
    if(this.state.keyboardOpen===true){
      return <View></View>;
    }else{
      return (
      <View style={styles.descriptionTextContainer}>
        <Text style={styles.descriptionText} >
        In a perfect world, your vote would be represented by your Congressman. In reality, lobbyists and rich donors are overshadowing your voice with their cushy stacks of green and influential power.
        </Text>
      </View>);
    }
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
        <Button
        onPress={this.props.onFbBtnPress}
        style={styles.facebookBtn}
        textStyle={styles.facebookBtnText}
        isDisabled={this.props.isFetchingAuth}
        isLoading={this.props.isFetchingAuth && (this.props.authMethod=="facebook")}
        iconProps={{name: "facebook",size:21, color: Colors.primaryColor}}>
          Register with Facebook
        </Button>

        <View style={styles.orTextContainer}>
          <Text style={styles.orText}>Or</Text>
        </View>

        <View style={styles.inputsContainer}>
          <SignUp1Form
            isFetchingAuth={this.props.isFetchingAuth}
            authFormFields={this.props.authFormFields}
            value={this.state.value}
            error={this.props.error}
            onChange={this.onChange.bind(this)}
            onNext={this.props.onNextStep}
            regFormIsValid={this.props.regFormIsValid}
            togglePasswordHidden={this.props.togglePasswordHidden}
          />

        </View>



        <Button
            key="loginBtn"
            textStyle={styles.signInBtnText}
            style={styles.signInBtn}
            isDisabled={this.props.isFetchingAuth}
            isLoading={this.props.isFetchingAuth && (this.props.authMethod=="email")}
            activityIndicatorColor={Colors.mainTextColor}
            onPress={this.props.onSignInBtnPress}>
          Next >
        </Button>

        {this.renderKeyboardSpacer()}

      </View>
    );
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.isUserLoggedIn===false);
  }
}

EmailSignUpStep1Render.propTypes= {
  regFormIsValid: React.PropTypes.bool.isRequired,
  authFormFields: React.PropTypes.object.isRequired,
  error: React.PropTypes.object.isRequired,
  isFetchingAuth: React.PropTypes.bool.isRequired,
  isUserLoggedIn: React.PropTypes.bool.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onBack: React.PropTypes.func.isRequired,
  onNextStep: React.PropTypes.func.isRequired,
  togglePasswordHidden: React.PropTypes.func.isRequired,
};
export default EmailSignUpStep1Render;
