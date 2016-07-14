/**
 * # EmailSignInRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';





/**
 *  The SignInForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignInForm from './SignInForm';

import {Colors} from '../../config/constants';
// import Keyboard from 'Keyboard';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import ForgotPasswordModalBox from '../Modals/ForgotPasswordModalBox'

/*A react native button*/
import Button from 'sp-react-native-iconbutton'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import PavKeyboardAwareView from '../../lib/UI/PavKeyboardAwareView';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation





/**
 * ## Styles
 */
var styles = StyleSheet.create({

  baseContainer: {
    flex:1,
    backgroundColor: 'white',
  },

  contentContainer: {
    flex:1,
    // backgroundColor: 'purple',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop:80,
    marginBottom:20,
    marginHorizontal:w*0.04 //same as 14px
  },

  signInBtn: {
    backgroundColor: Colors.accentColor,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.mainBorderColor,
    marginTop: 15,
    height: 45
  },
  facebookBtn:{
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    marginTop: 15,
    height: 45
  },
  forgotPasswordBtn:{
    backgroundColor: Colors.transparentColor,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.transparentColor,
    height: 60
  },
  blueBtnText:{
    color: Colors.primaryColor,
    textAlign: 'center',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(11),
  },
  whiteBtnText:{
    color: Colors.mainTextColor,
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
  forgotPasswordText:{
    fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    // backgroundColor: 'green',
    color: "#E76354",
    alignSelf:"center",
    marginVertical:13,
    fontSize: getCorrectFontSizeForScreen(12),
  },

  inputs:{
    // backgroundColor:'pink',
    justifyContent:'center'
  },
  bodyContainer:{

  },
  nextBtnContainer:{
    flex:1,

  }

});



class EmailSignInRender extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      value: {
        email: this.props.email,
        password: this.props.password
      },
      keyboardIsVisible: false
    };
  }

  onKeyboardChange(keyboardVisible) {
    console.log("KEYBOARD SHOWN"+keyboardVisible);
    this.setState({
      keyboardIsVisible: keyboardVisible
    });
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    this.setState({
      value: {
      	email: nextprops.email,
      	password: nextprops.password
      }
    });
  }

  // componentDidMount(){
  //   this.passwordNode = this.refs.signInForm.getPasswordNode();
  //   this.emailNode = this.refs.signInForm.getEmailNode();
  // }

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

    if(!!this.props.onValueChange){
      this.props.onValueChange(value);
    }
    this.setState(
      {value}
    );
  }



  renderForgotPasswordBtn(){
    if(this.state.keyboardIsVisible===true && Platform.OS=="ios"){
      return <View></View>;
    }else{
      return (<Button onPress={this.props.onForgotBtnPress} style={styles.forgotPasswordBtn} textStyle={styles.forgotPasswordText} >
        Forgot Password
      </Button>);
    }
  }


  // renderSpacer(){
  //   if (this.props.forgotPasswordModalOpen===false){
  //     return (<KeyboardSpacer android={false} onToggle={(keyboardState, keyboardHeight)=>{
  //         if(keyboardState==true){
  //           this.refs.scroller.scrollTo({x:0, y:h*0.2, animated: true});
  //           this.setState({
  //             keyboardIsVisible: true
  //           });
  //         }else{
  //           this.refs.scroller.scrollTo({x:0, y:0, animated: true});
  //           this.setState({
  //             keyboardIsVisible: false
  //           });
  //         }
  //       }}/>)
  //   }else{
  //     return <View></View>;
  //   }
  //
  // }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    return(
      <View style={styles.baseContainer}>
        <PavKeyboardAwareView
        style={styles.contentContainer}
        onKeyboardChange={this.onKeyboardChange.bind(this)}
        >
          <View style={styles.bodyContainer}>
            <Button
            onPress={this.props.onFbBtnPress}
            style={styles.facebookBtn}
            textStyle={styles.blueBtnText}
            isDisabled={this.props.isFetchingAuth}
            isLoading={this.props.isFetchingAuth && (this.props.authMethod=="facebook")}
            iconProps={{name: "facebook",size:21, color: Colors.primaryColor}}>
              Sign In with Facebook
            </Button>
            <View style={styles.orTextContainer}>
              <Text style={styles.orText}>Or</Text>
            </View>

            <View style={styles.inputs}>
              <SignInForm
                ref="signInForm"
                value={this.state.value}
                isFetchingAuth={this.props.isFetchingAuth}
                error={this.props.error}
                formIsValid={this.props.formIsValid}
                mailFieldError={this.props.mailFieldError}
                passwordFieldError={this.props.passwordFieldError}
                onChange={this.onChange.bind(this)}
                onNext={this.props.onSignInBtnPress}
                togglePasswordHidden={this.props.togglePasswordHidden}
                showPassword={this.props.showPassword}

              />
              {this.renderForgotPasswordBtn()}
            </View>
          </View>




          <View style={[styles.nextBtnContainer, (this.state.keyboardIsVisible===true)?{marginTop:0}:{marginTop:w*0.1}]}>
            <Button
                key="loginBtn"
                textStyle={styles.whiteBtnText}
                style={styles.signInBtn}
                isDisabled={this.props.isFetchingAuth}
                isLoading={(this.props.isFetchingAuth===true) && (this.props.authMethod=="email")}
                activityIndicatorColor={Colors.mainTextColor}
                onPress={()=>{
                  this.refs.form.getComponent('password').refs.input.focus();
                }}
                >

              Sign In >
            </Button>
          </View>

        </PavKeyboardAwareView>

        <ForgotPasswordModalBox
        onCloseBtnClicked={this.props.onForgotPasswordCloseBtnClicked}
        onNextBtnClicked={this.props.onForgotPasswordNextBtnClicked}
        isFetchingAuth={this.props.isFetchingAuth}
        isOpen={this.props.forgotPasswordModalOpen}
        onModalClosed={this.props.onForgotPasswordClosed}
        onForgotPasswordTextChange={this.props.onForgotPasswordTextChange}
        forgotPasswordTextValue={this.props.forgotPasswordTextValue}
        forgotPasswordDisabled={this.props.forgotPasswordDisabled}
        forgotPasswordErrorValue={this.props.forgotPasswordErrorValue}
        />
      </View>
    );
  }
}

// this.props.onSignInBtnPress






EmailSignInRender.propTypes= {

  forgotPasswordErrorValue: React.PropTypes.any.isRequired,
  forgotPasswordDisabled: React.PropTypes.bool.isRequired,
  forgotPasswordTextValue: React.PropTypes.string,
  authMethod: React.PropTypes.string.isRequired,
  authForm: React.PropTypes.object.isRequired,
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  error: React.PropTypes.string,
  formIsValid: React.PropTypes.bool.isRequired,
  isFetchingAuth: React.PropTypes.bool.isRequired,
  forgotPasswordModalOpen: React.PropTypes.bool.isRequired,
  togglePasswordHidden: React.PropTypes.func.isRequired,
  showPassword: React.PropTypes.bool.isRequired,

  mailFieldError: React.PropTypes.bool.isRequired,
  passwordFieldError: React.PropTypes.bool.isRequired,

  onFbBtnPress: React.PropTypes.func.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onForgotPasswordClosed: React.PropTypes.func.isRequired,
  onForgotPasswordTextChange: React.PropTypes.func.isRequired,
  onForgotPasswordCloseBtnClicked: React.PropTypes.func.isRequired,
  onForgotPasswordNextBtnClicked: React.PropTypes.func.isRequired,
  onSignInBtnPress: React.PropTypes.func.isRequired,
  onForgotBtnPress: React.PropTypes.func.isRequired,

};

export default EmailSignInRender;
