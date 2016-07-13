


import React from 'react';
import {StyleSheet, BackAndroid, Platform, Linking} from 'react-native';

import {Colors, ScheneKeys} from '../config/constants';

/**
* ### Redux
*/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import Orientation from 'react-native-orientation';
import * as routingActions from '../reducers/routing/routingActions';
import * as deviceActions from '../reducers/device/deviceActions';
/*
*
* ### containers
*
* All the top level containers
*
*/
import EmailSignIn from '../containers/EmailSignIn';
import EmailSignUpStep1 from '../containers/EmailSignUpStep1';
import EmailSignUpStep2 from '../containers/EmailSignUpStep2';
import TopicPick from '../containers/TopicPick';
import NewsFeed from '../containers/NewsFeed';
import Bill from '../containers/Bill';
import Comments from '../containers/Comments';
import Profile from '../containers/Profile';
import Notifications from '../containers/Notifications';
import Vote from '../containers/Vote';
import Onboarding from '../containers/Onboarding';
import SplashScreen from '../containers/SplashScreen';
import NewIssue from '../containers/NewIssue';
import Settings from '../containers/Settings';
import Tos from '../containers/Tos';

/**
* ## Nav bar icons
*/
import ProfileButtons from '../containers/NavIcons/ProfileButtons';
import SettingsButtons from '../containers/NavIcons/SettingsButtons';
import NewsFeedButtons from '../containers/NavIcons/NewsFeedButtons';
import {RightPavLogo} from '../containers/NavIcons/LoginButtons';
import TabIconFactory from '../containers/NavIcons/TabIconFactory';
import {Scene, Switch, Actions} from 'react-native-router-flux';





/**
* ### Router-Flux
*
* Necessary components from Router-Flux
*/



const styles = StyleSheet.create({
  scene:{
    backgroundColor:'#F7F7F7'
  },
  navBar:{
    backgroundColor:Colors.primaryColor,
    borderBottomColor:Colors.transparentColor
  },
  tabBar:{
    flex:1,
    borderTopWidth:1,
    borderTopColor:"#E4E3E9",
    backgroundColor:'white'
  },
  iconContainerStyle:{
    // backgroundColor:'red',
    borderRightWidth:0.8,
    borderRightColor: "#E4E3E9",

  },
  tabBarSelectedItemStyle:{
    // , borderRightWidth:1
    backgroundColor:'transparent',
    borderBottomWidth:2,
    borderBottomColor:Colors.negativeAccentColor,
    // shadowColor: 'rgba(0, 0, 0, 0.12)',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 2,
    // },
  },
  tabScene:{
  },
  tabBarShadow:{
    backgroundColor:Colors.secondaryBorderColor,
    top:-1,
    height:1
  },

  title:{
    color:Colors.mainTextColor,
    fontFamily:"Whitney"
  },

  leftIcon:{
    tintColor: 'white'
  }
});

const defaultProps = {
   navigationBarStyle:styles.navBar,
   titleStyle:styles.title,
   leftButtonIconStyle:styles.leftIcon
};


/**
 * ## Redux boilerplate
 */
const actions = [
  routingActions,
  deviceActions,
];

function routerStateToProps(state){
  return {
      curScene: state.router.currentSchene
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

const pavScenes = (
  <Scene key="root" hideNavBar={true} >
    <Scene key={ScheneKeys.SPLASH_SCREEN} {...defaultProps} component={SplashScreen} type="replace" hideNavBar={true} initial={true}/>
    <Scene key={ScheneKeys.ONBOARDING} {...defaultProps} panHandlers={null} direction="vertical" component={Onboarding} type="push" hideNavBar={true}/>
    <Scene key={ScheneKeys.LOGIN} {...defaultProps} component={EmailSignIn} hideNavBar={false} title="Sign In" />
    <Scene key={ScheneKeys.REGISTER_STEP_1} {...defaultProps} title="Register" component={EmailSignUpStep1} hideNavBar={false} />
    <Scene key={ScheneKeys.REGISTER_STEP_2} {...defaultProps} title="Register" component={EmailSignUpStep2} hideNavBar={false}/>
    <Scene key={ScheneKeys.TOPIC_PICK} {...defaultProps} component={TopicPick} hideNavBar={true} />
    <Scene key={ScheneKeys.PROFILE} {...defaultProps} title="Profile" component={Profile}/>
    <Scene key={ScheneKeys.MAIN} panHandlers={null} tabs={true} tabBarStyle={styles.tabBar} tabBarShadowStyle={styles.tabBarShadow} tabSceneStyle={styles.tabScene} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle} iconContainerStyle={styles.iconContainerStyle} initial={false}>
        <Scene key={ScheneKeys.TAB_NEWS} {...defaultProps} title="News Feed" component={NewsFeed} icon={TabIconFactory} renderRightButton={()=><NewsFeedButtons/>} initial={true}/>
        <Scene key={ScheneKeys.TAB_NOTIFS} {...defaultProps} title="Notifications" component={Notifications} icon={TabIconFactory} />
        <Scene key={ScheneKeys.TAB_PROFILE} {...defaultProps} title="Profile" component={Profile} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} userId={null} isTab={true} />
    </Scene>
    <Scene key={ScheneKeys.VOTE} {...defaultProps} component={Vote} title="Vote" direction="vertical" hideNavBar={true} />
    <Scene key={ScheneKeys.NEWISSUE} {...defaultProps} panHandlers={null} component={NewIssue} title="New Issue" direction="vertical" hideNavBar={false} />
    <Scene key={ScheneKeys.BILL} {...defaultProps} component={Bill} title="Bill" initial={false} />
    <Scene key={ScheneKeys.COMMENTS} {...defaultProps} component={Comments} title="Comments" />
    <Scene key={ScheneKeys.SETTINGS} {...defaultProps} component={Settings} renderRightButton={()=><SettingsButtons/>} />
    <Scene key={ScheneKeys.TOS} {...defaultProps} component={Tos} title="Terms of service"/>
  </Scene>
);

class Routes extends React.Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
    let self = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      switch(self.props.curScene){
        case ScheneKeys.SPLASH_SCREEN:
        case ScheneKeys.ONBOARDING:
        case ScheneKeys.MAIN:
        case ScheneKeys.TAB_NEWS:
        case ScheneKeys.TAB_NOTIFS:
        case ScheneKeys.TAB_PROFILE:
          return false;
        default:
          self.props.actions.navigateToPrevious();
          return true;
      }
    });
    var url = Linking.getInitialURL().then((url) => {
       if (url) {
         console.log('Initial url is: ' + url);
       }else{
         console.log('NO initial url');
       }
     }).catch(err => console.error('An error occurred', err));

     let initialOrientation = Orientation.getInitialOrientation();
     this.props.actions.setOrientation(initialOrientation);
  }

  orientationDidChange(orientation) {
    // alert("Orientation: "+orientation);
    this.props.actions.setOrientation(orientation);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange.bind(this));
    this.props.actions.unlockOrientation();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange.bind(this));
  }



  render(){
    let RouterWithRedux = this.props.router;
    return <RouterWithRedux hideNavBar={false} sceneStyle={styles.scene} scenes={ Actions.create(pavScenes) }/>;
  }
}
export default connect(routerStateToProps, mapDispatchToProps)(Routes);
