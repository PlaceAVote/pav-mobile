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



import {Colors, ScheneKeys, Other} from '../../../config/constants';
const {REACTIONS, SOCIAL_TYPES} = Other;

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'

import AccordionBillCommentCardContainer from './AccordionBillCommentCardContainer';
import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';
import CommentReplyCard from './CommentReplyCard';

// import _ from 'underscore';

const SUBCOMMENT_COUNT = 2;
const styles = StyleSheet.create({

  cardContainer:{
    flex: 1,
    alignItems: 'stretch',
    padding:7,
    // backgroundColor: 'blue',

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
  cardDateTextContainer:{
    // paddingHorizontal: w*0.02,
    // paddingVertical: w*0.02,
    // paddingHorizontal: 5,
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
  //   fontSize: getCorrectFontSizeForScreen(8),
  // },
  cardDateText:{
    // backgroundColor: 'red',

    // color: Colors.thirdTextColor,
    color: Colors.fourthTextColor,
    fontFamily: 'Whitney-Light',
    fontSize: getCorrectFontSizeForScreen(7),
  },

  cardContentContainer:{
    // backgroundColor:'red',
    // paddingHorizontal: w*0.02,
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


  commentHeaderTitlesContainer:{
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
  commentNameTextContainer:{
    // paddingVertical: h*0.005,
  },
  commentNameText:{
    // backgroundColor:'blue',
    color:"#e64a33",
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(9),
  },
  topCommentText:{
    color: Colors.fourthTextColor,
    // paddingVertical: h*0.001,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(6),
  },
  // topCommentInFavorText:{
  //   color: "#8E9599",
  //   // paddingVertical: h*0.001,
  //   fontFamily: 'Whitney-SemiBold',
  //   fontSize: getCorrectFontSizeForScreen(6),
  // },
  // topCommentAgainstText:{
  //   color: "#998E8E",
  //   // paddingVertical: h*0.001,
  //   fontFamily: 'Whitney-SemiBold',
  //   fontSize: getCorrectFontSizeForScreen(6),
  // },
  commentLocationText:{
    // backgroundColor:'yellow',
    color: Colors.primaryColor,
    paddingHorizontal: 1,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
    width: w*0.7,
  },
  cardContentTextContainer:{
    // backgroundColor:'green'
    // marginTop: h*0.01
    // padding:2,
    paddingVertical: h*0.015,
  },
  cardContentText:{
    // backgroundColor:'green',
    fontFamily: 'Whitney-Light',
    fontSize: getCorrectFontSizeForScreen(7),
    color: 'rgba(0, 0, 0, 0.64)',
  },


  footerContainer:{
    flex:1,
    flexDirection:'row',
    // backgroundColor: 'red',
    // borderStyle: 'solid',
    // borderTopWidth: 1,
    // borderTopColor: Platform.OS=="android"?'rgba(216, 214, 226, 1)':'rgba(216, 214, 226, 0.25)',
    // borderTopColor: 'rgba(216, 214, 226, 0.7)',
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 0.7,
    paddingVertical:h*0.0070,
    paddingHorizontal: w*0.03,
    // paddingHorizontal:w*0.002,
    alignItems:'center',
    justifyContent:'space-between',
    // borderLeftColor: 'rgba(216, 214, 226, 0.5)',
    // borderRightColor: 'rgba(216, 214, 226, 0.5)',
    // borderBottomColor: 'rgba(216, 214, 226, 0.7)',

    // shadowColor: 'rgba(0, 0, 0, 0.32)',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 2,
    // },
  },
  likeDislikeButtonContainer:{
    // flex:1,
    flexDirection:'row',
    justifyContent:'center',
    // paddingHorizontal:w*0.015,
    paddingVertical: h*0.009,
    // backgroundColor:'red'
  },
  replyButtonContainer:{
    // flex:1,
    // backgroundColor:'pink',
    // justifyContent:'flex-end',
    alignItems:'center',
    paddingVertical: h*0.009,

    // paddingRight: w*0.04,

    // borderStyle: 'solid',
    // borderLeftColor: '#D8D6E2',
    // borderLeftWidth: 1,
  },

  activeLikeIcon:{
    color: Colors.accentColor,
  },
  activeDislikeIcon:{
    color: Colors.negativeAccentColor,
  },
  inactiveLikeDislikeIcon:{
    color: "#A4A4A4",
  },

  replyButtonText:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(9),
    // backgroundColor:'brown'
  },


  scoreText:{
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(9),
  },
  likeCountPositive:{
    color: Colors.accentColor,
  },
  likeCountNegative:{
    color: Colors.negativeAccentColor,
  },

  footerItemContainer:{
    // backgroundColor:Colors.transparentColor,
    // backgroundColor:'purple',
    paddingRight:w*0.06,
    justifyContent:'center',
  },


  /* REPLIES BOX */
  repliesBoxContainer:{
    backgroundColor:Colors.buttonBgColor,
    // paddingTop: h*0.045,
    marginTop:5,
    paddingVertical: h*0.012,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth: 1,
    borderRadius:3,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    // borderTopWidth:0,
    // borderTopColor: 'rgba(0, 0, 0, 0.06)',
    // borderTopWidth: 1,


  },
  repliesBoxText:{
    fontSize: getCorrectFontSizeForScreen(9),
    color: Colors.primaryColor,
    fontFamily: 'Whitney-SemiBold',
  },
  repliesBoxIcon:{
    paddingHorizontal: w*0.010,
    color: Colors.primaryColor,
  },


});


class BillCommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyBoxVisible: false,
      commentBeingAltered: false
    }
  }




  async onLikeClick(){
    if(this.props.onLikeDislikeClick){
      // alert("onLikeClick commentid: "+this.props.commentData.commentId+" billId: "+this.props.commentData.billId+" isLiked: "+this.props.commentData.isLiked);
      if(!!this.props.commentData.commentId && !!this.props.commentData.billId && this.props.commentData.isLiked!=null){
        let success = await this.props.onLikeDislikeClick(REACTIONS.HAPPY, this.props.commentData.commentId, this.props.commentData.billId, this.props.commentData.isLiked);
      }
    }
  }

  async onDislikeClick(){
    if(this.props.onLikeDislikeClick){
      if(!!this.props.commentData.commentId && !!this.props.commentData.billId && this.props.commentData.isDisliked!=null){
        let success = await this.props.onLikeDislikeClick(REACTIONS.SAD, this.props.commentData.commentId, this.props.commentData.billId, this.props.commentData.isDisliked);
      }
    }
  }

  onReplyClick(){
    this.setState({replyBoxVisible:!this.state.replyBoxVisible});
  }



  async onCommentPost(comment){
    if(!!comment && comment.length>0){
      if(!!this.props.commentData.commentId && !!this.props.commentData.billId){
          this.setState({commentBeingAltered:true});
          let postSuccessful = await this.props.onCommentPost(comment, {replies: this.props.commentData.replies, billId: this.props.commentData.billId, commentId: this.props.commentData.commentId, newCommentLvl: (this.props.commentData.commentLvl+1)});
          if(postSuccessful==true){
            let newCommentLvl = this.props.commentData.commentLvl+1;
            // console.log("Comment lvl for this post: "+newCommentLvl);
            if(newCommentLvl>1){  //if we are on comment lvl above 1
                this.setState({
                  replyBoxVisible:false,
                  commentBeingAltered:false
                });
                if(this.shouldBreakSubcommentToNewScreen()){
                    this.onShowMoreCommentsClick();
                }else{
                  setTimeout(()=>{  //if I don't use this timeout, the collapsible never shows (bug of collapsible)
                      this.refs[this.props.commentData.commentId].expandCard();
                  },350);
                }

            }else{
              this.setState({
                commentBeingAltered:false
              });                                  //if we are on comment lvl 1
              this.onShowMoreCommentsClick();
            }
          }
          return postSuccessful;
      }
    }
  }


  onUserClick(){
    if(this.props.onUserClick && !!this.props.commentData.userId){
        this.props.onUserClick(this.props.commentData.userId, this.props.commentData.userPhotoUrl);
    }
  }

  onShowMoreCommentsClick(){
    if(this.props.onShowMoreCommentsClick && !!this.props.commentData.commentId){
        this.props.onShowMoreCommentsClick( this.props.commentData.commentId, this.props.commentData.commentLvl);
    }
  }

  renderHeader(){
    return (<View style={styles.cardContentHeader}>
      <TouchableOpacity onPress={this.onUserClick.bind(this)}>
        <PavImage
          platform={Platform.OS}
          defaultSource={defaultUserPhoto}
          style={styles.userImage}
          source={{uri: this.props.commentData.userPhotoUrl}}
          resizeMode='cover'
        />
      </TouchableOpacity>
      <View style={styles.commentHeaderTitlesContainer}>
        <TouchableOpacity style={styles.commentNameTextContainer} onPress={this.onUserClick.bind(this)}>
          <Text style={styles.commentNameText}>{this.props.commentData.userFullNameText}</Text>
        </TouchableOpacity>
        <View style={styles.cardDateTextContainer}>
          <Text style={styles.cardDateText}>{this.props.commentData.timeString}</Text>
        </View>

      </View>
      {this.renderTopComment()}

    </View>);
  }


  getTopCommentText(isInFavor){
    if(isInFavor==true){
      return <Text style={styles.topCommentText}>Highest rated in Favor</Text>
    }else{
      return <Text style={styles.topCommentText}>Highest rated Against</Text>
    }
  }

  renderTopComment(){
    if(this.props.commentData.isTopCommentInFavor==true || this.props.commentData.isTopCommentAgainst==true){
      return (
      <View style={styles.topCommentContainer}>
        {this.getTopCommentText((this.props.commentData.isTopCommentInFavor==true))}
      </View>)
    }else{
      return <View></View>;
    }
  }

  renderBody(){
    return (<View style={styles.cardContentContainer}>
      <View style={styles.cardContentTextContainer}>
        <Text style={styles.cardContentText}>
        {this.props.commentData.commentText}
        </Text>
      </View>
    </View>);
  }

  renderFooter(){
    return (
      <View style={styles.footerContainer}>
        <View style={styles.likeDislikeButtonContainer}>
          <TouchableOpacity style={styles.footerItemContainer} onPress={this.onLikeClick.bind(this)}>
            <PavIcon name="thumbs-up" size={17} style={this.props.commentData.isLiked?styles.activeLikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItemContainer} onPress={this.onDislikeClick.bind(this)}>
            <PavIcon name="thumbs-down" size={17} style={this.props.commentData.isDisliked?styles.activeDislikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <View style={styles.footerItemContainer}>
            <Text style={[styles.scoreText, this.props.commentData.likeCount>0?styles.likeCountPositive:styles.likeCountNegative]}>{this.props.commentData.likeCount}</Text>
          </View>
        </View>
        <TouchableOpacity  style={styles.replyButtonContainer} onPress={this.onReplyClick.bind(this)}>
          <Text style={styles.replyButtonText}>REPLY</Text>
        </TouchableOpacity>
      </View>);
  }


  /*
   Returns true
    - for comment lvl 0
    OR
    - if we have SUBCOMMENT_COUNT or more lvls of comments inside our container
  */
  shouldBreakSubcommentToNewScreen(){
    // console.log("Cur Comment:"+this.props.commentData.commentText+" lvl: "+comLvl+" when baseComLvl is: "+baseComLvl+" difference: "+(comLvl-baseComLvl));
    return (this.props.alwaysBreakCommentsToNewScreen===true || (this.props.commentData.commentLvl-this.props.commentData.baseCommentLvl>=SUBCOMMENT_COUNT));
  }

  renderMoreCommentsLbl(replies){

    if(!!replies && replies.length>0){
      if(this.shouldBreakSubcommentToNewScreen()){
        return (
            <TouchableOpacity style={styles.repliesBoxContainer} onPress={this.onShowMoreCommentsClick.bind(this)}>
              <Text style={styles.repliesBoxText}>View {replies.length>1?replies.length+" Replies ":"1 Reply"}</Text>
              <PavIcon name="arrow-right" size={12} style={styles.repliesBoxIcon}/>
            </TouchableOpacity>
          );
      }else{//for comment lvl 1 and above
        return (
          <AccordionBillCommentCardContainer

            device={this.props.device}
            ref={this.props.commentData.commentId}
            commentBeingAltered={this.state.commentBeingAltered}
            commentLvl={this.props.commentData.commentLvl+1}
            baseCommentLvl={this.props.commentData.baseCommentLvl}
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
      // console.log("Reply box loading: "+this.state.commentBeingAltered);
      return (
        <CommentReplyCard
          id={this.props.commentData.commentId}
          orientation={this.props.device.orientation}
          onPostBtnPress={this.onCommentPost.bind(this)}
          postBtnEnabled={(this.state.commentBeingAltered==false)}
          postBtnLoading={(this.state.commentBeingAltered==true)}
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
    // console.log("!!update Reply box loading: "+this.state.commentBeingAltered);
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    // console.log("Comment: "+this.props.commentData.commentText+" of lvl: "+this.props.commentData.commentLvl+" of base lvl: "+this.props.commentData.baseCommentLvl);
    let paddingLeftIfCommentLvlAbove0  = null, paddingRightIfCommentLvlAbove0 = null;
    if(this.props.commentData.commentLvl>0){
      let difFromParLvl = this.props.commentData.commentLvl-this.props.commentData.baseCommentLvl;
      paddingLeftIfCommentLvlAbove0 = difFromParLvl*(w*0.015);
      paddingRightIfCommentLvlAbove0 = 0;
    }
    // console.log("@@@@ Comment lvl: "+this.props.commentData.commentLvl+' therefore left padding: '+paddingLeftIfCommentLvlAbove0);
    return(
      <View
        style={[styles.cardContainer, {paddingLeft: paddingLeftIfCommentLvlAbove0, paddingRight:paddingRightIfCommentLvlAbove0},this.props.style]}
        onLayout={this.props.onLayout}
      >
        <View style={[styles.cardContent, this.props.cardContainerStyle]}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
          {this.renderReplyBox()}
          {this.renderMoreCommentsLbl(this.props.commentData.replies)}
        </View>
      </View>
    );
  }

// (!_.isEqual(nextProps.commentData, this.props.commentData))

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.commentData !== this.props.commentData)
      ||
      (nextProps.commentData.replies !== this.props.commentData.replies)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
      ||
      (nextState.replyBoxVisible !== this.state.curSortFilter)
    );
  }



}


BillCommentCard.defaultProps = {commentLvl: 0};

BillCommentCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  commentData: React.PropTypes.object.isRequired,
  onLayout: React.PropTypes.func,
  alwaysBreakCommentsToNewScreen: React.PropTypes.bool,
  style: View.propTypes.style,
  cardContainerStyle: View.propTypes.style,
  onShowMoreCommentsClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired,
};
export default BillCommentCard;
