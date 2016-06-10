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
import CONFIG from '../config/config';
/**
 * The actions we need
 */
// import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
// import * as deviceActions from '../reducers/device/deviceActions';
import * as billActions from '../reducers/bill/billActions';

import moment from 'moment';
/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   VoteRender
 */
import VoteRender from '../components/Vote/VoteRender';

import React from 'react';


/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  routingActions,
  billActions,
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

class Vote extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
  }

  onCloseBtnTap(){
      // alert("on close");
      this.props.actions.navigateToPrevious();
  }

  onVoteBtnTap(billId, vote){
    this.props.actions.voteBill(billId, vote, this.TOKEN, this.props.global.isDev);
  }

  render() {
    //
    return(
      <VoteRender
          device={this.props.device}
          billData={this.props.bill.data}
          onCloseBtnTap={this.onCloseBtnTap.bind(this)}
          onVoteBtnPressed={this.onVoteBtnTap.bind(this)}
      />
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Vote);
