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
  ScrollView
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

// import {getTheme} from 'react-native-material-kit';
// const MateriakDesignTheme = getTheme();
import CommentCard from '../Cards/CommentCard';

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
      lastActivityView:{
        flex:2,
        flexDirection:'column',
        // backgroundColor:'red'
      },

      lastActivityText:{
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      lastActivityTitle:{
        paddingTop:1,
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Light',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      voteCntView:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'blue'
      },
      voteCntText:{
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      voteCntTitle:{
        paddingTop:1,
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Light',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      followerCntView:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'black'
      },
      followerCntText:{
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      followerCntTitle:{
        paddingTop:1,
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Light',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      followingCntView:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'green'
      },
      followingCntText:{
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      followingCntTitle:{
        paddingTop:1,
        color: Colors.fourthTextColor,
        textAlign: 'left',
        fontFamily: 'Whitney Light',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },


      bodyView:{
        flex:1.45,
        backgroundColor: '#E8E7EE',
      },
      recentActivityText: {
        // backgroundColor: 'red',
        paddingHorizontal: w*0.05,
        paddingVertical: h*0.01,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,20),
        color: Colors.thirdTextColor,
        // textAlign: 'center',
      },
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

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    // <ListView
    //   dataSource={this.state.dataSource}
    //   renderRow={(rowData) => <Text>{rowData}</Text>}
    // />
    let firstName = this.props.auth.form.user.firstName || "Adelle";
    let lastName = this.props.auth.form.user.lastName || "Charles";
    let fullName =  firstName+" "+lastName;

    return(
        <View style={styles.container}>

          <LinearGradient
          colors={['#4D6EB2', '#6B55A2']}
          start={[0.0, 0.0]} end={[0.6, 0.5]}
          style={styles.headerView}>

          <View style={styles.userDetailsHeaderView}>
            <View style={styles.lastActivityView}>
              <Text style={styles.lastActivityText}>2 Days ago</Text>
              <Text style={styles.lastActivityTitle}>Last Activity</Text>
            </View>
            <View style={styles.voteCntView}>
              <Text style={styles.voteCntText}>24</Text>
              <Text style={styles.voteCntTitle}>Votes</Text>
            </View>
            <View style={styles.followerCntView}>
              <Text style={styles.followerCntText}>250</Text>
              <Text style={styles.followerCntTitle}>Followers</Text>
            </View>
            <View style={styles.followingCntView}>
              <Text style={styles.followingCntText}>20</Text>
              <Text style={styles.followingCntTitle}>Following</Text>
            </View>
          </View>
          <View style={styles.userDataHeaderView}>
            <View style={styles.profileImgContainerView}>
              <Image
                style={styles.userImg}
                source={{uri: this.props.auth.form.user.photoUrl || 'https://cdn.placeavote.com/img/profile/profile-picture.png'}}
                resizeMode='cover'
              />
            </View>
            <View style={styles.userDataContainerView}>
              <Text style={styles.fullNameText}>{fullName}</Text>

              <View style={styles.locationContainer}>
                <PavIcon name="loc" size={12} style={styles.locationPinIcon}/>
                <Text style={styles.locationText}>Stockton, California</Text>
              </View>

              <Button
              onPress={this.props.onFbBtnPress}
              style={styles.followBtn}
              textStyle={styles.whiteBtnText}
              isDisabled={this.props.auth.form.isFetching}
              isLoading={this.props.auth.form.isFetching}
              iconProps={{name: "plus",size:15, color: "white"}}>
                Follow Adelle
              </Button>
            </View>
          </View>
          </LinearGradient>

          <View style={styles.bodyView}>
            <Text style={styles.recentActivityText}>Recent Activity:</Text>
            <ScrollView style={styles.scrollView}>
              <CommentCard device={this.props.device}/>
            </ScrollView>

          </View>


        </View>
    );
  }
}



//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileRender);
