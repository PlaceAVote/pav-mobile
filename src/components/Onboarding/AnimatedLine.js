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



const MAX_LINE_WIDTH = w*.76;

const styles = StyleSheet.create({

  lineContainer:{
    width:w,
    alignItems:'center',
    position:'absolute',
    // backgroundColor:'pink',
    paddingTop: h*0.47,
  },
  line:{
    backgroundColor:Colors.alternativeAccentColor,
    borderRadius:4,
    height:7,
  }



});






class AnimatedLine extends React.Component {
  constructor(props) {
    super(props);

  }


// onMomentumScrollBegin={this.onMomentumScrollBegin.bind(this)}

  // transform: [{
  //    translateY: this.state.fadeAnim.interpolate({
  //      inputRange: [0, 1],
  //      outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
  //    }),
  //  }],

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
           width: this.props.scrollAnim.interpolate({
             inputRange: [0, w*1, w*2], //i.e [375, 750, 1500]
             outputRange: [0, MAX_LINE_WIDTH, MAX_LINE_WIDTH],
           }),

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
