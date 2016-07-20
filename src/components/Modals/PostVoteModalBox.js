'use strict';

import Button from 'sp-react-native-iconbutton';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';


import {Colors} from '../../config/constants';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import BillCommentCard from '../Cards/BillCards/BillCommentCard';

import PavImage from '../../lib/UI/PavImage'
import congratsScreenPhoto from '../../../assets/congratsScreen.png';
import moment from 'moment';


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: w*1,
        backgroundColor: Colors.transparentColor,
    },
    scroller:{
      flex:1,
      flexDirection:'column',
    },

    billImage:{
      width:w*1,
    },

    congratulationsTextContainer:{
      flex:1,
      // backgroundColor:'pink',
      justifyContent:'center'
    },
    congratulationsTextTitle:{
      backgroundColor:Colors.transparentColor,
      color: Colors.mainTextColor,
      textAlign: 'center',
      fontFamily: 'Whitney-Regular',
      fontSize: getCorrectFontSizeForScreen(17),
    },
    congratulationsTextSubtitle:{
      backgroundColor:Colors.transparentColor,
      color: Colors.mainTextColor,
      textAlign: 'center',
      fontFamily: 'Whitney-Regular',
      fontSize: getCorrectFontSizeForScreen(10),
    },

    disagreesTextTitleContainer:{
      backgroundColor: Colors.titleBgColor,
      borderBottomColor: "rgba(0, 0, 0, 0.07)",
      borderBottomWidth: 1,
      paddingHorizontal: w*0.015,
      paddingVertical: h*0.015,
    },
    disagreesTextTitle:{
      color: Colors.primaryColor,
      fontFamily: 'Whitney-Bold',
      fontSize: getCorrectFontSizeForScreen(8),
    },

    disagreesContainer:{
      flex:1,
    },
    commentCard:{
      flex:1,
      padding:0
    },
    cardContainerStyle:{
      flex:1,
      padding:w*0.05,
      marginRight:0,
    }
  });

class PostVoteModalBox extends React.Component {
    constructor(){
        super();
    }



    renderDisagreesComment(commentData){
      if(commentData!=null){
        let author_first_name = commentData.author_first_name || "Someone";
        return (
          <View style={styles.disagreesContainer}>
            <View style={styles.disagreesTextTitleContainer}>
              <Text style={styles.disagreesTextTitle}>
                {author_first_name.toUpperCase()} DISAGREES WITH YOU, HE THINKS:
              </Text>
            </View>
            <BillCommentCard
              style={styles.commentCard}
              cardContainerStyle={styles.cardContainerStyle}
              key="disagreesComment"
              device={this.props.device}
              alwaysBreakCommentsToNewScreen={true}
              commentData={{
                commentBeingAltered: false,
                commentLvl:0,
                baseCommentLvl:0,
                timeString:moment(commentData.timestamp).fromNow(),
                userFullNameText:commentData.author_first_name+" "+commentData.author_last_name,
                commentText:commentData.body,
                userPhotoUrl:commentData.author_img_url,
                likeCount:commentData.score,
                isLiked:commentData.liked,
                isDisliked:commentData.disliked,
                userId:commentData.author,
                commentId:commentData.comment_id,
                billId:commentData.bill_id,
                replies:commentData.replies,
                isTopCommentInFavor:commentData.isTopCommentInFavor,
                isTopCommentAgainst:commentData.isTopCommentAgainst,
              }}
              onUserClick={this.props.onUserClick}
              onLikeDislikeClick={this.props.onLikeDislikeClick}
              onCommentPost={this.props.onCommentPost}
              onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
            />
          </View>

        )
      }else{
        return <View></View>;
      }
    }

    render(){
      // let styles = this.getStyles();
      let topCommentExists = (this.props.oppositeComment!=null);
        return (
            <Modal
                backdrop={false}
                animationDuration={200}
                swipeThreshold={90}
                style={[styles.modal, {height: topCommentExists===true?h*0.75:h*0.65}]}
                swipeToClose={false}
                position="bottom"
                ref="postVoteModal"
                isOpen={this.props.isOpen}
              >

              <ScrollView
              style={[styles.scroller, {backgroundColor: topCommentExists===true?'white':Colors.transparentColor,}]}
              bounces={false}
              >

                <PavImage
                  key="postVoteHeaderImg"
                  style={[styles.billImage, {height:topCommentExists===true?h*0.25:h*0.35}]}
                  source={congratsScreenPhoto}
                  defaultSource={congratsScreenPhoto}
                  indicatorProps={{color:Colors.mainTextColor, size:Platform.OS=="ios"?40:"large"}}
                  resizeMode='cover'
                >
                  <View style={styles.congratulationsTextContainer}>
                    <Text style={styles.congratulationsTextTitle}>
                      Congratulations {this.props.userFirstName}!
                    </Text>
                    <Text style={styles.congratulationsTextSubtitle}>
                      You have succesfully voted on this bill
                    </Text>
                  </View>
                </PavImage>
                {this.renderDisagreesComment(this.props.oppositeComment)}


              </ScrollView>

            </Modal>
        );
    }
}


PostVoteModalBox.propTypes= {
  isOpen: React.PropTypes.bool.isRequired,
  userFirstName: React.PropTypes.string,
  device: React.PropTypes.object.isRequired,
  oppositeComment: React.PropTypes.object,

  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired,
  onShowMoreCommentsClick: React.PropTypes.func.isRequired,
};
module.exports = PostVoteModalBox;
