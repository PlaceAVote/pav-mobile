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

  onBackBtnPress(){
    this.props.actions.navigateToPrevious();
  },

  onButtonPress(){
      let {name, surname, email, password, dateOfBirth, zipCode, topicsList} = this.props.auth.form.fields.toJS();
      let topics = [];
      for (var topicKey in topicsList){
        // console.log("Topic "+topicKey+" is: "+topicsList[topicKey].isSelected);
        if(topicsList[topicKey].isSelected){
          topics.push(topicKey);
        }
      }
      // console.log("Fields: "+name+surname+email+password+dateOfBirth+zipCode+topics);
      this.props.actions.signup(email, password, name, surname, moment(dateOfBirth).format('DD/MM/YYYY'), zipCode, topics, 'they');
      // this.props.actions.signup('aRandomUzah4@placeavote.com', 'maPazzw00rt', 'Ioannis', 'DaTester', dateOfBirth, '20001', ['sex','drugs','rockNroll'], 'male');
  },

  onWelcomeModalClosed(){
    console.log("On welcome modal closed");
    if(!!this.props.auth.form.error){
      // this.props.actions.resetErrorState();
      this.props.actions.setModalVisibility(TOPIC_PICK, false);
    }else{
      this.props.actions.navigateTo(NEWSFEED);
    }
  },


  render() {
    //
    return(
      <TopicPickRender
          backButtonEnabled={true}
          onBack={this.onBackBtnPress}
          onNextStep={ this.onButtonPress}
          auth={ this.props.auth }
          global={ this.props.global }
          device={this.props.device}
          modalPopupEnabled={this.props.router.modalIsOpen.get(TOPIC_PICK)}
          modalPopupErrorMsg={this.props.auth.form.error}
          onModalClosed={this.onWelcomeModalClosed}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPick);
