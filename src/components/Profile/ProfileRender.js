/* @flow */
/**
 * # ProfileRender.js
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














class ProfileRender extends React.Component {
  constructor(props) {
    super(props);
    let data = [];
    // console.log("Data within getFeedDataSource is :"+data);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); // || r1["event_id"] !== r2["event_id"]
    // ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }



  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        paddingBottom:50, //tab bar height
        paddingTop:Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44,  //nav bar height
        backgroundColor: '#E8E7EE',
        // marginVertical: 10,
        // marginHorizontal:15
      },

      headerView:{
        flexDirection: 'column',
      },
      userDataHeaderView:{
        flex:1,
        backgroundColor: Colors.transparentColor,
        flexDirection: 'row',
        // backgroundColor:'red',
        // paddingVertical: h*0.02,
        paddingHorizontal: w*0.02,
        alignItems:'center',
      },
      userAccSettingsHeaderView:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: Colors.mainTextColor,
        paddingVertical: h*0.014,
        paddingHorizontal: w*0.03
      },
      accountSettingsText:{
        color: Colors.primaryColor,
        textAlign: 'left',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,10),
      },
      accountSettingsIcon:{
        color: Colors.primaryColor,
      },
      profileImgContainerView:{
        flex:0.4,
        // backgroundColor: "yellow"

      },
      userDataContainerView:{
        flex:0.6,
        flexDirection: 'column',
        paddingHorizontal: w*0.04,
        // backgroundColor: "green",
        alignItems:'flex-start',
        justifyContent:'space-around'
      },
      userImg:{
        flex:1,
        width:null,
        height:h*0.23,
        // backgroundColor: "white"
      },
      followBtn:{
        backgroundColor: Colors.accentColor,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.mainBorderColor,
        // marginTop: 15,
        marginTop: h*0.030,
        height: 36
      },
      whiteBtnText:{
        color: Colors.mainTextColor,
        textAlign: 'center',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,12),
      },
      fullNameText:{
        color: Colors.mainTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,16),
      },
      locationContainer:{
        flexDirection: 'row',
        alignItems:'center',
      },
      locationText:{
        color: Colors.mainTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Light',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      locationPinIcon:{
        color: Colors.mainTextColor,
        paddingHorizontal:3,
      },
      userDetailsHeaderView:{
        // backgroundColor:'pink',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: Colors.mainTextColor,
        paddingVertical: h*0.014,
        paddingHorizontal: w*0.04
      },

      statisticsTitleTextContainer:{
        paddingTop:2,
      },
      statisticsTitleText:{
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Light',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },

      statisticsContentText:{
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,10),
      },

      statisticsBigContainer:{
        flex:2,
        flexDirection:'column',
        // backgroundColor:'red'
      },
      statisticsSmallContainer:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'green'
      },


      itemList:{
        flex:1,
        backgroundColor: '#E8E7EE',
      },
      card:{
        paddingHorizontal: w*0.03,
        // backgroundColor:'red'
      },

      scrollSpacerView:{
          height:h*0.07,
          backgroundColor:Colors.transparentColor
      },
      recentActivityTextContainer:{
        paddingHorizontal: w*0.05,
        paddingVertical: h*0.01,
      },
      recentActivityText: {
        // top:0,
        // width:w,
        // height:h*0.065,
        // position:'absolute',
        // backgroundColor: "rgba(0,0,0,0.06)",
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,20),
        color: Colors.fourthTextColor,
        // textAlign: 'center',
      },

      bodyLoadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }
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

  getFollowBtnLabelText(name, currentlyFollowingUser){
    let nm = name || "";
    return currentlyFollowingUser?"Unfollow ":"Follow "+nm;
  }







  getLastActivityDayDiff(lastTimestamp){
    if(!!lastTimestamp){
        return moment(lastTimestamp).fromNow();
    }else{
      return "-"
    }

  }


  renderProfileHeader(styles){
    let firstName = this.props.curUser.firstName|| "-";
    let lastName = this.props.curUser.lastName || "";
    let fullName =  firstName+" "+lastName;
    return (<LinearGradient
            colors={['#4D6EB2', '#6B55A2']}
            start={[0.0, 0.0]} end={[0.6, 0.5]}
            style={styles.headerView}>
              <View style={styles.userDetailsHeaderView}>
                <View style={styles.statisticsBigContainer}>
                  <Text style={styles.statisticsContentText}>{this.getLastActivityDayDiff(this.props.profile.form.profileData.lastActivityTimestamp)}</Text>

                  <View style={styles.statisticsTitleTextContainer}>
                    <Text style={styles.statisticsTitleText}>Last Activity</Text>
                  </View>
                </View>
                <View style={styles.statisticsSmallContainer}>
                  <Text style={styles.statisticsContentText}>{this.props.profile.form.profileData.voteCnt}</Text>
                  <View style={styles.statisticsTitleTextContainer}>
                    <Text style={styles.statisticsTitleText}>Votes</Text>
                  </View>
                </View>
                <View style={styles.statisticsSmallContainer}>
                  <Text style={styles.statisticsContentText}>{this.props.profile.form.profileData.followerCnt}</Text>
                  <View style={styles.statisticsTitleTextContainer}>
                    <Text style={styles.statisticsTitleText}>Followers</Text>
                  </View>
                </View>
                <View style={styles.statisticsSmallContainer}>
                  <Text style={styles.statisticsContentText}>{this.props.profile.form.profileData.followingCnt}</Text>
                  <View style={styles.statisticsTitleTextContainer}>
                    <Text style={styles.statisticsTitleText}>Following</Text>
                  </View>
                </View>
              </View>
              <View style={styles.userDataHeaderView}>
                <View style={styles.profileImgContainerView}>
                  <PavImage
                    style={styles.userImg}
                    key="profile_user_img"
                    defaultSource={defaultUserPhoto}
                    source={!!this.props.userPhotoUrl?{uri: this.props.curUser.photoUrl}:defaultUserPhoto}
                    platform={this.props.device.platform}
                    resizeMode='contain'
                  />
                </View>
                <View style={styles.userDataContainerView}>
                  <Text style={styles.fullNameText}>{fullName}</Text>

                  <View style={styles.locationContainer}>
                    <PavIcon name="loc" size={12} style={styles.locationPinIcon}/>
                    <Text style={styles.locationText}>{this.formUserLocationText(this.props.curUser)}</Text>
                  </View>

                  <Button
                  onPress={this.props.onFollowBtnPress}
                  style={styles.followBtn}
                  textStyle={styles.whiteBtnText}
                  isDisabled={this.props.isFetchingProfile || this.props.isFetchingFollow}
                  isLoading={this.props.isFetchingProfile || this.props.isFetchingFollow}
                  iconProps={this.props.profile.form.profileData.currentlyFollowingUser?null:{name: "plus",size:20, color: "white"}}>
                    {this.getFollowBtnLabelText(this.props.curUser.firstName, this.props.profile.form.profileData.currentlyFollowingUser)}
                  </Button>
                </View>
              </View>
            </LinearGradient>);
  }








  // parseTimelineDataIntoComponents(timelineData, styles, user){
  //   if(!!timelineData){
  //     var cards = [];
  //     for(var ii=0, ll=timelineData.length;ii<ll;ii++){ //for each timeline item
  //       let curTimelineItem = timelineData[ii];
  //       // console.log(ii+" @ "+JSON.stringify(curTimelineItem))
  //       cards.push();
  //     }
  //     return cards;
  //   }
  // }
  // this.props.profile.form.profileData.timelineData


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
          {this.renderProfileHeader(styles)}
          <ListView
           enableEmptySections={true}
           style={styles.itemList}
           initialListSize={5}
           dataSource={this.state.dataSource}
           scrollEnabled={true}
           renderHeader={()=>(
             <View  style={styles.recentActivityTextContainer}>
                <Text style={styles.recentActivityText}>Recent Activity:</Text>
             </View>
           )}
           refreshControl={
             <RefreshControl
             refreshing={this.props.isFetchingTimeline || this.props.isFetchingProfile}
             onRefresh={this.props.onFeedRefresh}
             tintColor={Colors.primaryColor}
             title="Loading..."
             titleColor={Colors.primaryColor}
             colors={[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]}
           />}
           renderRow={(rowData) =>
             <CardFactory
             type="profile"
             key={rowData.event_id}
             cardStyle={Platform.OS=="android"?{elevation:5}:{}}
             itemData={rowData}
             style={styles.card}
             device={this.props.device}
             curUser={this.props.curUser}
             onUserClick={this.props.onUserClick}
             onBillClick={this.props.onBillClick}
             onLikeDislikeClick={this.props.onLikeDislikeClick}
             onReplyClick={this.props.onReplyClick}
             onReactionClick={this.props.onReactionClick}
             onCommentClick={this.props.onCommentClick}
             onSocialClick={this.props.onSocialClick}
             />}
           />
        </View>
    );
  }


  componentWillReceiveProps (nextProps) {
    if (nextProps.timelineData!=null &&  nextProps.timelineData!== this.props.timelineData) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.timelineData.toJS())
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.device !== this.props.device)
      ||
      (nextProps.isFetchingTimeline !== this.props.isFetchingTimeline)
      ||
      (nextProps.isFetchingProfile !== this.props.isFetchingProfile)
      ||
      (nextProps.isFetchingFollow !== this.props.isFetchingFollow)
      ||
      (nextProps.profileData !== this.props.profileData)
      ||
      (nextProps.curUser !== this.props.curUser)
      ||
      (nextState.dataSource !== this.state.dataSource)
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileRender);
