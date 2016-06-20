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
import {StyleSheet, Text, View, Image, ActivityIndicatorIOS, Platform, Picker} from 'react-native';
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
    this.state={
      gender:null,
      dob:null,
      residence:null,
      email:null,
      isPrivate:null,


    }
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

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              ACCOUNT SETTINGS
            </Text>
          </View>
          <View style={styles.accountSettingsContainer}>
            <View style={styles.imgDobPronounContainer}>
              <PavImage
                style={styles.userImg}
                key="settings_user_img"
                defaultSource={defaultUserPhoto}
                source={{uri: this.props.curUser}}
                resizeMode='contain'
              ></PavImage>
              <View style={styles.dobPronounContainer}>
                <View style={styles.dobContainer}>
                  <Text>Birthday will go here</Text>
                </View>
                <View style={styles.pronounContainer}>
                  <Text>Preferred Pronoun</Text>
                  <Picker
                    selectedValue={this.state.language}
                    onValueChange={(gender) => this.setState({gender: gender})}>
                    <Picker.Item label="His" value="male" />
                    <Picker.Item label="Her" value="female" />
                    <Picker.Item label="They" value="gay" />
                  </Picker>
                </View>
              </View>
            </View>
          </View>

        </View>
    );
  }




    /**
     * ## Styles for PORTRAIT
     */
    getPortraitStyles(self){
      return StyleSheet.create({


        container: {
          flex:1,
          flexDirection: 'column',
          // paddingBottom:self.props.isTab===false?0:50, //tab bar height
          paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
          backgroundColor: 'white',
          // marginVertical: 10,
          // marginHorizontal:15
        },


        accountSettingsContainer:{
          // flex:1,
          flexDirection:"column",
          paddingHorizontal: w*0.022,
          backgroundColor:'pink'
        },

        titleContainer:{
          backgroundColor: Colors.titleBgColorDark,
          borderBottomColor: "rgba(0, 0, 0, 0.07)",
          borderBottomWidth: 1,
          paddingHorizontal: w*0.015,
          paddingVertical: h*0.015,
        },

        titleText:{
          color: Colors.primaryColor,
          fontFamily: 'Whitney-Bold',
          fontSize: getCorrectFontSizeForScreen(w,h,7),
        },

        imgDobPronounContainer:{
          flexDirection:'row',
          backgroundColor:'orange'
        },
        userImg:{
          width:h*0.21,
          height:h*0.21,
        },
        dobPronounContainer:{
          flex:1,
          flexDirection:'column',
          backgroundColor:'pink',
          paddingLeft: w*0.015,
          // justifyContent:''
        },
        dobContainer:{
          flexDirection:'column',
          backgroundColor:'purple'
        }


      });
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
  curUser: React.PropTypes.object,
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
