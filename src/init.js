'use strict';
/* @flow */


/**
*  The version of the app but not  displayed yet
*/


/*
  React and React native imports
*/
import React from 'react';
import {Text, Platform} from 'react-native';
Text.defaultProps.allowFontScaling=false

import CONFIG from './config/config'

/*
  Our router imports
*/

import PlaceAVote from './PlaceAVote'


/**
* ### Redux
*
* ```Provider``` will tie the React-Native to the Redux store
*/
import {Provider} from 'react-redux';




/*
/**
* ### configureStore
*
*  ```configureStore``` will connect the ```reducers``` in one object
*
*/
import configureStore from './lib/configureStore';

import {getFontFactor} from './lib/Utils/multiResolution';

import AnalyticsReporter from './lib/Utils/analyticsReporter';

AnalyticsReporter().trackEvent(Platform.OS+"_font_factor", getFontFactor());

import CrashReporter from './lib/Utils/crashReporter';
CrashReporter({version: CONFIG.VERSION, suppressDevErrors:CONFIG.ENVIRONMENT_IS_DEV});















/**
* ## Actions
*  The necessary actions for dispatching our bootstrap values
*/
import {setStore, setNavBarDimensions, setEnvironmentIsDev} from './reducers/global/globalActions';
import {navigateState, navigateToPreviousState} from './reducers/routing/routingActions';
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import * as routingActions from './reducers/routing/routingActions';
import * as deviceActions from './reducers/device/deviceActions';


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
import settingsInitialState from './reducers/settings/settingsInitialState';





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
    settings: new settingsInitialState
  };
  return _initState;
}







// configureStore will combine reducers from placeAVote and main application
// it will then create the store based on aggregate state from all reducers
const store = configureStore(getInitialState());



store.dispatch(setPlatform(Platform.OS));
store.dispatch(setVersion(CONFIG.VERSION));
store.dispatch(setStore(store));
store.dispatch(setEnvironmentIsDev(CONFIG.ENVIRONMENT_IS_DEV));


/*
       \/    \/    \/     PROJECT STARTS HERE     \/    \/    \/
*/
class init extends React.Component {


    constructor(props){
      super(props)
    }

    render() {
      return (
        <Provider store={store}>
          <PlaceAVote/>
        </Provider>
      );
    }
}



export default init;
