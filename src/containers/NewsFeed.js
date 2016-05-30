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



import {
ScheneKeys,
Other
} from '../config/constants';
const {
  NEWS_FEED_FILTERS,
  REACTIONS,
  SOCIAL_TYPES
} = Other;
const {
  MAIN,
  BILL,
  COMMENTS
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







const PROD_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY2MTY5NzE5LCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.mVwiw_-zA1En2y6eNYN1GErmL7t1NMlWzQRogi1vsOWOlkRNxcrgatyI3Akrd5LwS5NFSa5Lf8GlvdeeFFKEGEjqmFx_2UQ7MIvih9F9DlBZf6LJeeGHNXKembJV8ksJWktLmbspdk2_tVLvskjatJzPHrIM3-dJ_qJQBASEQhjUBRYKc9-GbvVCvL-xpveNkI6H350anJnsIFuOPBnpf3cQn7FJJNUuPdeTVXJIM1ZeqwFGqp7z_4qE2wuZQRwC_m8ELc9GizB62qqJcOWRmnbOLw8j4f59VtOMJVcECW7C7iuwq-0VECDJnv7jpkOTDSntYS-c4Std65m5dEpHQQ";
const DEV_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoid2hhdGV2YWhAcGxhY2Vhdm90ZS5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjdmODc0ZDI4LTU3MTMtNGZhOS1hMDljLTZhNDg3ODc2ZTAzMiIsImV4cCI6MTQ2NjM1NzY0NiwicHVibGljIjp0cnVlLCJzdGF0ZSI6IkRDIiwiemlwY29kZSI6IjIwMDAxIiwidG9waWNzIjpbInNleCIsImRydWdzIiwicm9ja05Sb2xsIl0sImNvdW50cnlfY29kZSI6IlVTQSIsImRvYiI6IjE0LzExLzE5ODkiLCJsYXN0X25hbWUiOiJEYVRlc3RhaCIsImxhdCI6IjM4LjkxMjA2OCIsInVzZXJfaWQiOiJlMjMzMzk0Yi1kYjEwLTRiMDMtYjNkNy02NTYxOTZmOTYyNDYiLCJnZW5kZXIiOiJtYWxlIiwicmVnaXN0ZXJlZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQ2MTE1ODU2MDY4NCwibG5nIjoiLTc3LjAxOTAyMjgiLCJkaXN0cmljdCI6IjAifQ.tZGdfcxCJ4d15cV0RhgXI0jJMm-I1cM0ANR3PGXe0Oni2Qm6Ci-MtMD7d1LxQd4GTAOuLKzeucMqC_jbYsrfgNX6TcE3Ua2hdcN5MQaxDGVsiFIi2A-UHt3_o6Ph5pFG4zuh5d-NfTC17GGmJxbi8roWpNdssR2rh2fuh6nRus_gOoibge8yU3EtEFEjpxTs4nSvTI1n6_B0AiVJrPEZunHNByIlZinDpjZJqe0-OMeEBzs26lzaaIerV8OZNy2WgqPS4aLj2WCe84xx6_oC8QFe7AoboGDDh4k2XVAHKNx022VLYqRG06bSyyrLur7Jvzra92b8h9m63eLy-iyDzA";







class NewsFeed extends React.Component {

  constructor(props) {
    super(props);
    this.TOKEN = props.global.isDev==true?DEV_TOKEN:PROD_TOKEN;
    if(this.props.newsfeed.newsFeedData.items==null){
      this.connectAndGetFeed();
    }
  }



  async connectAndGetFeed(){
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
    Orientation.addOrientationListener(this.orientationDidChange.bind(this).bind(this));
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






  onUserClickedUser(userId){
    alert("Tapped user with id: "+userId);
  }

  onUserClickedBill(billId){
    this.props.actions.navigateTo(BILL, {billId:billId});
    // alert("Tapped bill with id: "+billId);
  }

  onUserClickedLikeDislike(type){
    switch(type){
      case REACTIONS.HAPPY:
        alert("User tapped like");
        break;
      case REACTIONS.SAD:
        alert("User tapped dislike");
        break;
      default:
        break;
    }
  }

  async onUserClickedReply(commentId, billData){
    // this.props.onReplyClick(this.props.commentId,  );
    // alert("Tapped reply on a comment that belongs to bill with id: "+billId);
    let {bill_id} = billData;
    // console.log("Result: "+JSON.stringify(billData));
    // let result = await this.props.actions.getBillComments(bill_id, null, this.TOKEN, this.props.global.isDev);
    // console.log("Result: "+JSON.stringify(result.comments)+" of commentId: "+commentId);
    // let commentPath = findCommentPath(result.comments, commentId);
    // console.log("Result: "+JSON.stringify(commentPath));
    // billData: billData, commentPath: commentPath, commentLvl: commentPath.length-1
    // billData
    this.props.actions.navigateTo(COMMENTS, {billId: bill_id, commentId:commentId });
  }

  onUserClickedReaction(reaction){
    switch(reaction){
      case REACTIONS.HAPPY:
        alert("Happy reaction clicked");
        break;
      case REACTIONS.SAD:
        alert("Sad reaction clicked");
        break;
      case REACTIONS.NEUTRAL:
        alert("Neutral reaction clicked");
        break;
      default:
        break;
    }
  }

  onUserClickedComments(parentBillId){
    alert("User tapped a comment that can be found in bill with id: "+parentBillId);
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
