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

const PROD_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY2MTY5NzE5LCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.mVwiw_-zA1En2y6eNYN1GErmL7t1NMlWzQRogi1vsOWOlkRNxcrgatyI3Akrd5LwS5NFSa5Lf8GlvdeeFFKEGEjqmFx_2UQ7MIvih9F9DlBZf6LJeeGHNXKembJV8ksJWktLmbspdk2_tVLvskjatJzPHrIM3-dJ_qJQBASEQhjUBRYKc9-GbvVCvL-xpveNkI6H350anJnsIFuOPBnpf3cQn7FJJNUuPdeTVXJIM1ZeqwFGqp7z_4qE2wuZQRwC_m8ELc9GizB62qqJcOWRmnbOLw8j4f59VtOMJVcECW7C7iuwq-0VECDJnv7jpkOTDSntYS-c4Std65m5dEpHQQ";
const DEV_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoid2hhdGV2YWhAcGxhY2Vhdm90ZS5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjdmODc0ZDI4LTU3MTMtNGZhOS1hMDljLTZhNDg3ODc2ZTAzMiIsImV4cCI6MTQ2NjM1NzY0NiwicHVibGljIjp0cnVlLCJzdGF0ZSI6IkRDIiwiemlwY29kZSI6IjIwMDAxIiwidG9waWNzIjpbInNleCIsImRydWdzIiwicm9ja05Sb2xsIl0sImNvdW50cnlfY29kZSI6IlVTQSIsImRvYiI6IjE0LzExLzE5ODkiLCJsYXN0X25hbWUiOiJEYVRlc3RhaCIsImxhdCI6IjM4LjkxMjA2OCIsInVzZXJfaWQiOiJlMjMzMzk0Yi1kYjEwLTRiMDMtYjNkNy02NTYxOTZmOTYyNDYiLCJnZW5kZXIiOiJtYWxlIiwicmVnaXN0ZXJlZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQ2MTE1ODU2MDY4NCwibG5nIjoiLTc3LjAxOTAyMjgiLCJkaXN0cmljdCI6IjAifQ.tZGdfcxCJ4d15cV0RhgXI0jJMm-I1cM0ANR3PGXe0Oni2Qm6Ci-MtMD7d1LxQd4GTAOuLKzeucMqC_jbYsrfgNX6TcE3Ua2hdcN5MQaxDGVsiFIi2A-UHt3_o6Ph5pFG4zuh5d-NfTC17GGmJxbi8roWpNdssR2rh2fuh6nRus_gOoibge8yU3EtEFEjpxTs4nSvTI1n6_B0AiVJrPEZunHNByIlZinDpjZJqe0-OMeEBzs26lzaaIerV8OZNy2WgqPS4aLj2WCe84xx6_oC8QFe7AoboGDDh4k2XVAHKNx022VLYqRG06bSyyrLur7Jvzra92b8h9m63eLy-iyDzA";
const DEV = true;

const TOKEN = DEV==true?DEV_TOKEN:PROD_TOKEN;









class Bill extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){

    this.connectAndGetBills("s2517-114");

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
  onCommentUserClick(userId, photoUrl){
    alert(photoUrl);
  }
  onCommentLikeDislikeClick(reaction){

  }
  async onCommentPost(comment, commentParentData){  //runs when the user hits the POST button either on a bill or on a comment reply box
    if(commentParentData.newCommentLvl==0){  //The user currently replies on a bill
      this.props.actions.commentOnBill(comment, commentParentData.billId, TOKEN, DEV);
    }else{  //The user currently replies on a lvl 1 comment
      await this.props.actions.commentOnComment(comment, commentParentData.billId, commentParentData.commentId, TOKEN, DEV);
      //TODO: refresh the comment parent now
    }
  }
  onShowMoreCommentsClick(replies, commentId, curCommentLvl){
    this.props.actions.navigateTo(COMMENTS, {billData: this.props.bill.data, replies: replies, commentLvl: (curCommentLvl+1)});
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
          onCommentPost={this.onCommentPost.bind(this)}
          onShowMoreCommentsClick={this.onShowMoreCommentsClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Bill);
