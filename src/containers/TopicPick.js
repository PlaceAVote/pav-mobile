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

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   TopicPickRender
 */
import TopicPickRender from '../components/TopicPick/TopicPickRender';

/**
 * The necessary React components
 */
import React from 'react-native';

/**
 * The states were interested in
 */

const {
  NEWSFEED,
  TOPIC_PICK
} = require('../config/constants').ScheneKeys

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
    let onButtonPress = ()=>{
        this.props.actions.navigateTo(NEWSFEED);
        //TODO: first signup asynchronously and then navigate
    },
    onBackBtnPress = ()=>{
        this.props.actions.navigateToPrevious();
    }

    return(
      <TopicPickRender
          backButtonEnabled={false}
          onBack={onBackBtnPress}
          onNextStep={ onButtonPress }
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPick);
