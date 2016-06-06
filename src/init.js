'use strict';
/* @flow */



/*
  React and React native imports
*/
import React from 'react';
import {Platform, DatePickerIOS} from 'react-native';



/*
  Our router imports
*/
import {Router} from 'react-native-router-flux';
import Routes from './router/Routes'


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
*  ```configureStore``` will connect the ```reducers``` in one object
*
*/
import configureStore from './lib/configureStore';

/**
* ## Actions
*  The necessary actions for dispatching our bootstrap values
*/
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore, setNavBarDimensions, setEnvironmentIsDev} from './reducers/global/globalActions';
import {navigateState, navigateToPreviousState} from './reducers/routing/routingActions';

import CONFIG from './config/config'

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


/*
  Avoiding invalid rn 26 warnings
*/
DatePickerIOS.propTypes.date = React.PropTypes.any.isRequired;
DatePickerIOS.propTypes.onDateChange = React.PropTypes.func;
DatePickerIOS.propTypes.maximumDate = React.PropTypes.any;
DatePickerIOS.propTypes.minimumDate = React.PropTypes.any;


/**
*  The version of the app but not  displayed yet
*/
var VERSION='0.0.13';

const PROD_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjpudWxsLCJlbWFpbCI6ImJlbG92ZWRpbmJveEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjY1YTdkOWM2LTkwYTEtNGQyMi05NzhkLTNmZjk2NmViNTNjNSIsImNpdHkiOiJUaGVzc2Fsb25pa2kgR3JlZWNlIiwiZXhwIjoxNDY2MTY5NzE5LCJwdWJsaWMiOmZhbHNlLCJzdGF0ZSI6bnVsbCwidG9waWNzIjpbIlBvbGl0aWNzIiwiVGVjaG5vbG9neSIsIlNvY2lhbCBJbnRlcmVzdCJdLCJjb3VudHJ5X2NvZGUiOiJHUkMiLCJkb2IiOiIxMS8xNC8xOTg5IiwiaW1nX3VybCI6Imh0dHBzOi8vY2RuLnBsYWNlYXZvdGUuY29tL3VzZXJzL2M1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNi9wcm9maWxlL2ltZy9wMjAweHAyMDB4L2E5ZWM0YmFlLTIwZTQtNDBkZC05YmU0LWYyOGEyOWQxMjVkYy5qcGVnIiwibGFzdF9uYW1lIjoiS29ra2luaWRpcyIsImxhdCI6bnVsbCwidXNlcl9pZCI6ImM1MTQxMmVhLWYyY2YtNDRjZC1hOGJkLTc3ODk3ODQ2ZjliNiIsImdlbmRlciI6Im1hbGUiLCJyZWdpc3RlcmVkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDU1NzU3MDQ5MTMzLCJsbmciOm51bGwsImRpc3RyaWN0IjpudWxsfQ.mVwiw_-zA1En2y6eNYN1GErmL7t1NMlWzQRogi1vsOWOlkRNxcrgatyI3Akrd5LwS5NFSa5Lf8GlvdeeFFKEGEjqmFx_2UQ7MIvih9F9DlBZf6LJeeGHNXKembJV8ksJWktLmbspdk2_tVLvskjatJzPHrIM3-dJ_qJQBASEQhjUBRYKc9-GbvVCvL-xpveNkI6H350anJnsIFuOPBnpf3cQn7FJJNUuPdeTVXJIM1ZeqwFGqp7z_4qE2wuZQRwC_m8ELc9GizB62qqJcOWRmnbOLw8j4f59VtOMJVcECW7C7iuwq-0VECDJnv7jpkOTDSntYS-c4Std65m5dEpHQQ";
const DEV_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhZGRyZXNzIjoiV2FzaGluZ3RvbiwgREMgMjAwMDEsIFVTQSIsImVtYWlsIjoid2hhdGV2YWhAcGxhY2Vhdm90ZS5jb20iLCJmaXJzdF9uYW1lIjoiSW9hbm5pcyIsImNvbmZpcm1hdGlvbi10b2tlbiI6IjdmODc0ZDI4LTU3MTMtNGZhOS1hMDljLTZhNDg3ODc2ZTAzMiIsImV4cCI6MTQ2NjM1NzY0NiwicHVibGljIjp0cnVlLCJzdGF0ZSI6IkRDIiwiemlwY29kZSI6IjIwMDAxIiwidG9waWNzIjpbInNleCIsImRydWdzIiwicm9ja05Sb2xsIl0sImNvdW50cnlfY29kZSI6IlVTQSIsImRvYiI6IjE0LzExLzE5ODkiLCJsYXN0X25hbWUiOiJEYVRlc3RhaCIsImxhdCI6IjM4LjkxMjA2OCIsInVzZXJfaWQiOiJlMjMzMzk0Yi1kYjEwLTRiMDMtYjNkNy02NTYxOTZmOTYyNDYiLCJnZW5kZXIiOiJtYWxlIiwicmVnaXN0ZXJlZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQ2MTE1ODU2MDY4NCwibG5nIjoiLTc3LjAxOTAyMjgiLCJkaXN0cmljdCI6IjAifQ.tZGdfcxCJ4d15cV0RhgXI0jJMm-I1cM0ANR3PGXe0Oni2Qm6Ci-MtMD7d1LxQd4GTAOuLKzeucMqC_jbYsrfgNX6TcE3Ua2hdcN5MQaxDGVsiFIi2A-UHt3_o6Ph5pFG4zuh5d-NfTC17GGmJxbi8roWpNdssR2rh2fuh6nRus_gOoibge8yU3EtEFEjpxTs4nSvTI1n6_B0AiVJrPEZunHNByIlZinDpjZJqe0-OMeEBzs26lzaaIerV8OZNy2WgqPS4aLj2WCe84xx6_oC8QFe7AoboGDDh4k2XVAHKNx022VLYqRG06bSyyrLur7Jvzra92b8h9m63eLy-iyDzA";

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


    constructor(props){
      super(props)
      this.state={tokenExists:false};
    }
    componentWillMount(){
      //TODO: Find if token exists in disk programmatically
      this.setState({tokenExists:true});
    }

    render() {
      const store = configureStore(getInitialState());

      //Connect w/ the Router
      const RouterWithRedux = connect()(Router);

      // configureStore will combine reducers from placeAVote and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(Platform.OS));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));
      store.dispatch(setEnvironmentIsDev(CONFIG.MOCK_TOKEN===true?CONFIG.ENVIRONMENT_IS_DEV:false))

      return (
        <Provider store={store}>
          <Routes tokenExistsInDisk={this.state.tokenExists} router={RouterWithRedux}/>
        </Provider>
      );
    }
}
