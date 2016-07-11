/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



/**
 * Immutable
 */


/*A react native button*/
// import Button from 'sp-react-native-iconbutton';
import Button from 'sp-react-native-iconbutton';
import LinearGradient from 'react-native-linear-gradient';

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

import logoWhiteImg from '../../../assets/pavLogoWhiteHQ.png';




const styles = StyleSheet.create({
  container:{
    flex:1,
  },


});

const page1Styles = StyleSheet.create({
  container:{
    paddingHorizontal: w*0.07,
    alignItems:'center',
    backgroundColor:'pink'
  },

  pavLogoImgContainer:{
    alignItems:'center',
    paddingVertical:h*0.04,
    // backgroundColor:'pink'
  },
  pavLogoImg:{
    width: w*0.37,
    height: w*0.37,
  },

  titleTextContainer:{
    backgroundColor: Colors.transparentColor,
    paddingVertical:h*0.04,
    // justifyContent: 'center'
  },
  titleText: {
    // width: w*0.86,
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(23),
    fontFamily: 'Whitney-SemiBold',
    color: Colors.mainTextColor,
    // textAlign: 'center',
  },

  descriptionTextContainer:{
    backgroundColor: Colors.transparentColor,
    paddingVertical:h*0.04,
    // justifyContent: 'center'
  },
  descriptionText: {
    // width: w*0.86,
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(12),
    fontFamily: 'Whitney-Light',
    color: Colors.mainTextColor,
    // textAlign: 'center',
  },

  description2TextContainer:{
    backgroundColor: Colors.transparentColor,
    paddingVertical:h*0.04,
    // justifyContent: 'center'
  },
  description2Text: {
    // width: w*0.86,
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(10),
    fontFamily: 'Whitney-SemiBold',
    color: Colors.mainTextColor,
    // textAlign: 'center',
  },

});







class OnboardingRender extends React.Component {
  constructor(props) {
    super(props);

  }






  renderPage1(){
    return (
      <View style={page1Styles.container}>

        <View style={page1Styles.pavLogoImgContainer}>
          <Image style={page1Styles.pavLogoImg} resizeMode= 'contain' source={logoWhiteImg}></Image>
        </View>

        <View style={page1Styles.titleTextContainer}>
          <Text style={page1Styles.titleText} >
          Welcome to Placeavote
          </Text>
        </View>

        <View style={page1Styles.descriptionTextContainer}>
          <Text style={page1Styles.descriptionText} >
          A nonpartisan platform that gives you the opportunity to read, debate, and vote on every bill that is presented before Congress.
          </Text>
        </View>

        <View style={page1Styles.description2TextContainer}>
          <Text style={page1Styles.description2Text}>
          Be loud. Be heard. Be represented.
          </Text>
        </View>

      </View>
    )
  }

  renderPage2(){

  }

  renderPage3(){

  }



  renderBody(){

  }


  renderFooter(){

  }





  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // let styles= isPortrait?portraitStyles:landscapeStyles;
    return(
      <LinearGradient
              colors={['#4D6EB2', '#6B55A2']}
              start={[-0.3, 0.0]} end={[1.3, 0.0]}
              style={styles.container}>
          <StatusBar
              backgroundColor="#4A5E83"
              translucent={false}
              barStyle="light-content"
           />
           {this.renderPage1()}

      </LinearGradient>
    );
  }
}



{/*<Button
onPress={this.props.onSignUpBtnPress}
isDisabled={this.props.auth.form.isFetching}
style={[styles.emailBtn, styles.btn]}
textStyle={styles.whiteBtnText}>
Signup with email
</Button>*/}


// /**
//  * ## Styles
//  */
// var portraitStyles = StyleSheet.create({
//
//   backgroundImg: {
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     width: w,
//     height: h,
//     paddingVertical: w*0.05,
//   },
//   container: {
//     // backgroundColor: 'orange',
//     flex:1,
//     flexDirection: 'column',
//     paddingHorizontal: w*0.05,
//   },
//
//
//
//
//
//
//   explanContainer:{ //child A
//     // backgroundColor: 'black',
//     flex:1,
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     paddingBottom: w*0.02,
//     paddingVertical: h*0.005,
//   },
//
//   logoImgContainer:{    //child A1
//     // backgroundColor: 'red',
//     width: w,
//     flexDirection: 'column',
//     alignSelf: 'center',
//     justifyContent: 'flex-end'
//   },
//   logoImg:{
//     marginVertical: 7,
//     alignSelf: 'center',
//     // backgroundColor: 'blue',
//     width: w*0.55,
//     height:h*0.05
//   },
//
//   titleTextContainerVer:{ //child A2
//     flexDirection: 'row', //its children will be in a row
//     // backgroundColor:'red',
//     backgroundColor: Colors.transparentColor,
//     justifyContent: 'center'
//     // alignSelf: 'center',
//   },
//
//   titleText: {
//     width: w*0.86,
//     // backgroundColor: 'black',
//     fontSize: getCorrectFontSizeForScreen(24),
//     fontFamily: 'Whitney-SemiBold',
//     color: Colors.mainTextColor,
//     textAlign: 'center',
//   },
//
//   descriptionContainerVer:{ //child A3 and A4
//     flexDirection: 'row', //its children will be in a row
//     backgroundColor: Colors.transparentColor,
//     // backgroundColor:'pink',
//     justifyContent: 'center',
//     // alignSelf: 'center',
//   },
//   descriptionContainerHor:{
//     width: w*0.76,
//     flexDirection: 'column',    //its children will be in a column
//     backgroundColor: 'blue',
//     alignItems: 'center', //align items according to this parent (like setting self align on each item)
//     justifyContent: 'space-around',
//   },
//   descriptionText: {
//     backgroundColor: Colors.transparentColor,
//     fontFamily: 'Whitney-Regular', //Whitney, Whitney Book, Whitney-Light, Whitney-SemiBold, Whitney
//     // fontWeight: 'bold',
//     width: w*0.90,
//     fontSize: getCorrectFontSizeForScreen(13),
//     color: Colors.mainTextColor,
//     textAlign: 'center',
//
//   },
//
//
//
//
//
//
//
//
//   btnContainer:{  //Child B
//     // backgroundColor: 'red',
//     paddingTop: h*0.035,
//     paddingBottom: h*0.060,
//     justifyContent: 'flex-end'
//   },
//
//   btn: {
//     height:60,
//     borderRadius: 4,
//     borderWidth: 1,
//     marginVertical: h*0.005,
//   },
//   whiteBtnText:{
//     color: Colors.mainTextColor,
//     textAlign: 'center',
//     fontFamily: 'Whitney-Regular',
//     fontSize: getCorrectFontSizeForScreen(13),
//   },
//   facebookBtn:{
//     backgroundColor: Colors.secondaryColor,
//     borderColor: Colors.mainBorderColor
//   },
//   emailBtn:{
//     backgroundColor: Colors.accentColor,
//     borderColor: Colors.mainBorderColor
//
//   },
//   signInBtn:{
//     backgroundColor: Colors.transparentColor,
//     borderColor: Colors.mainTextColor
//   },
//
//   iconStyle:{
//     marginHorizontal: 10
//   }
//
// });





// /**
//  * ## Styles
//  */
// var landscapeStyles = StyleSheet.create({
//
//   backgroundImg: {
//     flex:1,
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     width: null,
//     height: null,
//     paddingVertical: w*0.05,
//   },
//   container: {
//     // backgroundColor: 'orange',
//     flex:1,
//     flexDirection: 'column',
//     paddingHorizontal: w*0.05,
//     justifyContent:'flex-end',
//   },
//
//   explanContainer:{ //child A
//     // backgroundColor: 'black',
//     paddingVertical: w*0.05,
//     flexDirection: 'column',
//     justifyContent: 'flex-end'
//   },
//
//   logoImgContainer:{  //child A1
//     // backgroundColor: 'red',
//     flexDirection: 'row',
//     alignSelf: 'center',
//     justifyContent: 'flex-end'
//   },
//   logoImg:{
//     marginVertical: 7,
//     alignSelf: 'center',
//     // backgroundColor: 'blue',
//     width: w*0.90,
//     height:h*0.08
//   },
//
//   titleTextContainerVer:{  //child A2
//     flexDirection: 'row', //its children will be in a row
//     backgroundColor: Colors.transparentColor,
//     justifyContent: 'center',
//     paddingVertical: w*0.02,
//     // alignSelf: 'center',
//   },
//
//   titleText: {
//     width: h*0.80,
//     // backgroundColor: 'black',
//     fontFamily: 'Whitney-Bold',
//     fontSize: getCorrectFontSizeForScreen(23),
//     color: Colors.mainTextColor,
//     textAlign: 'center',
//   },
//
//   descriptionContainerVer:{   //child A3
//     flexDirection: 'row', //its children will be in a row
//     backgroundColor: Colors.transparentColor,
//     justifyContent: 'center',
//     paddingVertical: w*0.014,
//     // alignSelf: 'center',
//   },
//
//   descriptionText: {
//     width: h*0.90,
//     backgroundColor: Colors.transparentColor,
//     fontFamily: 'Whitney-Regular',
//     fontSize: getCorrectFontSizeForScreen(14),
//     color: Colors.mainTextColor,
//     textAlign: 'center',
//
//   },
//
//
//
//
//   btnContainer:{  //Child B
//     flexDirection:'column',
//     // backgroundColor: 'red',
//     // paddingVertical: h*0.015,
//     justifyContent: 'flex-end'
//   },
//
//   btn: {
//     alignSelf:'center',
//     height:36,
//     width:h*0.5,
//     borderRadius: 4,
//     borderWidth: 1,
//     marginVertical: w*0.01,
//     // backgroundColor:'pink'
//   },
//   whiteBtnText:{
//     color: Colors.mainTextColor,
//     textAlign: 'center',
//     fontFamily: 'Whitney-Regular',
//     fontSize: getCorrectFontSizeForScreen(12),
//   },
//   facebookBtn:{
//     backgroundColor: Colors.secondaryColor,
//     borderColor: Colors.mainBorderColor
//   },
//   emailBtn:{
//     backgroundColor: Colors.accentColor,
//     borderColor: Colors.mainBorderColor
//
//   },
//   signInBtn:{
//     backgroundColor: Colors.transparentColor,
//     borderColor: Colors.mainTextColor
//   },
//
//   iconStyle:{
//   }
//
// });





//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default OnboardingRender;
