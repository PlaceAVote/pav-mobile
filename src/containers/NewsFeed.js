/**
 * NewsFeed.js
 *
 * Our main pav screen
 */
'use strict';






/**
 *           Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
import * as deviceActions from '../reducers/device/deviceActions';
import * as newsfeedActions from '../reducers/newsfeed/newsfeedActions';


import Orientation from 'react-native-orientation';
/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   NewsFeedRender
 */
import NewsFeedRender from '../components/NewsFeed/NewsFeedRender'


/**
 * The necessary React
 */
import React, {Component} from 'react-native';



import {
ScheneKeys,
Other
} from '../config/constants';
const {
  NEWS_FEED_FILTERS
} = Other;
const {
  MAIN
} = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  deviceActions,
  newsfeedActions
];

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}














class NewsFeed extends Component {

  constructor(props) {
    super(props);

    this.connectAndGetFeed();
  }



  async connectAndGetFeed(){
    return await this.props.actions.getFeedItems('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY1MTc0NjExLCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.kKjA6lS2GHGWNSsOTrVfGvKfG1y27-TXlR7Jx78UaYp2d4n83oQd5aepIYxgwcVqeyiEtyV-yr1X-2ieKMCPoRLqyip2U5ac8EskPkhSZ9Okd0xX3_6Y93ubHSg3_PdlnDA93TAJljzx17ZKAoWP21VckSdOiN31Yrbozgb8cMqzsa4tddm8O21k4jhIJWURduwIhm_6Ys46cz-2sffn73qGNq3b2PS9NqSt5NFSkae3IwtDZdnaPCg0cjSvq_7KMYgOCrQEnFjEiV6HdasPQilEeeCMvH9NWLf2T0l97uK2RvtHAwwv1RShyB66TgAQu_TU4O485VlKVMtgGo0xrA', false);
  }
  async getDiscoveryItemsForTopic(topicString){
    return await this.props.actions.getDiscoveryItems(topicString, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY1MTc0NjExLCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.kKjA6lS2GHGWNSsOTrVfGvKfG1y27-TXlR7Jx78UaYp2d4n83oQd5aepIYxgwcVqeyiEtyV-yr1X-2ieKMCPoRLqyip2U5ac8EskPkhSZ9Okd0xX3_6Y93ubHSg3_PdlnDA93TAJljzx17ZKAoWP21VckSdOiN31Yrbozgb8cMqzsa4tddm8O21k4jhIJWURduwIhm_6Ys46cz-2sffn73qGNq3b2PS9NqSt5NFSkae3IwtDZdnaPCg0cjSvq_7KMYgOCrQEnFjEiV6HdasPQilEeeCMvH9NWLf2T0l97uK2RvtHAwwv1RShyB66TgAQu_TU4O485VlKVMtgGo0xrA', false);
  }

  orientationDidChange(orientation) {
    console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange.bind(this));
    this.props.actions.unlockOrientation();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  }


  onFilterBtnClick(filterName, topicType){
    // alert("Filter clicked: "+filterName);
    if(filterName==NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER){
      this.props.actions.setActivityFilter(filterName);
    }
    else if(filterName==NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER){
      this.props.actions.setActivityFilter(filterName);
      this.getDiscoveryItemsForTopic(Other.TOPICS.TRENDING);
    }else{
      this.props.actions.filterFeedItems(filterName, topicType);

    }
  }
  onTopicSelect(topicName){
    if(this.props.newsfeed.newsFeedData.discoveryItems.get(topicName)==null){
        this.getDiscoveryItemsForTopic(topicName);
    }
  }



  onFeedRefresh(){
      this.connectAndGetFeed();
      // console.log("Do something on feed refresh")
  }



  render() {
    return(
      <NewsFeedRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device}
          newsfeed={this.props.newsfeed}
          onFilterBtnClick={this.onFilterBtnClick.bind(this)}
          onTopicSelect={this.onTopicSelect.bind(this)}
          onFeedRefresh={this.onFeedRefresh.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
