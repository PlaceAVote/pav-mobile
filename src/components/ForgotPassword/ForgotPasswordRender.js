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
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../../components/ErrorAlert';

/**
 *  The ForgotPasswordForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import ForgotPasswordForm from './ForgotPasswordForm';

import {Colors, ScheneKeys} from '../../config/constants';

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
var {height:screenHeight, width:screenWidth} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The states were interested in
 */
const {
  LOGIN,
  FORGOT_PASSWORD
} = ScheneKeys;



/**
 * ## Styles
 */
var styles = StyleSheet.create({

  baseContainer: {
    flex:1,
    // backgroundColor: 'red',
  },
  contentContainer: {
    flex:1,
    // backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    marginVertical: 10,
    marginHorizontal:10,
    // backgroundColor: 'pink'
  },
  sendButton: {
    width: screenWidth*0.5,
    backgroundColor: Colors.accentColor,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.mainBorderColor,
    marginTop: 15,
    height: 60
  },
  whiteBtnText:{
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    color: Colors.mainTextColor,
    textAlign: 'center'
  },
  explanationContainer:{
    flex:0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: 'orange'
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: 19,
    color: Colors.thirdTextColor,
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  formContainer:{
    flex:0.25,
    width: screenWidth*0.85,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    flex:0.35,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
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


class ForgotPasswordRender extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      value: {
        forgotPasswordEmail: this.props.auth.form.fields.forgotPasswordEmail
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
      	forgotPasswordEmail: nextprops.auth.form.fields.forgotPasswordEmail
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
    if (value.forgotPasswordEmail != '') {
      this.props.actions.onAuthFormFieldChange('forgotPasswordEmail',value.forgotPasswordEmail, FORGOT_PASSWORD);
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

    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.explanationContainer}>
            <Text style={styles.descriptionText} >
            Please enter your email address, a link will be generated for you to reset your password.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <ForgotPasswordForm
              form={this.props.auth.form}
              value={this.state.value}
              onChange={self.onChange.bind(self)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button textStyle={styles.whiteBtnText} style={styles.sendButton}
                isDisabled={!this.props.auth.form.isValid.get(FORGOT_PASSWORD) || this.props.auth.form.isFetching}
                onPress={this.props.onButtonPress}>
              Send
            </Button>

          </View>




        </View>
      </View>
    );
  }
}
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordRender);
