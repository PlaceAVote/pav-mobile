/* @flow weak */
/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as globalActions from '../../reducers/global/globalActions';



import LinearGradient from 'react-native-linear-gradient';

/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'

import ProgressBar from 'ProgressBarAndroid';

import moment from 'moment'



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {NEWS_FEED_FILTERS} = Other;
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, ActivityIndicatorIOS, TouchableOpacity, ListView, RefreshControl} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);





/**
* Icons library
*/

import Icon from 'react-native-vector-icons/FontAwesome';
import LImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


import ActivityFeedRender from './ActivityFeedRender';
import DiscoveryFeedRender from './DiscoveryFeedRender';
import FiltersRender from './FiltersRender';



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
  // globalActions
];

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}











class NewsFeedRender extends React.Component {
  constructor(props) {
    super(props);

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),

  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        paddingTop:64, //nav bar height
        paddingBottom:50, //tab bar height
        // marginVertical: 10,
        // marginHorizontal:15
      },
      scrollView:{
        flex:1,
        backgroundColor: '#E8E7EE',
      },
      headerView:{
        paddingVertical:h*0.02,
        paddingHorizontal:w*0.016,
        // backgroundColor:'red'
      },

      bodyLoadingContainer:{
        flex:1,
        // height:h*0.5,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red'
      },
      bodyContainerView:{
        flex:1,
        backgroundColor:'red'
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
  BODY - FEED
  */
  renderNewsFeedBody(filterName, isFetchingFeed, feedData, isFetchingDiscovery, discoveryData, styles){
    // console.log("RenderNewsFeedBody Ran with filterName: "+filterName+" while data "+(dataReady==true?"WAS ready.":"was NOT ready."))

      let dataReady=false;
      switch(filterName){
        case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
        case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
        case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
          dataReady= (!isFetchingFeed && feedData!=null)
          if(dataReady==true){
            return(
              <ActivityFeedRender
              key="bodyContainerView"
              feedData={feedData}
              device={this.props.device}
              curUser={this.props.auth.user}
              type="feed"
              onUserClick={this.props.onUserClick}
              onBillClick={this.props.onBillClick}
              onLikeDislikeClick={this.props.onLikeDislikeClick}
              onReplyClick={this.props.onReplyClick}
              onReactionClick={this.props.onReactionClick}
              onCommentClick={this.props.onCommentClick}
              onSocialClick={this.props.onSocialClick}
             />);
          }else{
            return (<View  key="bodyContainerView" style={styles.bodyLoadingContainer}></View>);
          }
        case NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER:
          dataReady = (!isFetchingDiscovery && discoveryData!=null)
          return(
            <DiscoveryFeedRender
              key="bodyContainerView"
              topicList={this.props.auth.form.fields.topicsList.toJS()}
              onTopicSelected={this.props.onTopicSelect}
              discoveryData={discoveryData}
              device={this.props.device}
              curUser={this.props.auth.user}
              onUserClick={this.props.onUserClick}
              onBillClick={this.props.onBillClick}
              onLikeDislikeClick={this.props.onLikeDislikeClick}
              onReplyClick={this.props.onReplyClick}
              onReactionClick={this.props.onReactionClick}
              onCommentClick={this.props.onCommentClick}
              onSocialClick={this.props.onSocialClick}
              />
            );
        case NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER:
          return (<View  key="bodyContainerView" style={styles.bodyLoadingContainer}><Text>Statistics page not ready yet</Text></View>);
      }
  }






  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
        <View style={styles.container}>
          <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
            refreshing={this.props.newsfeed.isFetching.newsFeedData || this.props.newsfeed.isFetching.discoveryData}
            onRefresh={this.props.onFeedRefresh}
            tintColor={Colors.primaryColor}
            title="Loading..."
            titleColor={Colors.primaryColor}
            colors={[Colors.primaryColor, '#00ff00', Colors.accentColor]}
          />}>
            <FiltersRender
              topicList={this.props.auth.form.fields.topicsList.toJS()}
              curSelectedTopic={this.props.newsfeed.newsFeedData.curSelectedTopic}
              curSelectedFilter={this.props.newsfeed.newsFeedData.curSelectedFilter}
              onFilterBtnClick={this.props.onFilterBtnClick}
              onTopicBtnClick={this.props.onTopicBtnClick}
              user={this.props.auth.user.firstName}
              orientation={this.props.device.orientation}
              style={styles.headerView}
            />



            {this.renderNewsFeedBody(this.props.newsfeed.newsFeedData.curSelectedFilter, this.props.newsfeed.isFetching.newsFeedData, this.props.newsfeed.newsFeedData.itemsAfterFiltration, this.props.newsfeed.isFetching.discoveryData, this.props.newsfeed.newsFeedData.discoveryItems, styles)}
          </ScrollView>
        </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.newsfeed !== this.props.newsfeed)
      ||
      (nextProps.auth.user !== this.props.auth.user)
      ||
      (nextProps.auth.form.fields.topicsList !== this.props.auth.form.fields.topicsList)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedRender);
