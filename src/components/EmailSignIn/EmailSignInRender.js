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
import ForgotPasswordModalBox from '../ForgotPassword/ForgotPasswordModalBox'
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
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../../components/ErrorAlert';

/**
 *  The SignInForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignInForm from './SignInForm';

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
    // backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:80,
    marginBottom:20,
    marginHorizontal:15
  },
  titleText: {
    fontFamily: 'Whitney Book', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    backgroundColor: Colors.transparentColor,
    // backgroundColor: 'green',
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
    height: 60
  },
  facebookBtn:{
    backgroundColor: Colors.secondaryColor,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.mainBorderColor,
    marginTop: 15,
    height: 60
  },
  forgotPasswordBtn:{
    backgroundColor: Colors.transparentColor,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.transparentColor,
    height: 60
  },
  whiteBtnText:{
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    color: Colors.mainTextColor,
    textAlign: 'center'
  },
  orText:{
    fontFamily: 'Whitney Semibold', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    color: Colors.secondaryTextColor,
    alignSelf:"center",
    marginVertical:5
  },
  forgotPasswordText:{
    fontFamily: 'Whitney Book', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    // backgroundColor: 'green',
    color: "#E76354",
    alignSelf:"center",
    marginVertical:13,
    fontSize: 16,
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
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password
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

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let self = this;
    let onBtnPress = ()=>{
      this.props.onButtonPress("signIn");
    },
    onFbBtnPress = ()=>{
      this.props.onButtonPress("facebook");
    },
    onForgotBtnPress = ()=>{
      this.props.onButtonPress(FORGOT_PASSWORD);
    };
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
          <View style={styles.inputs}>
            <SignInForm
              form={this.props.auth.form}
              value={this.state.value}
              onChange={self.onChange.bind(self)}
            />
          </View>
          <Button textStyle={styles.whiteBtnText} style={styles.signInBtn}
              isDisabled={!this.props.auth.form.isValid.get(LOGIN) || this.props.auth.form.isFetching}
              onPress={onBtnPress}>
            Sign In
          </Button>
          <Text style={styles.orText}>Or</Text>
          <Button onPress={onFbBtnPress} style={styles.facebookBtn} textStyle={styles.whiteBtnText} iconProps={{name: "facebook",size:25, color: "white"}} iconStyle={styles.iconStyle}>
            Sign Up with Facebook
          </Button>
          <Button onPress={onForgotBtnPress} style={styles.forgotPasswordBtn} textStyle={styles.forgotPasswordText} >
            Forgot Password
          </Button>

        </View>

        <ForgotPasswordModalBox
        onCloseBtnClicked={this.props.onForgotPasswordCloseBtnClicked}
        onNextBtnClicked={this.props.onForgotPasswordNextBtnClicked}
        auth={this.props.auth}
        isOpen={this.props.forgotPasswordModalOpen}
        onModalClosed={this.props.onForgotPasswordClosed} />
      </View>
    );
  }
}
// {renderForgotPasswordModalBox()}

//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignInRender);
