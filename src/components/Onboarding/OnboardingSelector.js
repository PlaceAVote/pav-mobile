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

/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

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
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import LoginForm from '../../components/LoginForm';
/**
 * The itemCheckbox will toggle the display of the password fields
 */
import ItemCheckbox from '../../components/ItemCheckbox';

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
  REGISTER,
  FORGOT_PASSWORD
} = require('../../config/constants').default;

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  backgroundImage: {
    flex:1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    resizeMode: 'cover',
    width: null,
    height: null
  },
  tableau: {
    backgroundColor: 'white'
  },
  textView: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5
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


class OnboardingSelector extends Component {
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
  // componentWillReceiveProps(nextprops) {
  //   this.setState({
  //     value: {
	// username: nextprops.auth.form.fields.username,
	// email: nextprops.auth.form.fields.email,
	// password: nextprops.auth.form.fields.password,
	// passwordAgain: nextprops.auth.form.fields.passwordAgain
  //     }
  //   });
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
  // onChange(value) {
  //   if (value.username != '') {
  //     this.props.actions.onAuthFormFieldChange('username',value.username);
  //   }
  //   if (value.email != '') {
  //     this.props.actions.onAuthFormFieldChange('email',value.email);
  //   }
  //   if (value.password != '') {
  //     this.props.actions.onAuthFormFieldChange('password',value.password);
  //   }
  //   if (value.passwordAgain != '') {
  //     this.props.actions.onAuthFormFieldChange('passwordAgain',value.passwordAgain);
  //   }
  //   this.setState(
  //     {value}
  //   );
  // }
  /**
  *  Get the appropriate message for the current action
  *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
  *  @param actions the action for the message type
  */
  // getMessage(messageType, actions) {
  //   let forgotPassword =
  //   <TouchableHighlight
  //       onPress={() => {
  //           actions.forgotPasswordState();
  //           Actions.ForgotPassword();
  //         }} >
  //     <Text>Forgot Password?</Text>
  //   </TouchableHighlight>;
  //
  //   let alreadyHaveAccount =
  //   <TouchableHighlight
  //       onPress={() => {
  //           actions.loginState();
  //           Actions.Login();
  //         }} >
  //     <Text>Already have an account?</Text>
  //   </TouchableHighlight>;
  //
  //   let register =
  //   <TouchableHighlight
  //       onPress={() => {
  //           actions.registerState();
  //           Actions.Onboarding();
  //         }} >
  //     <Text>Register</Text>
  //   </TouchableHighlight>;
  //
  //   switch(messageType) {
  //   case FORGOT_PASSWORD:
  //     return forgotPassword;
  //   case LOGIN:
  //     return alreadyHaveAccount;
  //   case REGISTER:
  //     return register;
  //   }
  // }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    // var formType = this.props.formType;
    // var loginButtonText = this.props.loginButtonText;
    // var onButtonPress = this.props.onButtonPress;
    // var displayPasswordCheckbox = this.props.displayPasswordCheckbox;
    // var leftMessageType = this.props.leftMessageType;
    // var rightMessageType = this.props.rightMessageType;
    //
    // var passwordCheckbox = <Text/>;
    // let leftMessage = this.getMessage(leftMessageType, this.props.actions);
    // let rightMessage = this.getMessage(rightMessageType, this.props.actions);

    let self = this;

    // display the login / register / change password screens
    // this.errorAlert.checkError(this.props.auth.form.error);
    //
    // /**
    //  * Toggle the display of the Password and PasswordAgain fields
    //  */
    // if (displayPasswordCheckbox) {
    //   passwordCheckbox =
    //   <ItemCheckbox
    //       text="Show Password"
    //       disabled={this.props.auth.form.isFetching}
    //       onCheck={() => {
	  //     this.props.actions.onAuthFormFieldChange('showPassword',true);
    //         }}
    //       onUncheck={() => {
	  //     this.props.actions.onAuthFormFieldChange('showPassword',false);
    //         }}
    //   />;
    // }


    /**
     * The LoginForm is now defined with the required fields.  Just
     * surround it with the Header and the navigation messages
     * Note how the button too is disabled if we're fetching. The
     * header props are mostly for support of Hot reloading.
     * See the docs for Header for more info.
     */

    return(
        <Image style={styles.backgroundImage} source={require('../../../assets/pavBG.jpg')}>
          <View style={styles.tableau}>
            <Text style={styles.textView} >
            You made it. The app is running. This will be our Onboarding Screen.
            </Text>
          </View>
        </Image>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSelector);
