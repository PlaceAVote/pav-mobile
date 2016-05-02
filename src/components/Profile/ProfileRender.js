/**
 * # Login.js
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

var ProgressBar = require('ProgressBarAndroid');

import moment from 'moment'
/**
* Icons library
*/
// var Icon = require('react-native-vector-icons/FontAwesome');


import {Colors, ScheneKeys} from '../../config/constants';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicatorIOS
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import CardFactory from '../Cards/CardFactory';


var LImage = require('react-native-image-progress');
var Progress = require('react-native-progress');

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














class ProfileRender extends Component {
  constructor(props) {
    super(props);

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),

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
        paddingTop:64, //nav bar height
        paddingBottom:50, //tab bar height
        // marginVertical: 10,
        // marginHorizontal:15
      },

      headerView:{
        flex:1,
        flexDirection: 'column',
      },
      userDataHeaderView:{
        flex:1,
        backgroundColor: Colors.transparentColor,
        flexDirection: 'row',
        paddingVertical: h*0.02,
        paddingHorizontal: w*0.06,
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
        justifyContent:'space-around'
      },
      userImg:{
        flex:1,
        // backgroundColor: "white"
      },
      followBtn:{
        backgroundColor: Colors.accentColor,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.mainBorderColor,
        marginTop: 15,
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
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: Colors.mainTextColor,
        paddingVertical: h*0.014,
        paddingHorizontal: w*0.04
      },

      statisticsTitleText:{
        paddingTop:2,
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


      bodyView:{
        flex:1.45,
        backgroundColor: '#E8E7EE',
      },
      card:{
        paddingHorizontal:7
      },

      scrollSpacerView:{
          height:h*0.07,
          backgroundColor:Colors.transparentColor
      },
      recentActivityText: {
        // top:0,
        // width:w,
        // height:h*0.065,
        // position:'absolute',
        // backgroundColor: "rgba(0,0,0,0.06)",
        paddingHorizontal: w*0.05,
        paddingVertical: h*0.01,
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




  parseTimelineDataIntoComponents(timelineData, styles, user){
    if(!!timelineData){
      var cards = [];
      for(var ii=0, ll=timelineData.length;ii<ll;ii++){ //for each timeline item
        let curTimelineItem = timelineData[ii];
        // console.log(ii+" @ "+JSON.stringify(curTimelineItem))
        cards.push(<CardFactory
          type="profile"
          key={curTimelineItem.event_id}
          style={styles.card}
          timelineData={curTimelineItem}
          device={this.props.device}
          curUser={user}
          />);
      }
      return cards;
    }
  }


  getLastActivityDayDiff(lastTimestamp){
    if(!!lastTimestamp){
        return moment(lastTimestamp).fromNow();
    }else{
      return "-"
    }

  }

  getUserPhoto(styles){
    if(this.props.device.platform=="ios"){
        return (<LImage
          style={styles.userImg}
          defaultSource={require('../../../assets/defaultUserPhoto.png')}
          source={{uri: this.props.auth.user.photoUrl}}
          resizeMode='contain'
          indicator={Progress.CircleSnail}
          indicatorProps={{
            colors:[Colors.primaryColor, Colors.accentColor, Colors.secondaryColor]
          }}
        />);
    }else{
      (<Image
        style={styles.userImg}
        source={{uri: this.props.auth.user.photoUrl || 'https://cdn.placeavote.com/img/profile/profile-picture.png'}}
        resizeMode='contain'
      />);
    }

  }


  renderProfileHeader(styles){
    let firstName = this.props.auth.user.firstName|| "-";
    let lastName = this.props.auth.user.lastName || "";
    let fullName =  firstName+" "+lastName;
    return (<LinearGradient
            colors={['#4D6EB2', '#6B55A2']}
            start={[0.0, 0.0]} end={[0.6, 0.5]}
            style={styles.headerView}>
              <View style={styles.userDetailsHeaderView}>
                <View style={styles.statisticsBigContainer}>
                  <Text style={styles.statisticsContentText}>{this.getLastActivityDayDiff(this.props.profile.form.profileData.lastActivityTimestamp)}</Text>
                  <Text style={styles.statisticsTitleText}>Last Activity</Text>
                </View>
                <View style={styles.statisticsSmallContainer}>
                  <Text style={styles.statisticsContentText}>{this.props.profile.form.profileData.voteCnt}</Text>
                  <Text style={styles.statisticsTitleText}>Votes</Text>
                </View>
                <View style={styles.statisticsSmallContainer}>
                  <Text style={styles.statisticsContentText}>{this.props.profile.form.profileData.followerCnt}</Text>
                  <Text style={styles.statisticsTitleText}>Followers</Text>
                </View>
                <View style={styles.statisticsSmallContainer}>
                  <Text style={styles.statisticsContentText}>{this.props.profile.form.profileData.followingCnt}</Text>
                  <Text style={styles.statisticsTitleText}>Following</Text>
                </View>
              </View>
              <View style={styles.userDataHeaderView}>
                <View style={styles.profileImgContainerView}>
                  {this.getUserPhoto(styles)}
                </View>
                <View style={styles.userDataContainerView}>
                  <Text style={styles.fullNameText}>{fullName}</Text>

                  <View style={styles.locationContainer}>
                    <PavIcon name="loc" size={12} style={styles.locationPinIcon}/>
                    <Text style={styles.locationText}>{this.formUserLocationText(this.props.auth.user)}</Text>
                  </View>

                  <Button
                  onPress={this.props.onFollowBtnPress}
                  style={styles.followBtn}
                  textStyle={styles.whiteBtnText}
                  isDisabled={this.props.profile.form.isFetching.profileData || this.props.profile.form.isFetching.followUser}
                  isLoading={this.props.profile.form.isFetching.profileData || this.props.profile.form.isFetching.followUser}
                  iconProps={this.props.profile.form.profileData.currentlyFollowingUser?null:{name: "plus",size:20, color: "white"}}>
                    {this.getFollowBtnLabelText(this.props.auth.user.firstName, this.props.profile.form.profileData.currentlyFollowingUser)}
                  </Button>
                </View>
              </View>
            </LinearGradient>);
  }

  renderProfileBody(dataReady, styles){
    if(dataReady==true){
      return (
      <View style={styles.bodyLoadingContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.recentActivityText}>Recent Activity:</Text>
          {this.parseTimelineDataIntoComponents(this.props.profile.form.profileData.timelineData, styles, this.props.auth.user)}
        </ScrollView>


      </View>);
    }else{
      if(this.props.device.platform=="android"){
          return (
          <View style={styles.bodyLoadingContainer}>
            <ProgressBar styleAttr="Large" color="red" />
          </View>);
      }else if(this.props.device.platform=="ios"){
          return (
            <View style={styles.bodyLoadingContainer}>
              <ActivityIndicatorIOS
                animating={true}
                size="large"
              />
            </View>);
      }else{
        return <View style={styles.bodyLoadingContainer}><Text>Now Loading</Text></View>;
      }

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

          {this.renderProfileHeader(styles)}
          <View style={styles.bodyView}>
            {this.renderProfileBody(!this.props.profile.form.isFetching.timelineData, styles)}
          </View>
        </View>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileRender);
