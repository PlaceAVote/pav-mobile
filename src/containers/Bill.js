/**
 * Bill.js
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
 *   BillRender
 */
import BillRender from '../components/Bills/BillRender'


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














class Bill extends Component {

  constructor(props) {
    super(props);

    // this.connectAndGetFeed();
  }




  render() {
    return(
      <BillRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device}
          newsfeed={this.props.newsfeed}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Bill);
