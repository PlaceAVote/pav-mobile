/**
 * # AnimatedLine.js
 *@flow
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, View, Platform, Animated, Text} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation



const MAX_LINE_WIDTH = w*.81;

const styles = StyleSheet.create({

  lineContainer:{
    width:w,
    alignItems:'center',
    position:'absolute',
    // backgroundColor:'pink',
    paddingTop: h*0.467,
  },
  line:{
    backgroundColor:Colors.alternativeAccentColor,
    borderRadius:2.6,
    height:6,
  }



});



class AnimatedLine extends React.Component {
  constructor(props) {
    super(props);


    this._widthInterpolationObj = {
      inputRange: [0, w*1, w*2], //i.e [375, 750, 1500]
      outputRange: [0, MAX_LINE_WIDTH, MAX_LINE_WIDTH],
    };

    this._opacityInterpolationObj = {
      inputRange: [0, w*1, w*2], //i.e [375, 750, 1500]
      outputRange: [0, 1, 1],
    }
  }


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    // console.log("@@: "+this.props.scrollAnim.getValue());
    return(
      <View style={styles.lineContainer}>
       <Animated.View style={[ styles.line,
         {
           width: this.props.scrollAnim.interpolate(this._widthInterpolationObj),
           opacity: this.props.scrollAnim.interpolate(this._opacityInterpolationObj)
         }]
       }/>
      </View>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.scrollAnim !== this.props.scrollAnim);
  }
}


AnimatedLine.propTypes= {
  scrollAnim: React.PropTypes.any.isRequired,
};
export default AnimatedLine;
