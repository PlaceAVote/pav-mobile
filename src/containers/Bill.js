/**
 * Bill.js
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
import {findCommentPath} from '../lib/Utils/commentCrawler';

/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   BillRender
 */
import BillRender from '../components/Bills/BillRender'

import CONFIG from '../config/config';
import React from 'react';
import {Linking} from 'react-native';



import {
ScheneKeys,
Other,
Modals,
BillPageTabs
} from '../config/constants';
const {
  REACTIONS,
  SOCIAL_TYPES,
  NEWS_FEED_FILTERS
} = Other;
const {
  VOTE,
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
  billActions,
  globalActions
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







class Bill extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
  }
  componentDidMount(){


    // this.connectAndGetBills("hr2-114");
    if(this.props.billId!=null && (this.props.bill.data==null ||  (this.props.bill.data!=null && this.props.bill.data.get("bill_id")!=this.props.billId))){
      this.props.actions.clearPastBillData();
      this.connectAndGetBills(this.props.billId);

    }
  }


  connectAndGetBills(billId){
    this.props.actions.getBill(billId, this.TOKEN, this.props.global.isDev);
    this.props.actions.getBillTopComments(billId, this.TOKEN, this.props.global.isDev);
    this.props.actions.getBillComments(billId, "highest-score", this.TOKEN, this.props.global.isDev);
  }



  onVoteBtnPress(){
    // this.props.actions.setModalVisibility(VOTE, true);
    this.props.actions.navigateTo(VOTE);
  }

  onSponsorClick(sponsor){
    if(!!sponsor.sponsorUrl){
      Linking.openURL(sponsor.sponsorUrl).catch(err => console.error('An error occurred while trying to open url: '+sponsor.sponsorUrl, err));
    }
  }

  onDownloadBillAsPDF(pdfUrl){
    if(!!pdfUrl){
      // alert(pdfUrl+" EXISTS")
      Linking.openURL(pdfUrl).catch(err => console.error('An error occurred while trying to open url: '+pdfUrl, err));
    }
  }

  async onCommentsRefresh(sortFilter){
    await this.props.actions.getBillComments(this.props.bill.data.get("bill_id"), sortFilter, this.TOKEN, this.props.global.isDev);
  }
  onCommentUserClick(userId, photoUrl){
    this.props.actions.navigateTo(PROFILE, {userId:userId, isTab:false});
  }
  async onCommentLikeDislikeClick(reaction, commentId, billId, curLikeDislikeEnabled){
    // alert(" curLikeDislikeEnabled: "+curLikeDislikeEnabled);
    switch(reaction){
      case REACTIONS.HAPPY:
        return await this.props.actions.likeCommentBill(commentId, billId, curLikeDislikeEnabled, this.TOKEN, this.props.global.isDev);
      case REACTIONS.SAD:
        return await this.props.actions.dislikeCommentBill(commentId, billId, curLikeDislikeEnabled, this.TOKEN, this.props.global.isDev);
    }
  }
  async onCommentPost(comment, commentParentData){  //runs when the user hits the POST button either on a bill or on a comment reply box
    let postResponse = null;
    if(commentParentData.newCommentLvl==0){  //The user currently replies on a bill
      postResponse = await this.props.actions.commentOnBill(comment, commentParentData.billId, this.TOKEN, this.props.global.isDev);
    }else{  //The user currently replies on a lvl 1 comment
      postResponse = await this.props.actions.commentOnComment(comment, commentParentData.billId, commentParentData.commentId, commentParentData.newCommentLvl, this.TOKEN, this.props.global.isDev);
    }
    return (postResponse!=null);
  }
  onShowMoreCommentsClick(commentId, curCommentLvl){
    // console.log("Bill: "+JSON.stringify(this.props.bill));
    // let commentPath = findCommentPath(this.props.bill.comments.toJS(), commentId);
    this.props.actions.navigateTo(COMMENTS, {billId: this.props.bill.data.get("bill_id"), commentId: commentId, commentLvl: 0}, true);
  }


  onSocialClick(type, billData){
    let billTitle = billData.featured_bill_title || billData.short_title;
    let billId = billData.bill_id;
    switch(type){
      case SOCIAL_TYPES.TWITTER:
        let twitterUrl = "https://twitter.com/intent/tweet?text=Check%20out%20this%20bill%20%40placeavote&url=https%3A%2F%2Fwww.placeavote.com%2F%23!%2Fbill%2F"+billId;
        Linking.openURL(twitterUrl).catch(err => console.error('An error occurred while trying to post tweet with url: '+twitterUrl, err));
        break;
      case SOCIAL_TYPES.FACEBOOK:
        this.props.actions.shareFacebook({type:"bill", billId, billTitle}, this.TOKEN, this.props.global.isDev);
        break;
    }
  }

  onTagPress(tag){
    if(tag!=null && tag.length>0){
      let topicName = tag.toLowerCase();
      this.props.actions.setActivityFilter(NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER);
      setTimeout(()=>{
        this.props.actions.setTopicName(topicName);
        setTimeout(()=>{
          this.props.actions.navigateToPrevious();
        }, 100)
      }, 100)
      // this.props.actions.setTopicName(topicName);
      // this.props.actions.getDiscoveryItems(topicName, this.TOKEN, this.props.global.isDev)

    }
  }

  render() {
    // console.log("Bill visible: "+(this.props.name==this.props.router.currentSchene)+" because name: "+this.props.name+" and cur: "+this.props.router.currentSchene);
    return(
      <BillRender
          parentVisible={(this.props.name==this.props.router.currentSchene)}
          device={ this.props.device}
          bill={this.props.bill}
          initTab={this.props.initTab || BillPageTabs.SUMMARY}
          onSocialClick={this.onSocialClick.bind(this)}
          onTagPress={this.onTagPress.bind(this)}
          onVoteBtnPress={this.onVoteBtnPress.bind(this)}
          onSponsorClick={this.onSponsorClick.bind(this)}
          onDownloadBillAsPDF={this.onDownloadBillAsPDF.bind(this)}
          onCommentsRefresh={this.onCommentsRefresh.bind(this)}
          onCommentUserClick={this.onCommentUserClick.bind(this)}
          onCommentLikeDislikeClick={this.onCommentLikeDislikeClick.bind(this)}
          onCommentPost={this.onCommentPost.bind(this)}
          onShowMoreCommentsClick={this.onShowMoreCommentsClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Bill);
