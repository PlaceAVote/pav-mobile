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
import {Other, TOPICS, NEWS_FEED_FILTERS} from '../../config/constants';

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
    olderNewsFeedData: false,
    discoveryData: false,
    trendingData: false,
    postingNewIssue: false,
    scrapeUrlData: false
  })),
  newsFeedDataBeingAltered: false,

  newsFeedData: new (Record({
    curSelectedFilter: NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER,
    items: null,
    lastFeedItemTimeStamp: null,
    trendingItems: null,
    // curSelectedTopic: null,

    discoveryItems: new Map([
      [TOPICS.HEALTHCARE.key, null],
      [TOPICS.TECHNOLOGY.key, null],
      [TOPICS.SOCIAL_INTEREST.key, null],
      [TOPICS.EDUCATION.key, null],
      [TOPICS.POLITICS.key, null],
      [TOPICS.TAXES.key, null],
      [TOPICS.IMMIGRATION.key, null],
      [TOPICS.DRUGS.key, null],
      [TOPICS.DEFENSE.key, null],
      [TOPICS.CRIME.key, null],
      [TOPICS.GUN_RIGHTS.key, null],
      [TOPICS.ECONOMICS.key, null],
    ]),

  }))
});

export default InitialState;
