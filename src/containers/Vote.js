/* @flow*/
/**
 * # Vote.js
 *
 *  The container to display the Vote form
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

import moment from 'moment';
/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   VoteRender
 */
import VoteRender from '../components/Vote/VoteRender';

import React from 'react';


/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  billActions,
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

class Vote extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
    this.state={
      userFirstName:""
    }
  }


  componentWillUnmount(){
    //HACK ish way to dispatch a BackAction because RNRF does not dispatch it itself.
    if(this.props.router.currentSchene==VOTE){
      this.props.actions.manualStateChangeNavigateToPrevious();
    }
  }


  async componentWillMount(){
      let uInfo = await this.props.actions.getBasicUserInfo()
      this.setState({
        userFirstName:uInfo.first_name
      })
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
    let postResponse = await this.props.actions.commentOnComment(comment, commentParentData.billId, commentParentData.commentId, commentParentData.newCommentLvl, this.TOKEN, this.props.global.isDev);
    return (postResponse!=null);
  }

  onShowMoreCommentsClick(commentId, curCommentLvl){
    this.props.actions.navigateTo(COMMENTS, {billId: this.props.bill.data.get("bill_id"), commentId: commentId, commentLvl: 0}, true);
  }

  onCloseBtnTap(){
      // alert("on close");
      this.props.actions.navigateToPrevious();
  }

  onVoteBtnTap(billId, vote){
    this.props.actions.voteBill(billId, vote, this.TOKEN, this.props.global.isDev);
  }

  render() {
    //
    return(
      <VoteRender
          device={this.props.device}
          billData={this.props.bill.data}
          userFirstName={this.state.userFirstName}
          topForComment={this.props.bill.commentTopFor!=null?this.props.bill.commentTopFor.toJS():null}
          topAgainstComment={this.props.bill.commentTopAgainst!=null?this.props.bill.commentTopAgainst.toJS():null}
          onCloseBtnTap={this.onCloseBtnTap.bind(this)}
          onVoteBtnPressed={this.onVoteBtnTap.bind(this)}

          onUserClick={this.onCommentUserClick.bind(this)}
          onLikeDislikeClick={this.onCommentLikeDislikeClick.bind(this)}
          onCommentPost={this.onCommentPost.bind(this)}
          onShowMoreCommentsClick={this.onShowMoreCommentsClick.bind(this)}

      />
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Vote);
