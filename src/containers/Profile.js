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
import {Map} from 'immutable';

/**
 *   ProfileRender
 */
import ProfileRender from '../components/Profile/ProfileRender'


import React from 'react';
import CONFIG from '../config/config';

import {ScheneKeys} from '../config/constants';
const {
MAIN
} = ScheneKeys


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
    // console.log("Profile environment dev? : "+props.global.isDev+" with token: "+this.TOKEN);
  }

  componentWillMount(){
    this.getProfileData()
  }

  async getProfileData(){
    this.props.actions.getProfile(null, this.props.global.isDev, this.TOKEN)
    this.props.actions.getTimeline(null, this.props.global.isDev, this.TOKEN)
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

  onFollowBtnPress(e){
    if(this.props.profile.form.profileData.currentlyFollowingUser){
      this.props.actions.unfollowUser(this.props.auth.user.id, this.props.global.isDev, this.TOKEN)
    }else{
      this.props.actions.followUser(this.props.auth.user.id, this.props.global.isDev, this.TOKEN)
    }

  }

  render() {
    return(
      <ProfileRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device }
          profile={ this.props.profile }
          isFetchingTimeline={this.props.profile.form.isFetching.timelineData}
          isFetchingProfile={this.props.profile.form.isFetching.profileData}
          isFetchingFollow={this.props.profile.form.isFetching.followUser}

          profileData={this.props.profile.form.profileData}
          timelineData={this.props.profile.form.timelineData}
          curUser={this.props.auth.user}
          onFollowBtnPress= {this.onFollowBtnPress.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile);
