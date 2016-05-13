/**
 * # TopicPick.js
 *
 *  The container to display the TopicPick form
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
 *   TopicPickRender
 */
import VoteModalRender from '../components/Modals/VoteModalRender';

/**
 * The necessary React components
 */
import React from 'react-native';

/**
 * The states were interested in
 */

const {
  WELCOME
} = require('../config/constants').Modals

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  deviceActions
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

let TopicPick = React.createClass({


  render() {
    //
    return(
      <VoteModalRender
          backButtonEnabled={true}
          onBack={this.onBackBtnPress}
          onNextStep={ this.onButtonPress}
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}
          modalPopupEnabled={this.props.router.modalIsOpen.get(WELCOME)}
          modalPopupErrorMsg={this.props.auth.form.error}
          onModalClosed={this.onWelcomeModalClosed}
      />
    );
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TopicPick);
