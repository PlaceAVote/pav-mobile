'use strict';


import React from 'react';
import {AppRegistry, Navigator, View, Image, Text, TouchableOpacity} from 'react-native';

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
import Icon from 'react-native-vector-icons/FontAwesome';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../assets/fonts/icomoon.json');
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
import ProfileButtons from './containers/NavBarIcons/ProfileButtons';
import NewsFeedButtons from './containers/NavBarIcons/NewsFeedButtons';











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


/**
* ## TabIcon
*
* Displays the icon for the tab w/ color dependent upon selection
*/
class TabIcon extends React.Component {
  render() {
    var color = this.props.selected ? 'FF3366' : 'FFB3B3';

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
      <Icon style={{color: color}} name={this.props.iconName} size={30} />
      <Text style={{color: color}}>{this.props.title}</Text>
      </View>
    );
  }
}

/**
* ## Native
*
* ```configureStore``` with the ```initialState``` and set the
* ```platform``` and ```version``` into the store by ```dispatch```.
* *Note* the ```store``` itself is set into the ```store```.  This
* will be used when doing hot loading
*/



class RightPavLogo extends React.Component {
  render(){
      return <Image source={require("../assets/pavBtnRight.png")} resizeMode='cover' style={{
        flex:1,
        alignSelf:'flex-end',
        width: 30,
        height: null,
        // backgroundColor:'green'
        overflow: "hidden"
    }}></Image>
  }
}

class BackBtnImg extends React.Component {
  render(){
      return (<TouchableOpacity style={{
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: 4,
        left: 2,
        padding: 8,
        justifyContent:'center',
    }} onPress={Actions.pop} >
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Icon name="chevron-left" size={25} color={'#ffffff'} style={{marginTop:2,paddingRight:6}} />
          <Text style={{color: '#FFFFFF21', fontFamily:'Whitney'}}>Back</Text>
        </View>
      </TouchableOpacity>);
  }
}




class TabIconFactory extends React.Component {
    render(){


        let iconName = "", tabText;
        switch(this.props.name){
          case ScheneKeys.TAB_NEWS:
          case ScheneKeys.TAB_NEWS+"2":
            iconName="mailbox";
            tabText = "News Feed";
            break;
          case ScheneKeys.TAB_NOTIFS:
            iconName="ios-pulse-strong";
            tabText = "Notifications";
            // console.log("Notifications array: "+this.props.notifications);
            break;
          case ScheneKeys.TAB_PROFILE:
            iconName="person"
            tabText = "Profile";
            break;
          default:
            break;
        }
        return (
          <View style={{flexDirection:'row', justifyContent:'center', padding:3}}>
            <PavIcon name={iconName} size={25} style={{color: this.props.selected ? Colors.secondaryColor :Colors.secondaryTextColor}}/>
            <View style={{flexDirection: "column", justifyContent: 'center', paddingHorizontal:4}}>
              <Text style={{color: this.props.selected ? Colors.primaryColor :Colors.secondaryTextColor}}>{tabText}</Text>
            </View>
          </View>
        );
    }
}



// <TouchableOpacity style={{paddingHorizontal:3}}>

// </TouchableOpacity>
// <TouchableOpacity style={{paddingHorizontal:3}}>

// </TouchableOpacity>

export default function native(platform) {
  let PlaceAVote = React.createClass( {
    render() {


      const store = configureStore(getInitialState());

      //Connect w/ the Router
      const RouterWithRedux = connect()(Router);

      // configureStore will combine reducers from placeAVote and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));


      var self = this;
      var renderRtBtn = function renderRtBtn(){
        return
      }
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

      // let backButtonImg = ()=><Image source={require("../assets/back_chevron.png")} style={{padding: 8,backgroundColor:'red'}}></Image>;
      //
      // <Scene key={ScheneKeys.LOGIN} type="push" title="Sign In" navigationBarStyle={{backgroundColor:Colors.primaryColor}} backButtonImage={backButtonImg} renderRightButton={()=><RightPavLogo/>}>
      // setup the router table with App selected as the initial component

      // when the hideNavBar is true we see the right button but not the left, and the opposite.
// tabBarStyle={{borderTopColor: 'darkgrey', borderTopWidth: 1 / PixelRatio.get(), backgroundColor: 'ghostwhite',opacity: 0.98}}
      return (
        <Provider store={store}>
          <RouterWithRedux hideNavBar={false} createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}} >
              <Scene key="root"  hideNavBar={true} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:Colors.mainTextColor, fontFamily:"Whitney"}}>
                <Scene key={ScheneKeys.ONBOARDING} direction="vertical" component={Onboarding} type="replace" hideNavBar={true} />
                <Scene key={ScheneKeys.LOGIN} component={EmailSignIn} hideNavBar={false} title="Sign In" type="push" renderBackButton={()=><BackBtnImg/>}  renderRightButton={()=><RightPavLogo/>}/>
                <Scene key={ScheneKeys.REGISTER_STEP_1} component={EmailSignUpStep1} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.REGISTER_STEP_2} component={EmailSignUpStep2} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.REGISTER_STEP_3} component={EmailSignUpStep3} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.REGISTER_STEP_4} component={EmailSignUpStep4} type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.TOPIC_PICK} component={TopicPick} schema="modal" type="push" hideNavBar={true} />
                <Scene key={ScheneKeys.VOTE} component={Vote}  hideNavBar={true} title="Vote" type="push" direction="vertical"/>
                <Scene key={ScheneKeys.MAIN} panHandlers={null} duration={1} tabs={true}  initial={true}>
                    <Scene key={ScheneKeys.TAB_NEWS} icon={TabIconFactory} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:'white', fontFamily:"Whitney"}} initial={true}>
                      <Scene key={ScheneKeys.TAB_NEWS+"2"}  title="News Feed" component={NewsFeed} icon={TabIconFactory} renderRightButton={()=><NewsFeedButtons/>} />
                      <Scene key={ScheneKeys.BILL} component={Bill} hideNavBar={false} title="Bill" type="push" leftButtonIconStyle={{tintColor: 'white'}}  initial={true}/>
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
  });
  /**
  * registerComponent to the AppRegistery and off we go....
  */

  AppRegistry.registerComponent('PlaceAVoteApp', () => PlaceAVote);
}
