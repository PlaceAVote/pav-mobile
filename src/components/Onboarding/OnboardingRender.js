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
  REGISTER_STEP_1,
  FORGOT_PASSWORD
} = ActionNames;



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
    backgroundColor: Colors.transparentColor,
    fontSize: 27,
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 41,
    marginTop: 20,
    marginBottom: 13,
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontSize: 17,
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 60,
    marginTop: 13,
    marginBottom: 13
  },
  descriptionText2: {
    backgroundColor: Colors.transparentColor,
    fontSize: 16,
    color: Colors.mainTextColor,
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
/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
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
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(OnboardingRender);
