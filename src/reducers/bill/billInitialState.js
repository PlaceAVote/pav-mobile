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

const  {Record, List, Map} = require('immutable');
import {Other} from '../../config/constants';
const {NEWS_FEED_FILTERS, TOPICS} = Other;

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
    billComments: false
  })),

  data: null,
  comments: null
});

export default InitialState;
