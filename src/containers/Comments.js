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




//created 18/5/2016

const PROD_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY2MTY5NzE5LCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.mVwiw_-zA1En2y6eNYN1GErmL7t1NMlWzQRogi1vsOWOlkRNxcrgatyI3Akrd5LwS5NFSa5Lf8GlvdeeFFKEGEjqmFx_2UQ7MIvih9F9DlBZf6LJeeGHNXKembJV8ksJWktLmbspdk2_tVLvskjatJzPHrIM3-dJ_qJQBASEQhjUBRYKc9-GbvVCvL-xpveNkI6H350anJnsIFuOPBnpf3cQn7FJJNUuPdeTVXJIM1ZeqwFGqp7z_4qE2wuZQRwC_m8ELc9GizB62qqJcOWRmnbOLw8j4f59VtOMJVcECW7C7iuwq-0VECDJnv7jpkOTDSntYS-c4Std65m5dEpHQQ";
const DEV_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoid2hhdGV2YWhAcGxhY2Vhdm90ZS5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjdmODc0ZDI4LTU3MTMtNGZhOS1hMDljLTZhNDg3ODc2ZTAzMiIsImV4cCI6MTQ2NjM1NzY0NiwicHVibGljIjp0cnVlLCJzdGF0ZSI6IkRDIiwiemlwY29kZSI6IjIwMDAxIiwidG9waWNzIjpbInNleCIsImRydWdzIiwicm9ja05Sb2xsIl0sImNvdW50cnlfY29kZSI6IlVTQSIsImRvYiI6IjE0LzExLzE5ODkiLCJsYXN0X25hbWUiOiJEYVRlc3RhaCIsImxhdCI6IjM4LjkxMjA2OCIsInVzZXJfaWQiOiJlMjMzMzk0Yi1kYjEwLTRiMDMtYjNkNy02NTYxOTZmOTYyNDYiLCJnZW5kZXIiOiJtYWxlIiwicmVnaXN0ZXJlZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQ2MTE1ODU2MDY4NCwibG5nIjoiLTc3LjAxOTAyMjgiLCJkaXN0cmljdCI6IjAifQ.tZGdfcxCJ4d15cV0RhgXI0jJMm-I1cM0ANR3PGXe0Oni2Qm6Ci-MtMD7d1LxQd4GTAOuLKzeucMqC_jbYsrfgNX6TcE3Ua2hdcN5MQaxDGVsiFIi2A-UHt3_o6Ph5pFG4zuh5d-NfTC17GGmJxbi8roWpNdssR2rh2fuh6nRus_gOoibge8yU3EtEFEjpxTs4nSvTI1n6_B0AiVJrPEZunHNByIlZinDpjZJqe0-OMeEBzs26lzaaIerV8OZNy2WgqPS4aLj2WCe84xx6_oC8QFe7AoboGDDh4k2XVAHKNx022VLYqRG06bSyyrLur7Jvzra92b8h9m63eLy-iyDzA";
const DEV = true;

const TOKEN = DEV==true?DEV_TOKEN:PROD_TOKEN;






class Comments extends React.Component {

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
  async onCommentsRefresh(sortFilter){
    await this.props.actions.getCommentsComments(this.props.bill.data.bill_id, sortFilter, TOKEN, DEV);
  }
  onCommentUserClick(userId, photoUrl){

  }
  onCommentLikeDislikeClick(){

  }
  async onCommentPostClick(comment, commentParentData){
    //this is always above lvl 0 of comments
    // alert(commentParentData.newCommentLvl==0?"Replying on a BILL":"Replying on a comment")
    let postResponse = null;
    postResponse = await this.props.actions.commentOnComment(comment, commentParentData.billId, commentParentData.commentId, commentParentData.newCommentLvl, TOKEN, DEV);
    return (postResponse!=null);
  }
  onShowMoreCommentsClick(replies){

  }



  // componentWillReceiveProps (nextProps) {
  //   console.log("Comment will receive props: "+nextProps.parentId);
  //   if (nextProps.parentId!=null && nextProps.parentId!==this.props.parentId) {
  //     let commentPath = findCommentPath(this.props.bill.comments, nextProps.parentId)
  //     console.log("commentPath: "+commentPath);
  //     this.setState({curCommentPath:commentPath[0]})
  //   }
  // }

  render() {
    // console.log("@@: "+JSON.stringify(this.props.billData));
/*
     let replies = [{"author_last_name":"Blair","body":"What will any if that matter if people and nature start to die?","has_children":false,"replies":[],"author":"1612cbc1-5a45-499f-9a96-e7fb0a8fdf5c","liked":false,"author_first_name":"Dylan","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463670268340,"id":"509b06f7-9966-470f-a508-edf38cebca6f","comment_id":"509b06f7-9966-470f-a508-edf38cebca6f","author_img_url":null,"disliked":false},{"author_last_name":"Huston","body":"So, why not focus more on energy efficient programs and create jobs that will stir us away from it instead of worrying about a .02 cent reduction in gas and some odd government countracted out jobs those in the community may not see from the start?","has_children":true,"replies":[{"author_last_name":"Brooks","body":"I agree, we should definitely incentivize energy efficient programs but these take a long time to show results. In the meantime, why not have a safe, needed pipeline?","has_children":false,"replies":[],"author":"8e79c4e0-ca7e-4aab-b763-2c6d32042e4e","liked":false,"author_first_name":"John","parent_id":"5c38b2bc-1d07-4bb0-80bb-d467f6068f9d","score":0,"bill_id":"ma06001-114","timestamp":1463626727369,"id":"8cbb7941-c5e6-469b-9556-d933917b8dab","comment_id":"8cbb7941-c5e6-469b-9556-d933917b8dab","author_img_url":"https://cdn.placeavote.com/users/8e79c4e0-ca7e-4aab-b763-2c6d32042e4e/profile/img/p200xp200x/ced1cfa8-0ab0-49cb-87f5-9af84c554d56.jpeg","disliked":false}],"author":"170cfe27-1c48-4771-b6f9-afb82cd69b36","liked":false,"author_first_name":"Darrius","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463604810833,"id":"5c38b2bc-1d07-4bb0-80bb-d467f6068f9d","comment_id":"5c38b2bc-1d07-4bb0-80bb-d467f6068f9d","author_img_url":null,"disliked":false},{"author_last_name":"Brooks","body":"I'd love to see data on this. I am pretty sure that the +'s outweigh the -'s","has_children":false,"replies":[],"author":"8e79c4e0-ca7e-4aab-b763-2c6d32042e4e","liked":false,"author_first_name":"John","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463626666664,"id":"47be2f1b-2cd7-49fd-81c9-1be007889ae2","comment_id":"47be2f1b-2cd7-49fd-81c9-1be007889ae2","author_img_url":"https://cdn.placeavote.com/users/8e79c4e0-ca7e-4aab-b763-2c6d32042e4e/profile/img/p200xp200x/ced1cfa8-0ab0-49cb-87f5-9af84c554d56.jpeg","disliked":false},{"author_last_name":"Ervine","body":"We use the same excuse all the time, the environment always comes second for economic reasons.  I prefer citizens in the area jump all over the environmental issues before considering the economic impacts.  It says something about the people of this area if there first thought isn't the mighty buck.","has_children":false,"replies":[],"author":"f661f34e-f53e-45e4-b591-74d652245a6a","liked":false,"author_first_name":"John","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463655885292,"id":"ae9cbd5b-5d0e-4659-9c93-2e5b72743e0c","comment_id":"ae9cbd5b-5d0e-4659-9c93-2e5b72743e0c","author_img_url":"https://cdn.placeavote.com/users/f661f34e-f53e-45e4-b591-74d652245a6a/profile/img/p200xp200x/7330bf0a-0054-4050-81a1-86142c6d86b4.jpeg","disliked":false},{"author_last_name":"Dupuis","body":"Not just building the pipeline type jobs,  but jobs in hazardous waste cleanup when the pipeline falls.  Thanks but no thanks.  That' like renting a room in your house to a known child predator because you need money.  There's plenty of better people to rent to when you have kids in the house. I'd rather see jobs brought to the area such as rebuilding our already crumbling infrastructure or building and maintaining renewable energy.","has_children":true,"replies":[{"author_last_name":"Brooks","body":"We need ALL of those things....roads, jobs, infrastructure...I agree. But we can build a pipeline safely. Let's not limit it just because of a potential risk. Let's analyze the risk and do a good job of insuring against problems.","has_children":false,"replies":[],"author":"8e79c4e0-ca7e-4aab-b763-2c6d32042e4e","liked":false,"author_first_name":"John","parent_id":"103bc95f-958c-4ad6-aab3-433a4ade226d","score":0,"bill_id":"ma06001-114","timestamp":1463626797929,"id":"040b553d-acb2-4420-8c10-b23dc491bd3f","comment_id":"040b553d-acb2-4420-8c10-b23dc491bd3f","author_img_url":"https://cdn.placeavote.com/users/8e79c4e0-ca7e-4aab-b763-2c6d32042e4e/profile/img/p200xp200x/ced1cfa8-0ab0-49cb-87f5-9af84c554d56.jpeg","disliked":false}],"author":"bb6fa77d-595d-4579-ba7f-198baec587a0","liked":false,"author_first_name":"Chani","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463611706630,"id":"103bc95f-958c-4ad6-aab3-433a4ade226d","comment_id":"103bc95f-958c-4ad6-aab3-433a4ade226d","author_img_url":"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13240769_10153974218665971_71252048418846233_n.jpg?oh=e37d0c175c408f81e427fcb09aad5f25&oe=579F6CEE","disliked":false},{"author_last_name":"Widi","body":"It also invokes eminent domain, which is an unfair and blatantly illegal principle. I am by no means an environmentalist, but I have to disagree with you out of respect for property rights.","has_children":true,"replies":[{"author_last_name":"Brooks","body":"This i agree with. Eminent domain gets scary fast. People need to be fairly compensated. Is there an independent agency deciding on property values for those properties taken over?","has_children":false,"replies":[],"author":"8e79c4e0-ca7e-4aab-b763-2c6d32042e4e","liked":false,"author_first_name":"John","parent_id":"78e37446-1525-459a-8458-df4be18242de","score":0,"bill_id":"ma06001-114","timestamp":1463626929371,"id":"a9810e12-5f32-4a04-b1ad-e51360acd132","comment_id":"a9810e12-5f32-4a04-b1ad-e51360acd132","author_img_url":"https://cdn.placeavote.com/users/8e79c4e0-ca7e-4aab-b763-2c6d32042e4e/profile/img/p200xp200x/ced1cfa8-0ab0-49cb-87f5-9af84c554d56.jpeg","disliked":false}],"author":"0b41f111-f0ab-4d09-a4d4-09cb5c80a5d3","liked":false,"author_first_name":"Witty","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463427930523,"id":"78e37446-1525-459a-8458-df4be18242de","comment_id":"78e37446-1525-459a-8458-df4be18242de","author_img_url":null,"disliked":false},{"author_last_name":"Veatch","body":"And then after the pipeline is built, the jobs disappear. Then you're left with the ongoing  environmental problems - the pipeline WILL leak.","has_children":true,"replies":[{"author_last_name":"Brooks","body":"It is all about managed risk. Do you drive to work? Do you know that driving is dangerous? That is why we have seatbelts and speed limits.","has_children":true,"replies":[{"author_last_name":"Blair","body":"Even if the pipeline doesn't leak or have anything go wrong, they are building it through a forest. That means they are going to have to cut downs thousands of trees. That means they will have to disrupt the forests ecosystem with its presence and with a constant flow of workers to maintain the pipeline. It also is going to take a while to construct, and that process will not be very friendly to the surrounding area, I'm sure. Not to mention the fact that we shouldn't even be using fossil fuels anymore, let alone building new, expensive infrastructure for it.","has_children":false,"replies":[],"author":"1612cbc1-5a45-499f-9a96-e7fb0a8fdf5c","liked":false,"author_first_name":"Dylan","parent_id":"81dd1ea7-fc06-471e-8120-54c28afe155c","score":0,"bill_id":"ma06001-114","timestamp":1463670662790,"id":"1307b59c-abb4-4f3e-b365-1cbb0c48b4bb","comment_id":"1307b59c-abb4-4f3e-b365-1cbb0c48b4bb","author_img_url":null,"disliked":false}],"author":"8e79c4e0-ca7e-4aab-b763-2c6d32042e4e","liked":false,"author_first_name":"John","parent_id":"fd6c3296-2af8-42aa-9017-d513c3a46e7c","score":0,"bill_id":"ma06001-114","timestamp":1463626829066,"id":"81dd1ea7-fc06-471e-8120-54c28afe155c","comment_id":"81dd1ea7-fc06-471e-8120-54c28afe155c","author_img_url":"https://cdn.placeavote.com/users/8e79c4e0-ca7e-4aab-b763-2c6d32042e4e/profile/img/p200xp200x/ced1cfa8-0ab0-49cb-87f5-9af84c554d56.jpeg","disliked":false}],"author":"863a8a53-a4ad-45e6-aa9e-6bb15b457d2b","liked":false,"author_first_name":"Thomas","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463496276486,"id":"fd6c3296-2af8-42aa-9017-d513c3a46e7c","comment_id":"fd6c3296-2af8-42aa-9017-d513c3a46e7c","author_img_url":null,"disliked":false},{"author_last_name":"De Gress","body":"we need to stop funding pipelines and start funding a green economy. Jobs will come from a change towards the green economy too. They will be cleaner, more sustainable, more fulfilling jobs rather than short term, destructive jobs. Which kind of legacy would those workers rather leave behind?","has_children":true,"replies":[{"author_last_name":"Brooks","body":"That is super vague. What are green economy jobs? You are typing on a computer that requires all sorts of chemicals to run. Do you want to give up your computer? Or do you want to ensure that it is made in the safest way possible?","has_children":false,"replies":[],"author":"8e79c4e0-ca7e-4aab-b763-2c6d32042e4e","liked":false,"author_first_name":"John","parent_id":"0508975a-8b4e-471a-8d95-9111966d1b0f","score":0,"bill_id":"ma06001-114","timestamp":1463626874751,"id":"65aff501-bbc6-4b1c-b796-cfaf0729f109","comment_id":"65aff501-bbc6-4b1c-b796-cfaf0729f109","author_img_url":"https://cdn.placeavote.com/users/8e79c4e0-ca7e-4aab-b763-2c6d32042e4e/profile/img/p200xp200x/ced1cfa8-0ab0-49cb-87f5-9af84c554d56.jpeg","disliked":false}],"author":"20a96867-f29c-44cb-9c57-15ff526550e6","liked":false,"author_first_name":"Betsy","parent_id":"63959ea5-c2d7-4a97-af77-855ce43d9196","score":0,"bill_id":"ma06001-114","timestamp":1463542972924,"id":"0508975a-8b4e-471a-8d95-9111966d1b0f","comment_id":"0508975a-8b4e-471a-8d95-9111966d1b0f","author_img_url":"https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/10389249_1442037046079198_4697932675443479586_n.jpg?oh=e9c5abf098b16ff439ebe9367806e102&oe=57A518B1","disliked":false}];
     commentData={replies}
     commentLvl={1}
*/
    let curComments = this.props.bill.comments.get(this.props.commentPath).get("replies");
    return(
      <CommentsRender
          device={ this.props.device}
          billData={this.props.billData}
          commentBeingPosted={this.props.bill.isFetching.commentBeingPosted}
          commentsBeingFetched={this.props.bill.isFetching.billComments}
          replies={curComments}
          commentLvl={this.props.commentLvl}
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
