/* @flow weak */
/**
 * # DiscoveryFeedRender.js
 *
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Animated, Easing} from 'react-native';
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
import ActivityFeedRender from './ActivityFeedRender'
import {Colors, Other} from '../../config/constants';
const {TOPICS}=Other;








class DiscoveryFeedRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesToRender : [
        {key:TOPICS.TRENDING, title:"Trending"},
        {key:TOPICS.HEALTHCARE, title:this.props.topicList[TOPICS.HEALTHCARE].title},
        {key:TOPICS.TECHNOLOGY, title:this.props.topicList[TOPICS.TECHNOLOGY].title},
        {key:TOPICS.SOCIAL_INTEREST, title:this.props.topicList[TOPICS.SOCIAL_INTEREST].title},
        {key:TOPICS.EDUCATION, title:this.props.topicList[TOPICS.EDUCATION].title},
        {key:TOPICS.POLITICS, title:this.props.topicList[TOPICS.POLITICS].title},
        {key:TOPICS.TAXES, title:this.props.topicList[TOPICS.TAXES].title},
        {key:TOPICS.IMMIGRATION, title:this.props.topicList[TOPICS.IMMIGRATION].title},
        {key:TOPICS.DRUGS, title:this.props.topicList[TOPICS.DRUGS].title},
        {key:TOPICS.DEFENSE, title:this.props.topicList[TOPICS.DEFENSE].title},
        {key:TOPICS.CRIME, title:this.props.topicList[TOPICS.CRIME].title},
        {key:TOPICS.GUN_RIGHTS, title:this.props.topicList[TOPICS.GUN_RIGHTS].title},
        {key:TOPICS.ECONOMICS, title:this.props.topicList[TOPICS.ECONOMICS].title},
      ]
    }
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







  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.discoveryData !== this.props.discoveryData)
      ||
      (nextProps.device !== this.props.device)
      ||
      (nextProps.curUser !== this.props.curUser)
    );
  }






  renderDiscoverPage(pageTitle, discoveryData, device, curUser){
    return (
      <ActivityFeedRender
      key={pageTitle}
      tabLabel={pageTitle}
      feedData={discoveryData}
      device={device}
      curUser={curUser}
      type="discovery"
      onUserClick={this.props.onUserClick}
      onBillClick={this.props.onBillClick}
      onLikeDislikeClick={this.props.onLikeDislikeClick}
      onReplyClick={this.props.onReplyClick}
      onReactionClick={this.props.onReactionClick}
      onCommentClick={this.props.onCommentClick}
      onSocialClick={this.props.onSocialClick}
      />)
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
        onChangeTab={(data)=>{this.props.onTopicSelected(this.state.pagesToRender[data.i].key)}}
        renderTabBar={() =>
          <TopicSelectTabBar
            indicatorPosition="top"
            indicatorArrowsEnabled={true}
            underlineColor={Colors.negativeAccentColor}
            activeTextColor={Colors.primaryColor}
            inactiveTextColor={Colors.primaryColor}
          />}
        initialPage={0}
        style={styles.pagesContainer}
      >
        {this.state.pagesToRender.map((page, i) => this.renderDiscoverPage(page.title, this.props.discoveryData.get(this.state.pagesToRender[i].key), this.props.device, this.props.curUser))}
     </ScrollableTabView>

    );
  }
}
export default DiscoveryFeedRender;
