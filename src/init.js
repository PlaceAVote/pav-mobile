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
    Modal
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
      import App from './containers/App';

      //TODO: Uncomment those

      import Login from './containers/Login';
      // import Logout from './containers/Logout';
      import Onboarding from './containers/Onboarding';
      // import ForgotPassword from './containers/ForgotPassword';
      // import Profile from './containers/Profile';
      // import Main from './containers/Main';
      // import Subview from './containers/Subview';

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

      /**
      * ## States
      * PlaceAVote explicitly defines initial state
      *
      */
      import authInitialState from './reducers/auth/authInitialState';
      import deviceInitialState from './reducers/device/deviceInitialState';
      import globalInitialState from './reducers/global/globalInitialState';
      import profileInitialState from './reducers/profile/profileInitialState';

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
          profile: new profileInitialState
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

            /*

            <Schema name="modal"sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

            <Schema name="floatFromRight" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>

            <Schema name="default"/>

            <Schema name="tab"
            type="switch"
            icon={TabIcon} />

            <Route name="App"
            component={App}
            title="App"
            initial={true}/>

            <Route name="Onboarding"
            component={Onboarding}
            title="Onboarding"
            type="replace"
            />

            */



            // setup the router table with App selected as the initial component
            return (
              <Provider store={store}>
                <Router hideNavBar={false}>
                  <Scene key="modal" component={Modal} >
                    <Scene key="root">
                      <Scene key="App" component={App} title="App" initial={true}/>
                      <Scene key="Onboarding" direction="vertical">
                        <Scene key="OnboardingModal" component={Onboarding} title="Onboarding" schema="modal" type="replace" hideNavBar={true}/>

                        <Scene key="Login">
                          <Scene key="LoginModal" component={Login} schema="modal" title="Sign In" hideNavBar={true}/>
                          <Scene key="loginModal2" component={Login} title="Login2" hideNavBar={true}/>
                        </Scene>

                      </Scene>
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
