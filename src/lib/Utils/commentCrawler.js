
import {List} from 'immutable';

/*

findCommentPath:

    This function returns an array of the comment path.

      i.e The first comment within the 3rd comment of a bill would return an array [2, 0].
      i.e.2 The 5th comment, of the 2nd comment of the first comment on a bill would return [0,1,4]


*/
export function findCommentPath(theObject, key, level) {
    let res = locatePath(theObject, key, level);
    if(res!=null){
      return res.reverse();
    }else{
      return null;
    }

}



function locatePath(theObject, key, level){
  let arrayKeyName = 'replies';
  let objectKeyName = 'comment_id';
  var result = null;
  if(theObject instanceof Array) {
      // console.log("Within replies lvl: "+level);
      for(var i = 0; i < theObject.length; i++) {
          let curObj = theObject[i];

          //look for the comment id
          result = locatePath(curObj[objectKeyName], key, i);
          if (result) {
            // console.log("Pushing lvl: "+level);
            if(level!=null){
              result.push(level)
            }
            return result;
          }


          //look within the replies array
          if(curObj[arrayKeyName]!=null){
            result = locatePath(curObj[arrayKeyName], key, i);
            if (result) {
              // console.log("Pushing lvl: "+level);
              if(level!=null){
                result.push(level)
              }
              return result;
            }
          }

      }
  }
  else
  {
      // console.log("Within comment id: "+theObject+" found in lvl: "+level);
      if(theObject==key){
        //found what we were looking for
        // console.log("Found in lvl: "+level);
        return [level];
      }
  }
  return result;
}


/*

findCommentBasedOnPath:

    This function consumes a comment path and then returns an object that contains:

      returns:
        initialArray: A reference to the initial array we pass,
        refToCurObject: A reference to the object (a child of initialArray) that corresponds to the commentPath provided.


*/
export function findCommentBasedOnPath(commentPath, initialArr){
  if(commentPath!=null && initialArr!=null){
    let toBeReturned = {
      initialArray: initialArr,
      refToCurObject: initialArr  //this will be the reference to the object we're looking, but for now we pass the initialArray to it
    }
    let iiii=0,llll=0;
    if(initialArr instanceof List){     //if its an Immutable List
      for( iiii=0, llll=commentPath.length;iiii<llll;iiii++){
          let curCommentIt = commentPath[iiii];
          if(iiii+1==llll){//if we are on the last iteration
            toBeReturned.refToCurObject = toBeReturned.refToCurObject.get(curCommentIt);  //just get a hold of the comment itself and not the replies
          }else{  //otherwise
            toBeReturned.refToCurObject = toBeReturned.refToCurObject.get(curCommentIt).get("replies");  //just move on to the next replies array
          }
      }
    }else{    //if its an array
      for(iiii=0,llll = commentPath.length;iiii<llll;iiii++){
          let curCommentIt = commentPath[iiii];
          if(iiii+1==llll){//if we are on the last iteration
            toBeReturned.refToCurObject = toBeReturned.refToCurObject[curCommentIt];  //just get a hold of the comment itself and not the replies
          }else{  //otherwise
            toBeReturned.refToCurObject = toBeReturned.refToCurObject[curCommentIt].replies;  //just move on to the next replies array
          }
      }
    }
    return toBeReturned;
  }
  return null;
}



/*

extractRepliesForCommentId:

    This function gets an input of:

      commentID: The comment id will will be looking for
      arrayToInvestigate: The array which on which the search will take place

      returns:
        {Object} A copy of the replies array that contains this commentId
        OR
        null if the comment Id was not found within the arrayToInvestigate


*/
export function extractRepliesForCommentId(commentId, arrayToInvestigate){
  if(arrayToInvestigate!=null){
    if(arrayToInvestigate instanceof List){
      arrayToInvestigate = arrayToInvestigate.toJS();
    }
    // console.log("Array to investigate: "+arrayToInvestigate);
    let commentPath = findCommentPath(arrayToInvestigate, commentId);
    // console.log("Comment path produced: "+commentPath);
    let {refToCurObject} = findCommentBasedOnPath(commentPath, arrayToInvestigate);
    // console.log(" extractRepliesForCommentId: inserted: "+(typeof arrayToInvestigate)+" got: "+(typeof refToCurObject));
    return refToCurObject;
  }
  return null;
}
