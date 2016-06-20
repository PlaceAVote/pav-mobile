


import React from 'react';
import {StyleSheet, BackAndroid} from 'react-native';

import {Colors, ScheneKeys} from '../config/constants';

/**
* ### Redux
*/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';

import * as routingActions from '../reducers/routing/routingActions';

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
import EmailSignUpStep3 from '../containers/EmailSignUpStep3';
import EmailSignUpStep4 from '../containers/EmailSignUpStep4';
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

/**
* ## Nav bar icons
*/
import ProfileButtons from '../containers/NavIcons/ProfileButtons';
import SettingsButtons from '../containers/NavIcons/SettingsButtons';
import NewsFeedButtons from '../containers/NavIcons/NewsFeedButtons';
import {RightPavLogo} from '../containers/NavIcons/LoginButtons';
import TabIconFactory from '../containers/NavIcons/TabIconFactory';


/**
* ### Router-Flux
*
* Necessary components from Router-Flux
*/
import {Scene, Switch} from 'react-native-router-flux';


const styles = StyleSheet.create({
  scene:{
    backgroundColor:'#F7F7F7'
  },
  navBar:{
    backgroundColor:Colors.primaryColor,
    borderBottomColor:Colors.transparentColor
  },
  tabBar:{
    backgroundColor:'white'
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
  routingActions
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
          return false;
        default:
          self.props.actions.navigateToPrevious();
          return true;
      }
    });
  }





  render(){
    let RouterWithRedux = this.props.router;
    return (<RouterWithRedux hideNavBar={false} sceneStyle={styles.scene} >
        <Scene key="root" hideNavBar={true} >
          <Scene key={ScheneKeys.SPLASH_SCREEN} {...defaultProps} component={SplashScreen} type="replace" hideNavBar={true} initial={true}/>
          <Scene key={ScheneKeys.ONBOARDING} {...defaultProps} panHandlers={null} direction="vertical" component={Onboarding} type="push" hideNavBar={true}/>
          <Scene key={ScheneKeys.LOGIN} {...defaultProps} component={EmailSignIn} hideNavBar={false} title="Sign In" renderRightButton={()=><RightPavLogo/>}/>
          <Scene key={ScheneKeys.REGISTER_STEP_1} {...defaultProps} component={EmailSignUpStep1} hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_2} {...defaultProps} component={EmailSignUpStep2} hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_3} {...defaultProps} component={EmailSignUpStep3} hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_4} {...defaultProps} component={EmailSignUpStep4} hideNavBar={true} />
          <Scene key={ScheneKeys.TOPIC_PICK} {...defaultProps} component={TopicPick} hideNavBar={true} />
          <Scene key={ScheneKeys.PROFILE} {...defaultProps} title="Profile" component={Profile}/>
          <Scene key={ScheneKeys.MAIN} panHandlers={null} tabs={true} tabBarStyle={styles.tabBar} tabBarShadowStyle={styles.tabBarShadow} tabSceneStyle={styles.tabScene}  initial={false}>
              <Scene key={ScheneKeys.TAB_NEWS} {...defaultProps} title="News Feed" component={NewsFeed} icon={TabIconFactory} renderRightButton={()=><NewsFeedButtons/>} initial={true}/>
              <Scene key={ScheneKeys.TAB_NOTIFS} {...defaultProps} title="Notifications" component={Notifications} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} />
              <Scene key={ScheneKeys.TAB_PROFILE} {...defaultProps} title="Profile" component={Profile} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} userId={null} isTab={true} />
          </Scene>
          <Scene key={ScheneKeys.VOTE} {...defaultProps} component={Vote} title="Vote" direction="vertical" hideNavBar={true} />
          <Scene key={ScheneKeys.NEWISSUE} {...defaultProps} panHandlers={null} component={NewIssue} title="New Issue" direction="vertical" hideNavBar={false} />
          <Scene key={ScheneKeys.BILL} {...defaultProps} component={Bill} title="Bill" initial={false} />
          <Scene key={ScheneKeys.COMMENTS} {...defaultProps} component={Comments} title="Comments" />
          <Scene key={ScheneKeys.SETTINGS} {...defaultProps} component={Settings} title="Settings" renderRightButton={()=><SettingsButtons/>} initial={true}/>
        </Scene>
    </RouterWithRedux>);
  }
}
export default connect(routerStateToProps, mapDispatchToProps)(Routes);
