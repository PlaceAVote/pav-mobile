/* @flow */
/**
 * # ExpandableText.js
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

import Collapsible from 'react-native-collapsible'

const styles=StyleSheet.create({

  //Birthday
  container:{
    // paddingVertical:h*0.007,
    // backgroundColor:'#F2FF5F55'
  },
  titleContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor: Colors.titleBgColorDark,
    borderBottomColor: "rgba(0, 0, 0, 0.07)",
    borderBottomWidth: 1,
    paddingHorizontal: w*0.020,
    paddingVertical: h*0.025,
  },

  titleText:{
    width: w*0.60,
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  titleExplanTextContainer:{
    flexDirection:'row'
  },
  titleExplanText:{
    color: Colors.secondaryTextColor,
    fontFamily: 'Whitney-Light',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  titleExplanIcon:{
    paddingHorizontal: w*0.010,
    color: Colors.secondaryTextColor,
  },
  valueTextContainer:{
    padding: w*0.010,
  },
  valueText:{
    color: Colors.fifthTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
    lineHeight: (h*0.025) | 0,  // | 0 converts the float to an int because otherwise we get this bug https://github.com/facebook/react-native/issues/7877
  }



});



class ExpandableText extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isVisible: false,
    }
  }





  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleContainer}  onPress={()=>this.setState({isVisible:!this.state.isVisible})}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
          <View style={styles.titleExplanTextContainer}>
            <Text style={styles.titleExplanText}>{(this.state.isVisible===false)?"(Tap to expand)":"(Tap to shrink)"}</Text>
            <PavIcon name={(this.state.isVisible===false)?"arrow-down":"arrow-up"} size={15} style={styles.titleExplanIcon}/>
          </View>
        </TouchableOpacity>
        <Collapsible
        collapsed={(this.state.isVisible===false)}
        align="center"
        >
          <View style={styles.valueTextContainer}>
            <Text style={styles.valueText}>{this.props.value}</Text>
          </View>

        </Collapsible>
      </View>
    );
  }



}



ExpandableText.propTypes= {
  title:React.PropTypes.string.isRequired,
  value:React.PropTypes.string,
};
export default ExpandableText;
