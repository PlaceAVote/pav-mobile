/**
 * Topic.js
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
// import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
import * as deviceActions from '../reducers/device/deviceActions';
import * as newsfeedActions from '../reducers/newsfeed/newsfeedActions';
import * as billActions from '../reducers/bill/billActions';
import * as globalActions from '../reducers/global/globalActions';


/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   TopicRender
 */
import TopicRender from '../components/Topic/TopicRender';

import CONFIG from '../config/config';
import React from 'react';
import {Linking} from 'react-native';




import {
ScheneKeys,
Other,
Modals,
} from '../config/constants';
const {
  SOCIAL_TYPES,
} = Other;
const {
  BILL,
} = ScheneKeys;


/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  routingActions,
  deviceActions,
  newsfeedActions,
  billActions,
  globalActions
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







class Topic extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
  }
  componentDidMount(){
    this.getDiscoveryItemsForTopic(this.props.topicKey);
  }


  async getDiscoveryItemsForTopic(topicString){
    return await this.props.actions.getDiscoveryItems(topicString, this.TOKEN, this.props.global.isDev);
  }

  onSocialClick(type, billData){
    let billTitle = billData.featured_bill_title || billData.short_title;
    let billId = billData.bill_id;
    switch(type){
      case SOCIAL_TYPES.TWITTER:
        let twitterUrl = "https://twitter.com/intent/tweet?text=Check%20out%20this%20bill%20%40placeavote&url=https%3A%2F%2Fwww.placeavote.com%2F%23!%2Fbill%2F"+billId;
        Linking.openURL(twitterUrl).catch(err => console.error('An error occurred while trying to post tweet with url: '+twitterUrl, err));
        break;
      case SOCIAL_TYPES.FACEBOOK:
        this.props.actions.shareFacebook({type:"bill", billId, billTitle}, this.TOKEN, this.props.global.isDev);
        break;
    }
  }




  onLeftNavBtnClick(){
    this.props.actions.navigateToPrevious();
  }

  onFetchMoreItems(){

  }
  onBillClick(billId){
    // console.log("BILL clicked: "+billId);
    this.props.actions.navigateTo(BILL, {billId:billId});
  }

  render() {
    // console.log("Topic visible: "+(this.props.name==this.props.router.currentSchene)+" because name: "+this.props.name+" and cur: "+this.props.router.currentSchene);
    let topicDt = null;
    if(!!this.props.topicKey && !!this.props.newsfeed.newsFeedData.get("discoveryItems")){
        topicDt = this.props.newsfeed.newsFeedData.get("discoveryItems").get(this.props.topicKey);
    }

    return(
      <TopicRender
          topicKey={this.props.topicKey}
          isFetchingTopicData={this.props.newsfeed.isFetching.discoveryData}
          topicData={topicDt}
          onSocialClick={this.onSocialClick.bind(this)}
          onLeftNavBtnClicked={this.onLeftNavBtnClick.bind(this)}
          onFetchMoreItems={this.onFetchMoreItems.bind(this)}
          onBillClick={this.onBillClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Topic);
