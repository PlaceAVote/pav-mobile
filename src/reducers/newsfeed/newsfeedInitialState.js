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

const  {Record, List} = require('immutable');
import {Other} from '../../config/constants';
const {NEWS_FEED_FILTERS} = Other;

/**
 * ##
 * This Record contains the state of the news feed and the
 * fields it contains.
 *
 */
var InitialState = Record({
  disabled: false,
  error: null,
  // isValid: false,
  isFetching: new (Record({
    newsFeedData: false,
    discoveryData: false,
  })),

  newsFeedData: new (Record({
    curSelectedFilter: NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER,
    curSelectedTopic : null,
    items: null,
    itemsAfterFiltration: null,



    discoveryItems: [],
    discoveryAfterFiltration: [1,2,3],

  }))
});

export default InitialState;
