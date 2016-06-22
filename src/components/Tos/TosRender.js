/* @flow weak */
/**
 * # TosRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



// import LinearGradient from 'react-native-linear-gradient';



/*A react native button*/
import Button from 'sp-react-native-iconbutton'


// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import PostVoteModalBox from '../Modals/PostVoteModalBox';
// import congratsScreenPhoto from '../../../assets/congratsScreen.png';




const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'pink'
  }
});











class TosRender extends React.Component {


  /**
   * ### render method
   */
  render() {

    return(
      <View
      style={styles.container}>

      </View>
    );
  }
}




TosRender.propTypes= {
};
export default TosRender;
