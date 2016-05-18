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


/**
 * The necessary React
 */
import React, {
  Component,
  Linking
} from 'react-native';



import {
ScheneKeys,
Other,
Modals
} from '../config/constants';
const {
  NEWS_FEED_FILTERS
} = Other;
const {
  VOTE,
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











class Comments extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){


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
  // async onCommentsRefresh(sortFilter){
  //   await this.props.actions.getCommentsComments(this.props.bill.data.bill_id, sortFilter, TOKEN, DEV);
  // }
  // onCommentUserClick(){
  //
  // }
  // onCommentLikeDislikeClick(){
  //
  // }
  // onCommentReplyClick(billId){
  //
  // }
  // onCommentRepliesClick(replies){
  //
  // }

  render() {
    return(
      <CommentsRender
          device={ this.props.device}
          billData={this.props.billData}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Comments);
