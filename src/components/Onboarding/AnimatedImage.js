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




const styles = StyleSheet.create({

  pavLogoImgContainer:{
    width:w,
    alignItems:'center',
    position:'absolute',
    // backgroundColor:'pink',
    paddingTop: h*0.07,
  },




});






class AnimatedImage extends React.Component {
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
      <View style={styles.pavLogoImgContainer}>
       <Animated.Image style={
         {
           width: this.props.scrollAnim.interpolate({
             inputRange: [0, w*1, w*2], //i.e [375, 750, 1500]
             outputRange: [w*.37, w*.15, w*.15] //i.e [w*0.37, w*0.15, w*0.15]
           }),
           height: this.props.scrollAnim.interpolate({
             inputRange: [0, w*1, w*2], //i.e [375, 750, 1500]
             outputRange: [w*.37, w*.15, w*.15] //i.e [w*0.37, w*0.15, w*0.15]
           }),

           // transform: [{scaleX: this.state.curLine1Width}]
         }
       } resizeMode= 'contain' source={logoWhiteImg}/>
      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.scrollAnim !== this.props.scrollAnim);
  }
}


AnimatedImage.propTypes= {
  scrollAnim: React.PropTypes.any.isRequired,

};
export default AnimatedImage;
