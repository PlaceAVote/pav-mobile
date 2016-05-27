


import React from 'react';
// import {} from 'react-native';
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



export default class Routes extends React.Component{
  render(){
    let RouterWithRedux = this.props.router;
    return (<RouterWithRedux hideNavBar={false} sceneStyle={{backgroundColor:'#F7F7F7'}} >
        <Scene key="root"  hideNavBar={true} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:Colors.mainTextColor, fontFamily:"Whitney"}} leftButtonIconStyle={{tintColor: 'white'}}>
          <Scene key={ScheneKeys.ONBOARDING} direction="vertical" component={Onboarding} type="replace" hideNavBar={true} />
          <Scene key={ScheneKeys.LOGIN} component={EmailSignIn} hideNavBar={false} title="Sign In" type="push"  renderRightButton={()=><RightPavLogo/>}/>
          <Scene key={ScheneKeys.REGISTER_STEP_1} component={EmailSignUpStep1} type="push" hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_2} component={EmailSignUpStep2} type="push" hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_3} component={EmailSignUpStep3} type="push" hideNavBar={true} />
          <Scene key={ScheneKeys.REGISTER_STEP_4} component={EmailSignUpStep4} type="push" hideNavBar={true} />
          <Scene key={ScheneKeys.TOPIC_PICK} component={TopicPick} schema="modal" type="push" hideNavBar={true} />
          <Scene key={ScheneKeys.VOTE} component={Vote} hideNavBar={true} title="Vote" type="push" direction="vertical"/>
          <Scene key={ScheneKeys.BILL} component={Bill} title="Bill" type="push" initial={false}/>
          <Scene key={ScheneKeys.COMMENTS} component={Comments} title="Comments" type="push" initial={false}/>
          <Scene key={ScheneKeys.MAIN} panHandlers={null} duration={1} tabs={true} tabBarStyle={{backgroundColor:'white'}} tabBarShadowStyle={{backgroundColor:Colors.secondaryBorderColor,top:-1,height:1, }} tabSceneStyle={{backgroundColor:'red'}} initial={true}>
              <Scene key={ScheneKeys.TAB_NEWS} title="News Feed" component={NewsFeed} renderRightButton={()=><NewsFeedButtons/>}icon={TabIconFactory} initial={false}/>
              <Scene key={ScheneKeys.TAB_NOTIFS} title="Notifications" component={Notifications} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:'white', fontFamily:"Whitney"}}/>
              <Scene key={ScheneKeys.TAB_PROFILE} title="Profile" component={Profile} icon={TabIconFactory} renderRightButton={()=><ProfileButtons/>} navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:'white', fontFamily:"Whitney"}} />
          </Scene>
        </Scene>
    </RouterWithRedux>);
  }
}
