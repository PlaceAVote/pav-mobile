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
      inputRange: [0, 1],
      outputRange: [0, MAX_LINE_WIDTH]
    };

  }


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    // console.log("@@: "+this.props.scrollAnim.getValue());
    return(
      <View style={styles.lineContainer}>
       <Animated.View onLayout={(e)=>this.props.onLineDrawn(e.nativeEvent.layout.y)} style={[ styles.line, (this.props.position===0)?{
           width: this.props.scrollAnim.interpolate(this._widthInterpolationObj),
           opacity: this.props.scrollAnim
         }:{width:MAX_LINE_WIDTH, opacity:1}]
       }/>
      </View>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.scrollAnim !== this.props.scrollAnim)
      ||
      (nextProps.position !== this.props.position)
    );
  }
}


AnimatedLine.propTypes= {
  scrollAnim: React.PropTypes.any.isRequired,
  position: React.PropTypes.number.isRequired,
  onLineDrawn : React.PropTypes.func.isRequired,
};
export default AnimatedLine;
