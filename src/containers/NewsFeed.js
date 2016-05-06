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

    // this.connectAndGetFeed();
  }



  async connectAndGetFeed(){
    return await this.props.actions.getFeed('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoid2hhdGV2YWhAcGxhY2Vhdm90ZS5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjdmODc0ZDI4LTU3MTMtNGZhOS1hMDljLTZhNDg3ODc2ZTAzMiIsImV4cCI6MTQ2NTEyNjQyMCwicHVibGljIjp0cnVlLCJzdGF0ZSI6IkRDIiwiemlwY29kZSI6IjIwMDAxIiwidG9waWNzIjpbInNleCIsImRydWdzIiwicm9ja05Sb2xsIl0sImNvdW50cnlfY29kZSI6IlVTQSIsImRvYiI6IjE0LzExLzE5ODkiLCJsYXN0X25hbWUiOiJEYVRlc3RhaCIsImxhdCI6IjM4LjkxMjA2OCIsInVzZXJfaWQiOiJlMjMzMzk0Yi1kYjEwLTRiMDMtYjNkNy02NTYxOTZmOTYyNDYiLCJnZW5kZXIiOiJtYWxlIiwicmVnaXN0ZXJlZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQ2MTE1ODU2MDY4NCwibG5nIjoiLTc3LjAxOTAyMjgiLCJkaXN0cmljdCI6IjAifQ.FTlTO1tS63n-VCrc8vfmbnUNM3WageuT03_96WX0z7NghHANWXCUBPtIAKRPFkjniZrNASuEIamf-IxTbB-7lEEfTs2pKIem72DkH4IevRenHxkIzNsGBQGrBAeV9uDASTxcRul7lsVh0Y4Eu_cbtcZvzbBhmks_41nYs4WvqDYFTXM5ya9m4KoJJuyUsvfqIOmkBKIJGCd4BYisXCWLq0QnNpv10CHjKPlo4ww6xiuLbNTPf036qR2aH58y-IpoS5X1dtwsQQXapwyhFsmHNmiDmDnmerOQ6NOpO5upyOxo2R64G8qJfDXiSHD0LLFFomv4dWKA8EXdzbPb8xCyTA');
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
    if(filterName!=NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER){
      this.props.actions.filterFeedItems(filterName, topicType);
    }else{
      this.props.actions.setActivityFilter(filterName);
    }
  }
  onTopicBtnClick(topicName){
    alert("Topic: "+topicName+" clicked.");
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
          onTopicBtnClick={this.onTopicBtnClick.bind(this)}
          onFeedRefresh={this.onFeedRefresh.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
