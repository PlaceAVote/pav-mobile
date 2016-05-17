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
    await this.props.actions.getBill(billId, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY1MTc0NjExLCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.kKjA6lS2GHGWNSsOTrVfGvKfG1y27-TXlR7Jx78UaYp2d4n83oQd5aepIYxgwcVqeyiEtyV-yr1X-2ieKMCPoRLqyip2U5ac8EskPkhSZ9Okd0xX3_6Y93ubHSg3_PdlnDA93TAJljzx17ZKAoWP21VckSdOiN31Yrbozgb8cMqzsa4tddm8O21k4jhIJWURduwIhm_6Ys46cz-2sffn73qGNq3b2PS9NqSt5NFSkae3IwtDZdnaPCg0cjSvq_7KMYgOCrQEnFjEiV6HdasPQilEeeCMvH9NWLf2T0l97uK2RvtHAwwv1RShyB66TgAQu_TU4O485VlKVMtgGo0xrA');
    await this.props.actions.getBillComments(billId, "highest-score", 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY1MTc0NjExLCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.kKjA6lS2GHGWNSsOTrVfGvKfG1y27-TXlR7Jx78UaYp2d4n83oQd5aepIYxgwcVqeyiEtyV-yr1X-2ieKMCPoRLqyip2U5ac8EskPkhSZ9Okd0xX3_6Y93ubHSg3_PdlnDA93TAJljzx17ZKAoWP21VckSdOiN31Yrbozgb8cMqzsa4tddm8O21k4jhIJWURduwIhm_6Ys46cz-2sffn73qGNq3b2PS9NqSt5NFSkae3IwtDZdnaPCg0cjSvq_7KMYgOCrQEnFjEiV6HdasPQilEeeCMvH9NWLf2T0l97uK2RvtHAwwv1RShyB66TgAQu_TU4O485VlKVMtgGo0xrA');
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
    await this.props.actions.getBillComments(this.props.bill.data.bill_id, sortFilter, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY1MTc0NjExLCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.kKjA6lS2GHGWNSsOTrVfGvKfG1y27-TXlR7Jx78UaYp2d4n83oQd5aepIYxgwcVqeyiEtyV-yr1X-2ieKMCPoRLqyip2U5ac8EskPkhSZ9Okd0xX3_6Y93ubHSg3_PdlnDA93TAJljzx17ZKAoWP21VckSdOiN31Yrbozgb8cMqzsa4tddm8O21k4jhIJWURduwIhm_6Ys46cz-2sffn73qGNq3b2PS9NqSt5NFSkae3IwtDZdnaPCg0cjSvq_7KMYgOCrQEnFjEiV6HdasPQilEeeCMvH9NWLf2T0l97uK2RvtHAwwv1RShyB66TgAQu_TU4O485VlKVMtgGo0xrA');
  }
  onCommentUserClick(){

  }
  onCommentLikeDislikeClick(){

  }
  onCommentReplyClick(){

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
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Bill);
