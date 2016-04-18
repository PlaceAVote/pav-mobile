'use strict';


/**
* ## imports
*
*/
/**
* ### React
*
* Necessary components from ReactNative
*/
import React, {
  AppRegistry,
  Navigator,
  View,
  Image,
  Text,
  TouchableOpacity
 } from 'react-native';

  /**
  * ### Router-Flux
  *
  * Necessary components from Router-Flux
  */
  import RNRF, {
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

      /**
      * ## Actions
      *  The necessary actions for dispatching our bootstrap values
      */
      import {setPlatform, setVersion} from './reducers/device/deviceActions';
      import {setStore} from './reducers/global/globalActions';
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

      /**
      *  The version of the app but not  displayed yet
      */
      var VERSION='0.0.12';

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
          router: new routerInitialState
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



      export default function native(platform) {
        let PlaceAVote = React.createClass( {
          render() {


            const store = configureStore(getInitialState());

            //Connect w/ the Router
            const Router = connect()(RNRF.Router);

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
                  // console.log("ACTION:", action);
                  switch(action.type){
                    case "push":
                      store.dispatch(navigateState(action.key));
                      break;
                    case "back":
                    case "BackAction":
                      store.dispatch(navigateToPreviousState());
                      break;
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
            return (
              <Provider store={store}>
                <Router hideNavBar={false} createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}} renderRightButton={()=><RightPavLogo/>}>
                  <Scene key="modal" component={Modal} >
                    <Scene key="root" navigationBarStyle={{backgroundColor:Colors.primaryColor}}   titleStyle={{color:Colors.mainTextColor, fontFamily:"Whitney"}}>
                      <Scene key={ScheneKeys.ONBOARDING} direction="vertical" component={Onboarding} type="replace" hideNavBar={true} initial={true}/>
                      <Scene key={ScheneKeys.LOGIN} component={EmailSignIn} hideNavBar={false} title="Sign In" type="push" renderBackButton={()=><BackBtnImg/>} />
                      <Scene key={ScheneKeys.REGISTER_STEP_1} component={EmailSignUpStep1} type="push" hideNavBar={true} />
                      <Scene key={ScheneKeys.REGISTER_STEP_2} component={EmailSignUpStep2} type="push" hideNavBar={true} />
                      <Scene key={ScheneKeys.REGISTER_STEP_3} component={EmailSignUpStep3} type="push" hideNavBar={true} />
                      <Scene key={ScheneKeys.REGISTER_STEP_4} component={EmailSignUpStep4} type="push" hideNavBar={true} />
                      <Scene key={ScheneKeys.TOPIC_PICK} component={TopicPick} schema="modal" type="push" hideNavBar={true} />
                      <Scene key={ScheneKeys.NEWSFEED} component={NewsFeed} direction="vertical" title="News Feed" hideNavBar={true} panHandlers={null} duration={1} />
                    </Scene>
                  </Scene>
                </Router>
              </Provider>
            );
          }
        });
        /**
        * registerComponent to the AppRegistery and off we go....
        */

        AppRegistry.registerComponent('PlaceAVoteApp', () => PlaceAVote);
      }
