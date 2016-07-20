/* @flow weak */
/**
 * # SummaryTabRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


/**
* Image library
*/

// import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;






const styles = StyleSheet.create({


  summaryPageContainer:{
    flex:1,
    backgroundColor:'white'
  },
  scrollViewContainer:{
    flex:1,
  },
  summaryHeaderContainer:{
    backgroundColor: Colors.titleBgColor,
    borderBottomColor: "rgba(0, 0, 0, 0.07)",
    borderBottomWidth: 1,
    paddingHorizontal: w*0.011,
    paddingVertical: h*0.015,
    // shadowColor: 'rgba(0, 0, 0, 0.12)',
  },
  summaryHeaderTextContainer:{
    paddingHorizontal: w*0.011,
    paddingVertical: h*0.015,
  },
  summaryHeaderText:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(7),
  },
  summaryBodyContainer:{
    paddingVertical: h*0.017,
    paddingHorizontal: w*0.030,
    backgroundColor:'white'
  },
  summaryFavorContainer:{
    flex:1,
    flexDirection:'row',
    backgroundColor: Colors.titleBgColor,
    borderBottomColor: "rgba(0, 0, 0, 0.07)",
    borderBottomWidth: 1,
    alignItems:'center'
  },
  summaryBodyText:{
    lineHeight: 18,  // | 0 converts the float to an int because otherwise we get this bug https://github.com/facebook/react-native/issues/7877
    paddingVertical: h*0.008,
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  summaryBodyReadMoreText:{
    paddingVertical: h*0.008,
    color: Colors.negativeAccentColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(7),
  },
  favorAgainstIconContainer:{
    paddingHorizontal: w*0.011,
  },
  favorIcon:{
    color:Colors.accentColor
  },
  againstIcon:{
    // paddingHorizontal: w*0.011,
    color:Colors.negativeAccentColor
  },
  summaryBodyPointsFavorText:{
    lineHeight: 18,  // | 0 converts the float to an int because otherwise we get this bug https://github.com/facebook/react-native/issues/7877
    paddingVertical: h*0.008,
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
  }


});






class SummaryTabRender extends React.Component {
  constructor(props) {
    super(props);

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),

  }



  onTabFocus(){

  }

  /**
   * ### render method
   */
  render() {
    // let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View style={styles.summaryPageContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.summaryHeaderContainer}>
            <Text style={styles.summaryHeaderText}>
              SHORT SUMMARY
            </Text>
          </View>
          <View style={styles.summaryBodyContainer}>
            <Text style={styles.summaryBodyText}>
              {this.props.billData.shortSummary}
            </Text>
            <TouchableOpacity onPress={this.props.goToMoreInfoPage}>
              <Text style={styles.summaryBodyReadMoreText}>
                Read more information about this bill.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryFavorContainer}>
            <View style={styles.favorAgainstIconContainer}>
              <PavIcon name="check-mark" size={12} style={styles.favorIcon}/>
            </View>
            <View  style={styles.summaryHeaderTextContainer}>
              <Text style={styles.summaryHeaderText}>
                POINTS IN FAVOR
              </Text>
            </View>
          </View>
          <View style={styles.summaryBodyContainer}>
            <Text style={styles.summaryBodyPointsFavorText}>
              - {this.props.billData.pointInFavor}
            </Text>
          </View>
          <View style={styles.summaryFavorContainer}>
            <View style={styles.favorAgainstIconContainer}>
              <PavIcon name="close" size={13} style={styles.againstIcon}/>
            </View>
            <View style={styles.summaryHeaderTextContainer}>
              <Text style={styles.summaryHeaderText}>
                POINTS AGAINST
              </Text>
            </View>
          </View>
          <View style={styles.summaryBodyContainer}>
            <Text style={styles.summaryBodyPointsFavorText}>
              - {this.props.billData.pointAgainst}
            </Text>
          </View>
        </ScrollView>


      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.billData !== this.props.billData)
      ||
      (nextProps.orientation !== this.props.orientation)
    );
  }

}


export default SummaryTabRender;
