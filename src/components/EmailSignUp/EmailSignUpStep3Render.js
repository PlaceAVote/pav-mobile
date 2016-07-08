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
 *  The SignUpPasswordForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUpPasswordForm from './SignUpPasswordForm';

import {Colors, ScheneKeys} from '../../config/constants';

import KeyboardSpacer from 'react-native-keyboard-spacer';

/**
 * The states were interested in
 */
const {
  REGISTER_STEP_3
} = ScheneKeys;

import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableHighlight, View, Image, PixelRatio, Platform} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The states were interested in
 */

import pIndic3 from '../../../assets/pIndic3.jpg';
import signupExpl3 from '../../../assets/signupExpl3.jpg';
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
    backgroundColor: Colors.primaryColor,
  },
  inputsContainer:{
    flex:1,
    marginTop:15,
    marginBottom:20,
    marginHorizontal:15,
    justifyContent: "space-between",
    backgroundColor: 'white'
  },
  formContainer:{
    flex:1,
    // backgroundColor: 'red',
    justifyContent:'center'
  },
  footerContainer:{
    backgroundColor: 'white'
  },
  descriptionTextContainer:{
    // backgroundColor:'black',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    backgroundColor: Colors.transparentColor,
    // backgroundColor:'black',
    fontSize: getCorrectFontSizeForScreen(11),
    color: Colors.mainTextColor,
    textAlign: 'center',
    width: w*0.9,
  },
  explanImgContainer:{
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',    //y axis
    marginVertical: 5
  },
  explanImg:{
    height: h*0.23,
    width: w*0.8,
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
    fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontSize: getCorrectFontSizeForScreen(14),
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







class EmailSignUpStep3Render extends React.Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      keyboardOpen: false,
      value: {
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

    // console.log("Changed"+JSON.stringify(value));
    if (value.password != '') {
      this.props.actions.onAuthFormFieldChange('password',value.password, REGISTER_STEP_3);
    }
    if (value.passwordAgain != '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain',value.passwordAgain, REGISTER_STEP_3);
    }

    this.setState(
      {value}
    );
  }


  renderPageIndicatorIcon(){
    if(this.props.auth.form.fields.passwordHasError || this.props.auth.form.fields.passwordAgainHasError  || this.state.keyboardOpen===true){
      return (<View></View>)
    }else{
      return (<View style={styles.pIndicContainer}>
        <Image style={styles.pIndicImg} resizeMode= 'contain' source={pIndic3}></Image>
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
          Help change Congress in making your voice louder than lobbyists by supporting and electing representatives who promise to utilize PlaceAVote in seeing how their districts are voting on each legislative issue and bill, and having their vote be a true reflection of the majority of their constituents.
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
        <View style={styles.contentContainer}>


            <View style={styles.explanationContainer}>

              <View style={styles.explanImgContainer}>
                <Image style={styles.explanImg} resizeMode= 'contain' source={signupExpl3}></Image>
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
                  <SignUpPasswordForm
                    form={this.props.auth.form}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onNext={this.props.onNextStep}
                  />
                </View>
                <Button textStyle={styles.whiteBtnText} style={styles.nextStepBtn}
                    isDisabled={!this.props.auth.form.isValid.get(REGISTER_STEP_3) || this.props.auth.form.isFetching}
                    onPress={this.props.onNextStep}>
                  Next Step
                </Button>
              </View>
            </View>
            {this.renderKeyboardSpacer()}

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
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep3Render);
