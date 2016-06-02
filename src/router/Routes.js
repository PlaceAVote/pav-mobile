


import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors, ScheneKeys} from '../config/constants';


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

/**
* ## Nav bar icons
*/
import ProfileButtons from '../containers/NavIcons/ProfileButtons';
import NewsFeedButtons from '../containers/NavIcons/NewsFeedButtons';
import {RightPavLogo} from '../containers/NavIcons/LoginButtons';
import TabIconFactory from '../containers/NavIcons/TabIconFactory';


/**
* ### Router-Flux
*
* Necessary components from Router-Flux
*/
import {Scene} from 'react-native-router-flux';


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

export default class Routes extends React.Component{

  render(){
    let RouterWithRedux = this.props.router;
    return (<RouterWithRedux hideNavBar={false} sceneStyle={styles.scene} >
        <Scene key="root" hideNavBar={true}>
          <Scene key={ScheneKeys.ONBOARDING} {...defaultProps} direction="vertical" component={Onboarding} type="replace" hideNavBar={true} />
          <Scene key={ScheneKeys.LOGIN} {...defaultProps} component={EmailSignIn} hideNavBar={false} title="Sign In" renderRightButton={()=><RightPavLogo/>}/>
          <Scene key={ScheneKeys.REGISTER_STEP_1} {...defaultProps} component={EmailSignUpStep1} hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_2} {...defaultProps} component={EmailSignUpStep2} hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_3} {...defaultProps} component={EmailSignUpStep3} hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_4} {...defaultProps} component={EmailSignUpStep4} hideNavBar={true} />
          <Scene key={ScheneKeys.TOPIC_PICK} {...defaultProps} component={TopicPick} hideNavBar={true} />
          <Scene key={ScheneKeys.MAIN} panHandlers={null} tabs={true} tabBarStyle={styles.tabBar} tabBarShadowStyle={styles.tabBarShadow} tabSceneStyle={styles.tabScene}  initial={true}>
              <Scene key={ScheneKeys.TAB_NEWS} {...defaultProps} title="News Feed" component={NewsFeed} icon={TabIconFactory} renderRightButton={()=><NewsFeedButtons/>}/>
              <Scene key={ScheneKeys.TAB_NOTIFS} {...defaultProps} title="Notifications" component={Notifications} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} />
              <Scene key={ScheneKeys.TAB_PROFILE} {...defaultProps} title="Profile" component={Profile} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} />
          </Scene>
          <Scene key={ScheneKeys.VOTE} {...defaultProps} component={Vote} title="Vote" direction="vertical" hideNavBar={true}/>
          <Scene key={ScheneKeys.BILL} {...defaultProps} component={Bill} title="Bill" initial={false}/>
          <Scene key={ScheneKeys.COMMENTS} {...defaultProps} component={Comments} title="Comments" initial={false}/>
        </Scene>
    </RouterWithRedux>);
  }
}
