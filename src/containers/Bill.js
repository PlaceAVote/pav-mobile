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
 *   BillRender
 */
import BillRender from '../components/Bills/BillRender'


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



//created 18/5/2016
const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY2MTY5NzE5LCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.mVwiw_-zA1En2y6eNYN1GErmL7t1NMlWzQRogi1vsOWOlkRNxcrgatyI3Akrd5LwS5NFSa5Lf8GlvdeeFFKEGEjqmFx_2UQ7MIvih9F9DlBZf6LJeeGHNXKembJV8ksJWktLmbspdk2_tVLvskjatJzPHrIM3-dJ_qJQBASEQhjUBRYKc9-GbvVCvL-xpveNkI6H350anJnsIFuOPBnpf3cQn7FJJNUuPdeTVXJIM1ZeqwFGqp7z_4qE2wuZQRwC_m8ELc9GizB62qqJcOWRmnbOLw8j4f59VtOMJVcECW7C7iuwq-0VECDJnv7jpkOTDSntYS-c4Std65m5dEpHQQ";
const DEV = false;








class Bill extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){

    this.connectAndGetBills("ma06001-114");

    //TODO: Uncomment
    // if(this.props.bill.data==null && !!this.props.billId){
    //   this.connectAndGetBills(this.props.billId);
    // }
  }

  async connectAndGetBills(billId){
    await this.props.actions.getBill(billId, TOKEN, DEV);
    this.props.actions.getBillTopComments(billId, TOKEN, DEV);
    this.props.actions.getBillComments(billId, "highest-score", TOKEN, DEV);
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
      Linking.openURL(pdfUrl).catch(err => console.error('An error occurred while trying to open url: '+pdfUrl, err));
    }
  }

  async onCommentsRefresh(sortFilter){
    await this.props.actions.getBillComments(this.props.bill.data.bill_id, sortFilter, TOKEN, DEV);
  }
  onCommentUserClick(userId){

  }
  onCommentLikeDislikeClick(reaction){

  }
  onCommentReplyClick(commentId, billId){
  }
  onCommentRepliesClick(replies, commentId){
    this.props.actions.navigateTo(COMMENTS, {billData: this.props.bill.data});
  }

  render() {
    return(
      <BillRender
          device={ this.props.device}
          bill={this.props.bill}
          onVoteBtnPress={this.onVoteBtnPress.bind(this)}
          onSponsorClick={this.onSponsorClick.bind(this)}
          onDownloadBillAsPDF={this.onDownloadBillAsPDF.bind(this)}
          onCommentsRefresh={this.onCommentsRefresh.bind(this)}
          onCommentUserClick={this.onCommentUserClick.bind(this)}
          onCommentLikeDislikeClick={this.onCommentLikeDislikeClick.bind(this)}
          onCommentReplyClick={this.onCommentReplyClick.bind(this)}
          onCommentRepliesClick={this.onCommentRepliesClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Bill);
