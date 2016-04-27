/**
 * # CardFactory.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
import CommentCard from './CommentCard';



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
    switch(this.props.type){
      case "comment":
        let d = this.props.timelineData;
        console.log("D is: "+JSON.stringify(d));
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
        break;
      case "likecomment":
        break;
      default:
        throw new Error("No implementation of a card for type: "+this.props.type);
        break;
    }
  }
}

export default CardFactory;
