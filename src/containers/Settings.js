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
// import * as authActions from '../reducers/auth/authActions';
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
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 50, // photos only
  maxHeight: 50, // photos only
  aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
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
  // authActions,
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
  // async getDiscoveryItemsForTopic(topicString){
  //   return await this.props.actions.getDiscoveryItems(topicString, this.TOKEN, this.props.global.isDev);
  // }

  //
  // onFilterBtnClick(filterName, topicType){
  //   // alert("Filter clicked: "+filterName);
  //   if(filterName==NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER){
  //     this.props.actions.setActivityFilter(filterName);
  //   }
  //   else if(filterName==NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER){
  //     this.props.actions.setActivityFilter(filterName);
  //     this.getDiscoveryItemsForTopic(Other.TOPICS.TRENDING, false);
  //   }else{
  //     this.props.actions.filterFeedItems(filterName, topicType);
  //   }
  // }
  //
  // onTopicSelect(topicName){
  //   if(this.props.newsfeed.newsFeedData.discoveryItems.get(topicName)==null){
  //       this.getDiscoveryItemsForTopic(topicName, false);
  //   }
  // }
  //
  //
  //
  // onFeedRefresh(){
  //       this.connectAndGetFeed();
  //     // console.log("Do something on feed refresh")
  // }
  //
  // onDiscoveryRefresh(){
  //       // this.connectAndGetFeed();
  //     // console.log("Do something on feed refresh")
  // }
  //
  //
  //
  //
  //
  //
  // onUserClickedUser(userId){
  //   this.props.actions.navigateTo(PROFILE, {userId:userId, isTab:false});
  // }
  //
  // onUserClickedBill(billId){
  //   this.props.actions.navigateTo(BILL, {billId:billId});
  //   // alert("Tapped bill with id: "+billId);
  // }
  //
  // // onUserClickedLikeDislike(type){
  // //   switch(type){
  // //     case REACTIONS.HAPPY:
  // //       alert("User tapped like");
  // //       break;
  // //     case REACTIONS.SAD:
  // //       alert("User tapped dislike");
  // //       break;
  // //     default:
  // //       break;
  // //   }
  // // }
  //
  // async onUserClickedLikeDislike(reaction, data){
  //   let {
  //     commentId,
  //     billId,
  //     newStatus,
  //     oldOpposite,
  //     oldScore
  //   } = data;
  //   console.log("Reaction: "+reaction+" commentId: "+commentId+" billId: "+billId+" newStatus: "+newStatus+"@@@@ DEV?"+this.props.global.isDev)
  //   let result = false;
  //   switch(reaction){
  //     case REACTIONS.HAPPY:
  //       result = !!await this.props.actions.likeCommentFeed(commentId, billId, newStatus, this.TOKEN, this.props.global.isDev);
  //       break;
  //     case REACTIONS.SAD:
  //       result = !!await this.props.actions.dislikeCommentFeed(commentId, billId, newStatus, this.TOKEN, this.props.global.isDev);
  //       break;
  //   }
  //   return result;
  // }
  //
  // async onUserClickedReply(commentId, billData){
  //   let {bill_id} = billData;
  //   this.props.actions.navigateTo(COMMENTS, {billId: bill_id, commentId:commentId });
  // }
  //
  // async onUserClickedReaction(issueId, newReaction, oldReaction){
  //   if(oldReaction==null || oldReaction=="" || oldReaction=="none"){  //if there was NO reaction till now
  //       return await this.props.actions.reactToIssueItem(issueId, newReaction, this.TOKEN, this.props.global.isDev);
  //   }else{  //if there WAS a reaction before
  //       if(newReaction!=oldReaction){ //if the reaction we pressed is NOT the same as what it used to be
  //         return await this.props.actions.reactToIssueItem(issueId, newReaction, this.TOKEN, this.props.global.isDev);
  //       }else{    //if the reaction we pressed is THE SAME as what it used to be
  //         return await this.props.actions.deleteReactionFromIssueItem(issueId, oldReaction, this.TOKEN, this.props.global.isDev);
  //       }
  //   }
  // }
  //
  // onUserClickedComments(parentBillId){
  //   this.props.actions.navigateTo(BILL, {billId:parentBillId, initTab:BillPageTabs.COMMENTS});
  // }
  //
  // onUserClickedSocial(socialType, data){
  //   switch(socialType){
  //     case SOCIAL_TYPES.SIMPLE_URL:
  //       Linking.openURL(data.url).catch(err => console.error('An error occurred while trying to open url: '+data.url, err));
  //       break;
  //     case SOCIAL_TYPES.FACEBOOK:
  //       alert("Facebook button clicked");
  //       break;
  //     case SOCIAL_TYPES.TWITTER:
  //       alert("Twitter button clicked");
  //       break;
  //     default:
  //       break;
  //   }
  // }
  //
  // async onBillSearchTermChanged(value){
  //   // alert("Searching "+value)
  //   let res = await this.props.actions.searchBillByTermItems(value, this.TOKEN, this.props.global.isDev)
  //   console.log("search term: "+value+" results: "+JSON.stringify(res));
  //   if(!!res){
  //     this.setState({searchData:res})
  //   }else{
  //     this.setState({searchData:null})
  //   }
  // }
  //
  // onFetchMoreFeedItems(filterType, topicName){
  //   // console.log("On fetch more for filter: "+filterType+" with topic: "+topicName);
  //
  //   switch(filterType){
  //     case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
  //     case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
  //     case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
  //       if(this.props.newsfeed.newsFeedData.itemsAfterFiltration!=null && this.props.newsfeed.isFetching.olderSettingsData===false){
  //         this.connectAndGetFeed(true);
  //       }
  //       break;
  //     case NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER:
  //     default:
  //       break;
  //   }
  //
  // }



  onTermsOfServiceClick(){
    // alert("On terms of service click")
    this.props.actions.navigateTo(TOS)
  }

  onImageEditClick(){
    /**
     * The first arg will be the options object for customization, the second is
     * your callback which sends object: response.
     *
     * See the README for info about the response
     */

    ImagePicker.showImagePicker(imgPickerOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }else {
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
          onFieldChange={this.onFieldChange.bind(this)}
          onTermsOfServiceClick={this.onTermsOfServiceClick.bind(this)}
      />

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Settings);
