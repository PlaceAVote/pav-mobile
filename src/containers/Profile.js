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
    this.loginAndGetToken();


  }



  async loginAndGetToken(){
    var userData = await this.props.actions.login("afakeaccount@placeavote.com", "Asdasd1"); //TODO: Remove that later on
    if(!!userData){
      this.updateProfileData(userData.token)
      return userData.token;
    }else{
      return null;
    }
  }

  async updateProfileData(token){
    // var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoiYWZha2VhY2NvdW50QHBsYWNlYXZvdGUuY29tIiwiZmlyc3RfbmFtZSI6IklvYW5uaXNkZXYiLCJjb25maXJtYXRpb24tdG9rZW4iOiIyZjk3ODg2Ni1jZjg1LTQ0MTMtYmRiNC05YmRlNmVkMWMxZjciLCJjaXR5IjoiV2hlbmV2ZXIsIFdoZXJldmVyIiwiZXhwIjoxNDY0NDMxNjQxLCJwdWJsaWMiOnRydWUsInN0YXRlIjoiREMiLCJ6aXBjb2RlIjoiMjAwMDEiLCJ0b3BpY3MiOlsiQ3JpbWUiLCJIZWFsdGhjYXJlIiwiVGF4ZXMiXSwiY291bnRyeV9jb2RlIjoiVVNBIiwiZG9iIjoiMTEvMTQvMTk4OSIsImxhc3RfbmFtZSI6Iktva2tpbmlkaXMiLCJsYXQiOiIzOC45MTIwNjgiLCJ1c2VyX2lkIjoiMzZlMmJlYTEtMzRhMi00N2M0LTllMzctNDE4ZmMzOTA3MWQ1IiwiZ2VuZGVyIjoibWFsZSIsInJlZ2lzdGVyZWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0NjE4MzkxMzE0NjYsImxuZyI6Ii03Ny4wMTkwMjI4IiwiZGlzdHJpY3QiOiIwIn0.fstUvbzXmPf9JitZDr-SRHS2UqJAK1Q0RYkmMcf_wPu_r6zI2XElRlplOODTRtJttp1wLaOAuA8AZ5W1VzxGJJ0LXgYUF5aXHYmLt1Pb5FmBTOCvdFVNtxC0Ty-FhmjKOPtod4sRtOa45kEQ0u3LTFwydcpn6A26MZ3Lz1ZGVnk061GrFoEagsQHAOx5JofAbn7mi1LEm-d02GNwfNb7BUynLJ1uPWwtUDYz7ELeeNXd_xkSH0kH8cNdm9cWqVoHtgWWr_bdzQZF5tS_gW_U1aySc7Y8P6eYNNYVkQqmLaxZR0_wUzZnfRx_spDxTHbUBHNO9dPkFNrWptfSfwKxEQ";
    if(!!token){
      // console.log("TOKEN: "+JSON.stringify(token));
      this.props.actions.getProfile(null, token)
      this.props.actions.getTimeline(null, token)
    }
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
    // var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoiYWZha2VhY2NvdW50QHBsYWNlYXZvdGUuY29tIiwiZmlyc3RfbmFtZSI6IklvYW5uaXNkZXYiLCJjb25maXJtYXRpb24tdG9rZW4iOiIyZjk3ODg2Ni1jZjg1LTQ0MTMtYmRiNC05YmRlNmVkMWMxZjciLCJjaXR5IjoiV2hlbmV2ZXIsIFdoZXJldmVyIiwiZXhwIjoxNDY0NDMxNjQxLCJwdWJsaWMiOnRydWUsInN0YXRlIjoiREMiLCJ6aXBjb2RlIjoiMjAwMDEiLCJ0b3BpY3MiOlsiQ3JpbWUiLCJIZWFsdGhjYXJlIiwiVGF4ZXMiXSwiY291bnRyeV9jb2RlIjoiVVNBIiwiZG9iIjoiMTEvMTQvMTk4OSIsImxhc3RfbmFtZSI6Iktva2tpbmlkaXMiLCJsYXQiOiIzOC45MTIwNjgiLCJ1c2VyX2lkIjoiMzZlMmJlYTEtMzRhMi00N2M0LTllMzctNDE4ZmMzOTA3MWQ1IiwiZ2VuZGVyIjoibWFsZSIsInJlZ2lzdGVyZWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0NjE4MzkxMzE0NjYsImxuZyI6Ii03Ny4wMTkwMjI4IiwiZGlzdHJpY3QiOiIwIn0.fstUvbzXmPf9JitZDr-SRHS2UqJAK1Q0RYkmMcf_wPu_r6zI2XElRlplOODTRtJttp1wLaOAuA8AZ5W1VzxGJJ0LXgYUF5aXHYmLt1Pb5FmBTOCvdFVNtxC0Ty-FhmjKOPtod4sRtOa45kEQ0u3LTFwydcpn6A26MZ3Lz1ZGVnk061GrFoEagsQHAOx5JofAbn7mi1LEm-d02GNwfNb7BUynLJ1uPWwtUDYz7ELeeNXd_xkSH0kH8cNdm9cWqVoHtgWWr_bdzQZF5tS_gW_U1aySc7Y8P6eYNNYVkQqmLaxZR0_wUzZnfRx_spDxTHbUBHNO9dPkFNrWptfSfwKxEQ";
    if(this.props.profile.form.profileData.currentlyFollowingUser){
      this.props.actions.unfollowUser(this.props.auth.user.id);//,null, false);//, token)
    }else{
      this.props.actions.followUser(this.props.auth.user.id);//,null, false);//, token)
    }

  }

  render() {
    return(
      <ProfileRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device }
          profile={ this.props.profile }
          onFollowBtnPress= {this.onFollowBtnPress.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile);
