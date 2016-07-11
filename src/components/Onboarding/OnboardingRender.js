/**
 * # OnboardingRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';


import SliderPage1Render from './SliderPage1Render';
import SliderPage2Render from './SliderPage2Render';

/*A react native button*/
import Button from 'sp-react-native-iconbutton';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'

import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Platform, StatusBar} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
// import pavBG from '../../../assets/pavBG.jpg';


/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;





const FOOTER_BTN_CONTAINER_HEIGHT = 55;

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  swiper:{
    // backgroundColor:'red'
  },
  dot:{
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inactiveDot:{
    backgroundColor:'rgba(255,255,255,.2)',
  },
  activeDot:{
    backgroundColor: 'white',
  },
  nextPrevBtn:{
    fontSize: 50,
    color: 'rgba(255,255,255,.5)',
    fontFamily: 'Arial',
  },
  footerContainer:{
    height:FOOTER_BTN_CONTAINER_HEIGHT,
    justifyContent:'center',
    flexDirection:'row',
  },
  signInBtn:{
    flex:1,
    height:FOOTER_BTN_CONTAINER_HEIGHT,
    borderRadius:0,
    backgroundColor: Colors.primaryColor,
    borderWidth: 0,
  },
  registerBtn:{
    flex:1,
    height:FOOTER_BTN_CONTAINER_HEIGHT,
    borderRadius:0,
    backgroundColor: Colors.alernativeAccentColor,
    borderWidth: 0,
  },
  footerBtnText:{
    backgroundColor:Colors.transparentColor,
    color: Colors.mainTextColor,
    fontSize: getCorrectFontSizeForScreen(14),
    fontFamily: 'Whitney-SemiBold',
  },



});






class OnboardingRender extends React.Component {
  constructor(props) {
    super(props);

  }



  renderFooter(){
    return (
      <View style={styles.footerContainer}>
        <Button
        onPress={this.props.onSignInBtnPress}
        isDisabled={this.props.isFetchingAuth}
        style={styles.signInBtn}
        textStyle={styles.footerBtnText}>
        Sign In
        </Button>
        <Button
        onPress={this.props.onSignUpBtnPress}
        isDisabled={this.props.isFetchingAuth}
        style={styles.registerBtn}
        textStyle={styles.footerBtnText}>
        Register
        </Button>

      </View>
    )
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

           <Swiper
           style={styles.swiper}
           height={h-FOOTER_BTN_CONTAINER_HEIGHT}
           showsButtons={true}
           dot={<View style={[styles.dot, styles.inactiveDot]}/>}
           activeDot={<View style={[styles.dot, styles.activeDot]}/>}
           nextButton={<Text style={styles.nextPrevBtn}>›</Text>}
           prevButton={<Text style={styles.nextPrevBtn}>‹</Text>}
           >

             <SliderPage1Render/>
             <SliderPage2Render/>
             
             <View style={styles.slide3}>
               <Text style={styles.text}>And simple</Text>
             </View>
           </Swiper>
           {this.renderFooter()}

      </LinearGradient>
    );
  }
}



OnboardingRender.propTypes= {
  isFetchingAuth: React.PropTypes.bool,
  onSignUpBtnPress:React.PropTypes.func.isRequired,
  onSignInBtnPressed:React.PropTypes.func.isRequired,

};

export default OnboardingRender;
