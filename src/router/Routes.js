import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors, ScheneKeys} from '../config/constants';


/**
* ### Redux
*
*/
import {connect } from 'react-redux';


/*
*
* ### containers
*
* All the top level containers
*
*/
import EmailSignIn from '../containers/EmailSignIn';
import EmailSignUpStep1 from '../containers/EmailSignUpStep1';
import EmailSignUpStep1Fb from '../containers/EmailSignUpStep1Fb';
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
import Topic from '../containers/Topic';

import NoInternetModal from '../components/Modals/NoInternetModal';



// import {RightPavLogo} from '../containers/NavIcons/LoginButtons';
import TabIconFactory from '../containers/NavIcons/TabIconFactory';
import {Scene, Switch, Actions, Modal, Router} from 'react-native-router-flux';





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
    borderRightColor: "#e8e7ee",

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




//Connect w/ the Router
const RouterWithRedux = connect()(Router);

const pavScenes = Actions.create(
  <Scene key="modal" component={Modal} >
    <Scene key={ScheneKeys.NO_INTERNET_MODAL} component={NoInternetModal} />
    <Scene key="root" hideNavBar={true} initial={true}>
      <Scene key={ScheneKeys.SPLASH_SCREEN} {...defaultProps} component={SplashScreen} type="replace" hideNavBar={true} initial={true}/>
      <Scene key={ScheneKeys.ONBOARDING} {...defaultProps} panHandlers={null} direction="vertical" component={Onboarding} type="push" hideNavBar={true}/>
      <Scene key={ScheneKeys.LOGIN} {...defaultProps} component={EmailSignIn} hideNavBar={false} title="Sign In" />
      <Scene key={ScheneKeys.REGISTER_STEP_1} {...defaultProps} title="Register" component={EmailSignUpStep1} hideNavBar={false} />
      <Scene key={ScheneKeys.REGISTER_STEP_1_FB} {...defaultProps} title="Register" type="replace" component={EmailSignUpStep1Fb} hideNavBar={false} />
      <Scene key={ScheneKeys.REGISTER_STEP_2} {...defaultProps} title="Register" component={EmailSignUpStep2} hideNavBar={false} initial={false}/>
      <Scene key={ScheneKeys.TOPIC_PICK} {...defaultProps} component={TopicPick} hideNavBar={true} />
      <Scene key={ScheneKeys.PROFILE} {...defaultProps} title="Profile" component={Profile} hideNavBar={true}/>
      <Scene key={ScheneKeys.MAIN} panHandlers={null} tabs={true} tabBarStyle={styles.tabBar} tabBarShadowStyle={styles.tabBarShadow} tabSceneStyle={styles.tabScene} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle} tabBarIconContainerStyle={styles.iconContainerStyle}  hideNavBar={true} initial={false}>
          <Scene key={ScheneKeys.TAB_NEWS} {...defaultProps} title="News Feed" component={NewsFeed} icon={TabIconFactory} hideNavBar={true} initial={true}/>
          <Scene key={ScheneKeys.TAB_NOTIFS} {...defaultProps} title="Notifications" component={Notifications} icon={TabIconFactory} hideNavBar={true} />
          <Scene key={ScheneKeys.TAB_PROFILE} {...defaultProps} title="Profile" component={Profile} icon={TabIconFactory} userId={null} isTab={true} hideNavBar={true}/>
      </Scene>
      <Scene key={ScheneKeys.VOTE} {...defaultProps} component={Vote} title="Vote" direction="vertical" hideNavBar={true} />
      <Scene key={ScheneKeys.NEWISSUE} {...defaultProps} panHandlers={null} component={NewIssue} title="New Issue" direction="vertical" hideNavBar={true} />
      <Scene key={ScheneKeys.BILL} {...defaultProps} component={Bill} title="Bill" hideNavBar={true} />
      <Scene key={ScheneKeys.COMMENTS} {...defaultProps} component={Comments} title="Comments" hideNavBar={true}/>
      <Scene key={ScheneKeys.SETTINGS} {...defaultProps} component={Settings} hideNavBar={true} />
      <Scene key={ScheneKeys.TOS} {...defaultProps} component={Tos} title="Terms of service"/>
      <Scene key={ScheneKeys.TOPIC} {...defaultProps} component={Topic} hideNavBar={true} />
    </Scene>
  </Scene>
);

export default class Routes extends React.Component{

  render(){
    return <RouterWithRedux hideNavBar={false} sceneStyle={styles.scene} scenes={pavScenes}/>;
  }
}
