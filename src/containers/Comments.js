/**
 * Comments.js
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
// import * as newsfeedActions from '../reducers/newsfeed/newsfeedActions';
import * as billActions from '../reducers/bill/billActions';

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
 *   CommentsRender
 */
import CommentsRender from '../components/Comments/CommentsRender'


import React from 'react';
import {Linking} from 'react-native';
import {findCommentPath, findCommentBasedOnPath, extractCommentParentByItsId} from '../lib/Utils/commentCrawler';

import CONFIG from '../config/config';
import {
ScheneKeys,
Other,
Modals
} from '../config/constants';
const {
  REACTIONS
} = Other;
const {
  VOTE,
  COMMENTS
} = ScheneKeys;


/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  routingActions,
  deviceActions,
  // newsfeedActions,
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








class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state={curCommentScopeData:[], commentLvl: this.props.commentLvl};
    this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
  }

  async componentWillMount(){
    if(this.props.billId!=null && (this.props.bill.data==null ||  (this.props.bill.data!=null && this.props.bill.data.bill_id!=this.props.billId))){
      this.props.actions.clearPastBillData();
      await this.connectAndGetBills(this.props.billId);
    }
    let commentData = this.props.replies || this.props.bill.comments;
    let {comment, commentLvl} = extractCommentParentByItsId(this.props.commentId, commentData);
    this.setState({curCommentScopeData:comment.replies, commentLvl: this.props.commentLvl || commentLvl});
  }

  async connectAndGetBills(billId){
    await this.props.actions.getBill(billId, this.TOKEN, this.props.global.isDev);
    await this.props.actions.getBillComments(billId, "highest-score", this.TOKEN, this.props.global.isDev);
    return 0;
  }


  // fetchCommentsFromGenericComObject(commentData, commentId){
  //   if(commentData!=null){
  //     return extractCommentParentByItsId(commentId, commentData);
  //     // console.log("Replies in Comment.js: "+(typeof curCommentData));
  //   }else{
  //
  //   }
  //   return null;
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.bill.comments!=null) {
      let previousCommentData = this.props.bill.comments;
      let nextCommentData = nextProps.bill.comments;
      if (this.props.commentId!=null && (previousCommentData==null || (nextCommentData!==previousCommentData))){
        // console.log(" @@@@@@@@@@@@@ Next props: "+(!!nextCommentData))
        let {comment, commentLvl} = extractCommentParentByItsId(this.props.commentId, nextCommentData);
        this.setState({
          curCommentScopeData: comment.replies,
          commentLvl: nextProps.commentLvl || commentLvl
        })
      }
    }
  }





  //
  // onVoteBtnPress(){
  //   // this.props.actions.setModalVisibility(VOTE, true);
  //   this.props.actions.navigateTo(VOTE);
  // }
  //
  // onSponsorClick(sponsor){
  //   if(!!sponsor.sponsorUrl){
  //     Linking.openURL(sponsor.sponsorUrl).catch(err => console.error('An error occurred while trying to open url: '+sponsor.sponsorUrl, err));
  //   }
  // }
  //
  // onDownloadCommentsAsPDF(pdfUrl){
  //   if(!!pdfUrl){
  //     Linking.openURL(pdfUrl).catch(err => console.error('An error occurred while trying to open url: '+pdfUrl, err));
  //   }
  // }
  //
  async onCommentsRefresh(sortFilter){
    await this.props.actions.getCommentsComments(this.props.bill.data.bill_id, sortFilter, this.TOKEN, this.props.global.isDev);
  }
  onCommentUserClick(userId, photoUrl){

  }
  async onCommentLikeDislikeClick(reaction, commentId, billId, curLikeDislikeEnabled){
    switch(reaction){
      case REACTIONS.HAPPY:
        return await this.props.actions.likeCommentBill(commentId, billId, curLikeDislikeEnabled, this.TOKEN, this.props.global.isDev);
      case REACTIONS.SAD:
        return await this.props.actions.dislikeCommentBill(commentId, billId, curLikeDislikeEnabled, this.TOKEN, this.props.global.isDev);
    }
  }

  async onCommentPostClick(comment, commentParentData){
    //this is always above lvl 0 of comments
    // alert(commentParentData.newCommentLvl==0?"Replying on a BILL":"Replying on a comment")
    let postResponse = null;
    postResponse = await this.props.actions.commentOnComment(comment, commentParentData.billId, commentParentData.commentId, commentParentData.newCommentLvl, this.TOKEN, this.props.global.isDev);
    return (postResponse!=null);
  }

  onShowMoreCommentsClick(commentId, curCommentLvl){
    // let commentPath = findCommentPath(this.props.bill.comments.toJS(), commentId);
    // this.props.actions.navigateTo(COMMENTS, {billData: this.props.bill.data.bill_id, commentPath: commentPath, commentLvl: curCommentLvl}, true);
    this.props.actions.navigateTo(COMMENTS, {billId: this.props.bill.data.bill_id, commentId: commentId, commentLvl: curCommentLvl}, true);
  }



  // prepareComments(){
  //   console.log("Result: "+JSON.stringify(billData));
  //   let result = await this.props.actions.getBillComments(bill_id, null, this.TOKEN, this.props.global.isDev);
  //   console.log("Result: "+JSON.stringify(result.comments)+" of commentId: "+commentId);
  //   let commentPath = findCommentPath(result.comments, commentId);
  //   console.log("Result: "+JSON.stringify(commentPath));
  //   billData: billData, commentPath: commentPath, commentLvl: commentPath.length-1
  // }







  render() {
    // console.log("@@: "+JSON.stringify(this.props.billData));


    // let {refToCurObject} = findCommentBasedOnPath(this.props.commentPath, this.props.bill.comments);
    // console.log("Comments visible: "+(this.props.name==this.props.router.currentSchene)+" because name: "+this.props.name+" and cur: "+this.props.router.currentSchene);
    return(
      <CommentsRender
          parentVisible={(this.props.name==this.props.router.currentSchene)}
          device={ this.props.device}
          billData={this.props.bill.data}
          commentBeingAltered={this.props.bill.commentBeingAltered}
          commentsBeingFetched={this.props.bill.isFetching.billComments}
          replies={this.state.curCommentScopeData}
          commentLvl={this.state.commentLvl}
          onCommentsRefresh={this.onCommentsRefresh.bind(this)}
          onUserClick={this.onCommentUserClick.bind(this)}
          onCommentPost={this.onCommentPostClick.bind(this)}
          onLikeDislikeClick={this.onCommentLikeDislikeClick.bind(this)}
          onShowMoreCommentsClick={this.onShowMoreCommentsClick.bind(this)}
      />

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
