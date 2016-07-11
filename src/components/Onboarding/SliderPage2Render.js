//@flow
/**
 * # SliderPage2Render.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';




import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Platform, Image} from 'react-native';

import {getCorrectFontSizeForScreen, updateScreenSizesByOrientation} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
// import pavBG from '../../../assets/pavBG.jpg';
/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;


import headerInterestsImg from '../../../assets/interests.png';

const IMG_WIDTH_P = w*0.8, IMG_HEIGHT_P = IMG_WIDTH_P/2;
const IMG_WIDTH_L = h*0.8, IMG_HEIGHT_L = IMG_WIDTH_L/2;


const styles = StyleSheet.create({
  container:{
    // flex:1,
    // paddingHorizontal: w*0.07,
    // paddingTop: h*0.32,
    paddingHorizontal: w*0.10,
    // backgroundColor:'purple',
    // justifyContent:'space-around',
    // marginBottom: 50,
  },

  headerInterestsImgContainer:{
    // backgroundColor:'pink',
    alignItems:'center',

  },


  titleTextContainer:{
    backgroundColor: Colors.transparentColor,
    paddingTop:h*0.04,
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
    paddingVertical:h*0.02,
    // justifyContent: 'center'
  },
  descriptionText: {
    // width: w*0.86,
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(11),
    fontFamily: 'Whitney-Light',
    color: Colors.mainTextColor,
    // textAlign: 'center',
  },


});






class SliderPage2Render extends React.Component {
  constructor(props) {
    super(props);

  }







  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    return(
      <View style={[styles.container, {paddingTop: this.props.lineYOffset-(this.props.isPortrait===true?IMG_HEIGHT_P:IMG_HEIGHT_L)}]}>

        <View style={styles.headerInterestsImgContainer}>
          <Image style={[this.props.isPortrait===true?{width: IMG_WIDTH_P, height: IMG_HEIGHT_P}:{width: IMG_WIDTH_L, height: IMG_HEIGHT_L}]} resizeMode= 'contain' source={headerInterestsImg}></Image>
        </View>

        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText} >
          Discover New Bills
          </Text>
        </View>

        <View style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText} >
          We make legislation easy to understand, we break down each issue and remain non-partisan so you only get the facts from us.
          </Text>
        </View>


      </View>
    );
  }
}


SliderPage2Render.propTypes= {
  isPortrait: React.PropTypes.bool.isRequired,
  lineYOffset: React.PropTypes.number.isRequired,
};
export default SliderPage2Render;
