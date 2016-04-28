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


/**
 * The necessary React
 */
import React, {Component} from 'react-native';



const {
MAIN
} = require('../config/constants').ScheneKeys


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














class Profile extends Component {

  constructor(props) {
    super(props);
    // console.log("Now calling the get profile data action"+JSON.stringify(this.props));

    this.updateProfileData();

  }

  async updateProfileData(){
    var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY0MzQ0MjM5LCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.DdR4Enp8jn8nZCzilJbXyz_4Ce2Q1qWUgnzII2T9GtsfWYOVncPpkVKD3q-o89KoNrWfsG0eB8h3qFjQuQKH3nDMkcOrxikS6QPbDRAGDBsDo7SNP0hxipax0rwkjowBnFRA2g-baSHC74H4MAhrpYmg4JLnS5X74L8BiTwSfnVOQpw8YqFsvlhJr68_sxhYj5prlaYy-GTgsFUcy_5RWdBvsHK3rlTRpFWVVDLIoDqNYlNsYBQREk6HDyLGnoTJQvWUiH5l2AlS7zs6sxReK1lDBydhYbiEdnLnq3wsclhac3i31qMWLfrnRXjfvcGfYPeFnl51y_v3JDDZeeWT0A";
    if(!!token){
      // console.log("TOKEN: "+JSON.stringify(token));
      this.getProfileData(token);
      this.getTimelineData(token)
    }
  }

  async getProfileData(token){
    var profileData = await this.props.actions.getProfile(null,token,false);
    if(!!profileData){
      return profileData;
    }else{
      return null;
    }
  }

  async getTimelineData(token){
    var timelineData = await this.props.actions.getTimeline(null,token,false);
    if(!!timelineData){
      return timelineData.results;
    }else{
      return null;
    }
  }


  orientationDidChange(orientation) {
    // console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange);
    this.props.actions.unlockOrientation();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  render() {
    return(
      <ProfileRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device }
          profile={ this.props.profile }
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile);
