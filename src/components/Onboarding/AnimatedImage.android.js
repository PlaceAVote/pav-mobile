/**
 * # AnimatedImage.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, View, Platform, Animated} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import logoWhiteImg from '../../../assets/pavLogoWhiteHQ.png';



const IMG_SIZE_BIG_P = w*.37,
  IMG_SIZE_SMALL_P = w*.15,
  IMG_SIZE_BIG_L = w*.15,
  IMG_SIZE_SMALL_L = w*.07;


const styles = StyleSheet.create({

  pavLogoImgContainer:{
    width:w,
    position:'absolute',
    // backgroundColor:'pink',
    paddingTop: h*0.07,
  },




});






class AnimatedImage extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let bigImgSize = this.props.isPortrait===true?IMG_SIZE_BIG_P:IMG_SIZE_BIG_L;
    let smallImgSize = this.props.isPortrait===true?IMG_SIZE_SMALL_P:IMG_SIZE_SMALL_L;
    this._sizeInterpolateObj = {
      inputRange: [0, 1],
      outputRange: [bigImgSize, smallImgSize]
    };
    return(
      <View style={[styles.pavLogoImgContainer,
      this.props.isPortrait===true?{
          //Portrait style
          alignItems:'center'
        }:{
          //Landscape style
          alignItems:'flex-start',
          paddingHorizontal: w*0.10,
      }
    ]}>
       <Animated.Image style={(this.props.position===0)?
         {
           width: this.props.scrollAnim.interpolate(this._sizeInterpolateObj),
           height: this.props.scrollAnim.interpolate(this._sizeInterpolateObj)
         }:{
           width:smallImgSize,
           height:smallImgSize
         }
       } resizeMode= 'contain' source={logoWhiteImg}/>
      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.scrollAnim !== this.props.scrollAnim)
      ||
      (nextProps.isPortrait !== this.props.isPortrait)
      ||
      (nextProps.position !== this.props.position)
    );
  }
}


AnimatedImage.propTypes= {
  scrollAnim: React.PropTypes.any.isRequired,
  isPortrait: React.PropTypes.bool.isRequired,
  position: React.PropTypes.number.isRequired,
};
export default AnimatedImage;
