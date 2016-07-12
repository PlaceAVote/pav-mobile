/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Modal from 'react-native-modalbox';
import ForgotPasswordModalBox from '../Modals/ForgotPasswordModalBox'
/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as globalActions from '../../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
// import Button from 'sp-react-native-iconbutton';
import Button from 'sp-react-native-iconbutton'
import KeyboardSpacer from 'react-native-keyboard-spacer';




/**
 *  The SignInForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignInForm from './SignInForm';

import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  // Keyboard
} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The states were interested in
 */
const {
  LOGIN,
} = ScheneKeys;



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
    // backgroundColor: 'blue',
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
    flex:1,
    // backgroundColor:'red',
    justifyContent:'flex-start'
  }

});
/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  globalActions
];

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}


class EmailSignInRender extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      value: {
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password
      },
      keyboardIsVisible: false
    };
    // this._listeners = null;
  }



  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    this.setState({
      value: {
      	email: nextprops.auth.form.fields.email,
      	password: nextprops.auth.form.fields.password
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
    if (value.email != '') {
      this.props.actions.onAuthFormFieldChange('email',value.email, LOGIN);
    }
    if (value.password != '') {
      this.props.actions.onAuthFormFieldChange('password',value.password, LOGIN);
    }
    this.setState(
      {value}
    );
  }



  renderForgotPasswordBtn(){
    if(this.state.keyboardIsVisible===false){
      return (<Button onPress={this.props.onForgotBtnPress} style={styles.forgotPasswordBtn} textStyle={styles.forgotPasswordText} >
        Forgot Password
      </Button>);
    }else{
      return <View></View>;
    }
  }


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let self = this;
    // renderForgotPasswordModalBox = ()=>{
    //   if(===true){
    //     return ;
    //   }else{
    //     return <View></View>;
    //   }
    // }

    // console.log("@@@@@@@@ forgotPasswordModalOpen is: "+this.props.forgotPasswordModalOpen);

    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>


          <Button
          onPress={this.props.onFbBtnPress}
          style={styles.facebookBtn}
          textStyle={styles.blueBtnText}
          isDisabled={this.props.auth.form.isFetching}
          isLoading={this.props.auth.form.isFetching && (this.props.auth.form.authMethod=="facebook")}
          iconProps={{name: "facebook",size:21, color: Colors.primaryColor}}>
            Sign In with Facebook
          </Button>
          <View style={styles.orTextContainer}>
            <Text style={styles.orText}>Or</Text>
          </View>

          <View style={styles.inputs}>
            <SignInForm
              form={this.props.auth.form}
              value={this.state.value}
              onChange={self.onChange.bind(self)}
              onNext={this.props.onSignInBtnPress}
            />
            {this.renderForgotPasswordBtn()}
          </View>



          <Button
              key="loginBtn"
              textStyle={styles.whiteBtnText}
              style={styles.signInBtn}
              isDisabled={this.props.auth.form.isFetching}
              isLoading={this.props.auth.form.isFetching && (this.props.auth.form.authMethod=="email")}
              activityIndicatorColor={Colors.mainTextColor}
              onPress={this.props.onSignInBtnPress}>
            Sign In >
          </Button>

          <KeyboardSpacer onToggle={(keyboardState, keyboardHeight)=>{
              if(keyboardState==true){
                this.setState({
                  keyboardIsVisible: true
                });
              }else{
                this.setState({
                  keyboardIsVisible: false
                });
              }
            }}/>
        </View>

        <ForgotPasswordModalBox
        onCloseBtnClicked={this.props.onForgotPasswordCloseBtnClicked}
        onNextBtnClicked={this.props.onForgotPasswordNextBtnClicked}
        auth={this.props.auth}
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
// {renderForgotPasswordModalBox()}

//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignInRender);
