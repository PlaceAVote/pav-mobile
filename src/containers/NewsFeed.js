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
import * as globalActions from '../reducers/global/globalActions';
// import * as billActions from '../reducers/bill/billActions';
import * as notificationActions from '../reducers/notifications/notificationActions'



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
Other,
BillPageTabs,
Modals
} from '../config/constants';
const {
  SEARCH_BILL
} = Modals;
const {
  NEWS_FEED_FILTERS,
  REACTIONS,
  SOCIAL_TYPES
} = Other;
const {
  MAIN,
  BILL,
  COMMENTS,
  PROFILE,
  NEWISSUE,
  TOPIC
} = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  globalActions,
  routingActions,
  deviceActions,
  newsfeedActions,
  billActions,
  notificationActions
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
    this.state={
      searchData:null
    }
  }

  componentWillMount(){
    if(this.props.newsfeed.newsFeedData.items==null){
      this.connectAndGetOther();
      this.connectAndGetFeed(false);
    }
  }

  connectAndGetOther(){
    this.props.actions.getNotificationItems(false, this.TOKEN, this.props.global.isDev)
    this.props.actions.getTrendingItems(this.TOKEN, this.props.global.isDev)
  }
  async connectAndGetFeed(fetchOld){
    // console.log("@@@ NEWS FEED "+this.TOKEN);
    return await this.props.actions.getFeedItems(fetchOld, this.TOKEN, this.props.global.isDev);
  }



  onFilterChanged(filterName){
    // alert("Filter clicked: "+filterName);
    this.props.actions.setActivityFilter(filterName);
    // if(filterName==NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER){
    //   this.props.actions.setActivityFilter(filterName);
    // }
    // else if(filterName==NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER){
    //   this.props.actions.setActivityFilter(filterName);
    //   this.getDiscoveryItemsForTopic(Other.TOPICS.TRENDING);
    // }else{
    //   this.props.actions.filterFeedItems(filterName, topicType);
    // }
  }

  // onTopicSelect(topicName){
  //   //
  //   let oldTopic = this.props.newsfeed.newsFeedData.curSelectedTopic;
  //   if(this.props.newsfeed.newsFeedData.discoveryItems.get(topicName)==null || oldTopic!=topicName){
  //     this.props.actions.setTopicName(topicName);
  //     setTimeout(()=>{
  //       this.getDiscoveryItemsForTopic(topicName);
  //     }, 50);
  //   }
  // }



  onFeedRefresh(){
        this.connectAndGetFeed();
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
    // console.log("Reaction: "+reaction+" commentId: "+commentId+" billId: "+billId+" newStatus: "+newStatus+"@@@@ DEV?"+this.props.global.isDev)
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
        this.props.actions.shareFacebook({type:"bill", billId:data.billId, billTitle:data.billTitle}, this.TOKEN, this.props.global.isDev);
        break;
      case SOCIAL_TYPES.TWITTER:
        let twitterUrl = "https://twitter.com/intent/tweet?text=Check%20out%20this%20bill%20%40placeavote&url=https%3A%2F%2Fwww.placeavote.com%2F%23!%2Fbill%2F"+data.billId;
        Linking.openURL(twitterUrl).catch(err => console.error('An error occurred while trying to post tweet with url: '+twitterUrl, err));
        break;
      default:
        break;
    }
  }

  async onBillSearchTermChanged(value){
    // alert("Searching "+value)
    let res = await this.props.actions.searchBillByTermItems(value, this.TOKEN, this.props.global.isDev)
    console.log("search term: "+value+" results: "+JSON.stringify(res));
    if(!!res){
      this.setState({searchData:res})
    }else{
      this.setState({searchData:null})
    }
  }

  onFetchMoreFeedItems(filterType){
    // console.log("On fetch more for filter: "+filterType+" with topic: "+topicName);

    switch(filterType){
      case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
      case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
      case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
        if(this.props.newsfeed.newsFeedData.items!=null && this.props.newsfeed.newsFeedData.lastFeedItemTimeStamp!=null && this.props.newsfeed.isFetching.olderNewsFeedData===false){
          this.connectAndGetFeed(true);
        }
        break;
      case NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER:
      default:
        break;
    }

  }

  onLeftNavBtnClick(){
    this.props.actions.setModalVisibility(SEARCH_BILL, !this.props.router.modalIsOpen.get(SEARCH_BILL));
  }

  onRightNavBtnClick(){
    this.props.actions.navigateTo(NEWISSUE);
  }

  onTopicClick(topicId){
    this.props.actions.navigateTo(TOPIC, {topicId});
  }

  render() {

    return(
      <NewsFeedRender

          device={ this.props.device}
          curSelectedFilter={this.props.newsfeed.newsFeedData.curSelectedFilter}


          curUser={this.props.auth.user}
          newsFeedItems={this.props.newsfeed.newsFeedData.items}
          trendingItems={this.props.newsfeed.newsFeedData.trendingItems}

          isFetchingNewsFeedData={this.props.newsfeed.isFetching.newsFeedData}
          isFetchingOlderNewsFeedData={this.props.newsfeed.isFetching.olderNewsFeedData}
          isFetchingTrendingData={this.props.newsfeed.isFetching.trendingData}


          searchModalVisible={this.props.router.modalIsOpen.get(SEARCH_BILL)}
          showBillSearchModal={()=>this.props.actions.setModalVisibility(SEARCH_BILL, true)}
          hideBillSearchModal={()=>this.props.actions.setModalVisibility(SEARCH_BILL, false)}
          currentlySearching={this.props.bill.isFetching.searchBillData}
          onSearchTermChanged={this.onBillSearchTermChanged.bind(this)}
          searchData={this.state.searchData}


          onLeftNavBtnClicked={this.onLeftNavBtnClick.bind(this)}
          onRightNavBtnClicked={this.onRightNavBtnClick.bind(this)}
          onFilterChanged={this.onFilterChanged.bind(this)}
          onFeedRefresh={this.onFeedRefresh.bind(this)}
          onUserClick={this.onUserClickedUser.bind(this)}
          onBillClick={this.onUserClickedBill.bind(this)}
          onLikeDislikeClick={this.onUserClickedLikeDislike.bind(this)}
          onReplyClick={this.onUserClickedReply.bind(this)}
          onReactionClick={this.onUserClickedReaction.bind(this)}
          onCommentClick={this.onUserClickedComments.bind(this)}
          onSocialClick={this.onUserClickedSocial.bind(this)}
          onFetchMoreItems={this.onFetchMoreFeedItems.bind(this)}
          onTopicClick={this.onTopicClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
