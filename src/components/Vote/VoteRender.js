/* @flow weak */
/**
 * # VoteRender.js
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
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
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








const styles = StyleSheet.create({


  container: {
    backgroundColor: 'black',
    flex:1,
    flexDirection: 'column',
    // marginVertical: 10,
    // marginHorizontal:15
  },

  /* HEADER */
  billImage:{
    flex:1,
    // height: h*0.29
  },
  headerContainer:{
    flex:1,
    flexDirection: 'column',
  },

  closeBtnContainer:{
    paddingVertical: h*0.015,
    paddingHorizontal: w*0.015,
    backgroundColor:Colors.transparentColor,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  closeBtnTextContainer:{
    paddingVertical: h*0.015,
    paddingHorizontal: w*0.015,
  },
  closeBtnText:{
    backgroundColor: Colors.transparentColor,
    color: Colors.mainTextColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(7),
    textAlign:'center'
  },
  closeBtnIcon:{
    color: Colors.mainTextColor,
    backgroundColor: Colors.transparentColor,
  },





  headerTitleContainer:{
    // backgroundColor:'purple'
    flex:1,
    justifyContent:'center',
    alignItems:'center',  //horizontally
  },
  headerTitle:{
    backgroundColor: Colors.transparentColor,
    paddingVertical: h*0.015,
    paddingHorizontal: w*0.015,
    color: Colors.mainTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(18),
    textAlign:'center'
  },





  /* FOOTER */
  voteFooterContainer:{
    flexDirection: 'row',
    // justifyContent:'center',
    // alignItems:'center'
  },

  /* FOOTER - FOR */
  voteForBtn:{
    backgroundColor: Colors.accentColor,
  },

  /* FOOTER - AGAINST */
  voteAgainstBtn:{
    backgroundColor: Colors.negativeAccentColor,
  },

  /* FOOTER - BOTH */
  voteBtn:{
    flex:1,
    borderColor: Colors.mainBorderColor,
    height:60,
    borderRadius:0,
  },

  btnText:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(14),
  },
  btnIconStyle:{
    color: Colors.mainTextColor,
    // paddingTop:2,
    // backgroundColor:'green',
  }


});




class VoteRender extends React.Component {
  constructor(props) {
    super(props);
  }


  renderFooter(userHasVoted){
    if(userHasVoted===true){
      return (
        <PostVoteModalBox
        isOpen={userHasVoted}
        onModalClosed={this.props.onModalClosed}
        vote={this.props.voteChoice}
        oppositeComment={this.props.voteChoice===true?this.props.topAgainstComment:this.props.topForComment}
        device={this.props.device}
        userFirstName={this.props.userFirstName}
        onUserClick={this.props.onUserClick}
        onLikeDislikeClick={this.props.onLikeDislikeClick}
        onCommentPost={this.props.onCommentPost}
        onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
       />
      )
    }else{
      return (
        <View key="vote_footer" style={styles.voteFooterContainer}>
          <Button onPress={()=>{
            if(!!this.props.onVoteBtnPressed && this.props.billData!=null){
              this.props.onVoteBtnPressed(this.props.billData.get("bill_id"), true)
            }
          }}
            style={[styles.voteBtn, styles.voteForBtn]}
            isDisabled={false}
            isLoading={false}
            activityIndicatorColor={Colors.mainTextColor}
            textStyle={styles.btnText}
            customIcon={()=><PavIcon name="arrow-up" size={16} style={styles.btnIconStyle}/>}
          >
            Vote In Favor
          </Button>
          <Button onPress={()=>{
            if(!!this.props.onVoteBtnPressed && this.props.billData!=null){
              this.props.onVoteBtnPressed(this.props.billData.get("bill_id"), false)
            }
          }}
            style={[styles.voteBtn, styles.voteAgainstBtn]}
            isDisabled={false}
            isLoading={false}
            activityIndicatorColor={Colors.mainTextColor}
            textStyle={styles.btnText}
            customIcon={()=><PavIcon name="arrow-down" size={16} style={styles.btnIconStyle}/>}
          >
            Vote Against
          </Button>
        </View>
      )
    }
  }



  /**
   * ### render method
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let billData;
    if(!!this.props.billData){
      billData = this.props.billData.toJS();
    }
    // console.log("@@@@@@@@@@@@@@@@@@@ BILL USER VOTED: "+this.props.voteChoice);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View
      style={styles.container}>
        <PavImage
        key="vote_header"
        platform={Platform.OS}
        style={styles.billImage}
        defaultSource={congratsScreenPhoto}
        source={{uri: !!billData&&billData.featured_img_link}}
        resizeMode='cover'
        >
          <LinearGradient
              colors={['rgba(0, 0, 0, 0.91)', 'rgba(0, 0, 0, 0.41)', 'rgba(0, 0, 0, 0.91)']}
              start={[-0.5, 0.0]} end={[1.5, 0.0]}
              style={styles.headerContainer}
              >
              <TouchableOpacity onPress={this.props.onCloseBtnTap}
              style={styles.closeBtnContainer}>
                <PavIcon name="close-badge" size={17} style={styles.closeBtnIcon}/>
                <View style={styles.closeBtnTextContainer}>
                  <Text style={styles.closeBtnText}>CLOSE</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{!!billData&&billData.featured_bill_title}</Text>
              </View>
          </LinearGradient>
        </PavImage>
        {this.renderFooter(billData.user_voted)}
      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
      // console.log("Should vote update: "+(nextProps.billData !== this.props.billData)+" since old: "+this.props.billData.get("user_voted")+" and new: "+nextProps.billData.get("user_voted"))
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
      ||
      (nextProps.voteChoice !== this.props.voteChoice)

    );
  }

}




VoteRender.propTypes= {

  billData: React.PropTypes.object,
  voteChoice: React.PropTypes.bool,
  userFirstName: React.PropTypes.string,
  topForComment: React.PropTypes.object,
  topAgainstComment: React.PropTypes.object,
  device: React.PropTypes.object.isRequired,
  onCloseBtnTap: React.PropTypes.func.isRequired,
  onVoteBtnPressed: React.PropTypes.func.isRequired,

  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired

};
export default VoteRender;
