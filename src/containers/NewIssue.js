/* @flow*/
/**
 * # NewIssue.js
 *
 *  The container to display the NewIssue form
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
import CONFIG from '../config/config';
import {
ScheneKeys,
Other,
Modals,
BillPageTabs
} from '../config/constants';
const {
  REACTIONS
} = Other;
const {
  SEARCH_BILL,
  ATTACH_URL
} = Modals;
const {
  VOTE,
  PROFILE,
  COMMENTS
} = ScheneKeys;
/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
// import * as deviceActions from '../reducers/device/deviceActions';
import * as billActions from '../reducers/bill/billActions';
import * as newsfeedActions from '../reducers/newsfeed/newsfeedActions';


import {extractDomain} from '../lib/Utils/genericUtils';

import moment from 'moment';
/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   NewIssueRender
 */
import NewIssueRender from '../components/NewIssue/NewIssueRender';

import React from 'react';


/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  billActions,
  newsfeedActions
  // deviceActions
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







// function buttonPressHandler(name, surname) {
//
// }

class NewIssue extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
    this.state={
      relatedArticle:null,
      relatedBill:null,
      searchBillData:null
    }
  }


  async onUrlAttached(url){
    //get url image and then setState
    // console.log("token: "+this.TOKEN+" dev: "+this.props.global.isDev)
    let res = await this.props.actions.scrapeUrlItems(url, this.TOKEN, this.props.global.isDev);
    console.log("RESULT: "+JSON.stringify(res))
    let relatedArticle = {
      url: res.article_link || extractDomain(res.article_link),
      title:res.article_title || extractDomain(res.article_link),
      img: res.article_img
    };
    this.setState({relatedArticle})
    return relatedArticle;

  }
  // componentWillUnmount(){
  //   //HACK ish way to dispatch a BackAction because RNRF does not dispatch it itself.
  //   if(this.props.router.currentSchene==VOTE){
  //     this.props.actions.manualStateChangeNavigateToPrevious();
  //   }
  // }


  // async componentWillMount(){
  //     let uInfo = await this.props.actions.getBasicUserInfo()
  //     this.setState({
  //       userFirstName:uInfo.first_name
  //     })
  // }
  // onCommentUserClick(userId, photoUrl){
  //   this.props.actions.navigateTo(PROFILE, {userId:userId, isTab:false});
  // }
  //
  // async onCommentLikeDislikeClick(reaction, commentId, billId, curLikeDislikeEnabled){
  //   // alert(" curLikeDislikeEnabled: "+curLikeDislikeEnabled);
  //   switch(reaction){
  //     case REACTIONS.HAPPY:
  //       return await this.props.actions.likeCommentBill(commentId, billId, curLikeDislikeEnabled, this.TOKEN, this.props.global.isDev);
  //     case REACTIONS.SAD:
  //       return await this.props.actions.dislikeCommentBill(commentId, billId, curLikeDislikeEnabled, this.TOKEN, this.props.global.isDev);
  //   }
  // }
  //
  // async onCommentPost(comment, commentParentData){  //runs when the user hits the POST button either on a bill or on a comment reply box
  //   let postResponse = await this.props.actions.commentOnComment(comment, commentParentData.billId, commentParentData.commentId, commentParentData.newCommentLvl, this.TOKEN, this.props.global.isDev);
  //   return (postResponse!=null);
  // }
  //
  // onShowMoreCommentsClick(commentId, curCommentLvl){
  //   this.props.actions.navigateTo(COMMENTS, {billId: this.props.bill.data.get("bill_id"), commentId: commentId, commentLvl: 0}, true);
  // }
  //
  // onCloseBtnTap(){
  //     // alert("on close");
  //     this.props.actions.navigateToPrevious();
  // }
  //
  // onNewIssueBtnTap(billId, vote){
  //   this.props.actions.voteBill(billId, vote, this.TOKEN, this.props.global.isDev);
  // }


  async onBillSearchTermChanged(value){

    let res = await this.props.actions.searchBillByTermItems(value, this.TOKEN, this.props.global.isDev)
    // console.log("search term: "+value+" results: "+JSON.stringify(res));
    if(!!res){
      this.setState({searchBillData:res})
    }else{
      this.setState({searchBillData:null})
    }
  }

  async onIssuePost(issueBody, attachedBillId, attachedUrl){

    let res = await this.props.actions.createNewIssue(issueBody, attachedBillId, attachedUrl, this.TOKEN, this.props.global.isDev);
    this.props.actions.navigateToPrevious();
  }

  onClose(){
    this.props.actions.setModalVisibility(SEARCH_BILL, false);
    this.props.actions.setModalVisibility(ATTACH_URL, false);
    this.props.actions.navigateToPrevious();
  }
  onRelatedArticleClicked(articleUrl){

  }

  onRelatedBillClicked(billId){

  }
  onBillAttached(billId, billTitle){
    this.setState({relatedBill:{billId:billId, billTitle:billTitle}})
  }
  removeAttachedArticle(){
    this.setState({relatedArticle:null})
  }
  removeAttachedBill(){
    this.setState({relatedBill:null})
  }



  render() {
    // console.log("Searching: "+this.props.bill.isFetching.searchBillData)
    /*urlModalVisible={this.props.router.modalIsOpen.get(ATTACH_URL)}
    showUrlAttachModal={()=>this.props.actions.setModalVisibility(ATTACH_URL, true)}
    hideUrlAttachModal={()=>this.props.actions.setModalVisibility(ATTACH_URL, false)}*/
    return(
      <NewIssueRender
          device={this.props.device}
          userPhotoUrl={this.props.auth.user.photoUrl}
          relatedArticle={this.state.relatedArticle}
          relatedBill={this.state.relatedBill}
          issueBeingPosted={this.props.newsfeed.isFetching.postingNewIssue}
          scrapedUrlBeingFetched={this.props.newsfeed.isFetching.scrapeUrlData}
          searchModalVisible={this.props.router.modalIsOpen.get(SEARCH_BILL)}

          showBillSearchModal={()=>this.props.actions.setModalVisibility(SEARCH_BILL, true)}
          hideBillSearchModal={()=>this.props.actions.setModalVisibility(SEARCH_BILL, false)}

          removeAttachedBill={this.removeAttachedBill.bind(this)}
          removeAttachedArticle={this.removeAttachedArticle.bind(this)}

          onSearchTermChanged={this.onBillSearchTermChanged.bind(this)}
          searchBillData={this.state.searchBillData}
          currentlySearching={this.props.bill.isFetching.searchBillData}
          onBillAttached={this.onBillAttached.bind(this)}

          onIssuePost={this.onIssuePost.bind(this)}
          onRelatedArticleClicked={this.onRelatedArticleClicked.bind(this)}
          onRelatedBillClicked={this.onRelatedBillClicked.bind(this)}
          onClose={this.onClose.bind(this)}
          onUrlAttached={this.onUrlAttached.bind(this)}
      />
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(NewIssue);
