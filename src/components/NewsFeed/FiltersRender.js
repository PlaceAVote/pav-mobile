/* @flow weak */
/**
 * # FiltersRender.js
 *
 *
 */
'use strict';


import {Colors, ScheneKeys, Other} from '../../config/constants';
const {NEWS_FEED_FILTERS, TOPICS} = Other;
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
  ScrollView,
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



      topicSelectorContainer:{
        // backgroundColor:'green',
        flex:1,
        paddingVertical: h*0.02,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      topicViewContainer:{
        backgroundColor: "white",
        flex:1,
        // flexDirection:'row',
      },
      activeTopicContainer:{
        // backgroundColor:'yellow',
        paddingHorizontal:w*0.04,
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
        borderTopColor: Colors.negativeAccentColor,
        borderTopWidth:2,
        alignItems:'center',
        justifyContent:'center'
      },
      inactiveTopicContainer:{
        // backgroundColor:'yellow',
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
        alignItems:'center',
        justifyContent:'center'
      },
      topicContent:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:w*0.015,
        paddingVertical:h*0.021,
        // backgroundColor:'blue'
      },
      topicText:{
        paddingHorizontal: w*0.009,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,5),
        color: Colors.primaryColor,
      },
      topicArrowIcon:{
        paddingHorizontal: w*0.009,
        color:Colors.primaryColor
      }

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({


    });
  }






/*
 *
 *
 *   FILTERS     FILTERS     FILTERS     FILTERS     FILTERS     FILTERS
 *
*/

  getHeaderTextBasedOnFilter(curSelectedFilter, userFirstName){
    switch(curSelectedFilter){
      case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
        return "Welcome back"+(userFirstName==null?"":", "+userFirstName)+"! Here's whats new: ";
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








  /*
   *
   *
   *   TOPICS       TOPICS       TOPICS       TOPICS       TOPICS       TOPICS
   *
  */

    // renderTopicButton(isActive, topicName, topicList, styles ){
    //     // let filterName = this.props.curSelectedFilter;
    //     let curTopicTitle = topicName==TOPICS.TRENDING?"Trending ":topicList[topicName].title;
    //     // console.log("@@@@@@@@: "+curTopicObj)
    //     return(
    //       <View key={topicName+"container"} style={isActive?styles.activeTopicContainer:styles.inactiveTopicContainer}>
    //         <TouchableOpacity key={topicName+"touchable"} style={styles.topicContent} onPress={()=>{this.props.onTopicBtnClick(topicName)}}>
    //           <Text style={styles.topicText}>{curTopicTitle} </Text>
    //         </TouchableOpacity>
    //       </View>);
    // }





  // renderTopicSelector(renderTopicSelector, styles){
  //   if(renderTopicSelector==true){
  //       return (
  //       <View key="discoverTopicSelector" style={styles.topicSelectorContainer}>
  //         <PavIcon key="leftIcon" name="arrow-left" size={15} style={styles.topicArrowIcon}/>
  //         <ScrollView horizontal={true} style={styles.topicViewContainer}>
  //           {this.renderTopicButton((TOPICS.TRENDING==this.props.curSelectedTopic), TOPICS.TRENDING, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.HEALTHCARE==this.props.curSelectedTopic), TOPICS.HEALTHCARE, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.TECHNOLOGY==this.props.curSelectedTopic), TOPICS.TECHNOLOGY, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.SOCIAL_INTEREST==this.props.curSelectedTopic), TOPICS.SOCIAL_INTEREST, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.EDUCATION==this.props.curSelectedTopic), TOPICS.EDUCATION, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.POLITICS==this.props.curSelectedTopic), TOPICS.POLITICS, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.TAXES==this.props.curSelectedTopic), TOPICS.TAXES, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.IMMIGRATION==this.props.curSelectedTopic), TOPICS.IMMIGRATION, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.DRUGS==this.props.curSelectedTopic), TOPICS.DRUGS, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.DEFENSE==this.props.curSelectedTopic), TOPICS.DEFENSE, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.CRIME==this.props.curSelectedTopic), TOPICS.CRIME, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.GUN_RIGHTS==this.props.curSelectedTopic), TOPICS.GUN_RIGHTS, this.props.topicList, styles)}
  //           {this.renderTopicButton((TOPICS.ECONOMICS==this.props.curSelectedTopic), TOPICS.ECONOMICS, this.props.topicList, styles)}
  //         </ScrollView>
  //         <PavIcon key="rightIcon" name="arrow-right" size={15} style={styles.topicArrowIcon}/>
  //
  //
  //       </View>);
  //   }else{
  //       return <View></View>;
  //   }
  // }


renderRecentActivityText(shouldRender, text, styles){
  if(shouldRender){
    return (
      <Text key="recentActivityText"
        style={styles.recentActivityText}>
        {text}
      </Text>);
  }else{
    return <View></View>;
  }

}
  /*
   *
   *
   *   RENDER       RENDER       RENDER       RENDER       RENDER       RENDER
   *
  */

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
        {this.renderRecentActivityText((this.props.curSelectedFilter!=NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER),this.getHeaderTextBasedOnFilter(this.props.curSelectedFilter, this.props.user.firstName), styles)}


      </View>
      );
  }
}


export default FiltersRender;
