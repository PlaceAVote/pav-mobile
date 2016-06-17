'use strict';
/* @flow */



/*
  React and React native imports
*/
import React from 'react';
import {Platform} from 'react-native';



/*
  Our router imports
*/
import {Router} from 'react-native-router-flux';
import Routes from './router/Routes'


/**
* ### Redux
*
* ```Provider``` will tie the React-Native to the Redux store
*/
import {
Provider,
connect } from 'react-redux';

/**
* ### configureStore
*
*  ```configureStore``` will connect the ```reducers``` in one object
*
*/
import configureStore from './lib/configureStore';

/**
* ## Actions
*  The necessary actions for dispatching our bootstrap values
*/
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore, setNavBarDimensions, setEnvironmentIsDev} from './reducers/global/globalActions';
import {navigateState, navigateToPreviousState} from './reducers/routing/routingActions';

import CONFIG from './config/config'

/**
* ## States
* PlaceAVote explicitly defines initial state
*
*/
import authInitialState from './reducers/auth/authInitialState';
import deviceInitialState from './reducers/device/deviceInitialState';
import globalInitialState from './reducers/global/globalInitialState';
import profileInitialState from './reducers/profile/profileInitialState';
import routerInitialState from './reducers/routing/routingInitialState';
import newsfeedInitialState from './reducers/newsfeed/newsfeedInitialState';
import notificationInitialState from './reducers/notifications/notificationInitialState';




/**
*  The version of the app but not  displayed yet
*/
var VERSION='0.0.13';


/**
*
* ## Initial state
* Create instances for the keys of each structure in placeAVote
* @returns {Object} object with 4 keys
*/
function getInitialState() {
  const _initState = {
    auth: new authInitialState,
    device: (new deviceInitialState).set('isMobile',true),
    global: (new globalInitialState),
    profile: new profileInitialState,
    router: new routerInitialState,
    newsfeed: new newsfeedInitialState,
    notifications: new notificationInitialState,
  };
  return _initState;
}




/*
       \/    \/    \/     PROJECT STARTS HERE     \/    \/    \/
*/
export default class PlaceAVote extends React.Component {


    constructor(props){
      super(props)
    }
    


    render() {
      const store = configureStore(getInitialState());

      //Connect w/ the Router
      const RouterWithRedux = connect()(Router);

      // configureStore will combine reducers from placeAVote and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(Platform.OS));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));
      store.dispatch(setEnvironmentIsDev(CONFIG.ENVIRONMENT_IS_DEV));
      return (
        <Provider store={store}>
          <Routes router={RouterWithRedux}/>
        </Provider>
      );
    }
}
