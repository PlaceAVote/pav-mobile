'use strict';

import Button from 'sp-react-native-iconbutton';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
} from 'react-native';


import {Colors} from '../../config/constants';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import BillCommentCard from '../Cards/BillCards/BillCommentCard';




class PostVoteModalBox extends React.Component {
    constructor(){
        super();
    }


    getStyles(){
        return StyleSheet.create({
            modal: {
                justifyContent: 'center',
                alignItems: 'center',
                height: h*0.75,
                width: w*1,
            },
            modalVerticalParent:{
              flex:1,
              flexDirection:'column',
              backgroundColor: 'purple',
              alignItems: 'center'
            },



        });
    }
    render(){
      let styles = this.getStyles();

        let rowData = {};
        return (
            <Modal
                backdrop={false}
                animationDuration={200}
                swipeToClose={true}
                swipeThreshold={90}
                style={styles.modal}
                position="bottom"
                ref="postVoteModal"
                isOpen={this.props.isOpen}
                onClosed={this.props.onModalClosed}>

              <View style={styles.modalVerticalParent}>

                <View style={{backgroundColor:'pink', height:h*0.1}}><Text>!</Text></View>

                <BillCommentCard
                  style={styles.commentCard}
                  key={rowData.comment_id}
                  device={this.props.device}
                  alwaysBreakCommentsToNewScreen={true}
                  commentData={{
                    commentBeingAltered: this.props.commentBeingAltered,
                    commentLvl:0,
                    baseCommentLvl:0,
                    timeString:moment(rowData.timestamp).fromNow(),
                    userFullNameText:rowData.author_first_name+" "+rowData.author_last_name,
                    commentText:rowData.body,
                    userPhotoUrl:rowData.author_img_url,
                    likeCount:rowData.score,
                    isLiked:rowData.liked,
                    isDisliked:rowData.disliked,
                    userId:rowData.author,
                    commentId:rowData.comment_id,
                    billId:rowData.bill_id,
                    replies:rowData.replies,
                    isTopCommentInFavor:rowData.isTopCommentInFavor,
                    isTopCommentAgainst:rowData.isTopCommentAgainst,
                  }}
                  onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
                  onUserClick={this.props.onCommentUserClick}
                  onLikeDislikeClick={this.props.onCommentLikeDislikeClick}
                  onCommentPost={this.onCommentPostToComment.bind(this)}
                  />

              </View>

            </Modal>
        );
    }
}


PostVoteModalBox.propTypes= {
  isOpen: React.PropTypes.bool.isRequired,
  onModalClosed: React.PropTypes.func.isRequired,
};
module.exports = PostVoteModalBox;
