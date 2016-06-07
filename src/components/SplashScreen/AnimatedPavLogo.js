/* @flow */
/**
 * # AnimatedPavLogo.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import PavSpinner from '../../lib/UI/PavSpinner'


import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, View,Animated, Platform, Easing} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import pavLogoHq from '../../../assets/pavLogoWhiteHQ.png';



const ANIMATION_PARTS = 8;  //that we will divide the 360 deegrees with
const ANIMATION_DURATION = 190; //in millisec
const PAUSE_DURATION = 140; //in millisec


class AnimatedPavLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      animationPart: 1,
      shouldStop: false
    };
  }













  animate(){
    if(this.state.shouldStop===false){
      Animated.timing(       // Uses easing functions
        this.state.animation, // The value to drive
        {
          toValue: this.state.animationPart/ANIMATION_PARTS,        // Target
          duration: ANIMATION_DURATION,    // Configuration
          delay:PAUSE_DURATION,
          easing: Easing.ease
        },
      ).start(
        ()=>{
          let newAnimationPart = this.state.animationPart+1;
          this.setState({
            animationPart: newAnimationPart
          })
          this.animate();
        }
      );             // Don't forget start!
    }
  }

  startAnimating(){
    this.setState({
      shouldStop: false
    })
  }
  stopAnimating(){
    this.setState({
      shouldStop: true
    })
  }

  componentDidMount() {
    this.animate();
  }


  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({

      container:{
        alignItems:'center',
        padding: h*0.019,
        // backgroundColor: "pink",
      },
      pavLogoImg:{
        width:h*0.15,
        height:h*0.15
      }

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

      container:{

        // backgroundColor: "pink",
      }

    });
  }




  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View style={[styles.container, this.props.style]}>
        <Animated.Image
          style={[styles.pavLogoImg,
          {
            transform: [   // Array order matters
              {rotate:this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  '0deg', '360deg' // 'deg' or 'rad'
                ],
              })},
            ]
            // transform: [{scaleX: this.state.curLine1Width}]
          }]}
          source={pavLogoHq}
          resizeMode='contain'
        />
      </View>
    );
  }

}


export default AnimatedPavLogo;
