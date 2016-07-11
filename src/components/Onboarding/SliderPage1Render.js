//@flow
/**
 * # SliderPage1Render.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';




import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Platform, Image} from 'react-native';

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

import logoWhiteImg from '../../../assets/pavLogoWhiteHQ.png';


const styles = StyleSheet.create({
  container:{
    flex:1,
    // paddingHorizontal: w*0.07,
    paddingTop: h*0.32,
    paddingHorizontal: w*0.10,
    // backgroundColor:'pink',
    justifyContent:'space-around',
    marginBottom: 50,
  },



  titleTextContainer:{
    backgroundColor: Colors.transparentColor,
    // paddingVertical:h*0.04,
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
    // paddingVertical:h*0.04,
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
    // paddingVertical:h*0.04,
    // justifyContent: 'center'
  },
  description2Text: {
    // width: w*0.86,
    // backgroundColor: 'black',
    fontSize: getCorrectFontSizeForScreen(12),
    fontFamily: 'Whitney-SemiBold',
    color: Colors.mainTextColor,
    // textAlign: 'center',
  },

});







class SliderPage1Render extends React.Component {
  constructor(props) {
    super(props);

  }







  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    return(
      <View style={styles.container}>



        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText} >
          Welcome to Placeavote
          </Text>
        </View>

        <View style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText} >
          A nonpartisan platform that gives you the opportunity to read, debate, and vote on every bill that is presented before Congress.
          </Text>
        </View>

        <View style={styles.description2TextContainer}>
          <Text style={styles.description2Text}>
          Be loud. Be heard. Be represented.
          </Text>
        </View>

      </View>
    );
  }
}



export default SliderPage1Render;
