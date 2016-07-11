//@flow
/**
 * # SliderPage3Render.js
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


import headerInterestsImg from '../../../assets/interests2.png';


const IMG_WIDTH_P = w*0.8, IMG_HEIGHT_P = IMG_WIDTH_P/2.2;
const IMG_WIDTH_L = h*0.8, IMG_HEIGHT_L = IMG_WIDTH_L/2;

const styles = StyleSheet.create({
  container:{
    // paddingHorizontal: w*0.07,
    paddingHorizontal: w*0.10,
    // backgroundColor:'pink'
    // backgroundColor:'purple',
  },

  headerInterestsImgContainer:{
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







class SliderPage3Render extends React.Component {
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
          <Image style={this.props.isPortrait===true?{width: IMG_WIDTH_P, height: IMG_HEIGHT_P}:{width: IMG_WIDTH_L, height: IMG_HEIGHT_L}} resizeMode= 'contain' source={headerInterestsImg}></Image>
        </View>

        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText} >
          Debate on Issues
          </Text>
        </View>

        <View style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText} >
          Talk about why an issue matters to you, and let people know your stance on a subject. Invite your fellow district members to take part, and start improving representation in America.
          </Text>
        </View>


      </View>
    );
  }
}


SliderPage3Render.propTypes= {
  isPortrait: React.PropTypes.bool.isRequired,
};
export default SliderPage3Render;
