/* @flow weak */
/**
 * # BillCommentCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';




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


import {Colors, ScheneKeys, Other} from '../../../config/constants';
const {REACTIONS, SOCIAL_TYPES} = Other;

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'





class BillCommentCard extends Component {
  constructor(props) {
    super(props);
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){


    return StyleSheet.create({

      cardContainer:{
        flex: 1,
        alignItems: 'stretch',
        padding:7,
        // backgroundColor: 'blue',
        marginTop: self.props.device.platform === 'android' ? 56 : 0,
      },

      card:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
      cardShadowContainer:{
        flex: 1,

        borderRadius: 2,
        // borderColor: Colors.mainBorderColor,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.42)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 2,
        },
      },
      cardContent:{
        flex: 1,
        padding: w*0.03,
        backgroundColor: '#ffffff',
        // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        // borderBottomWidth: 1,
        // borderWidth:1,
        // borderColor: Colors.transparentColor,

        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      cardTitleContainer:{
        paddingHorizontal: w*0.02,
        paddingVertical: w*0.02,
        alignItems:'center',
        // backgroundColor:'red',
      },
      // cardTitleTextAndIconContainer:{
      //   flexDirection:'row',
      //   alignItems:'center'
      // },
      // cardTitleText:{
      //   // backgroundColor: 'red',
      //   color: Colors.primaryColor,
      //   fontFamily: 'Whitney-Bold',
      //   fontSize: getCorrectFontSizeForScreen(w,h,8),
      // },
      cardDateText:{
        // backgroundColor: 'red',
        paddingHorizontal: 5,
        // color: Colors.thirdTextColor,
        color: 'rgba(0, 0, 0, 0.60)',
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      cardContentContainer:{
        // backgroundColor:'red',
        paddingHorizontal: w*0.02,
        paddingBottom: h*0.012,
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
        flexDirection:'column'
      },
      cardContentHeader:{
        flex:1,
        paddingVertical:h*0.01,
        flexDirection:'row',
        // backgroundColor:'red',
        alignItems:'center'
      },


      commentDescriptionContainer:{
        flex:1,
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-end',
        // backgroundColor:'red',
        paddingHorizontal: 10
      },



      userImage:{
        width:w*0.09,
        height:w*0.09,
        // marginHorizontal: 10,
      },
      topCommentContainer:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
      },
      commentNameText:{
        // backgroundColor:'blue',
        color:"#e64a33",
        paddingVertical: h*0.008,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      topCommentText:{
        color: Colors.helpTextColor,
        paddingVertical: h*0.001,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,6),
      },
      topCommentInFavorText:{
        color: "#8E9599",
        paddingVertical: h*0.001,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,6),
      },
      topCommentAgainstText:{
        color: "#998E8E",
        paddingVertical: h*0.001,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,6),
      },
      commentLocationText:{
        // backgroundColor:'yellow',
        color: Colors.primaryColor,
        paddingHorizontal: 1,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        width: w*0.7,
      },
      cardContentBody:{
        // backgroundColor:'green'
        // marginTop: h*0.01
      },
      cardContentText:{
        padding:2,
        // backgroundColor:'green',
        paddingVertical: h*0.015,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
        color: 'rgba(0, 0, 0, 0.54)',
      },


      footerContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor: '#EDECF1',
        borderStyle: 'solid',
        borderColor: 'rgba(216, 214, 226, 0.25)',
        // borderTopColor: 'rgba(216, 214, 226, 0.7)',
        // borderLeftColor: 'rgba(216, 214, 226, 0.5)',
        // borderRightColor: 'rgba(216, 214, 226, 0.5)',
        // borderBottomColor: 'rgba(216, 214, 226, 0.7)',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.32)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 2,
        },
      },
      likeDislikeButtonContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:w*0.015,
        paddingVertical: h*0.009,
        // backgroundColor:'red'
      },
      replyButtonContainer:{
        flex:1,
        // backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: h*0.009,
        borderStyle: 'solid',
        borderLeftColor: '#D8D6E2',
        borderLeftWidth: 1,
      },
      activeLikeIcon:{
        color: Colors.accentColor,
        paddingHorizontal:w*0.04,
      },
      activeDislikeIcon:{
        color: Colors.negativeAccentColor,
        paddingHorizontal:w*0.04,
      },
      inactiveLikeDislikeIcon:{
        color: Colors.fourthTextColor,
        paddingHorizontal:w*0.04,
      },
      likeCountText:{
        color: Colors.accentColor,
        paddingHorizontal:w*0.04,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      replyButtonText:{
        flex:1,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        // backgroundColor:'brown'
      },
      footerBtn:{
        backgroundColor:Colors.transparentColor
      },


      /* REPLIES BOX */
      repliesBoxContainer:{
        marginTop: 2, //I added this to allow the shadow from the above child to be seen
        paddingVertical: h*0.014,
        justifyContent:'center',
        alignItems:'center',
        // borderWidth: 1,
        // borderColor: 'rgba(0, 0, 0, 0.06)',
        // borderTopWidth:0,
        // borderTopColor: 'rgba(0, 0, 0, 0.06)',
        // borderTopWidth: 1,


      },
      repliesBoxText:{
        flex:1,
        fontSize: getCorrectFontSizeForScreen(w,h,9),
        color: 'rgba(0, 0, 0, 0.60)',
        fontFamily: 'Whitney-Book',
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
      },


    });
  }

  onLikeClick(){
    if(this.props.onLikeDislikeClick){
      this.props.onLikeDislikeClick(REACTIONS.HAPPY);
    }
  }

  onDislikeClick(){
    if(this.props.onLikeDislikeClick){
      this.props.onLikeDislikeClick(REACTIONS.SAD);
    }
  }

  onReplyClick(){
    if(this.props.onReplyClick && !!this.props.commentId){
      this.props.onReplyClick(this.props.commentId, this.props.billId);
    }
  }


  onUserClick(){
    if(this.props.onUserClick && !!this.props.userId){
        this.props.onUserClick(this.props.userId);
    }
  }

  onRepliesClick(){
    if(this.props.onRepliesClick && !!this.props.commentId && !!this.props.replies){
        this.props.onRepliesClick(this.props.replies, this.props.commentId);
    }
  }

  renderHeader(styles){
    // return (<View resizeMode="cover" style={styles.cardTitleContainer}>
    //   <View style={styles.cardTitleTextAndIconContainer}>
    //     <Text style={styles.cardTitleText}>NEW COMMENT</Text>
    //   </View>
    //   <Text style={styles.cardDateText}>{this.props.timeString}</Text>
    // </View>);
    return (<View style={styles.cardContentHeader}>
      <TouchableOpacity onPress={this.onUserClick.bind(this)}>
        <PavImage
          platform={this.props.device.platform}
          defaultSource={require('../../../../assets/defaultUserPhoto.png')}
          style={styles.userImage}
          source={{uri: this.props.userPhotoUrl}}
          resizeMode='cover'
        />
      </TouchableOpacity>
      <View style={styles.commentDescriptionContainer}>
        <TouchableOpacity onPress={this.onUserClick.bind(this)}>
          <Text style={styles.commentNameText}>{this.props.userFullNameText}</Text>
        </TouchableOpacity>
        {this.renderTopComment(styles)}
      </View>

      <View resizeMode="cover" style={styles.cardTitleContainer}>
        <Text style={styles.cardDateText}>{this.props.timeString}</Text>
      </View>
    </View>);
  }


  getTopCommentText(isInFavor, styles){
    if(isInFavor==true){
      return <Text style={styles.topCommentText}>Highest rated <Text style={styles.topCommentInFavorText}>in Favor</Text></Text>
    }else{
      return <Text style={styles.topCommentText}>Highest rated <Text style={styles.topCommentAgainstText}>Against</Text></Text>
    }
  }

  renderTopComment(styles){
    if(this.props.isTopCommentInFavor==true || this.props.isTopCommentAgainst==true){
      return (
      <View style={styles.topCommentContainer}>
        {this.getTopCommentText((this.props.isTopCommentInFavor==true),styles)}
      </View>)
    }else{
      return <View></View>;
    }
  }

  renderBody(styles){
    return (<View style={styles.cardContentContainer}>
      <View style={styles.cardContentBody}>
        <Text style={styles.cardContentText}>
        {this.props.commentText}
        </Text>
      </View>
    </View>);
  }

  renderFooter(styles){
    return (
      <View style={styles.footerContainer}>
        <View style={styles.likeDislikeButtonContainer}>
          <TouchableOpacity style={styles.footerBtn} onPress={this.onLikeClick.bind(this)}>
            <PavIcon name="thumbs-up" size={15} style={this.props.isLiked?styles.activeLikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn} onPress={this.onDislikeClick.bind(this)}>
            <PavIcon name="thumbs-down" size={15} style={this.props.isDisliked?styles.activeDislikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <Text style={styles.likeCountText}>{this.props.likeCount}</Text>
        </View>
        <TouchableOpacity onPress={this.onReplyClick.bind(this)} style={styles.replyButtonContainer}>
          <Text style={styles.replyButtonText}>REPLY</Text>
        </TouchableOpacity>
      </View>);
  }



  renderRepliesBox(replies, styles){
    if(!!replies && replies.length>0){
      return (
          <TouchableOpacity onPress={this.onRepliesClick.bind(this)} style={styles.repliesBoxContainer}>
            <Text style={styles.repliesBoxText}>{replies.length} Replies</Text>
          </TouchableOpacity>
        );
    }else{
      return <View></View>;
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
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={styles.cardShadowContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {this.renderHeader(styles)}
              {this.renderBody(styles)}
              {this.renderFooter(styles)}
            </View>
            {this.renderRepliesBox(this.props.replies, styles)}
          </View>
        </View>
      </View>
    );
  }
}







BillCommentCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  timeString: React.PropTypes.string.isRequired,
  userFullNameText: React.PropTypes.string.isRequired,
  commentText: React.PropTypes.string,
  userPhotoUrl: React.PropTypes.string,
  likeCount: React.PropTypes.number.isRequired,
  isLiked: React.PropTypes.bool.isRequired,
  isDisliked: React.PropTypes.bool.isRequired,
  isTopCommentInFavor: React.PropTypes.bool,
  isTopCommentInAgainst: React.PropTypes.bool,
  replies:React.PropTypes.array.isRequired,
  userId: React.PropTypes.string.isRequired,
  commentId: React.PropTypes.string.isRequired,
  billId: React.PropTypes.string.isRequired,


  onRepliesClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onReplyClick: React.PropTypes.func.isRequired,
};
export default BillCommentCard;
