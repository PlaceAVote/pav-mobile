/* @flow weak */
/**
 * # DiscoveryFeedRender.js
 *
 */
'use strict';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
}
from 'react-native';
// import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'

// import Dimensions from 'Dimensions';
// const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// const icomoonConfig = require('../../../assets/fonts/icomoon.json');
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


//TODO Remove ViewPager
import ViewPager from 'react-native-viewpager';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TopicSelectTabBar from './TopicSelectTabBar'
import {Colors, Other} from '../../config/constants';
const {TOPICS}=Other;




class DiscoveryFeedRender extends Component {
  constructor(props) {
    super(props);
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({
      pagesContainer:{
        flex:1,
        // backgroundColor:'blue',
        // backgroundColor:'red'
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












  //   viewPagerAnimation(animatedValue, toValue, gestureState){
  //     // Use the horizontal velocity of the swipe gesture
  //     // to affect the length of the transition so the faster you swipe
  //     // the faster the pages will transition
  //     var velocity = Math.abs(gestureState.vx);
  //     var baseDuration = 300;
  //     var duration = (velocity > 1) ? 1/velocity * baseDuration : baseDuration;
  //
  //     return Animated.timing(animatedValue,
  //     {
  //       toValue: toValue,
  //       duration: duration,
  //       easing: Easing.out(Easing.exp)
  //     });
  //   }
  //
  //
  //
  //
  //   getDiscoveryDataSource(data){
  //     var dataSource = new ViewPager.DataSource({
  //      pageHasChanged: (p1, p2) => p1 !== p2,
  //    });
  //    return dataSource.cloneWithPages(data);
  //   }
  //
  //
  //
  //
  //
  //
  // getFeedDataSource(data){
  //   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.event_id !== r2.event_id});
  //   return ds.cloneWithRows(data);
  // }

  // <ViewPager
  //     dataSource={this.getDiscoveryDataSource(this.props.discoveryData)}
  //     renderPage={this.renderDiscoverPage.bind(this)}
  //     animation = {this.viewPagerAnimation.bind(this)}
  //     style={[styles.pagesContainer, this.props.style]}
  // />




  renderDiscoverPage(rowData){
    return (
      <View tabLabel={rowData} style={{backgroundColor:'green',flex:1, height:this.props.height}}>
        <Text style={{backgroundColor:'red',flex:1,}}>Discovery page{rowData}</Text>
      </View>)
  }



  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <ScrollableTabView
      initialPage={0}
      renderTabBar={() =>
        <TopicSelectTabBar
          underlineColor={Colors.negativeAccentColor}
          activeTextColor={Colors.primaryColor}
          inactiveTextColor={Colors.primaryColor}
        />}
      >
        {this.renderDiscoverPage("Trending")}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.HEALTHCARE].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.TECHNOLOGY].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.SOCIAL_INTEREST].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.EDUCATION].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.POLITICS].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.TAXES].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.IMMIGRATION].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.DRUGS].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.DEFENSE].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.CRIME].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.GUN_RIGHTS].title)}
        {this.renderDiscoverPage(this.props.topicList[TOPICS.ECONOMICS].title)}

     </ScrollableTabView>

    );
  }
}
export default DiscoveryFeedRender;
