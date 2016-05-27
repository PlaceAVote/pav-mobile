'use strict';
/* @flow */




import React from 'react';
import {Navigator, View, Image, Text, TouchableOpacity, Platform} from 'react-native';

/**
* ### Router-Flux
*
* Necessary components from Router-Flux
*/
import {
  Router,
  Scene,
  TabBar,
  Modal,
  Reducer,
  Actions
} from 'react-native-router-flux';

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
*  ```configureStore``` will connect the ```reducers```, the
*
*/
import configureStore from './lib/configureStore';


/**
* ### containers
*
* All the top level containers
*
*/
import EmailSignIn from './containers/EmailSignIn';
// import ForgotPassword from './containers/ForgotPasswordModalBox';
// import ForgotPasswordModal from './containers/ForgotPasswordModal';
import EmailSignUpStep1 from './containers/EmailSignUpStep1';
import EmailSignUpStep2 from './containers/EmailSignUpStep2';
import EmailSignUpStep3 from './containers/EmailSignUpStep3';
import EmailSignUpStep4 from './containers/EmailSignUpStep4';
import TopicPick from './containers/TopicPick';
import NewsFeed from './containers/NewsFeed';
import Bill from './containers/Bill';
import Comments from './containers/Comments';
import Profile from './containers/Profile';
import Notifications from './containers/Notifications';
import Vote from './containers/Vote';

// import Logout from './containers/Logout';
import Onboarding from './containers/Onboarding';
// import ForgotPassword from './containers/ForgotPassword';
// import Profile from './containers/Profile';
// import Main from './containers/Main';
// import Subview from './containers/Subview';


import {Colors, ScheneKeys} from './config/constants';



/**
* ### icons
*
* Add icon support for use in Tabbar
*
*/

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

/**
* ## Actions
*  The necessary actions for dispatching our bootstrap values
*/
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore, setNavBarDimensions} from './reducers/global/globalActions';
import {navigateState, navigateToPreviousState} from './reducers/routing/routingActions';

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


/**
* ## Nav bar icons
*
*/
import ProfileButtons from './containers/NavIcons/ProfileButtons';
import NewsFeedButtons from './containers/NavIcons/NewsFeedButtons';
import {RightPavLogo} from './containers/NavIcons/LoginButtons';
import TabIconFactory from './containers/NavIcons/TabIconFactory';









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
  };
  return _initState;
}

















/*
       \/    \/    \/     PROJECT STARTS HERE     \/    \/    \/
*/




export default class PlaceAVote extends React.Component {

    render() {


      const store = configureStore(getInitialState());

      //Connect w/ the Router
      const RouterWithRedux = connect()(Router);

      // configureStore will combine reducers from placeAVote and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(Platform.OS));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));



      const reducerCreate = params=>{
          const defaultReducer = Reducer(params);
          return (state, action)=>{

            switch(action.type){
              case "push":
                store.dispatch(navigateState(action.key));
                break;
              case "back":
              case "BackAction":
                store.dispatch(navigateToPreviousState());
                break;
              // case "refresh":
                // store.dispatch(setNavBarDimensions(action.navBarDimensions));
                // break;
              default:
                break;
            }
            return defaultReducer(state, action);
          }
      };

      return (
        <Provider store={store}>
          <RouterWithRedux hideNavBar={false} createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}} >
              <Scene key="root"  hideNavBar={true} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:Colors.mainTextColor, fontFamily:"Whitney"}} leftButtonIconStyle={{tintColor: 'white'}}>
                <Scene key={ScheneKeys.ONBOARDING} direction="vertical" component={Onboarding} type="replace" hideNavBar={true} />
                <Scene key={ScheneKeys.LOGIN} component={EmailSignIn} hideNavBar={false} title="Sign In" type="push"  renderRightButton={()=><RightPavLogo/>}/>
                <Scene key={ScheneKeys.REGISTER_STEP_1} component={EmailSignUpStep1} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.REGISTER_STEP_2} component={EmailSignUpStep2} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.REGISTER_STEP_3} component={EmailSignUpStep3} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.REGISTER_STEP_4} component={EmailSignUpStep4} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.TOPIC_PICK} component={TopicPick} schema="modal" type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.VOTE} component={Vote}  hideNavBar={true} title="Vote" type="push" direction="vertical"/>
                <Scene key={ScheneKeys.MAIN} panHandlers={null} duration={1} tabs={true}  initial={false}>
                    <Scene key={ScheneKeys.TAB_NEWS} icon={TabIconFactory} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:'white', fontFamily:"Whitney"}} initial={false}>
                      <Scene key={ScheneKeys.TAB_NEWS+"2"}  title="News Feed" component={NewsFeed} icon={TabIconFactory} renderRightButton={()=><NewsFeedButtons/>} />
                      <Scene key={ScheneKeys.BILL} component={Bill} hideNavBar={false} title="Bill" type="push" leftButtonIconStyle={{tintColor: 'white'}}  initial={false}/>
                      <Scene key={ScheneKeys.COMMENTS} component={Comments} hideNavBar={false} title="Comments" type="push" leftButtonIconStyle={{tintColor: 'white'}}  initial={false}/>
                    </Scene>
                    <Scene key={ScheneKeys.TAB_NOTIFS} title="Notifications" component={Notifications} icon={TabIconFactory} notifications={["a notification", "another notification"]} renderRightButton={()=><ProfileButtons/>} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:'white', fontFamily:"Whitney"}}/>
                    <Scene key={ScheneKeys.TAB_PROFILE} title="Profile" component={Profile} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:'white', fontFamily:"Whitney"}} />
                </Scene>
              </Scene>
          </RouterWithRedux>
        </Provider>
      );
    }
}
