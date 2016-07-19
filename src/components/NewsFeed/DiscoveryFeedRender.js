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
const {TOPICS, TOPIC_IMAGES}=Other;





const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'blue',
  },

  //trending
  trendingContainer:{
    // backgroundColor:'orange',
  },
  discoverByTopicContainer:{
    // backgroundColor:'purple',
  },

  titleContainer:{
    paddingHorizontal:w*0.022, //Same as the Trending card styles.card style
    paddingVertical: h*0.013,
  },
  title:{
    fontFamily: 'Whitney-Semibold',
    fontSize: getCorrectFontSizeForScreen(10),
    color: Colors.fourthTextColor,
  },
  trendingCardContainer:{

  },
  trendingCardStyle:{

  },


  //Topics
  topicCardsContainer:{
    // backgroundColor:'purple',
    flexDirection:'column',
  },

  topicCards2CardComboContainer:{
    // backgroundColor:'orange',
    paddingBottom: h*0.027,
    flexDirection:'row',
    justifyContent:'space-around'
  }

});


class DiscoveryFeedRender extends React.Component {


  renderTrendingIssues(){
    let trendingItems = [];
    if(!!this.props.trendingItems){
      trendingItems.push(this.props.trendingItems.get(0).toJS());
      trendingItems.push(this.props.trendingItems.get(1).toJS());
      trendingItems.push(this.props.trendingItems.get(2).toJS());
    }
    return (
      <View style={styles.trendingContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
          Trending Issues
          </Text>
        </View>
        <CardFactory
          type="trending"
          key="trending_0"
          style={styles.trendingCardContainer}
          cardStyle={styles.trendingCardStyle}
          cardHeight={h*0.25}
          itemData={trendingItems[0]}
          onBillClick={this.props.onBillClick}
        />
        <CardFactory
          type="trending"
          key="trending_1"
          style={styles.trendingCardContainer}
          cardStyle={styles.trendingCardStyle}
          cardHeight={h*0.25}
          itemData={trendingItems[1]}
          onBillClick={this.props.onBillClick}
        />
        <CardFactory
          type="trending"
          key="trending_2"
          style={styles.trendingCardContainer}
          cardStyle={styles.trendingCardStyle}
          cardHeight={h*0.25}
          itemData={trendingItems[2]}
          onBillClick={this.props.onBillClick}
        />
      </View>
    )
  }


  renderDiscoverByTopicIssues(){

    let {
      CRIME,
      HEALTHCARE,
      TAXES,
      IMMIGRATION,
      EDUCATION,
      DRUGS,
      DEFENSE,
      POLITICS,
      GUN_RIGHTS,
      TECHNOLOGY,
      ECONOMICS,
      SOCIAL_INTEREST} = Other.TOPICS;
    return (
      <View style={styles.discoverByTopicContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
          Discover by Topic
          </Text>
        </View>

        <View style={styles.topicCardsContainer}>

        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+HEALTHCARE}
            style={styles.topicCard}
            itemData={{title:HEALTHCARE, image:TOPIC_IMAGES.HEALTHCARE}}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+TECHNOLOGY}
            style={styles.topicCard}
            itemData={{title:TECHNOLOGY, image:TOPIC_IMAGES.TECHNOLOGY}}
            onTopicClick={this.props.onTopicClick}
          />
        </View>

        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+POLITICS}
            style={styles.topicCard}
            itemData={{title:POLITICS, image:TOPIC_IMAGES.POLITICS}}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+GUN_RIGHTS}
            style={styles.topicCard}
            itemData={{title:GUN_RIGHTS, image:TOPIC_IMAGES.GUN_RIGHTS}}
            onTopicClick={this.props.onTopicClick}
          />
        </View>

        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+EDUCATION}
            style={styles.topicCard}
            itemData={{title:EDUCATION, image:TOPIC_IMAGES.EDUCATION}}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+DEFENSE}
            style={styles.topicCard}
            itemData={{title:DEFENSE, image:TOPIC_IMAGES.DEFENSE}}
            onTopicClick={this.props.onTopicClick}
          />
        </View>

        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+ECONOMICS}
            style={styles.topicCard}
            itemData={{title:ECONOMICS, image:TOPIC_IMAGES.ECONOMICS}}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+IMMIGRATION}
            style={styles.topicCard}
            itemData={{title:IMMIGRATION, image:TOPIC_IMAGES.IMMIGRATION}}
            onTopicClick={this.props.onTopicClick}
          />
        </View>



        </View>

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
          {this.renderDiscoverByTopicIssues()}
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
}
DiscoveryFeedRender.propTypes= {
  trendingItems: React.PropTypes.object,
  onBillClick: React.PropTypes.func.isRequired,
  onTopicClick: React.PropTypes.func.isRequired,
};
export default DiscoveryFeedRender;
