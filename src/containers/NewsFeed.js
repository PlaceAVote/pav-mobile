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



const {
MAIN
} = require('../config/constants').ScheneKeys


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
  }

  orientationDidChange(orientation) {
    // console.log("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange);
    this.props.actions.unlockOrientation();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  }


  onFilterBtnClick(filterName){
    // alert("Filter clicked: "+filterName);
    this.props.actions.setActivityFilter(filterName);
  }

  render() {
    return(
      <NewsFeedRender
          auth={ this.props.auth }
          global={ this.props.global }
          device={ this.props.device}
          newsfeed={this.props.newsfeed}
          onFilterBtnClick={this.onFilterBtnClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
