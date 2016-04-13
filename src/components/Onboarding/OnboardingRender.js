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
// const  Button = require('sp-react-native-iconbutton');
import Button from 'sp-react-native-iconbutton'

/**
* Icons library
*/
var Icon = require('react-native-vector-icons/FontAwesome');


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
  Image,
  PixelRatio
}
from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;



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


class OnboardingRender extends Component {
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

    let self = this;
    let onFbBtnPress = ()=>{
      this.props.onButtonPress("facebook");
    },
    onSignInBtnPress = ()=>{
      this.props.onButtonPress("emailSignIn");
    },
    onSignUpBtnPress = ()=>{
      this.props.onButtonPress("emailSignUp");
    };


    // <LoginButton
    //   style={[styles.facebookBtn, styles.btn]}
    //   publishPermissions={["publish_actions"]}
    //   onLoginFinished={
    //     (error, result) => {
    //       if (error) {
    //         alert("login has error: " + result.error);
    //       } else if (result.isCancelled) {
    //         alert("login is cancelled.");
    //       } else {
    //         alert("login has finished with permissions: " + result.grantedPermissions)
    //       }
    //     }
    //   }
    //   onLogoutFinished={() => alert("logout.")}
    // />
    return(
        <Image style={styles.backgroundImg} resizeMode= 'cover' source={require('../../../assets/pavBG.jpg')}>
          <View style={styles.container}>

            <View style={styles.explanContainer}>
              <View style={styles.logoImgContainer}>
                <Image style={styles.logoImg} resizeMode= 'contain' source={require('../../../assets/logo-white.png')}></Image>
              </View>

              <View style={styles.titleTextContainerVer}>
                <View style={styles.titleTextContainerHor}>
                  <Text style={styles.titleText} numberOfLines={2}>
                  Be Loud. Be Heard. Be Represented.
                  </Text>
                </View>
              </View>

              <View style={styles.descriptionContainerVer}>
                <View style={styles.descriptionContainerHor}>
                  <Text style={styles.descriptionText} >
                  PlaceAVote gives you the opportunity to read, debate, and vote on every bill that is presented before Congress.
                  </Text>
                  <Text style={styles.descriptionText2} numberOfLines={5} >
                  Place your vote today and let your representatives know how to represent you.
                  </Text>
                </View>
              </View>

            </View>


            <View style={styles.btnContainer}>

              <Button onPress={onFbBtnPress} style={[styles.facebookBtn, styles.btn]} textStyle={styles.whiteBtnText} iconProps={{name: "facebook",size:25, color: "white"}} iconStyle={styles.iconStyle}>
                Login with Facebook
              </Button>

              <Button onPress={onSignUpBtnPress} style={[styles.emailBtn, styles.btn]} textStyle={styles.whiteBtnText}>
              Signup with email
              </Button>
              <Button onPress={onSignInBtnPress} style={[styles.signInBtn, styles.btn]} textStyle={styles.whiteBtnText}>
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
    height: h
  },
  container: {
    // backgroundColor: 'orange',
    flex:1,
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal:15
  },

  explanContainer:{
    // backgroundColor: 'black',
    flex:0.62,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  logoImgContainer:{
    // backgroundColor: 'red',
    flex:0.25,
    width: w*0.7,
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

  titleTextContainerVer:{
    flex:0.25, //height (according to its parent)
    flexDirection: 'row', //its children will be in a row
    backgroundColor: Colors.transparentColor,
    justifyContent: 'center'
    // alignSelf: 'center',
  },

  titleTextContainerHor:{
    width: 274,
    flexDirection: 'column',    //its children will be in a column
    // backgroundColor: 'blue',
    alignItems: 'center', //align items according to this parent (like setting self align on each item)
    justifyContent: 'center'
  },
  titleText: {
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(w,h,27),
    fontFamily: 'Whitney Semibold',
    color: Colors.mainTextColor,
    textAlign: 'center',
  },

  descriptionContainerVer:{
    flex:0.55, //height (according to its parent)
    flexDirection: 'row', //its children will be in a row
    backgroundColor: Colors.transparentColor,
    justifyContent: 'center'
    // alignSelf: 'center',
  },
  descriptionContainerHor:{
    width: w*0.76,
    flexDirection: 'column',    //its children will be in a column
    // backgroundColor: 'blue',
    alignItems: 'center', //align items according to this parent (like setting self align on each item)
    justifyContent: 'space-around',
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney Book', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    // fontWeight: 'bold',
    fontSize: getCorrectFontSizeForScreen(w,h,17),
    color: Colors.mainTextColor,
    textAlign: 'center',

  },
  descriptionText2: {
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: getCorrectFontSizeForScreen(w,h,16),
    color: Colors.mainTextColor,
    textAlign: 'center'
  },



  btnContainer:{
    flex:0.45,
    // backgroundColor: 'red',
    justifyContent: 'flex-end'
  },

  btn: {
    height:60,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 13,
  },
  whiteBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,16),
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
    height: null
  },
  container: {
    // backgroundColor: 'orange',
    flex:1,
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal:10
  },

  explanContainer:{
    // backgroundColor: 'black',
    flex:0.62,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  logoImgContainer:{
    // backgroundColor: 'red',
    flex:0.3,
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

  titleTextContainerVer:{
    flex:0.2, //height (according to its parent)
    flexDirection: 'row', //its children will be in a row
    backgroundColor: Colors.transparentColor,
    justifyContent: 'center'
    // alignSelf: 'center',
  },

  titleTextContainerHor:{
    width: 574,
    flexDirection: 'column',    //its children will be in a column
    // backgroundColor: 'blue',
    alignItems: 'center', //align items according to this parent (like setting self align on each item)
    justifyContent: 'center'
  },
  titleText: {
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(w,h,27),
    color: Colors.mainTextColor,
    textAlign: 'center',
  },

  descriptionContainerVer:{
    flex:0.55, //height (according to its parent)
    flexDirection: 'row', //its children will be in a row
    backgroundColor: Colors.transparentColor,
    justifyContent: 'center'
    // alignSelf: 'center',
  },
  descriptionContainerHor:{
    width: 510,
    flexDirection: 'column',    //its children will be in a column
    // backgroundColor: 'blue',
    alignItems: 'center', //align items according to this parent (like setting self align on each item)
    justifyContent: 'space-around',
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontSize: getCorrectFontSizeForScreen(w,h,17),
    color: Colors.mainTextColor,
    textAlign: 'center',

  },
  descriptionText2: {
    backgroundColor: Colors.transparentColor,
    fontSize: getCorrectFontSizeForScreen(w,h,14),
    color: Colors.mainTextColor,
    textAlign: 'center'
  },



  btnContainer:{
    flex:0.45,
    flexDirection:'column',
    // backgroundColor: 'red'
  },

  btn: {
    height:36,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical:0
  },
  whiteBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center'
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
