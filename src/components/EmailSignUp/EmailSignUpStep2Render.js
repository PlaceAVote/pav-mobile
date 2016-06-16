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
// import Button from 'sp-react-native-iconbutton';
import Button from 'sp-react-native-iconbutton'

/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../../components/ErrorAlert';

/**
 *  The SignUpEmailForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUpEmailForm from './SignUpEmailForm';

import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableHighlight, View, Image, PixelRatio} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import KeyboardSpacer from 'react-native-keyboard-spacer';
/**
 * The states were interested in
 */
const {
  REGISTER_STEP_2
} = ScheneKeys;

import pIndic2 from '../../../assets/pIndic2.jpg';
import signupExpl2 from '../../../assets/signupExpl2.gif';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
/**
 * ## Styles
 */
var styles = StyleSheet.create({

  baseContainer: {
    flex:1,
    backgroundColor: Colors.primaryColor,
  },
  contentContainer: {
    flex:1,
    flexDirection: 'column'
  },
  backBtn:{
    alignItems:'flex-start',
    top:h*0.05,
    left:w*0.02,
    width:w*0.15,
    height:w*0.15,
    borderWidth: 0,
    position: 'absolute',
  },
  backBtnIconContainer:{
    paddingVertical:w*0.03,
  },
  backBtnIcon:{
    // backgroundColor: 'pink',
    color: '#FFFFFF',
  },
  explanationContainer:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center', //x axis
    justifyContent: 'flex-end',
    backgroundColor: Colors.primaryColor
    // ,backgroundColor: 'red'
  },
  footerContainer:{
    backgroundColor: 'white'
  },
  inputsContainer:{
    flex:1,
    marginTop:15,
    marginBottom:20,
    marginHorizontal:15,
    justifyContent: "flex-end",
    backgroundColor: 'white'
  },
  formContainer:{
    flex:1,
    // backgroundColor: 'red',
    justifyContent:'center'
  },
  descriptionTextContainer:{
    // backgroundColor:'black',
    marginVertical: 10,
    justifyContent: 'center',
    flex:1//0.23,
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney Book', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: getCorrectFontSizeForScreen(w,h,11),
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 21,
  },
  explanImgContainer:{
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center', //x axis
    alignItems: 'flex-end',    //y axis
    marginVertical: 10
  },
  explanImg:{
    height: h*0.30,
    width: w*0.70,
    // backgroundColor: 'red'
  },
  pIndicContainer:{
    backgroundColor: Colors.transparentColor,
    // backgroundColor:'blue',
    flexDirection: 'column',
    justifyContent: 'flex-end', //y axis
    alignItems: 'center',       //x axis
    marginVertical: 5,
  },
  pIndicImg:{

  },
  nextStepBtn: {
    backgroundColor: Colors.accentColor,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.mainBorderColor,
    height: 60
  },
  whiteBtnText:{
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontSize: getCorrectFontSizeForScreen(w,h,14),
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







class EmailSignUpStep2Render extends React.Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      keyboardOpen: false,
      value: {
      	email: this.props.auth.form.fields.email
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
      	email: nextprops.auth.form.fields.email
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
    if (value.email != '') {
      this.props.actions.onAuthFormFieldChange('email',value.email, REGISTER_STEP_2);
    }
    this.setState(
      {value}
    );
  }


  renderPageIndicatorIcon(){
    if(this.props.auth.form.fields.nameHasError || this.props.auth.form.fields.surnameHasError  || this.state.keyboardOpen===true){
      return (<View></View>)
    }else{
      return (<View style={styles.pIndicContainer}>
        <Image style={styles.pIndicImg} resizeMode= 'contain' source={pIndic2}></Image>
      </View>);
    }
  }


  renderText(styles){
    if(this.state.keyboardOpen===true){
      return <View></View>;
    }else{
      return (
        <View style={styles.descriptionTextContainer} >
          <Text style={styles.descriptionText} >
          Welcome to PlaceAVote, a nonpartisan platform that gives you the opportunity to read, debate, and anonymously vote on every bill that is presented before Congress.
          </Text>
        </View>);
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {



    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>
            <View style={styles.explanationContainer}>
              <View style={styles.explanImgContainer}>
                <Image style={styles.explanImg} resizeMode= 'contain' source={signupExpl2}></Image>
              </View>
              {this.renderText(styles)}
              <Button onPress={this.props.onBack}
                style={styles.backBtn}
                isDisabled={false}
                isLoading={false}
                iconContainerStyle={styles.backBtnIconContainer}
                customIcon={()=><PavIcon name="arrow-left" size={25} style={styles.backBtnIcon}/>}
              />
              {this.renderPageIndicatorIcon()}
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <View  style={styles.formContainer}>
                  <SignUpEmailForm
                    form={this.props.auth.form}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onNext={this.props.onNextStep}
                  />
                </View>
                <Button
                  textStyle={styles.whiteBtnText}
                  style={styles.nextStepBtn}
                  isLoading={this.props.auth.form.isFetching}
                  activityIndicatorColor={Colors.mainTextColor}
                  isDisabled={!this.props.auth.form.isValid.get(REGISTER_STEP_2) || this.props.auth.form.isFetching}
                  onPress={this.props.onNextStep}>
                  Next Step
                </Button>
              </View>
            </View>
            <KeyboardSpacer onToggle={(keyboardState, keyboardHeight)=>{
              this.setState({
                keyboardOpen: keyboardState
              });
            }}/>

        </View>
      </View>
    );
  }
  shouldComponentUpdate(nextProps) {
    return (nextProps.auth.user.isLoggedIn===false);
  }
}
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep2Render);
