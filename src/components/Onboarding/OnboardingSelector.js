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
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

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
  logoImgContainer:{
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logoImg:{
    marginVertical: 5
  },
  backgroundImg: {
    flex:1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    resizeMode: 'cover',
    width: null,
    height: null
  },
  container: {
    // backgroundColor: 'orange',
    flex:1,
    flexDirection: 'column',
    // backgroundColor: 'white',
    marginVertical:60,
    marginHorizontal:15
  },
  titleText: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 27,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 41,
    marginTop: 20,
    marginBottom: 13,
  },
  descriptionText: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 60,
    marginTop: 13,
    marginBottom: 13
  },
  descriptionText2: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 60,
    marginVertical: 13,
  },
  btnContainer:{
    marginTop:50
  },
  btn: {
    height:60,
    borderRadius: 4,
    borderWidth: 1
  },
  whiteBtnText:{
    color: 'white',
    textAlign: 'center'
  },
  facebookBtn:{
    backgroundColor: '#3D5B96',
    borderColor: 'rgba(0,0,0,0.2)'
    // ,justifyContent: 'center'
  },
  // facebookImg:{
  //   backgroundColor:'red',
  //   width: 22,
  //   height: 18,
  //   resizeMode: 'contain',
  //   justifyContent: 'flex-start'
  // },
  emailBtn:{
    backgroundColor: '#A5CB75',
    borderColor: 'rgba(0,0,0,0.2)'

  },
  signInBtn:{
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'white'
  },

  iconStyle:{
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

/*
<View style={styles.facebookBtnContainer}>
  <Image style={styles.facebookImg} source={require('../../../assets/fbIcon.png')}></Image>
</View>



              <Icon name="facebook" style={styles.icon} size={22}>
                <Text style={styles.facebookText} >
                Login with Facebook
                </Text>
              </Icon>
*/

    return(
        <Image style={styles.backgroundImg} source={require('../../../assets/pavBG.jpg')}>
          <View style={styles.container}>

            <View style={styles.logoImgContainer}>
              <Image style={styles.logoImg} source={require('../../../assets/pavLogo.jpg')}></Image>
            </View>
            <Text style={styles.titleText} >
            Be Loud. Be Heard. Be Represented.
            </Text>
            <Text style={styles.descriptionText} >
            PlaceAVote gives you the opportunity to read, debate, and vote on every bill that is presented before Congress.
            </Text>
            <Text style={styles.descriptionText2} >
            Place your vote today and let your representatives know how to represent you.
            </Text>
            <View style={styles.btnContainer}>
              <Button style={[styles.facebookBtn, styles.btn]} textStyle={styles.whiteBtnText} iconProps={{name: "facebook",size:25, color: "white"}} iconStyle={styles.iconStyle}>
                Login with Facebook
              </Button>
              <Button style={[styles.emailBtn, styles.btn]} textStyle={styles.whiteBtnText}>
              Signup with email
              </Button>
              <Button style={[styles.signInBtn, styles.btn]} textStyle={styles.whiteBtnText}>
              Sign In
              </Button>
            </View>
          </View>
        </Image>
    );
  }
}
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSelector);
