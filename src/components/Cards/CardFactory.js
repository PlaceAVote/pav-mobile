/**
 * # CardFactory.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
import CommentCard from './CommentCard';
import LikeCard from './LikeCard';
import VoteCard from './VoteCard';
import FollowCard from './FollowCard';



/**
 * Immutable
 */
import {Map} from 'immutable';
import moment from 'moment';
import {Colors, ScheneKeys} from '../../config/constants';

/**
 * The necessary React components
 */
import React,
{
  Component,
  View
}
from 'react-native';








class CardFactory extends Component {
  constructor(props) {
    super(props);
  }



  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let d = this.props.timelineData;
    let u = this.props.curUser;
    switch(this.props.timelineData.type){
      case "comment":
      // console.log("Real comment is: "+JSON.stringify(d));
        return (<CommentCard
          {...this.props}
          dateTime={moment(d.timestamp).format("h:mma, Do MMMM YYYY")}
          userFullNameText={d.author_first_name+" "+d.author_last_name}
          commentParentTitle={d.bill_title}
          commentText={d.body}
          userPhotoUrl={d.author_img_url}
          />);
        break;
      case "vote":
        return (<VoteCard
          {...this.props}
          dateTime={moment(d.timestamp).format("h:mma, Do MMMM YYYY")}
          userFullNameText={u.firstName+" "+u.lastName}
          voteParentTitle={d.bill_title}
          />);
        break;
      case "followinguser":
        //Discovered a react native bug here, if I don't add the " " empty space character in the end of followedFullNameText the last name of the person might be invisible
        return (<FollowCard
        {...this.props}
        dateTime={moment(d.timestamp).format("h:mma, Do MMMM YYYY")}
        followerFullNameText={u.firstName+" "+u.lastName}
        followedFullNameText={d.first_name+" "+d.last_name+" "}
        />);
        break;
      case "likecomment":
        // console.log("Like comment is: "+JSON.stringify(d));
        return (<LikeCard
          {...this.props}
          dateTime={moment(d.timestamp).format("h:mma, Do MMMM YYYY")}
          authorFullNameText={u.firstName+" "+u.lastName}
          userFullNameText={d.author_first_name+" "+d.author_last_name}
          commentParentTitle={d.bill_title}
          commentText={d.body}
          userPhotoUrl={d.author_img_url}
          />);
        break;


      default:
        return <View {...this.props}></View>;
        break;
    }
  }
}

export default CardFactory;
