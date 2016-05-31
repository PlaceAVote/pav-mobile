import {NewsFeedUpdateTypes} from '../../config/constants';

export function getCorrectLikeDislikeAndScore(type, newStatus, oldOpposite, oldScore){
  let newState = {
    newLiked: null,
    newDisliked: null,
    newScore: oldScore
  }
  switch(type){
    case NewsFeedUpdateTypes.COMMENT_CARD_LIKE:
      // console.log("NOW likeUpdater: like");
      //is like
      newState.newLiked = newStatus;   //mark as liked
      newState.newDisliked = oldOpposite;
      if(newStatus==true){ //comment is now liked
        if(oldOpposite==true){  //if the comment was disliked before it becomes liked
          newState.newScore += 1;       //then the score goes up by one for revoking the dislike
          newState.newDisliked = false; //we just liked a comment, we know its no longer disliked, so disable it
        }
        newState.newScore += 1;
      }else{  //comment like is now revoked
        newState.newScore -= 1;
      }
      break;
    case NewsFeedUpdateTypes.COMMENT_CARD_DISLIKE:
      // console.log("NOW likeUpdater: dislike");
      //is dislike
      newState.newDisliked = newStatus;  //mark as disliked
      newState.newLiked = oldOpposite;
      if(newStatus==true){ //comment is now disliked
        if(oldOpposite==true){  //if the comment was liked before it becomes disliked
          newState.newScore -= 1;     //then the score goes down by one for revoking the like
          newState.newLiked = false;  //if we just disliked a comment, we know its no longer liked, so disable it
        }
        newState.newScore -= 1;
      }else{  //comment dislike is now revoked
        newState.newScore += 1;
      }
      break;
  }
  // console.log("newState: "+JSON.stringify(newState))
  return newState;
}
