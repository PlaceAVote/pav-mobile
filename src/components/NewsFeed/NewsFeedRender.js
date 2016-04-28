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
  ActivityIndicatorIOS,
  TouchableOpacity
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

/**
* Icons library
*/

var Icon = require('react-native-vector-icons/FontAwesome');

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














class NewsFeedRender extends Component {
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


      bodyView:{
        flex:1,
        backgroundColor: '#E8E7EE',
      },
      bodyLoadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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
      scrollView:{
        flex:1
      },
      scrollerViewHeader:{
        // backgroundColor: "rgba(0,0,0,0.06)",
        flex:1,
        flexDirection:'column',
        padding:10,
      },
      fitersViewContainer:{
        backgroundColor: "white",
        flexDirection:'row',
      },
      expandedFilterContainer:{
        flex:3,
        // backgroundColor:'yellow',
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
        // alignItems:'center',
        justifyContent:'center'
      },
      collapsedFilterContainer:{
        flex:1,
        justifyContent:'center',
        // paddingHorizontal:w*0.037,
        // paddingVertical:h*0.015,
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
      },
      filterContent:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:w*0.015,
        paddingTop:h*0.013,
        paddingBottom:h*0.006,
        // backgroundColor:'blue'
    },
      filterIcon:{
        paddingHorizontal:3,
        color:Colors.primaryColor
      },
      filterText:{
        paddingHorizontal: w*0.009,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,5),
        color: Colors.thirdTextColor,

      },
      filterIndicatorIconContainer:{
        // backgroundColor:'red',
        // alignSelf:'center',
        // justifyContent:'flex-end',
      },
      activeFilterIndicatorIcon:{
        // backgroundColor:'yellow',
        alignSelf:'center',
        color:'#E8E7EE'
      },
      inactiveFilterIndicatorIcon:{
        // backgroundColor:'yellow',
        alignSelf:'center',
        color:Colors.transparentColor
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
          defaultSource={require('../../../assets/defaultProfilePhoto.png')}
          source={{uri: this.props.auth.form.user.photoUrl}}
          resizeMode='contain'
          indicator={Progress.CircleSnail}
          indicatorProps={{
            colors:[Colors.primaryColor, Colors.accentColor, Colors.secondaryColor]
          }}
        />);
    }else{
      (<Image
        style={styles.userImg}
        source={{uri: this.props.auth.form.user.photoUrl || 'https://cdn.placeavote.com/img/profile/profile-picture.png'}}
        resizeMode='contain'
      />);
    }

  }


// {this.parseTimelineDataIntoComponents(this.props.profile.form.profileData.timelineData, styles, this.props.auth.form.user)}
  renderProfileBody(dataReady, styles){
    if(dataReady==true){
      return (
        <ScrollView style={styles.scrollView}>

          <View style={styles.scrollerViewHeader}>
            <View style={styles.fitersViewContainer}>


              <View style={styles.expandedFilterContainer}>
                <TouchableOpacity style={styles.filterContent}>
                  <PavIcon name="exclamation" size={15} style={styles.filterIcon}/>
                  <Text style={styles.filterText}>All Activity </Text>
                </TouchableOpacity>
                <View style={styles.filterIndicatorIconContainer}>
                  <PavIcon name="activeIndicatorShrinked" size={7} style={styles.activeFilterIndicatorIcon}/>
                </View>
              </View>

              <View style={styles.collapsedFilterContainer}>
                <TouchableOpacity style={styles.filterContent}>
                  <PavIcon name="add-lined" size={15} style={styles.filterIcon}/>
                </TouchableOpacity>
                <View style={styles.filterIndicatorIconContainer}>
                  <PavIcon name="activeIndicatorShrinked" size={7} style={styles.inactiveFilterIndicatorIcon}/>
                </View>
              </View>

              <View style={styles.collapsedFilterContainer}>
                <TouchableOpacity style={styles.filterContent}>
                  <PavIcon name="bills" size={15} style={styles.filterIcon}/>
                </TouchableOpacity>
                <View style={styles.filterIndicatorIconContainer}>
                  <PavIcon name="activeIndicatorShrinked" size={7} style={styles.inactiveFilterIndicatorIcon}/>
                </View>
              </View>

              <View style={styles.collapsedFilterContainer}>
                <TouchableOpacity style={styles.filterContent}>
                  <PavIcon name="binoculars" size={15} style={styles.filterIcon}/>
                </TouchableOpacity>
                <View style={styles.filterIndicatorIconContainer}>
                  <PavIcon name="activeIndicatorShrinked" size={7} style={styles.inactiveFilterIndicatorIcon}/>
                </View>
              </View>

              <View style={styles.collapsedFilterContainer}>
                <TouchableOpacity style={styles.filterContent}>
                  <PavIcon name="trending-graph" size={15} style={styles.filterIcon}/>
                </TouchableOpacity>
                <View style={styles.filterIndicatorIconContainer}>
                  <PavIcon name="activeIndicatorShrinked" size={7} style={styles.inactiveFilterIndicatorIcon}/>
                </View>
              </View>



            </View>
            <Text style={styles.recentActivityText}>All Activity:</Text>
          </View>
        </ScrollView>)
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
          <View style={styles.bodyView}>
            {this.renderProfileBody(!this.props.profile.form.isFetching.timelineData, styles)}
          </View>
        </View>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedRender);
