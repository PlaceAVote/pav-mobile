/**
 * NewsFeed.js
 *
 * Our main pav screen
 */
'use strict';






/**
 *           Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
// import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
import * as deviceActions from '../reducers/device/deviceActions';
import * as newsfeedActions from '../reducers/newsfeed/newsfeedActions';
import * as billActions from '../reducers/bill/billActions';
// import * as billActions from '../reducers/bill/billActions';



import Orientation from 'react-native-orientation';
/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   NewsFeedRender
 */
import NewsFeedRender from '../components/NewsFeed/NewsFeedRender'
import {findCommentPath} from '../lib/Utils/commentCrawler';

import React from 'react';
import {Linking} from 'react-native';

import CONFIG from '../config/config';

import {
ScheneKeys,
NewsFeedUpdateTypes,
Other,
BillPageTabs
} from '../config/constants';
const {
  NEWS_FEED_FILTERS,
  REACTIONS,
  SOCIAL_TYPES
} = Other;
const {
  MAIN,
  BILL,
  COMMENTS,
  PROFILE
} = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  routingActions,
  deviceActions,
  newsfeedActions,
  billActions
];

function mapStateToProps(state) {
  return {
      ...state
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









class NewsFeed extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
  }

  componentWillMount(){
    if(this.props.newsfeed.newsFeedData.items==null){
      this.connectAndGetFeed();
    }
  }

  async connectAndGetFeed(){
    // console.log("@@@ NEWS FEED - is dev: "+this.props.global.isDev);
    return await this.props.actions.getFeedItems(this.TOKEN, this.props.global.isDev);
  }
  async getDiscoveryItemsForTopic(topicString){
    return await this.props.actions.getDiscoveryItems(topicString, this.TOKEN, this.props.global.isDev);
  }

  orientationDidChange(orientation) {
    console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange.bind(this));
    this.props.actions.unlockOrientation();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange.bind(this));
  }


  onFilterBtnClick(filterName, topicType){
    // alert("Filter clicked: "+filterName);
    if(filterName==NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER){
      this.props.actions.setActivityFilter(filterName);
    }
    else if(filterName==NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER){
      this.props.actions.setActivityFilter(filterName);
      this.getDiscoveryItemsForTopic(Other.TOPICS.TRENDING);
    }else{
      this.props.actions.filterFeedItems(filterName, topicType);
    }
  }

  onTopicSelect(topicName){
    if(this.props.newsfeed.newsFeedData.discoveryItems.get(topicName)==null){
        this.getDiscoveryItemsForTopic(topicName);
    }
  }



  onFeedRefresh(){
        this.connectAndGetFeed();
      // console.log("Do something on feed refresh")
  }

  onDiscoveryRefresh(){
        // this.connectAndGetFeed();
      // console.log("Do something on feed refresh")
  }






  onUserClickedUser(userId){
    this.props.actions.navigateTo(PROFILE, {userId:userId, isTab:false});
  }

  onUserClickedBill(billId){
    this.props.actions.navigateTo(BILL, {billId:billId});
    // alert("Tapped bill with id: "+billId);
  }

  // onUserClickedLikeDislike(type){
  //   switch(type){
  //     case REACTIONS.HAPPY:
  //       alert("User tapped like");
  //       break;
  //     case REACTIONS.SAD:
  //       alert("User tapped dislike");
  //       break;
  //     default:
  //       break;
  //   }
  // }

  async onUserClickedLikeDislike(reaction, data){
    let {
      commentId,
      billId,
      newStatus,
      oldOpposite,
      oldScore
    } = data;
    console.log("Reaction: "+reaction+" commentId: "+commentId+" billId: "+billId+" newStatus: "+newStatus+"@@@@ DEV?"+this.props.global.isDev)
    let result = false;
    switch(reaction){
      case REACTIONS.HAPPY:
        result = !!await this.props.actions.likeCommentFeed(commentId, billId, newStatus, this.TOKEN, this.props.global.isDev);
        break;
      case REACTIONS.SAD:
        result = !!await this.props.actions.dislikeCommentFeed(commentId, billId, newStatus, this.TOKEN, this.props.global.isDev);
        break;
    }
    return result;
  }

  async onUserClickedReply(commentId, billData){
    let {bill_id} = billData;
    this.props.actions.navigateTo(COMMENTS, {billId: bill_id, commentId:commentId });
  }

  async onUserClickedReaction(issueId, newReaction, oldReaction){
    if(oldReaction==null || oldReaction=="" || oldReaction=="none"){  //if there was NO reaction till now
        return await this.props.actions.reactToIssueItem(issueId, newReaction, this.TOKEN, this.props.global.isDev);
    }else{  //if there WAS a reaction before
        if(newReaction!=oldReaction){ //if the reaction we pressed is NOT the same as what it used to be
          return await this.props.actions.reactToIssueItem(issueId, newReaction, this.TOKEN, this.props.global.isDev);
        }else{    //if the reaction we pressed is THE SAME as what it used to be
          return await this.props.actions.deleteReactionFromIssueItem(issueId, oldReaction, this.TOKEN, this.props.global.isDev);
        }
    }
  }

  onUserClickedComments(parentBillId){
    this.props.actions.navigateTo(BILL, {billId:parentBillId, initTab:BillPageTabs.COMMENTS});
  }

  onUserClickedSocial(socialType, data){
    switch(socialType){
      case SOCIAL_TYPES.SIMPLE_URL:
        Linking.openURL(data.url).catch(err => console.error('An error occurred while trying to open url: '+data.url, err));
        break;
      case SOCIAL_TYPES.FACEBOOK:
        alert("Facebook button clicked");
        break;
      case SOCIAL_TYPES.TWITTER:
        alert("Twitter button clicked");
        break;
      default:
        break;
    }
  }





  render() {
    return(
      <NewsFeedRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device}
          newsfeed={this.props.newsfeed}
          onFilterBtnClick={this.onFilterBtnClick.bind(this)}
          onTopicSelect={this.onTopicSelect.bind(this)}
          onFeedRefresh={this.onFeedRefresh.bind(this)}
          onDiscoveryRefresh={this.onDiscoveryRefresh.bind(this)}
          onUserClick={this.onUserClickedUser.bind(this)}
          onBillClick={this.onUserClickedBill.bind(this)}
          onLikeDislikeClick={this.onUserClickedLikeDislike.bind(this)}
          onReplyClick={this.onUserClickedReply.bind(this)}
          onReactionClick={this.onUserClickedReaction.bind(this)}
          onCommentClick={this.onUserClickedComments.bind(this)}
          onSocialClick={this.onUserClickedSocial.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
