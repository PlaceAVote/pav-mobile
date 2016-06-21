/* @flow */
/**
 * # TouchableInput.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';


import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);



const styles=StyleSheet.create({

  //Birthday
  inputContainer:{
    paddingVertical:h*0.007,
    // backgroundColor:'#F2FF5F55'
  },
  inputValueContainer:{
    paddingHorizontal: w*0.018,
    paddingVertical: h*0.008,
    borderWidth:1,
    borderRadius:1,
    borderColor: Colors.mainBorderColor
  },
  inputLabelContainer:{
    // backgroundColor:'orange',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  inputDropdownIcon:{
    color: Colors.secondaryTextColor,
  },
  inputTitleTextContainer:{
    paddingVertical: h*0.004,
  },
  inputTitleText:{
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: getCorrectFontSizeForScreen(w,h,10),
    color: Colors.fourthTextColor,
  },
  inputValueText:{
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: getCorrectFontSizeForScreen(w,h,9),
    color: Colors.secondaryTextColor,
  }



});



class TouchableInput extends React.Component {
  constructor(props) {
    super(props);
  }





  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    return(
      <View style={styles.inputContainer}>
        <View style={styles.inputTitleTextContainer}>
          <Text style={styles.inputTitleText}>{this.props.title}</Text>
        </View>
        <View style={styles.inputValueContainer}>
          <TouchableOpacity style={styles.inputLabelContainer} onPress={this.props.onTap}>
            <Text style={styles.inputValueText}>{this.props.value}</Text>
            <PavIcon name="arrow-down" size={15} style={styles.inputDropdownIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



}



TouchableInput.propTypes= {
  title:React.PropTypes.string.isRequired,
  value:React.PropTypes.string,
  onTap: React.PropTypes.func.isRequired,
};
export default TouchableInput;
