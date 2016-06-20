/* @flow */
/**
 * # SettingsRender.js
 *
 * This class is a little complicated as it handles multiple states.
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

/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as globalActions from '../../reducers/global/globalActions';



import LinearGradient from 'react-native-linear-gradient';

/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'

import PavSpinner from '../../lib/UI/PavSpinner'

import moment from 'moment'
/**
* Icons library
*/



import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicatorIOS, ListView, Platform, RefreshControl} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import CardFactory from '../Cards/CardFactory';

import defaultUserPhoto from '../../../assets/defaultUserPhoto.png';
import PavImage from '../../lib/UI/PavImage'

/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
  // globalActions
];

function mapStateToProps(state) {
  return {
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














class SettingsRender extends React.Component {
  constructor(props) {
    super(props);

  }



  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        flex:1,
        flexDirection: 'column',
        paddingBottom:self.props.isTab===false?0:50, //tab bar height
        paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
        backgroundColor: '#E8E7EE',
        // marginVertical: 10,
        // marginHorizontal:15
      },

      // accountSettingsText:{
      //   color: Colors.primaryColor,
      //   textAlign: 'left',
      //   fontFamily: 'Whitney',
      //   fontSize: getCorrectFontSizeForScreen(w,h,10),
      // },
      // accountSettingsIcon:{
      //   color: Colors.primaryColor,
      // },
      // profileImgContainerView:{
      //   flex:0.4,
      //   // backgroundColor: "yellow"
      //
      // },
      // userDataContainerView:{
      //   flex:0.6,
      //   flexDirection: 'column',
      //   paddingHorizontal: w*0.04,
      //   // backgroundColor: "green",
      //   alignItems:'flex-start',
      //   justifyContent:'space-around'
      // },
      // userImg:{
      //   flex:1,
      //   width:null,
      //   height:h*0.23,
      //   // backgroundColor: "white"
      // },

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal:10
      },

      titleText: {
        // backgroundColor: 'black',
        fontSize: getCorrectFontSizeForScreen(w,h,27),
        color: Colors.mainTextColor,
        textAlign: 'center',
      }

    });
  }


  formUserLocationText(user){
    if(!!user.city){
      if(user.stateProvince!=null){
        return user.city+", "+user.stateProvince
      }else{
        return user.city;
      }
    }else{
      return "Location";
    }

  }







  getLastActivityDayDiff(lastTimestamp){
    if(!!lastTimestamp){
        return moment(lastTimestamp, 'x').fromNow();
    }else{
      return "-"
    }

  }


  renderProfilePhoto(url, styles){
    if(url==null && this.props.isFetchingProfile===false){
      return (
        <PavImage
          style={styles.userImg}
          key="profile_user_img"
          defaultSource={defaultUserPhoto}
          source={defaultUserPhoto}
          resizeMode='contain'
        />
      )
    }else{
      return (
        <PavImage
          style={styles.userImg}
          key="profile_user_img"
          defaultSource={defaultUserPhoto}
          source={{uri: url}}
          resizeMode='contain'
        />
      )
    }

  }





  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
        <View style={styles.container}>
          <Text>Settings
          </Text>

        </View>
    );
  }





  shouldComponentUpdate(nextProps, nextState) {
    // console.log("########### Cur user update: "+(nextProps.curUser !== this.props.curUser));
    return(
      (nextProps.device !== this.props.device)
      // ||
      // (nextProps.isFetchingTimeline !== this.props.isFetchingTimeline)
      // ||
      // (nextProps.isFetchingOldTimelineData !== this.props.isFetchingOldTimelineData)
      // ||
      // (nextProps.isFetchingProfile !== this.props.isFetchingProfile)
      // ||
      // (nextProps.isFetchingFollow !== this.props.isFetchingFollow)
      // ||
      // (nextProps.curUser !== this.props.curUser)
      // ||
      // (nextState.dataSource !== this.state.dataSource)
      // ||
      // (nextProps.lastActivityTimestamp !== this.props.lastActivityTimestamp)
      // ||
      // (nextProps.voteCnt !== this.props.voteCnt)
      // ||
      // (nextProps.followerCnt !== this.props.followerCnt)
      // ||
      // (nextProps.followingCnt !== this.props.followingCnt)
      // ||
      // (nextProps.currentlyFollowingUser !== this.props.currentlyFollowingUser)
    );
  }
}



SettingsRender.propTypes= {
  // timelineData: React.PropTypes.object,
  // curUser: React.PropTypes.object,
  // device: React.PropTypes.object.isRequired,
  // isTab: React.PropTypes.bool,
  // lastActivityTimestamp: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.number,
  // ]),
  // voteCnt: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.number,
  // ]),
  // followerCnt: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.number,
  // ]),
  // followingCnt: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.number,
  // ]),
  // currentlyFollowingUser: React.PropTypes.bool,
  // isFetchingTimeline: React.PropTypes.bool,
  // isFetchingOldTimelineData: React.PropTypes.bool,
  // isFetchingProfile: React.PropTypes.bool,
  // isFetchingFollow: React.PropTypes.bool,
  //
  // onFollowBtnPress: React.PropTypes.func.isRequired,
  // onFeedRefresh: React.PropTypes.func.isRequired,
  // onUserClick: React.PropTypes.func.isRequired,
  // onBillClick: React.PropTypes.func.isRequired,
  // onLikeDislikeClick: React.PropTypes.func.isRequired,
  // onReplyClick: React.PropTypes.func.isRequired,
  // onReactionClick: React.PropTypes.func.isRequired,
  // onCommentClick: React.PropTypes.func.isRequired,
  // onSocialClick: React.PropTypes.func.isRequired,
  // onFetchOlderTimelineData:React.PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsRender);
