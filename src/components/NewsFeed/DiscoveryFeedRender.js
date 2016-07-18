/* @flow weak */
/**
 * # DiscoveryFeedRender.js
 *
 */
'use strict';

import React from 'react';
import {StyleSheet, View, Text, Platform, ScrollView} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'

import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


import CardFactory from '../Cards/CardFactory';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TopicSelectTabBar from './TopicSelectTabBar'
import ActivityFeedRender from './ActivityFeedRender'
import {Colors, Other} from '../../config/constants';
const {TOPICS}=Other;





const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'blue',
  },

  //trending
  trendingContainer:{
    backgroundColor:'orange',
  },

  trendingTitleContainer:{
    paddingHorizontal:w*0.03,
    paddingVertical: h*0.013,
  },
  trendingTitle:{
    fontFamily: 'Whitney-Semibold',
    fontSize: getCorrectFontSizeForScreen(10),
    color: Colors.fourthTextColor,
  },
  trendingCardContainer:{

  },
  trendingCardStyle:{

  }

});


class DiscoveryFeedRender extends React.Component {


  renderTrendingIssues(){
    let trendingItems = null;
    if(!!this.props.trendingItems){
      trendingItems = this.props.trendingItems;
    }
    return (
      <View style={styles.trendingContainer}>
        <View style={styles.trendingTitleContainer}>
          <Text style={styles.trendingTitle}>
          Trending Issues
          </Text>
        </View>
        <CardFactory
          type="trending"
          key="trending_1"
          style={styles.trendingCardContainer}
          cardStyle={styles.trendingCardStyle}
          cardHeight={h*0.25}
          itemData={trendingItems}
          onBillClick={this.props.onBillClick}
        />
      </View>
    )
  }

  /**
   * ### render method
   */
  render() {

    return(
        <ScrollView style={styles.container}>
          {this.renderTrendingIssues()}
        </ScrollView>
    //   <ScrollableTabView
    //     onChangeTab={(data)=>{
    //       // console.log("@@@@@@@@@@@@ Tab changed: "+this.state.pagesToRender[data.i].key);
    //       if(this.state.curPage!=data.i){
    //         this.props.onTopicSelected(this.state.pagesToRender[data.i].key);
    //         this.setState({curPage: data.i});
    //       }
    //     }}
    //     renderTabBar={() =>
    //       <TopicSelectTabBar
    //         indicatorPosition="top"
    //         indicatorArrowsEnabled={true}
    //         underlineColor={Colors.negativeAccentColor}
    //         activeTextColor={Colors.primaryColor}
    //         inactiveTextColor={Colors.primaryColor}
    //       />}
    //     initialPage={this.props.initialDiscoveryPage}
    //     page={this.state.curPage}
    //     style={styles.pagesContainer}
    //   >
    //     {this.state.pagesToRender.map((page, i) => this.renderDiscoverPage(page.title, this.props.discoveryData.get(this.state.pagesToRender[i].key), this.props.device, this.props.curUser))}
    //  </ScrollableTabView>

    );
  }//render


  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log("@@@@@@@ shouldComponentUpdate @@@@@@@@");
  //   // console.log("SHOULD THE COMPONENT UPDATE (beingRefreshed):: "+(nextProps.beingRefreshed !== this.props.beingRefreshed));
  //   // console.log("New curPage :: "+nextState.curPage);
  //   // console.log("@@@@@@@ shouldComponentUpdate @@@@@@@@");
  //   return(
  //     (nextProps.beingRefreshed !== this.props.beingRefreshed)
  //     ||
  //     (nextProps.discoveryData !== this.props.discoveryData)
  //     ||
  //     (nextProps.device.orientation !== this.props.device.orientation)
  //     ||
  //     (nextProps.curUser !== this.props.curUser)
  //     ||
  //     (nextProps.curTopic !== this.props.curTopic)
  //     ||
  //     (nextState.curPage !== this.state.curPage)
  //   );
  // }



}//DiscoveryFeedRender
// constructor(props) {
//   super(props);
//   this.state = {
//     pagesToRender : [
//       {key:TOPICS.TRENDING, title:"Trending"},
//       {key:TOPICS.HEALTHCARE, title:this.props.topicList[TOPICS.HEALTHCARE].title},
//       {key:TOPICS.TECHNOLOGY, title:this.props.topicList[TOPICS.TECHNOLOGY].title},
//       {key:TOPICS.SOCIAL_INTEREST, title:this.props.topicList[TOPICS.SOCIAL_INTEREST].title},
//       {key:TOPICS.EDUCATION, title:this.props.topicList[TOPICS.EDUCATION].title},
//       {key:TOPICS.POLITICS, title:this.props.topicList[TOPICS.POLITICS].title},
//       {key:TOPICS.TAXES, title:this.props.topicList[TOPICS.TAXES].title},
//       {key:TOPICS.IMMIGRATION, title:this.props.topicList[TOPICS.IMMIGRATION].title},
//       {key:TOPICS.DRUGS, title:this.props.topicList[TOPICS.DRUGS].title},
//       {key:TOPICS.DEFENSE, title:this.props.topicList[TOPICS.DEFENSE].title},
//       {key:TOPICS.CRIME, title:this.props.topicList[TOPICS.CRIME].title},
//       {key:TOPICS.GUN_RIGHTS, title:this.props.topicList[TOPICS.GUN_RIGHTS].title},
//       {key:TOPICS.ECONOMICS, title:this.props.topicList[TOPICS.ECONOMICS].title},
//     ],
//     curPage: 0
//   }
// }




// //returns the number of a page depending on the topicStr provided
// findPageNumberByTopicStr(topicStr){
//   let arr = this.state.pagesToRender;
//   let arrLen = arr.length;
//   for (let ii=0;ii<arrLen;ii++){
//     if(arr[ii].key==topicStr){
//       return ii;
//     }
//   }
//   return 0;
// }







// renderDiscoverPage(pageTitle, discoveryData, device, curUser){
//     return (
//       <ActivityFeedRender
//       key={pageTitle}
//       tabLabel={pageTitle}
//       feedData={discoveryData}
//       device={device}
//       curUser={curUser}
//       type="discovery"
//       curFilter={this.props.curFilter}
//       curTopic={this.props.curTopic}
//       beingRefreshed={this.props.beingRefreshed}
//       oldDataBeingFetched={this.props.oldDataBeingFetched}
//       onRefresh={this.props.onRefresh}
//       onUserClick={this.props.onUserClick}
//       onBillClick={this.props.onBillClick}
//       onLikeDislikeClick={this.props.onLikeDislikeClick}
//       onReplyClick={this.props.onReplyClick}
//       onReactionClick={this.props.onReactionClick}
//       onCommentClick={this.props.onCommentClick}
//       onSocialClick={this.props.onSocialClick}
//       onFetchMoreItems={this.props.onFetchMoreItems}
//       />);
// }



// componentWillReceiveProps(nexrProps) {
//   // console.log("@@@@@@@ New topic: "+nexrProps.curTopic+" OLD topic: "+this.props.curTopic);
//   // console.log("@@@@@@@ componentWillReceiveProps @@@@@@@@");
//   // console.log("@@@@@@@@@@@@@@@@ SHOULD THE COMPONENT UPDATE (curTopic):: "+this.props.curTopic);
//   // console.log("@@@@@@@ componentWillReceiveProps @@@@@@@@");
//   if(nexrProps.curTopic !== this.props.curTopic){ //if we have a new current topic
//
//     if(nexrProps.curTopic == this.state.pagesToRender[this.state.curPage].key){  //if the current topic is the one our page is already showing
//       return;//do nothing
//     }else{  //else if we're showing a different topic than the current topic
//       let newPage = this.findPageNumberByTopicStr(nexrProps.curTopic);
//       this.setState({curPage: newPage});
//       setTimeout(()=>{
//         this.props.onRefresh(nexrProps.curTopic);
//       }, 200);
//     }
//   }
// }




DiscoveryFeedRender.defaultProps={
  initialDiscoveryPage: 0
}
DiscoveryFeedRender.propTypes= {
  trendingItems: React.PropTypes.object,
  initialDiscoveryPage: React.PropTypes.number.isRequired,
  device: React.PropTypes.object.isRequired,
  curUser: React.PropTypes.object.isRequired,
  curFilter:React.PropTypes.string.isRequired,
  beingRefreshed: React.PropTypes.bool.isRequired,
  oldDataBeingFetched: React.PropTypes.bool.isRequired,
  onRefresh: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onReplyClick: React.PropTypes.func.isRequired,
  onReactionClick: React.PropTypes.func.isRequired,
  onCommentClick: React.PropTypes.func.isRequired,
  onSocialClick: React.PropTypes.func.isRequired,
  onFetchMoreItems: React.PropTypes.func.isRequired,
};
export default DiscoveryFeedRender;
