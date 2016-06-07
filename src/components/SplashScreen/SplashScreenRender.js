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
        justifyContent:'center',
        // backgroundColor: '#E8E7EE',
        // marginVertical: 10,
        // marginHorizontal:15
      },
      pavLogoContainer:{
        flex:1,
        // paddingVertical:h*0.08,
        justifyContent:'space-between',
        // backgroundColor: "pink",
      },
      loadingTextContainer:{
        backgroundColor:Colors.transparentColor,
        paddingVertical:h*0.02,
      },
      loadingText:{
        fontSize: getCorrectFontSizeForScreen(w,h,15),
        color: Colors.mainTextColor,
        fontFamily: 'Whitney-Book',
        textAlign: 'center',
      },
      logoAnimation:{
        // backgroundColor: "pink",
      },


      titleTextContainer:{
        justifyContent:'center',
        paddingVertical:h*0.14,
        backgroundColor:Colors.transparentColor
        // backgroundColor:'red'
      },
      titleText: {
        // backgroundColor: 'black',
        fontSize: getCorrectFontSizeForScreen(w,h,49),
        color: Colors.mainTextColor,
        fontFamily: 'Whitney-Bold',
        textAlign: 'center',
      },

      // accountSettingsText:{
      //   color: Colors.primaryColor,
      //   textAlign: 'left',
      //   fontFamily: 'Whitney',
      //   fontSize: getCorrectFontSizeForScreen(w,h,10),
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
    console.log("pavLogoHq: "+(typeof pavLogoHq) );
    return(
      <LinearGradient
        colors={['#4D6EB2', '#6B55A2']}
        start={[0.0, 0.0]} end={[0.6, 0.5]}
        style={styles.container}
      >
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>placeavote</Text>
        </View>
        <View style={styles.pavLogoContainer}>
          <AnimatedPavLogo style={styles.logoAnimation}/>
          <View style={styles.loadingTextContainer}>
            <Text style={styles.loadingText}>Now Loading...</Text>
          </View>
        </View>

      </LinearGradient>
    );
  }

}


export default SplashScreenRender;
