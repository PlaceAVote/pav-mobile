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
import {LoginButton} from 'react-native-fbsdk';




/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
// import Button from 'sp-react-native-iconbutton';
import Button from 'sp-react-native-iconbutton'


import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableHighlight, View, Image, PixelRatio, Platform, StatusBar} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import pavBG from '../../../assets/pavBG.jpg';
/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;

import logoWhiteImg from '../../../assets/logo-white.png';

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
  // globalActions
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


class OnboardingRender extends React.Component {
  constructor(props) {
    super(props);

  }





  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?portraitStyles:landscapeStyles;
    return(
        <Image style={styles.backgroundImg} resizeMode= 'cover' source={pavBG}>
          <StatusBar
              backgroundColor="#4A5E83"
              translucent={false}
              barStyle="light-content"
           />
          <View style={styles.container}>

            <View style={styles.explanContainer}>
              <View style={styles.logoImgContainer}>
                <Image style={styles.logoImg} resizeMode= 'contain' source={logoWhiteImg}></Image>
              </View>

              <View style={styles.titleTextContainerVer}>
                <Text style={styles.titleText} numberOfLines={2}>
                Be Loud. Be Heard. Be Represented.
                </Text>
              </View>

              <View style={styles.descriptionContainerVer}>
                <Text style={styles.descriptionText} >
                PlaceAVote gives you the opportunity to read, debate, and vote on every bill that is presented before Congress.
                </Text>
              </View>

            </View>


            <View style={styles.btnContainer}>

              <Button onPress={this.props.onSignUpFacebookBtnPress}
              style={[styles.facebookBtn, styles.btn]}
              isDisabled={this.props.auth.form.isFetching}
              isLoading={this.props.auth.form.isFetching}
              activityIndicatorColor={Colors.mainTextColor}
              textStyle={styles.whiteBtnText}
              iconProps={{name: "facebook",size:25, color: "white"}}
              iconStyle={styles.iconStyle}>
                Signup with Facebook
              </Button>

              <Button
              onPress={this.props.onSignUpBtnPress}
              isDisabled={this.props.auth.form.isFetching}
              style={[styles.emailBtn, styles.btn]}
              textStyle={styles.whiteBtnText}>
              Signup with email
              </Button>
              <Button
              onPress={this.props.onSignInBtnPress}
              isDisabled={this.props.auth.form.isFetching}
              style={[styles.signInBtn, styles.btn]}
              textStyle={styles.whiteBtnText}>
              Sign In
              </Button>
            </View>
          </View>
        </Image>
    );
  }
}



/**
 * ## Styles
 */
var portraitStyles = StyleSheet.create({

  backgroundImg: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: w,
    height: h,
    paddingVertical: w*0.05,
  },
  container: {
    // backgroundColor: 'orange',
    flex:1,
    flexDirection: 'column',
    paddingHorizontal: w*0.05,
  },






  explanContainer:{ //child A
    // backgroundColor: 'black',
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingBottom: w*0.02,
    paddingVertical: h*0.005,
  },

  logoImgContainer:{    //child A1
    // backgroundColor: 'red',
    width: w,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  logoImg:{
    marginVertical: 7,
    alignSelf: 'center',
    // backgroundColor: 'blue',
    width: w*0.55,
    height:h*0.05
  },

  titleTextContainerVer:{ //child A2
    flexDirection: 'row', //its children will be in a row
    // backgroundColor:'red',
    backgroundColor: Colors.transparentColor,
    justifyContent: 'center'
    // alignSelf: 'center',
  },

  titleText: {
    width: w*0.86,
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(w,h,24),
    fontFamily: 'Whitney Semibold',
    color: Colors.mainTextColor,
    textAlign: 'center',
  },

  descriptionContainerVer:{ //child A3 and A4
    flexDirection: 'row', //its children will be in a row
    backgroundColor: Colors.transparentColor,
    // backgroundColor:'pink',
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  descriptionContainerHor:{
    width: w*0.76,
    flexDirection: 'column',    //its children will be in a column
    backgroundColor: 'blue',
    alignItems: 'center', //align items according to this parent (like setting self align on each item)
    justifyContent: 'space-around',
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    // fontWeight: 'bold',
    width: w*0.90,
    fontSize: getCorrectFontSizeForScreen(w,h,13),
    color: Colors.mainTextColor,
    textAlign: 'center',

  },








  btnContainer:{  //Child B
    // backgroundColor: 'red',
    paddingTop: h*0.035,
    paddingBottom: h*0.060,
    justifyContent: 'flex-end'
  },

  btn: {
    height:60,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: h*0.005,
  },
  whiteBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,13),
  },
  facebookBtn:{
    backgroundColor: Colors.secondaryColor,
    borderColor: Colors.mainBorderColor
  },
  emailBtn:{
    backgroundColor: Colors.accentColor,
    borderColor: Colors.mainBorderColor

  },
  signInBtn:{
    backgroundColor: Colors.transparentColor,
    borderColor: Colors.mainTextColor
  },

  iconStyle:{
    marginHorizontal: 10
  }

});





/**
 * ## Styles
 */
var landscapeStyles = StyleSheet.create({

  backgroundImg: {
    flex:1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: null,
    height: null,
    paddingVertical: w*0.05,
  },
  container: {
    // backgroundColor: 'orange',
    flex:1,
    flexDirection: 'column',
    paddingHorizontal: w*0.05,
    justifyContent:'flex-end',
  },

  explanContainer:{ //child A
    // backgroundColor: 'black',
    paddingVertical: w*0.05,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  logoImgContainer:{  //child A1
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  logoImg:{
    marginVertical: 7,
    alignSelf: 'center',
    // backgroundColor: 'blue',
    width: w*0.90,
    height:h*0.08
  },

  titleTextContainerVer:{  //child A2
    flexDirection: 'row', //its children will be in a row
    backgroundColor: Colors.transparentColor,
    justifyContent: 'center',
    paddingVertical: w*0.02,
    // alignSelf: 'center',
  },

  titleText: {
    width: h*0.80,
    // backgroundColor: 'black',
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(w,h,23),
    color: Colors.mainTextColor,
    textAlign: 'center',
  },

  descriptionContainerVer:{   //child A3
    flexDirection: 'row', //its children will be in a row
    backgroundColor: Colors.transparentColor,
    justifyContent: 'center',
    paddingVertical: w*0.014,
    // alignSelf: 'center',
  },

  descriptionText: {
    width: h*0.90,
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,14),
    color: Colors.mainTextColor,
    textAlign: 'center',

  },




  btnContainer:{  //Child B
    flexDirection:'column',
    // backgroundColor: 'red',
    // paddingVertical: h*0.015,
    justifyContent: 'flex-end'
  },

  btn: {
    alignSelf:'center',
    height:36,
    width:h*0.5,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: w*0.01,
    // backgroundColor:'pink'
  },
  whiteBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,12),
  },
  facebookBtn:{
    backgroundColor: Colors.secondaryColor,
    borderColor: Colors.mainBorderColor
  },
  emailBtn:{
    backgroundColor: Colors.accentColor,
    borderColor: Colors.mainBorderColor

  },
  signInBtn:{
    backgroundColor: Colors.transparentColor,
    borderColor: Colors.mainTextColor
  },

  iconStyle:{
  }

});





//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(OnboardingRender);
