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
