/* @flow weak */
/**
 * # BillCommentCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';




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

import AccordionBillCommentCardContainer from './AccordionBillCommentCardContainer';
import CommentReplyCard from './CommentReplyCard';



class BillCommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyBoxVisible: false
    }
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



      cardContent:{
        flex: 1,
        padding: w*0.03,
        backgroundColor: '#ffffff',
        marginRight:6,
        // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        // borderBottomWidth: 1,
        // borderWidth:1,
        // borderColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius:2,
        shadowColor: 'rgba(0, 0, 0, 0.42)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 2,
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
        paddingHorizontal:w*0.04,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      likeCountPositive:{
        color: Colors.accentColor,
      },
      likeCountNegative:{
        color: Colors.negativeAccentColor,
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
        // backgroundColor:'red',
        paddingTop: h*0.045,
        paddingBottom: h*0.018,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
        // borderWidth: 1,
        // borderColor: 'rgba(0, 0, 0, 0.06)',
        // borderTopWidth:0,
        // borderTopColor: 'rgba(0, 0, 0, 0.06)',
        // borderTopWidth: 1,


      },
      repliesBoxText:{
        fontSize: getCorrectFontSizeForScreen(w,h,9),
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney-Book',
      },
      repliesBoxIcon:{
        paddingHorizontal: w*0.020,
        color: Colors.negativeAccentColor,
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
    this.setState({replyBoxVisible:!this.state.replyBoxVisible});
  }
  onCommentPost(comment){
    if(!!comment && comment.length>0){
      if(!!this.props.commentData.commentId && !!this.props.commentData.billId){
          this.props.onCommentPost(comment, {replies: this.props.commentData.replies, billId: this.props.commentData.billId, commentId: this.props.commentData.commentId, newCommentLvl: (this.props.commentData.commentLvl+1)});
      }
    }
  }

  onUserClick(){
    if(this.props.onUserClick && !!this.props.commentData.userId){
        this.props.onUserClick(this.props.commentData.userId, this.props.commentData.userPhotoUrl);
    }
  }

  onShowMoreCommentsClick(){
    if(this.props.onShowMoreCommentsClick && !!this.props.commentData.commentId && !!this.props.commentData.replies){
        this.props.onShowMoreCommentsClick(this.props.commentData.replies, this.props.commentData.commentId, this.props.commentData.commentLvl);
    }
  }

  renderHeader(styles){
    // return (<View resizeMode="cover" style={styles.cardTitleContainer}>
    //   <View style={styles.cardTitleTextAndIconContainer}>
    //     <Text style={styles.cardTitleText}>NEW COMMENT</Text>
    //   </View>
    //   <Text style={styles.cardDateText}>{this.props.commentData.timeString}</Text>
    // </View>);
    return (<View style={styles.cardContentHeader}>
      <TouchableOpacity onPress={this.onUserClick.bind(this)}>
        <PavImage
          platform={this.props.device.platform}
          defaultSource={require('../../../../assets/defaultUserPhoto.png')}
          style={styles.userImage}
          source={{uri: this.props.commentData.userPhotoUrl}}
          resizeMode='cover'
        />
      </TouchableOpacity>
      <View style={styles.commentDescriptionContainer}>
        <TouchableOpacity onPress={this.onUserClick.bind(this)}>
          <Text style={styles.commentNameText}>{this.props.commentData.userFullNameText}</Text>
        </TouchableOpacity>
        {this.renderTopComment(styles)}
      </View>

      <View resizeMode="cover" style={styles.cardTitleContainer}>
        <Text style={styles.cardDateText}>{this.props.commentData.timeString}</Text>
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
    if(this.props.commentData.isTopCommentInFavor==true || this.props.commentData.isTopCommentAgainst==true){
      return (
      <View style={styles.topCommentContainer}>
        {this.getTopCommentText((this.props.commentData.isTopCommentInFavor==true),styles)}
      </View>)
    }else{
      return <View></View>;
    }
  }

  renderBody(styles){
    return (<View style={styles.cardContentContainer}>
      <View style={styles.cardContentBody}>
        <Text style={styles.cardContentText}>
        {this.props.commentData.commentText}
        </Text>
      </View>
    </View>);
  }

  renderFooter(styles){
    return (
      <View style={styles.footerContainer}>
        <View style={styles.likeDislikeButtonContainer}>
          <TouchableOpacity style={styles.footerBtn} onPress={this.onLikeClick.bind(this)}>
            <PavIcon name="thumbs-up" size={15} style={this.props.commentData.isLiked?styles.activeLikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn} onPress={this.onDislikeClick.bind(this)}>
            <PavIcon name="thumbs-down" size={15} style={this.props.commentData.isDisliked?styles.activeDislikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <Text style={[styles.likeCountText, this.props.commentData.likeCount>0?styles.likeCountPositive:styles.likeCountNegative]}>{this.props.commentData.likeCount}</Text>
        </View>
        <TouchableOpacity onPress={this.onReplyClick.bind(this)} style={styles.replyButtonContainer}>
          <Text style={styles.replyButtonText}>REPLY</Text>
        </TouchableOpacity>
      </View>);
  }



  renderMoreCommentsLbl(replies, styles){

    if(!!replies && replies.length>0){
      if(this.props.commentData.commentLvl<=0){ //for comment lvl 0
        return (
            <TouchableOpacity onPress={this.onShowMoreCommentsClick.bind(this)} style={styles.repliesBoxContainer}>
              <Text style={styles.repliesBoxText}>{replies.length>1?replies.length+" Replies ":"1 Reply"}</Text>
              <PavIcon name="show-more" size={17} style={styles.repliesBoxIcon}/>
            </TouchableOpacity>
          );
      }else{//for comment lvl 1 and above
        return (
          <AccordionBillCommentCardContainer
            device={this.props.device}
            collapsed={false}
            commentBeingPosted={this.props.commentBeingPosted}
            commentLvl={this.props.commentData.commentLvl}
            replies={this.props.commentData.replies}
            onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
            onUserClick={this.props.onUserClick}
            onLikeDislikeClick={this.props.onLikeDislikeClick}
            onCommentPost={this.props.onCommentPost}
        />)
      }

    }else{  //if we have no replies object, theres no reason to draw anything
      return <View></View>;
    }



  }




  renderReplyBox(){
    if(this.state.replyBoxVisible==true){
      return (
        <CommentReplyCard
          orientation={this.props.device.orientation}
          onPostBtnPress={this.onCommentPost.bind(this)}
          postBtnEnabled={(this.props.commentData.commentBeingPosted==false)}
          postBtnLoading={this.props.commentData.commentBeingPosted}
      />);
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

    let paddingLeftIfCommentLvlAbove0  = null, paddingRightIfCommentLvlAbove0 = null;
    if(this.props.commentData.commentLvl>0){
      paddingLeftIfCommentLvlAbove0 = this.props.commentData.commentLvl*(w*0.015);
      paddingRightIfCommentLvlAbove0 = 0;
    }
    return(
      <View style={[styles.cardContainer, {paddingLeft: paddingLeftIfCommentLvlAbove0, paddingRight:paddingRightIfCommentLvlAbove0},this.props.style]}>
      <View style={styles.cardContent}>
        {this.renderHeader(styles)}
        {this.renderBody(styles)}
        {this.renderFooter(styles)}
        {this.renderReplyBox(styles)}
        {this.renderMoreCommentsLbl(this.props.commentData.replies, styles)}
      </View>

      </View>
    );
  }


  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.commentData !== this.props.commentData)
      ||
      (nextProps.device !== this.props.device)
      ||
      (nextState.replyBoxVisible !== this.state.curSortFilter)
    );
  }



}


BillCommentCard.defaultProps = {commentLvl: 0};

BillCommentCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  commentData: React.PropTypes.object.isRequired,

  onShowMoreCommentsClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired,
};
export default BillCommentCard;
