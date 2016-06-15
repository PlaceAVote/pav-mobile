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
import {Other} from '../../config/constants';
const {NEWS_FEED_FILTERS, TOPICS} = Other;

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
    postingNewIssue: false
  })),
  newsFeedDataBeingAltered: false,

  newsFeedData: new (Record({
    curSelectedFilter: NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER,
    curSelectedTopic : TOPICS.TRENDING,
    items: null,
    itemsAfterFiltration: null,


    discoveryItems: new Map([
      [TOPICS.TRENDING, null],
      [TOPICS.HEALTHCARE, null],
      [TOPICS.TECHNOLOGY, null],
      [TOPICS.SOCIAL_INTEREST, null],
      [TOPICS.EDUCATION, null],
      [TOPICS.POLITICS, null],
      [TOPICS.TAXES, null],
      [TOPICS.IMMIGRATION, null],
      [TOPICS.DRUGS, null],
      [TOPICS.DEFENSE, null],
      [TOPICS.CRIME, null],
      [TOPICS.GUN_RIGHTS, null],
      [TOPICS.ECONOMICS, null],
    ]),
    discoveryAfterFiltration: null,

  }))
});

export default InitialState;
