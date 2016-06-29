/**
 * Settings.js
 *
 * Our main pav screen
 */
'use strict';






/**
 *           Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as routingActions from '../reducers/routing/routingActions';
// import * as deviceActions from '../reducers/device/deviceActions';
// import * as newsfeedActions from '../reducers/newsfeed/newsfeedActions';
// import * as billActions from '../reducers/bill/billActions';
import * as settingsActions from '../reducers/settings/settingsActions';


import ImagePicker from 'react-native-image-picker';
    const imgPickerOptions = {
      title: 'Select Avatar', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      // customButtons: {
      //   'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
      // },
      // cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      // videoQuality: 'high', // 'low', 'medium', or 'high'
      maxWidth: 512, // photos only
      maxHeight: 512, // photos only
      aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 1, // 0 to 1, photos only
      // angle: 0, // android only, photos only
      allowsEditing: true, // Built in functionality to resize/reposition the image after selection
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      // storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
      //   skipBackup: true, // ios only - image will NOT be backed up to icloud
      //   path: 'images' // ios only - will save image at /Documents/images rather than the root
      // }
    };


/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   SettingsRender
 */
import SettingsRender from '../components/Settings/SettingsRender'
import {findCommentPath} from '../lib/Utils/commentCrawler';

import React from 'react';
import {Linking} from 'react-native';

import CONFIG from '../config/config';

import {
ScheneKeys,
Modals
} from '../config/constants';
const {
  GENDER_PICK,
  DATE_PICK
} = Modals;

const {
  TOS
} = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  routingActions,
  // deviceActions,
  // newsfeedActions,
  // billActions
  settingsActions
];

function mapStateToProps(state) {
  return {
      ...state
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









class Settings extends React.Component {

  constructor(props) {
    super(props);
    if(CONFIG.MOCK_TOKEN===true){
      this.TOKEN = props.global.isDev==true?CONFIG.DEV_TOKEN:CONFIG.PROD_TOKEN;
    }
  }

  componentWillMount(){
    this.connectAndGetSettings();
  }

  async connectAndGetSettings(fetchOld){
    // console.log("@@@ SETTINGS - is dev: "+this.props.global.isDev+" token: "+this.TOKEN);
    return await this.props.actions.getSettings(this.TOKEN, this.props.global.isDev);
  }

  onLogoutClick(){
    this.props.actions.logout();
  }



  onTermsOfServiceClick(){
    // alert("On terms of service click")
    this.props.actions.navigateTo(TOS)
  }

  onImageEditClick(){


      ImagePicker.showImagePicker(imgPickerOptions, (response) => {
      // alert('Response = ', JSON.stringify(response));

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }else {
        // console.log("PHOTO: "+JSON.stringify(response));
        // You can display the image using either data:
        const newPhoto = 'data:image/jpeg;base64,'+response.data;
        // console.log(newPhoto);
        this.props.actions.updateProfilePhoto(newPhoto, this.TOKEN, this.props.global.isDev)
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // console.log("DATA: "+source);

        // uri (on iOS)
        // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // console.log("URI: "+response.uri);
        // uri (on android)
        // const source = {uri: response.uri, isStatic: true};
        // console.log("DATA: "+source);

      }
    });
  }

  onFieldChange(field, value) {
    this.props.actions.onSettingsFormFieldChange(field, value);
  }

  render() {
    let form = this.props.settings.form;
    // console.log("FORM@ "+form);
    return(
      <SettingsRender
          genderPickIsOpen={this.props.router.modalIsOpen.get(GENDER_PICK)}
          hideGenderPickModal={()=>this.props.actions.setModalVisibility(GENDER_PICK, false)}
          showGenderPickModal={()=>this.props.actions.setModalVisibility(GENDER_PICK, true)}
          datePickIsOpen={this.props.router.modalIsOpen.get(DATE_PICK)}
          hideDatePickModal={()=>this.props.actions.setModalVisibility(DATE_PICK, false)}
          showDatePickModal={()=>this.props.actions.setModalVisibility(DATE_PICK, true)}
          onImageEditClick={this.onImageEditClick.bind(this)}
          fields={form.get("fields").toJS()}
          isFetching={form.get("isFetching").get("settings")}
          isUpdatingPhoto={form.get("isFetching").get("photoUpdate")}
          onFieldChange={this.onFieldChange.bind(this)}
          onLogoutClick={this.onLogoutClick.bind(this)}
          onTermsOfServiceClick={this.onTermsOfServiceClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Settings);
