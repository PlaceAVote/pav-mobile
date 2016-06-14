/* @flow weak */
/**
 * # NewIssueRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import LinearGradient from 'react-native-linear-gradient';

import {stripBrsFromText} from '../../lib/Utils/htmlTextStripper';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'


// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import PostVoteModalBox from '../Modals/PostVoteModalBox';
import congratsScreenPhoto from '../../../assets/congratsScreen.png';


/**
* Icons library
*/

import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;













class NewIssueRender extends React.Component {
  constructor(props) {
    super(props);

    // this.state={
    //   vote: null    //either null, true (for) or false (against)
    // }
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        flex:1,
        // flexDirection: 'column',
        // marginVertical: 10,
        // marginHorizontal:15
      },



    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }




  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    // let billData = this.props.billData.toJS();
    // console.log("@@@@@@@@@@@@@@@@@@@ BILL USER VOTED: "+this.props.billData.get("user_voted"));
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View
      style={styles.container}>

        <Text> New Issue
        </Text>
      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
      console.log("Should vote update: "+(nextProps.billData !== this.props.billData)+" since old: "+this.props.billData.get("user_voted")+" and new: "+nextProps.billData.get("user_voted"))
    return(
      (nextProps.billData !== this.props.billData)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
      ||
      (nextProps.userFirstName!==this.props.userFirstName)
      ||
      (nextProps.topForComment!==this.props.topForComment)
      ||
      (nextProps.topAgainstComment!==this.props.topAgainstComment)
    );
  }

}




NewIssueRender.propTypes= {

  // billData: React.PropTypes.object,
  // userFirstName: React.PropTypes.string,
  // topForComment: React.PropTypes.object,
  // topAgainstComment: React.PropTypes.object,
  // device: React.PropTypes.object.isRequired,
  // onCloseBtnTap: React.PropTypes.func.isRequired,
  // onVoteBtnPressed: React.PropTypes.func.isRequired,
  //
  // onUserClick: React.PropTypes.func.isRequired,
  // onLikeDislikeClick: React.PropTypes.func.isRequired,
  // onCommentPost: React.PropTypes.func.isRequired

};
export default NewIssueRender;
