/**
 * # PAVBackend.js
 *
 * This class interfaces with PAVBackend.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 */
'use strict';
/**
 * ## Async support
 *
 */
require('regenerator/runtime');

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */

const {
  API_BASE_URL,
  PRE_BASE_URL,
  ENDPOINTS
}  = require('../../config/config').PAV_BACKEND;

import _ from 'underscore';
import Backend from './Backend';
import assert from 'assert';

export default class PAVBackend extends Backend{
  /**
   * ## PAVBackend.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  constructor( token) {
    super(token);
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw 'TokenMissing';
    }
    this._sessionToken =
      _.isNull(token) ?  null :  token.sessionToken.sessionToken;
  }


/**
 * ### login
 * prepare the data and and call fetch
 *
 * @param data
 *
 *  {email: "barton@example.com", password: "Passw00rt!"}
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An error if there was one
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
async login(data) {
  assert(data, "PAVBackend Client :: Login credentials should not be null or undefined.");
  assert(data.email, "PAVBackend Client :: Login credential data should contain an email.");
  assert(data.password, "PAVBackend Client :: Login credential data should contain a password.");
  let response = await this._fetch(
      PRE_BASE_URL.USER_API+API_BASE_URL+ENDPOINTS.USER.AUTHENTICATE_EMAIL,
      'POST', {
      email: data.email,
      password: data.password,
  });
  return response;
}



/*
This is our custom fetch function. It prepares the properties before it passes
it to the real fetch function, and parses the result before it returns it.
*/
async _fetch(url, method, data){
  console.log("Http Request to: "+url);
  try {
    let response = await fetch(
      url,
      this.prepareFetchProperties(method, data)
    );
    return await this.parseResponseDependingOnItsStatusCode(response);
  } catch(error) {
    // Do something on fetch error
    console.error("PAVBackend Client :: login fetch error: "+error.message);
  }

}



prepareFetchProperties(method, body, token){
  var reqOpts = {
    method: method,
    headers:{},
    body:null
  };

  if (!!token) {
    reqOpts.headers['Authorization'] = 'Bearer ' + token;
  }

  if (method === 'POST' || method === 'PUT') {
    reqOpts.headers['Accept'] = 'application/json';
    reqOpts.headers['Content-Type'] = 'application/json';
  }

  if (!!body) {
    reqOpts.body = JSON.stringify(body);
  }
  // console.log("Request options: "+JSON.stringify(reqOpts));
  return reqOpts;
}




/*
Checks the status code of the response,
returns an object that containts the properties `data` and `error`.
  if its one of the acceptStatusCodes it turns the response in a json and places it in the `data` property
  if its one of the rejectStatusCodes it places the response in the `error` property
  otherwise if the status code is something totally different we assume an error occured and throw it.
*/
async parseResponseDependingOnItsStatusCode(response, acceptStatusCodes = [200,201], rejectStatusCodes = [400,401]){

  let statusCode = response.status;
  var res = {
    statusCode: statusCode,
    data: null,
    error: null,
    errorType: null
  }
  for (var i=0;i<acceptStatusCodes.length;i++){
    if(statusCode==acceptStatusCodes[i]){  //if the status is one of the accept response statuses
      res.data = await response.json()
      return res;
    }
  }
  for (var o=0;o<rejectStatusCodes.length;o++){
    if(statusCode==rejectStatusCodes[o]){  //if the status is one of the reject response statuses
      var errorRes = null;
      let responseType = response.headers.get("content-type").toLowerCase();
      console.log("RESPONSE IS of type: "+responseType);
      if(responseType.indexOf("application/json") >= 0){
        var json = await response.json();
        errorRes = JSON.parse(json)
        res.errorType = "json";
      }else{
        errorRes = await response.text();
        res.errorType = "text";
      }
      console.log("Fail response: "+errorRes)
      res.error=errorRes;
      return res;
    }
  }
  console.log("Unknown response code: "+statusCode);
  throw(repsonse);  // since the status code was neither an accept status code, or a reject status code, we assume that there was an unexpected error and throw it
}



};
