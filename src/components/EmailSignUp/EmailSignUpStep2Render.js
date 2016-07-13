/**
 * # EmailSignUpStep2.js
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
import SignUp2Form from './SignUp2Form';

import {Colors} from '../../config/constants';
// import _ from 'underscore';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import WelcomeModalBox from '../Modals/WelcomeModalBox';
import moment from 'moment';
import React from 'react';
import {StyleSheet, ScrollView, Text, View, Platform} from 'react-native';

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

  },
  container:{
    flex:1,
    paddingHorizontal: w*0.04,
    paddingVertical: h*0.02,
  },

  inputsContainer:{
    flex:1,
    // paddingVertical: w*.04,
    backgroundColor: 'white'
  },


  signInBtn:{
    backgroundColor: Colors.accentColor,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: Colors.mainBorderColor,
    height: 45
  },
  signInBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(12),
  },



});





class EmailSignUpStep2Render extends React.Component {
  constructor(props) {
    super(props);

    let dob = this.props.authFormFields.dateOfBirth;

    if(dob!=null && dob.isMoment==null){
      dob = moment(dob, "x")
    }
    let dateOfBirth = null;
    if(dob!=null){
      dateOfBirth = dob.toDate();
    }

    this.state ={
      keyboardOpen: false,
      name: this.props.authFormFields.name,
      surname: this.props.authFormFields.surname,
      dateOfBirth: dateOfBirth,
      zipCode: this.props.authFormFields.zipCode
    };
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {

    // let val = _.extend({}, this.state.value);
    // console.log("@@@ "+JSON.stringify(val))
    //if the new dob is something different than what the old was
    if(nextprops.authFormFields.dateOfBirth !== this.props.authFormFields.dateOfBirth){
      let dob = nextprops.authFormFields.dateOfBirth;
      if(dob!=null && dob.isMoment==null){
        dob = moment(dob, "x")
      }
      let dateOfBirth;
      if(dob!=null){
        dateOfBirth = dob.toDate();
      }
      this.setState({dateOfBirth : dateOfBirth});
    }

    //if the new name is something different than what the old was
    if(nextprops.authFormFields.name !== this.props.authFormFields.name){
      this.setState({name : nextprops.authFormFields.name});
    }

    //if the new surname is something different than what the old was
    if(nextprops.authFormFields.surname !== this.props.authFormFields.surname){
      this.setState({surname : nextprops.authFormFields.surname});
    }

    //if the new zipCode is something different than what the old was
    if(nextprops.authFormFields.zipCode !== this.props.authFormFields.zipCode){
      this.setState({zipCode : nextprops.authFormFields.zipCode});
    }

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

  modalPopupRender(enabled, errorMsg){
    if(enabled){
      if(!!errorMsg){
        return (<WelcomeModalBox
        isOpen={enabled}
        modalButtonDisabled = {this.props.modalButtonDisabled}
        onModalClosed={this.props.onModalClosed}
        modalText="Oops"
        modalText2={errorMsg}
        modalBtnText="Back"
        btnBackground={Colors.errorTextColor}
         />);
      }else{
        return (<WelcomeModalBox
        isOpen={enabled}
        modalButtonDisabled = {this.props.modalButtonDisabled}
        onModalClosed={this.props.onModalClosed}
        modalText="Its a thrill to have you with us"
        modalText2="You are now registered."
        modalBtnText="Lets get started"
        btnBackground={Colors.accentColor}
         />);
      }
    }else{
      return <View></View>;
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
        <View style={styles.container}>

          <ScrollView
          style={styles.inputsContainer}
          bounces={false}
          >
            <SignUp2Form
              isFetchingAuth={this.props.isFetchingAuth}
              authFormFields={this.props.authFormFields}
              value={{
                name: this.state.name,
                surname: this.state.surname,
                dateOfBirth: this.state.dateOfBirth,
                zipCode: this.state.zipCode
              }}
              error={this.props.error}
              onChange={this.onChange.bind(this)}
              onNext={this.props.onNextStep}
              regFormIsValid={this.props.regFormIsValid}
              birthdayBeingPicked={this.props.birthdayBeingPicked}
            />

          </ScrollView>



          <Button
              key="loginBtn"
              textStyle={styles.signInBtnText}
              style={styles.signInBtn}
              isDisabled={(this.props.isFetchingAuth===true || this.props.isUserLoggedIn===true)}
              isLoading={(this.props.isFetchingAuth===true)}
              activityIndicatorColor={Colors.mainTextColor}
              onPress={this.props.onNextStep}>
            Complete Registration
          </Button>
          {this.renderKeyboardSpacer()}
        </View>
        {this.modalPopupRender(this.props.modalPopupEnabled,this.props.modalPopupErrorMsg)}
      </View>
    );
  }

  // shouldComponentUpdate(nextProps) {
  //   return (nextProps.isUserLoggedIn===false);
  // }
}

EmailSignUpStep2Render.propTypes= {
  regFormIsValid: React.PropTypes.bool.isRequired,
  authFormFields: React.PropTypes.object.isRequired,
  error: React.PropTypes.string,
  isFetchingAuth: React.PropTypes.bool.isRequired,
  isUserLoggedIn: React.PropTypes.bool.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onBack: React.PropTypes.func.isRequired,
  onNextStep: React.PropTypes.func.isRequired,
  birthdayBeingPicked: React.PropTypes.bool.isRequired,

  modalPopupEnabled: React.PropTypes.bool.isRequired,
  modalPopupErrorMsg: React.PropTypes.string,
  onModalClosed: React.PropTypes.func.isRequired,
};
export default EmailSignUpStep2Render;
