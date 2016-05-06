/* @flow weak */
/**
 * # FiltersRender.js
 *
 *
 */
'use strict';


import {Colors, ScheneKeys, Other} from '../../config/constants';
const {NEWS_FEED_FILTERS} = Other;
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


/**
* Icons library
*/
var Icon = require('react-native-vector-icons/FontAwesome');



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;









class FiltersRender extends Component {
  constructor(props) {
    super(props);

  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({

      recentActivityText: {
        // top:0,
        // width:w,
        // height:h*0.065,
        // position:'absolute',
        // backgroundColor: "rgba(0,0,0,0.06)",
        // backgroundColor:'green',
        paddingHorizontal: w*0.009,
        paddingTop: h*0.02,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,10),
        color: Colors.fifthTextColor,
        // textAlign: 'center',
      },

      filtersViewContainer:{
        backgroundColor: "white",
        flexDirection:'row',
      },
      expandedFilterContainer:{
        flex:3,
        // backgroundColor:'yellow',
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
        // alignItems:'center',
        justifyContent:'center'
      },
      collapsedFilterContainer:{
        flex:1,
        justifyContent:'center',
        // paddingHorizontal:w*0.037,
        // paddingVertical:h*0.015,
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
      },
      filterContent:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:w*0.015,
        paddingTop:h*0.013,
        paddingBottom:h*0.006,
        // backgroundColor:'blue'
    },
    inactiveFilterIcon:{
      paddingHorizontal:3,
      color:Colors.primaryColor
    },
    activeFilterIcon:{
      paddingHorizontal:3,
      color:Colors.negativeAccentColor
    },
      filterText:{
        paddingHorizontal: w*0.009,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,5),
        color: Colors.thirdTextColor,

      },
      filterIndicatorIconContainer:{
        // backgroundColor:'red',
        // alignSelf:'center',
        // justifyContent:'flex-end',
      },
      activeFilterIndicatorIcon:{
        // backgroundColor:'yellow',
        alignSelf:'center',
        color:'#E8E7EE'
      },
      inactiveFilterIndicatorIcon:{
        // backgroundColor:'yellow',
        alignSelf:'center',
        color:Colors.transparentColor
      },


    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({


    });
  }








  getHeaderTextBasedOnFilter(curSelectedFilter, userFirstName){
    switch(curSelectedFilter){
      case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
        return "Welcome back, "+userFirstName+"! Here's whats new: ";
      case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
        return "Here's whats new from the people you follow: ";
      case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
        return "Here's whats new from the bills you follow: ";
      case NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER:
        return "Here are some bills you might be interested in: ";
      case NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER:
        return "Here are a few statistics you might be interested in: ";
    }
  }



  renderFilterButton(isActive, iconName, filterName, topicName, styles ){
    if(isActive){
      return(
        <View key={iconName+"container"} style={styles.expandedFilterContainer}>
          <TouchableOpacity key={iconName+"touchable"} style={styles.filterContent} onPress={()=>{this.props.onFilterBtnClick(filterName, topicName)}}>
            <PavIcon key={iconName+"icon1"} name={iconName} size={15} style={styles.activeFilterIcon}/>
            <Text style={styles.filterText}>{filterName}</Text>
          </TouchableOpacity>
          <View key={iconName+"indicatorContainer"} style={styles.filterIndicatorIconContainer}>
            <PavIcon key={iconName+"indicatorIcon"} name="activeIndicatorShrinked" size={7} style={styles.activeFilterIndicatorIcon}/>
          </View>
        </View>);
    }else{
      return(
        <View key={iconName+"container"} style={styles.collapsedFilterContainer}>
          <TouchableOpacity key={iconName+"touchable"} style={styles.filterContent} onPress={()=>{this.props.onFilterBtnClick(filterName, topicName)}}>
            <PavIcon key={iconName+"icon1"} name={iconName} size={15} style={styles.inactiveFilterIcon}/>
          </TouchableOpacity>
          <View key={iconName+"indicatorContainer"} style={styles.filterIndicatorIconContainer}>
            <PavIcon key={iconName+"indicatorIcon"} name="activeIndicatorShrinked" size={7} style={styles.inactiveFilterIndicatorIcon}/>
          </View>
        </View>);
    }
  }






  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return (
      <View key="feedHeaderContainer" style={this.props.style}>
        <View key="filtersViewContainer" style={styles.filtersViewContainer}>
          {this.renderFilterButton((NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER==this.props.curSelectedFilter), "globe", NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER, this.props.curSelectedTopic, styles)}
          {this.renderFilterButton((NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER==this.props.curSelectedFilter), "add-lined", NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER, this.props.curSelectedTopic, styles)}
          {this.renderFilterButton((NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER==this.props.curSelectedFilter), "bills", NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER, this.props.curSelectedTopic, styles)}
          {this.renderFilterButton((NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER==this.props.curSelectedFilter), "binoculars", NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER, this.props.curSelectedTopic, styles)}
          {this.renderFilterButton((NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER==this.props.curSelectedFilter), "trending-graph", NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER, this.props.curSelectedTopic, styles)}
        </View>
        <Text key="recentActivityText" style={styles.recentActivityText}>{this.getHeaderTextBasedOnFilter(this.props.curSelectedFilter, this.props.user.firstName)}</Text>
        {()=>(this.props.curSelectedFilter!=NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER)?<View></View>:<View key="discoverTopicSelector"><Text>Current Topic selector</Text></View>}
      </View>
      );
  }
}


export default FiltersRender;
