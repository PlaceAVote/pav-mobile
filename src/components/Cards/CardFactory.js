/**
 * # CardFactory.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
import CommentCard from './ProfileCards/CommentCard';
import LikeCard from './ProfileCards/LikeCard';
import VoteCard from './ProfileCards/VoteCard';
import FollowCard from './ProfileCards/FollowCard';


import FeedCommentCard from './FeedCards/FeedCommentCard';
import FeedBillCard from './FeedCards/FeedBillCard';
import FeedUserIssueCard from './FeedCards/FeedUserIssueCard';
import FeedVoteCard from './FeedCards/FeedVoteCard';

import NotifVoteCard from './NotificationCards/NotifVoteCard'
import NotifCommentReplyCard from './NotificationCards/NotifCommentReplyCard'


/**
 * Immutable
 */
import {Map} from 'immutable';
import moment from 'moment';
import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {View} from 'react-native';








class CardFactory extends React.Component {
  constructor(props) {
    super(props);
  }




  renderProfileCards(){
    let d = this.props.itemData;
    let u = this.props.curUser;
    // console.log("Real comment is: "+JSON.stringify(d.timestamp));
    switch(this.props.itemData.type){
      case "comment":
      // console.log("Real comment is: "+JSON.stringify(d.timestamp));
        return (<CommentCard
          {...this.props}
          dateTime={moment(d.timestamp, 'x').format("h:mma, Do MMMM YYYY")}
          userFullNameText={d.author_first_name+" "+d.author_last_name}
          commentParentTitle={d.bill_title}
          commentText={d.body}
          userPhotoUrl={d.author_img_url}

          userId={d.author}
          commentId={d.comment_id}
          billId={d.bill_id}
          onUserClick={this.props.onUserClick}
          onBillClick={this.props.onBillClick}
          />);
        break;
      case "vote":
        // console.log("Real VoteCard is: "+JSON.stringify(d));
        return (<VoteCard
          {...this.props}
          dateTime={moment(d.timestamp, 'x').format("h:mma, Do MMMM YYYY")}
          userFullNameText={u.firstName+" "+u.lastName}
          voteParentTitle={d.bill_title}
          userId={d.user_id}
          billId={d.bill_id}
          onUserClick={this.props.onUserClick}
          onBillClick={this.props.onBillClick}
          />);
        break;
      case "followinguser":
        //Discovered a react native bug here, if I don't add the " " empty space character in the end of followedFullNameText the last name of the person might be invisible
        // console.log("Real FollowCard is: "+JSON.stringify(d));
        return (<FollowCard
        {...this.props}
        dateTime={moment(d.timestamp, 'x').format("h:mma, Do MMMM YYYY")}
        followerFullNameText={u.firstName+" "+u.lastName}
        followedFullNameText={d.first_name+" "+d.last_name+" "}
        userId={d.user_id}
        followedUserId={d.following_id}
        onUserClick={this.props.onUserClick}
        />);
        break;
      case "dislikecomment":
      case "likecomment":
        // console.log("Real LikeCard is: "+JSON.stringify(d));
        let commentAuthorName = (d.author_last_name!=null)?d.author_first_name+" "+d.author_last_name:"";
        return (<LikeCard
          {...this.props}
          dateTime={moment(d.timestamp, 'x').format("h:mma, Do MMMM YYYY")}
          userFullNameText={u.firstName+" "+u.lastName}
          authorFullNameText={commentAuthorName}
          commentParentTitle={d.bill_title}
          commentText={d.body}
          userPhotoUrl={d.author_img_url}
          isLike={d.liked}
          authorId={d.author}
          userId={u.id}
          billId={d.bill_id}
          onUserClick={this.props.onUserClick}
          onBillClick={this.props.onBillClick}
          />);
        break;


      default:
        return <View {...this.props}></View>;
        break;
    }
  }


  renderNotificationCards(){
    let n = this.props.itemData;
    let u = this.props.curUser;
    switch(n.type){
      case "vote":
        return (
          <NotifVoteCard
            {...this.props}
            billTitle={n.bill_title}
            billId={n.bill_id}
            onBillClick={this.props.onBillClick}
          />
        )
      case "commentreply":
        // console.log("@@@@@@@@ comment : "+JSON.stringify(n))
        console.log("@@@@@@@@ AUTHOR of the comment is : "+n.author)
        return (<NotifCommentReplyCard
          {...this.props}
          billTitle={n.bill_title}
          billId={n.bill_id}
          authorFullName={n.author_first_name+" "+n.author_last_name}
          authorId={n.author}
          userPhotoUrl={n.author_img_url}
          onBillClick={this.props.onBillClick}
          onUserClick={this.props.onUserClick}
        />)


      default:
        console.log("Data: "+JSON.stringify(n))
        return <View></View>

    }
  }


  renderNewsFeedCards(){

    let n = this.props.itemData;
    let u = this.props.curUser;
    switch(n.type){
      case "userissue":
      // console.log("Real comment is: "+JSON.stringify(n));
          return (<FeedUserIssueCard
          {...this.props}
          timeString={moment(n.timestamp, 'x').fromNow()}
          userFullNameText={n.first_name+" "+n.last_name}
          issueText={n.comment}
          userPhotoUrl={n.img_url}
          issueId={n.issue_id}
          relatedArticleUrl={n.article_link}
          relatedArticleTitle={n.article_title}
          relatedArticlePhotoUrl={n.article_img}
          relatedBillTitle={n.bill_title}
          userReaction={n.emotional_response}
          happyCnt={n.positive_responses}
          neutralCnt={n.neutral_responses}
          sadCnt={n.negative_responses}
          userId={n.user_id}
          billId={n.bill_id}
          onUserClick={this.props.onUserClick}
          onBillClick={this.props.onBillClick}
          onReactionClick={this.props.onReactionClick}
          onSocialClick={this.props.onSocialClick}
          />);
        break;

      case "comment":
        // console.log("COMENT CARD: "+JSON.stringify(n))
        return (<FeedCommentCard
          {...this.props}
          timeString={moment(n.timestamp, 'x').fromNow()}
          userFullNameText={n.author_first_name+" "+n.author_last_name}
          commentParentTitle={n.bill_title}
          commentText={n.body}
          userPhotoUrl={n.author_img_url}
          score={n.score}
          isLiked={n.liked}
          isDisliked={n.disliked}
          commentId={n.comment_id}
          billTitle={n.bill_title}
          userId={n.user_id}
          billId={n.bill_id}
          onUserClick={this.props.onUserClick}
          onBillClick={this.props.onBillClick}
          onLikeDislikeClick={this.props.onLikeDislikeClick}
          onReplyClick={this.props.onReplyClick}
          />);
        break;
      case "vote":
        return (<FeedVoteCard
        {...this.props}
        timeString={moment(n.timestamp, 'x').fromNow()}
        userFullNameText={n.voter_first_name+" "+n.voter_last_name}
        voteParentTitle={n.bill_title}
        userPhotoUrl={n.voter_img_url}
        userId={n.user_id}
        billId={n.bill_id}
        onUserClick={this.props.onUserClick}
        onBillClick={this.props.onBillClick}
        />);
        break;

        case "bill":
        default:
          let yesCount = n["yes-count"], noCount = n["no-count"];
          let favorPercent = -1;
          if((yesCount+noCount)!=0){
            favorPercent = ((yesCount/(yesCount+noCount))*100.00) | 0;  //Bitwise OR operator | 0, converts the float value to int value
          }
          return (<FeedBillCard
          {...this.props}
          subjectTitle={n.subject}
          billTitle={n.featured_bill_title}
          billImgUrl={n.featured_img_link}
          commentCnt={n.comment_count}
          favorPercentage={favorPercent}
          billId={n.bill_id}
          onBillClick={this.props.onBillClick}
          onCommentClick={this.props.onCommentClick}
          onSocialClick={this.props.onSocialClick}
          />);
          break;
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    switch (this.props.type){
      case "profile":
        return this.renderProfileCards();
      case "newsfeed":
        return this.renderNewsFeedCards();
      case "notifications":
        return this.renderNotificationCards();
    }
  }
}

export default CardFactory;
