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


export function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}


export function toTitleCase(str)
{
    if(str!=null){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }else{
      return str;
    }

}
