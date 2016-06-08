/* @flow weak */
/**
 * Profile.js
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
import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
import * as deviceActions from '../reducers/device/deviceActions';
import * as profileActions from '../reducers/profile/profileActions'

import Orientation from 'react-native-orientation';
/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import Immutable, {Map} from 'immutable';

/**
 *   ProfileRender
 */
import ProfileRender from '../components/Profile/ProfileRender'


import React from 'react';
import {Linking} from 'react-native';

import CONFIG from '../config/config';

import {
ScheneKeys,
Other,
BillPageTabs
} from '../config/constants';
const {
  REACTIONS,
  SOCIAL_TYPES
} = Other;
const {
  BILL,
  COMMENTS,
  PROFILE
} = ScheneKeys;




/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  deviceActions,
  profileActions
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














class Profile extends React.Component {

  constructor(props) {
    super(props);
    // console.log("Now calling the get profile data action"+JSON.stringify(this.props));
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }

    this.state = {
      curUser: {
        id:"",
        city:"",
        address:"",
        countryCode:"",
        createdAt:"",
        firstName:"",
        lastName:"",
        gender:"",
        zipCode:"",
        stateProvince:"",
        publicProfile:"",
        photoUrl:"",
        followerCnt:"-",
        followingCnt:"-",
        lastActivityTimestamp:"-",
        voteCnt:"-"
      },
      timelineItems:null,
      lastActivityTimestamp:null,
      voteCnt:"-",
      followerCnt:"-",
      followingCnt:"-",
      currentlyFollowingUser:null
    }
    // console.log("Profile environment dev? : "+props.global.isDev+" with token: "+this.TOKEN);
  }

  componentWillMount(){
    this.getProfileData(this.props.userId);
    this.getTimelineData(this.props.userId);
  }

  async getTimelineData(userId = null){
    if(userId!=null){  //if this is a different user than our current logged in user
      let timelineRes = await this.props.actions.getTimeline(userId, this.props.global.isDev, this.TOKEN);
      if(timelineRes!=null && timelineRes.results!=null){
        // console.log("@@@@@@@@@ timelineRES"+JSON.stringify(timelineRes.results));
        this.setState({
          timelineItems: Immutable.fromJS(timelineRes.results)
        })
      }
    }else{//if this is our current logged in user
      this.props.actions.getTimeline(null, this.props.global.isDev, this.TOKEN);
    }
  }

  async getProfileData(userId = null){
    let profileRes = await this.props.actions.getProfile(userId, this.props.global.isDev, this.TOKEN)
    if(profileRes!=null && profileRes.error!=null){
      alert("Error: "+profileRes.error);
    }

    if(userId!=null){  //if this is a different user than our current logged in user
      // console.log("@@@@@@@@@ profileRes"+JSON.stringify(profileRes.data));
      if(profileRes!=null && profileRes.data!=null){
        this.setState({
          curUser:{
            id:profileRes.data.user_id,
            city:profileRes.data.city,
            address:profileRes.data.address,
            countryCode:profileRes.data.country_code,
            createdAt:profileRes.data.created_at,
            firstName:profileRes.data.first_name,
            lastName:profileRes.data.last_name,
            gender:profileRes.data.gender,
            zipCode:profileRes.data.zipcode,
            stateProvince:profileRes.data.state,
            publicProfile:profileRes.data.public,
            photoUrl:profileRes.data.img_url,
          },
          lastActivityTimestamp:profileRes.data.last_activity,
          voteCnt:profileRes.data.total_votes,
          followingCnt:profileRes.data.total_following,
          followerCnt:profileRes.data.total_followers,
          currentlyFollowingUser:profileRes.data.following
        })
      }

    }
    // if(userId!=null){  //if this is a different user than our current logged in user
    //
    // }else{//if this is our current logged in user
    //
    // }




  }

  orientationDidChange(orientation) {
    // console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange.bind(this));
    this.props.actions.unlockOrientation();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange.bind(this));
  }

  async onFollowBtnPress(userId, currentlyFollowing){
    let success = false;
    if(currentlyFollowing===true){
      success = await this.props.actions.unfollowUser(userId, this.props.global.isDev, this.TOKEN)
      if(success){
        this.setState({
          currentlyFollowingUser:false
        })
      }
    }else{
      success = await this.props.actions.followUser(userId, this.props.global.isDev, this.TOKEN)
      this.setState({
        currentlyFollowingUser:true
      })
    }
  }

  onFeedRefresh(e){
    this.props.actions.getTimeline(this.props.userId, this.props.global.isDev, this.TOKEN);
  }










  onUserClickedUser(userId){
    // this.props.actions.refreshCurrentShene({userId:userId, isTab:false});
    // console.log("User id: "+(!!this.state.curUser && (this.state.curUser.id==userId))+"this.props.curUser.id: "+this.state.curUser.id+" when user id: "+userId);
    if(userId===this.props.userId ){
      alert("You are already within that users profile page.")
    }else if(!!this.state.curUser && (this.state.curUser.id==userId)){
      alert("You are already within your profile page.")
    }else{
      this.props.actions.navigateTo(PROFILE, {userId:userId, isTab:false}, true);
    }
  }

  onUserClickedBill(billId){
    this.props.actions.navigateTo(BILL, {billId:billId});
    // alert("Tapped bill with id: "+billId);
  }


  async onUserClickedLikeDislike(reaction, data){
    let {
      commentId,
      billId,
      newStatus,
      oldOpposite,
      oldScore
    } = data;
    console.log("Reaction: "+reaction+" commentId: "+commentId+" billId: "+billId+" newStatus: "+newStatus+"@@@@ DEV?"+this.props.global.isDev)
    let result = false;
    switch(reaction){
      case REACTIONS.HAPPY:
        result = !!await this.props.actions.likeCommentFeed(commentId, billId, newStatus, this.TOKEN, this.props.global.isDev);
        break;
      case REACTIONS.SAD:
        result = !!await this.props.actions.dislikeCommentFeed(commentId, billId, newStatus, this.TOKEN, this.props.global.isDev);
        break;
    }
    return result;
  }

  async onUserClickedReply(commentId, billData){
    let {bill_id} = billData;
    this.props.actions.navigateTo(COMMENTS, {billId: bill_id, commentId:commentId });
  }

  async onUserClickedReaction(issueId, newReaction, oldReaction){
    if(oldReaction==null || oldReaction=="" || oldReaction=="none"){  //if there was NO reaction till now
        return await this.props.actions.reactToIssueItem(issueId, newReaction, this.TOKEN, this.props.global.isDev);
    }else{  //if there WAS a reaction before
        if(newReaction!=oldReaction){ //if the reaction we pressed is NOT the same as what it used to be
          return await this.props.actions.reactToIssueItem(issueId, newReaction, this.TOKEN, this.props.global.isDev);
        }else{    //if the reaction we pressed is THE SAME as what it used to be
          return await this.props.actions.deleteReactionFromIssueItem(issueId, oldReaction, this.TOKEN, this.props.global.isDev);
        }
    }
  }


  onUserClickedComments(parentBillId){
    this.props.actions.navigateTo(BILL, {billId:parentBillId, initTab:BillPageTabs.COMMENTS});
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

  componentWillReceiveProps(nextProps,nextState){

      if(this.props.userId==null){  //if we're currently fetching data for the user of this app - ONLY RUN THE FOLLOWING CODE on that case
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@willReceiveProps: this.props.userId: "+(this.props.userId==null));
          if((nextProps.profile.form.timelineData!== this.props.profile.form.timelineData) && (nextProps.auth.user!== this.props.auth.user)){
            // console.log("@@@@@@@@@ BOTH");
            this.setState({
              curUser:nextProps.auth.user,
              timelineItems:nextProps.profile.form.timelineData
            });

          }else{

            if(nextProps.profile.form.timelineData!== this.props.profile.form.timelineData){
              // console.log("@@@@@@@@@ timeline only: "+nextProps.profile.form.timelineData);
              this.setState({
                timelineItems:nextProps.profile.form.timelineData
              });
            }
            if(nextProps.auth.user!== this.props.auth.user){
              // console.log("@@@@@@@@@ profile only: "+nextProps.auth.user);
              this.setState({
                curUser:nextProps.auth.user,
                lastActivityTimestamp:nextProps.profile.form.profileData.lastActivityTimestamp,
                voteCnt:nextProps.profile.form.profileData.voteCnt,
                followingCnt:nextProps.profile.form.profileData.voteCnt,
                followerCnt:nextProps.profile.form.profileData.voteCnt,
                currentlyFollowingUser:false,
              });
            }

          }//else end
      }
  }



  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log("########### Cur user update: "+(nextProps.curUser !== this.props.curUser));
  //     return(
  //       (nextProps.device !== this.props.device)
  //       ||
  //       (nextProps.isFetchingTimeline !== this.props.isFetchingTimeline)
  //       ||
  //       (nextProps.isFetchingProfile !== this.props.isFetchingProfile)
  //       ||
  //       (nextProps.isFetchingFollow !== this.props.isFetchingFollow)
  //       ||
  //       (nextProps.curUser !== this.props.curUser)
  //       ||
  //       (nextState.dataSource !== this.state.dataSource)
  //       ||
  //       (nextProps.lastActivityTimestamp !== this.props.lastActivityTimestamp)
  //       ||
  //       (nextProps.voteCnt !== this.props.voteCnt)
  //       ||
  //       (nextProps.followerCnt !== this.props.followerCnt)
  //       ||
  //       (nextProps.followingCnt !== this.props.followingCnt)
  //       ||
  //       (nextProps.currentlyFollowingUser !== this.props.currentlyFollowingUser)
  //     );
  //   }
  // }




  render() {
    return(
      <ProfileRender
          device={ this.props.device }
          lastActivityTimestamp={this.state.lastActivityTimestamp}
          voteCnt={this.state.voteCnt}
          followerCnt={this.state.followerCnt}
          followingCnt={this.state.followingCnt}
          currentlyFollowingUser={this.state.currentlyFollowingUser}

          isFetchingTimeline={this.props.profile.form.isFetching.timelineData}
          isFetchingProfile={this.props.profile.form.isFetching.profileData}
          isFetchingFollow={this.props.profile.form.isFetching.followUser}
          timelineData={this.state.timelineItems}
          curUser={this.state.curUser}
          isTab={this.props.isTab}

          onFollowBtnPress={this.onFollowBtnPress.bind(this)}
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



Profile.propTypes= {
  userId: React.PropTypes.string,

};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
