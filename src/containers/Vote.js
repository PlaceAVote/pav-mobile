/* @flow*/
/**
 * # Vote.js
 *
 *  The container to display the Vote form
 *
 */
'use strict';
/**
 * ## Imports
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

import moment from 'moment';
/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   VoteRender
 */
import VoteRender from '../components/Vote/VoteRender';

/**
 * The necessary React components
 */
import React from 'react-native';

/**
 * The states were interested in
 */

// const {
//   WELCOME
// } = require('../config/constants').Modals

/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  // routingActions,
  // deviceActions
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







// function buttonPressHandler(name, surname) {
//
// }

let Vote = React.createClass({


  render() {
    //
    return(
      <VoteRender
          auth={ this.props.auth }
          device={this.props.device}
          bill={this.props.bill}
      />
    );
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Vote);
