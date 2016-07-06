/* @flow */
/**
 * # SplashScreenRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';


import LinearGradient from 'react-native-linear-gradient';

import PavSpinner from '../../lib/UI/PavSpinner'


import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';

// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import AnimatedPavLogo from './AnimatedPavLogo';













class SplashScreenRender extends React.Component {
  constructor(props) {
    super(props);
  }



  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        // backgroundColor: '#E8E7EE',
        // marginVertical: 10,
        // marginHorizontal:15
      },
      pavLogoContainer:{
        // flex:1,
        // paddingVertical:h*0.08,
        justifyContent:'flex-start',
        // backgroundColor: "pink",
      },
      logoAnimation:{
        // backgroundColor: "purple",
        paddingVertical:h*0.08,
      },


      titleTextContainer:{
        justifyContent:'center',
        paddingVertical:h*0.14,
        backgroundColor:Colors.transparentColor
        // backgroundColor:'red'
      },
      titleText: {
        // backgroundColor: 'black',
        fontSize: getCorrectFontSizeForScreen(31),
        color: Colors.mainTextColor,
        fontFamily: 'Whitney-Bold',
        textAlign: 'center',
      },

      // accountSettingsText:{
      //   color: Colors.primaryColor,
      //   textAlign: 'left',
      //   fontFamily: 'Whitney',
      //   fontSize: getCorrectFontSizeForScreen(10),
      // }

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

      container: {
        backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal:10
      },



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
    // '#4D6EB2',

    return(
      <LinearGradient
        colors={[ '#4F518E',  '#445A94']}
        start={[0.5, 0.0]} end={[0.5, 1.0]}
        style={styles.container}
      >
        <View style={styles.pavLogoContainer}>
          <AnimatedPavLogo style={styles.logoAnimation} ref='pavAnimatedLogo'/>
        </View>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>placeavote</Text>
        </View>

      </LinearGradient>
    );
  }

  componentDidMount(){
    this.refs.pavAnimatedLogo.startAnimating();
  }
  componentWillUnmount(){
    this.refs.pavAnimatedLogo.stopAnimating();
  }

}


export default SplashScreenRender;
