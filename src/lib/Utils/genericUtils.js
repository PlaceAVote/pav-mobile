export function getNumberWithOrdinalSufix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}


export function getObjectType(obj){
  return Object.prototype.toString.call( obj )
}

export function isOfObjectType(obj, type){
  // console.log("@@@@@@ Object of type: "+getObjectType(obj)+" is it type: "+type+" ? --> "+(getObjectType(obj)===type))
  return (getObjectType(obj)===type);
}


export const OBJECT_TYPES={
  ARRAY: '[object Array]',
  NUMBER: '[object Number]',
  OBJECT: '[object Object]'
}
