/* @flow weak */
/**
 * # DiscoveryFeedRender.js
 *
 */
'use strict';

import React from 'react';
import {StyleSheet, View, Text, Platform, ScrollView, RefreshControl} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'

import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavSpinner from '../../lib/UI/PavSpinner';

import CardFactory from '../Cards/CardFactory';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TopicSelectTabBar from './TopicSelectTabBar'
import ActivityFeedRender from './ActivityFeedRender'
import {Colors, Other, TOPICS} from '../../config/constants';






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
    paddingTop: h*0.013,
    paddingBottom: h*0.015,
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
    if(this.props.trendingItems==null){
      return (
        <View key="trendingContainer" style={styles.trendingContainer}>
          <View key="titleContainer" style={styles.titleContainer}>
            <Text  key="title"  style={styles.title}>
            Trending Issues
            </Text>
          </View>
          <PavSpinner/>
        </View>
      )
    }else{
      let trendingItems = [];
      trendingItems.push(this.props.trendingItems.get(0).toJS());
      trendingItems.push(this.props.trendingItems.get(1).toJS());
      trendingItems.push(this.props.trendingItems.get(2).toJS());
      return (
        <View key="trendingContainer" style={styles.trendingContainer}>
          <View key="titleContainer" style={styles.titleContainer}>
            <Text  key="title"  style={styles.title}>
            Trending Issues
            </Text>
          </View>
          <CardFactory
            type="trending"
            key="trending_0"
            cardHeight={h*0.25}
            itemData={trendingItems[0]}
            onBillClick={this.props.onBillClick}
          />
          <CardFactory
            type="trending"
            key="trending_1"
            cardHeight={h*0.25}
            itemData={trendingItems[1]}
            onBillClick={this.props.onBillClick}
          />
          <CardFactory
            type="trending"
            key="trending_2"
            cardHeight={h*0.25}
            itemData={trendingItems[2]}
            onBillClick={this.props.onBillClick}
          />
        </View>
      )
    }

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
      SOCIAL_INTEREST} = TOPICS;
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
            key={"discovery_"+HEALTHCARE.key}
            itemData={HEALTHCARE}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+TECHNOLOGY.key}
            itemData={TECHNOLOGY}
            onTopicClick={this.props.onTopicClick}
          />
        </View>

        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+POLITICS.key}
            itemData={POLITICS}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+GUN_RIGHTS.key}
            itemData={GUN_RIGHTS}
            onTopicClick={this.props.onTopicClick}
          />
        </View>

        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+EDUCATION.key}

            itemData={EDUCATION}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+DEFENSE.key}
            itemData={DEFENSE}
            onTopicClick={this.props.onTopicClick}
          />
        </View>

        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+ECONOMICS.key}
            itemData={ECONOMICS}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+IMMIGRATION.key}
            itemData={IMMIGRATION}
            onTopicClick={this.props.onTopicClick}
          />
        </View>
        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+TAXES.key}
            itemData={TAXES}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+DRUGS.key}
            itemData={DRUGS}
            onTopicClick={this.props.onTopicClick}
          />
        </View>
        <View style={styles.topicCards2CardComboContainer}>
          <CardFactory
            type="discovery"
            key={"discovery_"+SOCIAL_INTEREST.key}
            itemData={SOCIAL_INTEREST}
            onTopicClick={this.props.onTopicClick}
          />
          <CardFactory
            type="discovery"
            key={"discovery_"+CRIME.key}
            itemData={CRIME}
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
        <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={(this.props.trendingItems!=null && this.props.isFetchingTrendingData===true)}
            onRefresh={this.props.onRefreshTrendingItems}
            {...Platform.select({
               ios: {
                 color:Colors.mainTextColor
               },
               android: {
                 colors:[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]
               }
             })}
          />
        }>
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



}




DiscoveryFeedRender.defaultProps={
}
DiscoveryFeedRender.propTypes= {
  trendingItems: React.PropTypes.object,
  isFetchingTrendingData: React.PropTypes.bool.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onTopicClick: React.PropTypes.func.isRequired,
  onRefreshTrendingItems: React.PropTypes.func.isRequired,
};
export default DiscoveryFeedRender;
