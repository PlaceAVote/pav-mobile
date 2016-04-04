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
  Text } from 'react-native';

  /**
  * ### Router-Flux
  *
  * Necessary components from Router-Flux
  */
  import RNRF, {
    Scene,
    TabBar,
    Modal,
    Reducer
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
      import ForgotPassword from './containers/ForgotPassword';
      import EmailSignUpStep1 from './containers/EmailSignUpStep1';
      import EmailSignUpStep2 from './containers/EmailSignUpStep2';
      import EmailSignUpStep3 from './containers/EmailSignUpStep3';
      import EmailSignUpStep4 from './containers/EmailSignUpStep4';

      // import Logout from './containers/Logout';
      import Onboarding from './containers/Onboarding';
      // import ForgotPassword from './containers/ForgotPassword';
      // import Profile from './containers/Profile';
      // import Main from './containers/Main';
      // import Subview from './containers/Subview';


      import {Colors, ActionNames} from './config/constants';



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
      import {setNavProps, navigateToPreviousState} from './reducers/routing/routingActions';

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



      class ARightBtn extends React.Component {
          render(){
              return <Text style={{
                width: 80,
                position: 'absolute',
                height: 120,
                top: 50,
                right:0,
                padding: 8,
                backgroundColor: 'red',
                color: '#000000'
            }}>RightBtnTest</Text>
          }
      }






      export default function native(platform) {

        let PlaceAVote = React.createClass( {



          render() {
            const store = configureStore(getInitialState());

            //Connect w/ the Router
            const Router = connect()(RNRF.Router);

            // console.log("@@@@@@@@@@@ ROUTER: "+Router);
            // configureStore will combine reducers from placeAVote and main application
            // it will then create the store based on aggregate state from all reducers
            store.dispatch(setPlatform(platform));
            store.dispatch(setVersion(VERSION));
            store.dispatch(setStore(store));


            var self = this;


            const reducerCreate = params=>{
                const defaultReducer = Reducer(params);
                return (state, action)=>{
                    // console.log("ACTION:", state);


                    // switch (action.type) {
                    //   case "push":
                    //       console.log("@@@@@@@@@@@@@@@@@@@@@ reducer: "+JSON.stringify(action));
                    //       // store.dispatch(setNavProps(action.key))
                    //       break;
                    //   case "BackAction":
                    //       store.dispatch(navigateToPreviousState())
                    //   default:
                    //     break;
                    //
                    // }



                    return defaultReducer(state, action);
                }
            };
            // var renderRtBtn = function renderRtBtn(){
            //   return
            // }

// titleStyle={{color:Colors.mainTextColor}}
// navigationBarStyle={{backgroundColor:Colors.primaryColor}}
            // setup the router table with App selected as the initial component
            return (
              <Provider store={store}>
                <Router hideNavBar={false} createReducer={reducerCreate}  sceneStyle={{backgroundColor:'#F7F7F7'}}>
                    <Scene key="root">
                      <Scene key={ActionNames.ONBOARDING} direction="vertical" component={Onboarding} title="Welcome" type="replace" hideNavBar={true}  initial={true} />

                      <Scene key="FacebookSignIn">
                        <Scene key="FacebookSignIn1" component={EmailSignIn} schema="modal" title="Facebook signin" hideNavBar={true}  />
                      </Scene>

                      <Scene key={ActionNames.LOGIN} component={EmailSignIn} type="push" title="Sign In" titleStyle={{color:Colors.mainTextColor}} navigationBarStyle={{backgroundColor:Colors.primaryColor}} >
                      </Scene>

                      <Scene key={ActionNames.FORGOT_PASSWORD} schema="modal" direction="vertical" component={ForgotPassword} title="Forgot Password" navigationBarStyle={{backgroundColor:Colors.primaryColor}} titleStyle={{color:Colors.mainTextColor}}/>

                      <Scene key={ActionNames.REGISTER_STEP_1} component={EmailSignUpStep1} type="push" title="Sign Up" hideNavBar={true} >
                        <Scene key={ActionNames.REGISTER_STEP_2} component={EmailSignUpStep2} hideNavBar={true} />
                        <Scene key={ActionNames.REGISTER_STEP_3} component={EmailSignUpStep3} hideNavBar={true} />
                        <Scene key={ActionNames.REGISTER_STEP_4} component={EmailSignUpStep4} hideNavBar={true} />
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
