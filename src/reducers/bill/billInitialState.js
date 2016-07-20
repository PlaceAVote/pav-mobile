/**
 * # newsFeedInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

import  {Record, List, Map} from 'immutable';
// import {Other} from '../../config/constants';

/**
 * ##
 * This Record contains the state of the news feed and the
 * fields it contains.
 *
 */
var InitialState = Record({
  error: null,
  // isValid: false,
  isFetching: new (Record({
    billData: false,
    billComments: false,
    billTopComments: false,
    voteOnBill:false,
    searchBillData: false,
  })),
  commentBeingAltered: false,

  data: null,
  comments: null,
  commentTopFor: null,
  commentTopAgainst: null,
});

export default InitialState;
