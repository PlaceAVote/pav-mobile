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

    this.connectAndGetFeed();
  }



  async connectAndGetFeed(){
    return await this.props.actions.getFeed(null, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoiYWZha2VhY2NvdW50QHBsYWNlYXZvdGUuY29tIiwiZmlyc3RfbmFtZSI6IklvYW5uaXNkZXYiLCJjb25maXJtYXRpb24tdG9rZW4iOiIyZjk3ODg2Ni1jZjg1LTQ0MTMtYmRiNC05YmRlNmVkMWMxZjciLCJjaXR5IjoiV2hlbmV2ZXIsIFdoZXJldmVyIiwiZXhwIjoxNDY0NTI2ODA1LCJwdWJsaWMiOnRydWUsInN0YXRlIjoiREMiLCJ6aXBjb2RlIjoiMjAwMDEiLCJ0b3BpY3MiOlsiQ3JpbWUiLCJIZWFsdGhjYXJlIiwiVGF4ZXMiXSwiY291bnRyeV9jb2RlIjoiVVNBIiwiZG9iIjoiMTEvMTQvMTk4OSIsImxhc3RfbmFtZSI6Iktva2tpbmlkaXMiLCJsYXQiOiIzOC45MTIwNjgiLCJ1c2VyX2lkIjoiMzZlMmJlYTEtMzRhMi00N2M0LTllMzctNDE4ZmMzOTA3MWQ1IiwiZ2VuZGVyIjoibWFsZSIsInJlZ2lzdGVyZWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0NjE4MzkxMzE0NjYsImxuZyI6Ii03Ny4wMTkwMjI4IiwiZGlzdHJpY3QiOiIwIn0.qPJBJJbCD5BXwiitMmacpkVOxHYr5ZCG72np_FN-DWjdwBfiBCdFJIxd1BaAmnD_VqwCgSLPaSkK66l1oIj95S6rjNLDnLe2iavycQ_ENlQVDZLm2dalzNueUlFykI4uWCd6JlHnf8dIWkx0Rq3qXBk_FnJlYYEpzjePHpjk3qOeOZvgWRfh-D1skuzOB9ano_wu3MXAa2MXDciKi7qaDm7EUasEOkprxVhh8c2khwfzh4QAKBb4YJWGYRhrrPjIPMqyL1vILJ9kledbKD0CmlCg9uYVUvkLEapEVFsZKGGhGzn-fh8IMlwNfUBgDWhPrQayontBBu7pRVrD11hW4w');
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
