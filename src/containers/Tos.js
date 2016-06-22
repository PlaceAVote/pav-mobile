/* @flow*/
/**
 * # Tos.js
 *
 *  The container to display the Tos form
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
import {
ScheneKeys,
Other,
Modals,
BillPageTabs
} from '../config/constants';
const {

} = Other;
const {

} = ScheneKeys;
/**
 * The actions we need
 */
// import * as authActions from '../reducers/auth/authActions';
// import * as routingActions from '../reducers/routing/routingActions';
// import * as deviceActions from '../reducers/device/deviceActions';
// import * as billActions from '../reducers/bill/billActions';

import moment from 'moment';
/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   TosRender
 */
import TosRender from '../components/Tos/TosRender';

import React from 'react';


/**
 * ## Redux boilerplate
 */
const actions = [
  // authActions,
  // routingActions,
  // billActions,
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



class Tos extends React.Component {

  constructor(props) {
    super(props);
    // if(CONFIG.MOCK_TOKEN===true){
    //   this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    // }
  }


  render() {
    //
    return(
      <TosRender/>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Tos);
