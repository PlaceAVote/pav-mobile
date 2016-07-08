/* @flow weak */
/**
 * # FiltersRender.js
 *
 *
 */
'use strict';


import {Colors, ScheneKeys, Other} from '../../config/constants';
const {NEWS_FEED_FILTERS, TOPICS} = Other;
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;






const styles = StyleSheet.create({



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
    justifyContent:'center',
    // backgroundColor:'green',
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
    fontSize: getCorrectFontSizeForScreen(8),
    color: Colors.thirdTextColor,

  },
  filterIndicatorIconContainer:{
    paddingTop:h*0.006,
    // backgroundColor:'green',
    // alignSelf:'center',
    // justifyContent:'flex-end',
  },
  activeFilterIndicatorIcon:{
    // backgroundColor:'red',
    margin:0,
    // borderTopWidth:5,
    // borderTopColor:'red',
    alignSelf:'center',
    color:'#E8E7EE'
  },
  inactiveFilterIndicatorIcon:{
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
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(5),
    color: Colors.primaryColor,
  },
  topicArrowIcon:{
    paddingHorizontal: w*0.009,
    color:Colors.primaryColor
  }

});


class FiltersRender extends React.Component {
  constructor(props) {
    super(props);

  }








  renderFilterButton(isActive, iconName, filterName ){
    if(isActive){
      return(
        <View key={iconName+"container"} style={styles.expandedFilterContainer}>
          <TouchableOpacity key={iconName+"touchable"} style={styles.filterContent} onPress={()=>{this.props.onFilterBtnClick(filterName)}}>
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
          <TouchableOpacity key={iconName+"touchable"} style={styles.filterContent} onPress={()=>{this.props.onFilterBtnClick(filterName)}}>
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
   *   RENDER       RENDER       RENDER       RENDER       RENDER       RENDER
   *
  */

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.curSelectedFilter !== this.props.curSelectedFilter)
      ||
      (nextProps.user.firstName !== this.props.user.firstName)
      ||
      (nextProps.style !== this.props.style)
    );
  }
  /**
   * ### render method
   */
  render() {

    return (
      <View key="feedHeaderContainer" style={this.props.style}>
        <View key="filtersViewContainer" style={styles.filtersViewContainer}>
          {this.renderFilterButton((NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER==this.props.curSelectedFilter), "globe", NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER)}
          {/*{this.renderFilterButton((NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER==this.props.curSelectedFilter), "add-lined", NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER)}
          {this.renderFilterButton((NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER==this.props.curSelectedFilter), "bills", NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER)}*/}
          {this.renderFilterButton((NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER==this.props.curSelectedFilter), "binoculars", NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER)}
          {/*{this.renderFilterButton((NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER==this.props.curSelectedFilter), "trending-graph", NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER)}*/}
        </View>
        {/*Text was here*/}
      </View>
      );
  }
}


export default FiltersRender;
