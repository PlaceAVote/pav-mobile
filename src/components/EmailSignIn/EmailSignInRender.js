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
// const  Button = require('sp-react-native-iconbutton');
import Button from 'sp-react-native-iconbutton'



/**
* Icons library
*/
var Icon = require('react-native-vector-icons/FontAwesome');

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../../components/Header';
/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../../components/ErrorAlert';
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../../components/FormButton';
/**
 *  The SignInForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignInForm from './SignInForm';
/**
 * The itemCheckbox will toggle the display of the password fields
 */
import ItemCheckbox from '../../components/ItemCheckbox';
import {Colors, ActionNames} from '../../config/constants';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  Image
}
from 'react-native';

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The states were interested in
 */
const {
  LOGIN,
  FORGOT_PASSWORD
} = ActionNames;



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
    flexDirection: 'column',

    marginTop:110,
    marginBottom:20,
    marginHorizontal:15
  },
  titleText: {
    backgroundColor: Colors.transparentColor,
    fontSize: 27,
    color: Colors.secondaryTextColor,
    textAlign: 'center',
    marginHorizontal: 41,
    marginTop: 20,
    marginBottom: 13,
  },
  signInBtn: {
    backgroundColor: Colors.accentColor,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.mainBorderColor,
    marginTop: 15,
    height: 65
  },
  facebookBtn:{
    backgroundColor: Colors.secondaryColor,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.mainBorderColor,
    marginTop: 15,
    height: 65
  },
  whiteBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center'
  },
  orText:{
    color: Colors.secondaryTextColor,
    alignSelf:"center",
    marginVertical:10
  },
  forgotPasswordText:{
    color: "#E76354",
    alignSelf:"center",
    marginVertical:13,
    fontSize: 18,
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


class EmailSignInRender extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      value: {
        username: this.props.auth.form.fields.username,
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain
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
      	username: nextprops.auth.form.fields.username,
      	email: nextprops.auth.form.fields.email,
      	password: nextprops.auth.form.fields.password,
      	passwordAgain: nextprops.auth.form.fields.passwordAgain
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
    // if (value.username != '') {
    //   this.props.actions.onAuthFormFieldChange('username',value.username);
    // }
    // if (value.email != '') {
    //   this.props.actions.onAuthFormFieldChange('email',value.email);
    // }
    // if (value.password != '') {
    //   this.props.actions.onAuthFormFieldChange('password',value.password);
    // }
    // if (value.passwordAgain != '') {
    //   this.props.actions.onAuthFormFieldChange('passwordAgain',value.passwordAgain);
    // }
    // this.setState(
    //   {value}
    // );
  }
  /**
  *  Get the appropriate message for the current action
  *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
  *  @param actions the action for the message type
  */
  getMessage(messageType, actions) {
    let forgotPassword =
    <TouchableHighlight
        onPress={() => {
            actions.forgotPasswordState();
            Actions.ForgotPassword();
          }} >
      <Text>Forgot Password?</Text>
    </TouchableHighlight>;

    let alreadyHaveAccount =
    <TouchableHighlight
        onPress={() => {
            actions.loginState();
            Actions.Login();
          }} >
      <Text>Already have an account?</Text>
    </TouchableHighlight>;

    let register =
    <TouchableHighlight
        onPress={() => {
            actions.registerState();
            Actions.Onboarding();
          }} >
      <Text>Register</Text>
    </TouchableHighlight>;

    switch(messageType) {
    case FORGOT_PASSWORD:
      return forgotPassword;
    case LOGIN:
      return alreadyHaveAccount;
    case REGISTER:
      return register;
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    var formType = this.props.formType;
    var loginButtonText = this.props.loginButtonText;
    var onButtonPress = this.props.onButtonPress;
    var displayPasswordCheckbox = this.props.displayPasswordCheckbox;
    var leftMessageType = this.props.leftMessageType;
    var rightMessageType = this.props.rightMessageType;

    var passwordCheckbox = <Text/>;
    let leftMessage = this.getMessage(leftMessageType, this.props.actions);
    let rightMessage = this.getMessage(rightMessageType, this.props.actions);

    let self = this;
    let onBtnPress = ()=>{
      this.props.onButtonPress("signIn");
    },
    onFbBtnPress = ()=>{
      this.props.onButtonPress("facebook");
    }



    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>
          <View>
      	    <View style={styles.inputs}>
      	      <SignInForm
                formType={formType}
                form={this.props.auth.form}
                value={this.state.value}
                onChange={self.onChange.bind(self)}
      	      />
            </View>
            <Button textStyle={styles.whiteBtnText} style={styles.signInBtn}
                isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
                onPress={onBtnPress}>
              Sign In
            </Button>
            <Text style={styles.orText}>Or</Text>
            <Button onPress={onFbBtnPress} style={styles.facebookBtn} textStyle={styles.whiteBtnText} iconProps={{name: "facebook",size:25, color: "white"}} iconStyle={styles.iconStyle}>
              Sign Up with Facebook
            </Button>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>

      	  </View>

        </View>
      </View>
    );
  }
}
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignInRender);
