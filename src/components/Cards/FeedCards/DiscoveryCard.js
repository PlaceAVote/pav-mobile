/* @flow weak */
/**
 * # DiscoveryCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys} from '../../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, Image} from 'react-native';
import {toTitleCase} from '../../../lib/Utils/genericUtils'
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'
// import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';
import congratsScreenPhoto from '../../../../assets/congratsScreen.png';


const PADDING_HOR = w*0.022;  //Same as the DiscoveryFeedRender styles.trendingTitleContainer style
const IMAGE_WIDTH = w*0.45;

const styles = StyleSheet.create({

  cardContainer:{
    // flex: 1,
    // backgroundColor: 'blue',
    // borderRadius:5,
    // overflow: 'hidden',
    // borderRadius:18,
    // borderWidth:4,
  },

  ...Platform.select({
    ios:{
      billImage:{
        // overflow: 'hidden',
        // borderWidth:4,
        // borderColor:Colors.transparentColor,
        width: IMAGE_WIDTH,
        height: w*0.28,
        justifyContent:'center',
        borderWidth:1,
        borderColor: Colors.mainBorderColor,
        borderRadius:3,
      },
    },
    android:{
      billImageContainer:{
        // backgroundColor:'green',

        overflow:'hidden',
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH,
      },
      billImage:{
        // overflow:'hidden',
        // borderWidth:0.8,
        // borderColor: Colors.mainBorderColor,
        // borderRadius:3,
        width: IMAGE_WIDTH,
        height: w*0.28,
        justifyContent:'center',
      },
      fixCircleClipping: {
        position: 'absolute',
        top: -IMAGE_WIDTH,
        bottom: -IMAGE_WIDTH,
        right: -IMAGE_WIDTH,
        left: -IMAGE_WIDTH,
        borderRadius: IMAGE_WIDTH*0.54 ,
        borderWidth: IMAGE_WIDTH,
        borderColor: '#E8E7EE'
      },
    }
  }),

  topicString:{
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(9),
    textAlign:'center',
    color: Colors.mainTextColor,
    backgroundColor:Colors.transparentColor,
    textShadowColor: '#00000066',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius:2,
  }




});


class DiscoveryCard extends React.Component {
  constructor(props) {
    super(props);
  }


  onTopicClick(){
    if(this.props.onTopicClick && !!this.props.topicId){
      this.props.onTopicClick(this.props.topicId);
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {


    return(
        <TouchableOpacity style={[styles.cardContainer, this.props.style]} onPress={this.onTopicClick.bind(this)}>
          <Image
            defaultSource={congratsScreenPhoto}
            style={styles.billImage}
            source={this.props.topicImage}
            resizeMode='cover'
          >
            <Text style={styles.topicString}>{this.props.topicTitle}</Text>
          </Image>
          <View style={styles.fixCircleClipping}/>
        </TouchableOpacity>
    );
  }
}




DiscoveryCard.propTypes= {

  topicId: React.PropTypes.string.isRequired,
  topicTitle: React.PropTypes.string.isRequired,
  topicImage: React.PropTypes.number.isRequired,
  onTopicClick: React.PropTypes.func.isRequired,
};
export default DiscoveryCard;
