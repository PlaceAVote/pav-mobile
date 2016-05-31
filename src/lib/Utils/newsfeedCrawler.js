export function findFeedItem(feedArray, feedType, key, valueToLookFor){
  let toBeReturned = {
    containingArray: feedArray,
    foundObjectRef: null
  };
  if(!!feedArray && !!feedType && !!key && !!valueToLookFor){
    for (let ii=0,ll=toBeReturned.containingArray.length;ii<ll;ii++){ //iterate through the array
      let curFeedItem = toBeReturned.containingArray[ii]; //ref to the current feed item
      if(curFeedItem.type==feedType){ //if this feed item is of the type we want
          let lookedForItemValue = curFeedItem[key];  //ref to the feed items value of interest
          if(lookedForItemValue==valueToLookFor){ //if the value of interest is the same as the value were looking for
            toBeReturned.foundObjectRef=curFeedItem;  //save the ref to this item within our toBeReturned object
          }
      }
    }
  }
  return toBeReturned;
}




export function iterateThroughItemsAndPickTheOnesWithType(items, typeArray){
  if(!!items && !!typeArray && typeArray.length>0){
    let pickedArray = [];
    for(let zz=0, lll=items.length; zz<lll;zz++){
        let curItem = items[zz];
        for (let xx=0, kkk=typeArray.length;xx<kkk;xx++){
          let curType = typeArray[xx];
          if(curItem.type==curType){
            pickedArray.push(curItem);
          }
        }
    }
    return pickedArray;
  }else{
    return items;
  }
}
