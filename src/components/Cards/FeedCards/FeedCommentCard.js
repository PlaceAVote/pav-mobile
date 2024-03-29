/* @flow weak */
/**
 * # FeedCommentCard.js
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
import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';

const styles = StyleSheet.create({

  cardContainer:{
    // flex: 1,
    // alignItems: 'stretch',
    // backgroundColor: 'blue',
    paddingHorizontal: 7,
    paddingVertical: 7,

  },

  card:{
    flex: 1,
    backgroundColor: '#ffffff',
    // backgroundColor: 'orange',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  cardTitleContainer:{

    flexDirection:'row',
    paddingHorizontal: w*0.02,
    paddingVertical: w*0.033,
    justifyContent:'space-between',
    alignItems:'center',
  },
  cardTitleTextAndIconContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  cardTitleText:{
    // backgroundColor: 'red',
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  cardDateText:{
    // backgroundColor: 'red',
    paddingHorizontal: 5,
    // color: Colors.thirdTextColor,
    color: 'rgba(0, 0, 0, 0.60)',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
  },

  cardContentContainer:{
    // backgroundColor:'red',
    flex:1,
    justifyContent:'center',
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
    justifyContent:'center',
    // backgroundColor:'red',
    padding: 5
  },



  userImage:{
    width:w*0.09,
    height:w*0.09,
    // marginHorizontal: 10,
  },
  commentNameTextContainer:{
    paddingHorizontal: w*0.02,
  },
  commentNameText:{
    // backgroundColor:'blue',
    color:"#e64a33",
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
  },

  commentInText:{
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  commentLocationTextContainer:{
    paddingHorizontal: w*0.02,
    // flexDirection:'column',
    // flexWrap: 'wrap',
    paddingVertical:h*0.001,
  },
  commentLocationText:{
    // backgroundColor:'yellow',
    color: Colors.primaryColor,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  cardContentBody:{
    // backgroundColor:'green'
    // marginTop: h*0.01
  },
  cardContentText:{
    // padding:2,
    lineHeight: 15,
    // backgroundColor:'green',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(7),
    color: 'rgba(0, 0, 0, 0.54)',
  },


  footerContainer:{

    flexDirection:'row',
    backgroundColor: '#EDECF1',
    borderWidth: 1,
    borderColor: 'rgba(216, 214, 226, 1)',
    ...Platform.select({
       ios: {
         borderTopColor: 'rgba(216, 214, 226, 0)',
         borderLeftColor: 'rgba(216, 214, 226, 0)',
         borderRightColor: 'rgba(216, 214, 226, 0.9)',
         borderBottomColor: 'rgba(216, 214, 226, 1)',
         borderWidth: 1,
       },
       android: {
       },
     }),
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
  likeDislikeIconContainer:{
    paddingHorizontal:w*0.04,
    justifyContent:'center',
  },
  activeLikeIcon:{
    color: Colors.accentColor,
  },
  activeDislikeIcon:{
    color: Colors.negativeAccentColor,
  },
  inactiveLikeDislikeIcon:{
    color: Colors.fourthTextColor,
  },
  scoreText:{
    color: Colors.accentColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(9),
    // backgroundColor:'brown'
  },
  replyButtonText:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(9),
    // backgroundColor:'brown'
  },


});


class FeedCommentCard extends React.Component {
  constructor(props) {
    super(props);
  }


  async onLikeClick(){
    if(this.props.onLikeDislikeClick){
      if(!!this.props.commentId && !!this.props.billId && this.props.score!=null && this.props.isDisliked!=null && this.props.isLiked!=null){
        let success = await this.props.onLikeDislikeClick(REACTIONS.HAPPY, {
          commentId: this.props.commentId,
          billId: this.props.billId,
          newStatus: this.props.isLiked,
          oldOpposite: this.props.isDisliked,
          oldScore: this.props.score,
        })
      }
    }
  }

  async onDislikeClick(){
    if(this.props.onLikeDislikeClick){
      if(!!this.props.commentId && !!this.props.billId && this.props.score!=null && this.props.isDisliked!=null && this.props.isLiked!=null){
        let success = await this.props.onLikeDislikeClick(REACTIONS.SAD, {
          commentId: this.props.commentId,
          billId: this.props.billId,
          newStatus: this.props.isDisliked,
          oldOpposite: this.props.isLiked,
          oldScore: this.props.score,
        })
      }
    }
  }

  onReplyClick(){
    if(this.props.onReplyClick && !!this.props.billId && !!this.props.commentId){
      this.props.onReplyClick(this.props.commentId, {featured_bill_title: this.props.billTitle, bill_id:this.props.billId } );
    }
  }


  onBillClick(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId);
    }
  }
  onUserClick(){
    if(this.props.onUserClick && !!this.props.userId){
        this.props.onUserClick(this.props.userId);
    }
  }

  renderHeader(){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <View style={styles.cardTitleTextAndIconContainer}>
        <Text style={styles.cardTitleText}>NEW COMMENT</Text>
      </View>
      <Text style={styles.cardDateText}>{this.props.timeString}</Text>
    </View>);
  }

  renderBody(){
    return (<View style={styles.cardContentContainer}>

      <View style={styles.cardContentHeader}>
        <TouchableOpacity onPress={this.onUserClick.bind(this)}>
          <PavImage
            defaultSource={defaultUserPhoto}
            style={styles.userImage}
            source={{uri: this.props.userPhotoUrl}}
            resizeMode='cover'
          />
        </TouchableOpacity>
        <View style={styles.commentDescriptionContainer}>
          <TouchableOpacity style={styles.commentNameTextContainer} onPress={this.onUserClick.bind(this)}>
            <Text style={styles.commentNameText}>{this.props.userFullNameText} <Text style={styles.commentInText}>in: </Text> </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentLocationTextContainer} onPress={this.onBillClick.bind(this)}>
            <Text style={styles.commentLocationText}>{this.props.commentParentTitle}</Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.cardContentBody}>
        <Text style={styles.cardContentText}>
        {this.props.commentText}
        </Text>
      </View>
    </View>);
  }

  renderFooter(){
    return (
      <View style={styles.footerContainer}>
        <View style={styles.likeDislikeButtonContainer}>
          <TouchableOpacity style={styles.likeDislikeIconContainer} onPress={this.onLikeClick.bind(this)}>
            <PavIcon name="thumbs-up" size={15} style={this.props.isLiked?styles.activeLikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeDislikeIconContainer} onPress={this.onDislikeClick.bind(this)}>
            <PavIcon name="thumbs-down" size={15} style={this.props.isDisliked?styles.activeDislikeIcon:styles.inactiveLikeDislikeIcon}/>
          </TouchableOpacity>
          <View style={styles.likeDislikeIconContainer} >
            <Text style={styles.scoreText}>{this.props.score} </Text>
          </View>
        </View>
        <TouchableOpacity  style={styles.replyButtonContainer} onPress={this.onReplyClick.bind(this)}>
          <Text style={styles.replyButtonText}>REPLY</Text>
        </TouchableOpacity>
      </View>);
  }


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={[styles.card, this.props.cardStyle]}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </View>
      </View>
    );
  }
}








FeedCommentCard.propTypes= {

  timeString: React.PropTypes.string.isRequired,
  commentParentTitle: React.PropTypes.string.isRequired,
  userFullNameText: React.PropTypes.string.isRequired,
  commentText: React.PropTypes.string,
  userPhotoUrl: React.PropTypes.string,
  score: React.PropTypes.number.isRequired,
  isLiked: React.PropTypes.bool.isRequired,
  isDisliked: React.PropTypes.bool.isRequired,
  commentId: React.PropTypes.string,
  userId: React.PropTypes.string,
  billId: React.PropTypes.string,
  billTitle: React.PropTypes.string,

  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onReplyClick: React.PropTypes.func.isRequired,
};
export default FeedCommentCard;
