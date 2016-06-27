/* @flow weak */
/**
 * # NewsFeedRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';


import LinearGradient from 'react-native-linear-gradient';

/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'


import moment from 'moment'



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {NEWS_FEED_FILTERS} = Other;
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, ActivityIndicatorIOS, TouchableOpacity, ListView, RefreshControl, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import KeyboardSpacer from 'react-native-keyboard-spacer';



/**
* Icons library
*/



import ActivityFeedRender from './ActivityFeedRender';
import DiscoveryFeedRender from './DiscoveryFeedRender';
import SearchFeedRender from './SearchFeedRender';
import FiltersRender from './FiltersRender';
import SearchModalBox from '../Modals/SearchModalBox';


/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;










const styles = StyleSheet.create({


        container: {
          flex:1,
          flexDirection: 'column',
          paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
          paddingBottom:50, //tab bar height
          // backgroundColor: 'orange',
          // marginVertical: 10,
          // marginHorizontal:15
        },
        scrollView:{
          flex:1,
          backgroundColor: '#E8E7EE',
        },
        headerView:{
          paddingVertical:h*0.02,
          paddingHorizontal:w*0.016,
          // backgroundColor:'red'
        },

        bodyLoadingContainer:{
          flex:1,
          // height:h*0.5,
          justifyContent:'center',
          alignItems:'center',
          // backgroundColor:'red'
        },
});



class NewsFeedRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={keyboardHeight: 0}
  }








  /*
  BODY - FEED
  */
  renderNewsFeedBody(data){

    let {
      filterName,
      topicName,
      isFetchingFeed,
      isFetchingOlderFeedData,
      feedData,
      isFetchingDiscovery,
      discoveryData
    }= data;
    // console.log("RenderNewsFeedBody Ran with filterName: "+filterName+" while data "+(dataReady==true?"WAS ready.":"was NOT ready."))

      let dataReady=false;

      switch(filterName){
        case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
        case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
        case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
          // console.log("Data ready? :"+(isFetchingFeed===false)+(feedData!=null))
          dataReady= (isFetchingFeed===false && feedData!=null)
          // if(dataReady==true){
            return(
              <ActivityFeedRender
              key="bodyContainerView"
              feedData={feedData}
              device={this.props.device}
              curUser={this.props.curUser}
              type="feed"
              curFilter={filterName}
              curTopic={topicName}
              oldDataBeingFetched={isFetchingOlderFeedData}
              beingRefreshed={!dataReady}
              onRefresh={this.props.onFeedRefresh}
              onUserClick={this.props.onUserClick}
              onBillClick={this.props.onBillClick}
              onLikeDislikeClick={this.props.onLikeDislikeClick}
              onReplyClick={this.props.onReplyClick}
              onReactionClick={this.props.onReactionClick}
              onCommentClick={this.props.onCommentClick}
              onSocialClick={this.props.onSocialClick}
              onFetchMoreItems={this.props.onFetchMoreItems}
             />);
          // }else{
          //   return (<View  key="bodyContainerView" style={styles.bodyLoadingContainer}></View>);
          // }
        case NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER:
          dataReady = (isFetchingDiscovery===false && discoveryData!=null)
          return(
            <DiscoveryFeedRender
              key="bodyContainerView"
              topicList={this.props.topicList.toJS()}
              onTopicSelected={this.props.onTopicSelect}
              discoveryData={discoveryData}
              device={this.props.device}
              curUser={this.props.curUser}
              curFilter={filterName}
              curTopic={topicName}
              oldDataBeingFetched={false}
              beingRefreshed={!dataReady}
              onRefresh={this.props.onDiscoveryRefresh}
              onUserClick={this.props.onUserClick}
              onBillClick={this.props.onBillClick}
              onLikeDislikeClick={this.props.onLikeDislikeClick}
              onReplyClick={this.props.onReplyClick}
              onReactionClick={this.props.onReactionClick}
              onCommentClick={this.props.onCommentClick}
              onSocialClick={this.props.onSocialClick}
              onFetchMoreItems={this.props.onFetchMoreItems}
              />
            );

          // return (
          //   <SearchFeedRender
          //     key="bodyContainerView"
          //     device={this.props.device}
          //     beingRefreshed={!dataReady}
          //     onBillClick={this.props.onBillClick}
          //   />);
        case NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER:
          return (<View  key="bodyContainerView" style={styles.bodyLoadingContainer}><Text>Statistics page not ready yet</Text></View>);
      }
  }






  /**
   * ### render method
   */
  render() {
    return(
        <View style={styles.container}>
          <View
          style={styles.scrollView}
          >
            <FiltersRender
              topicList={this.props.topicList.toJS()}
              curSelectedTopic={this.props.newsFeedData.curSelectedTopic}
              curSelectedFilter={this.props.newsFeedData.curSelectedFilter}
              onFilterBtnClick={this.props.onFilterBtnClick}
              onTopicBtnClick={this.props.onTopicBtnClick}
              user={this.props.curUser.firstName}
              style={styles.headerView}
            />

            {this.renderNewsFeedBody(
              {
                filterName: this.props.newsFeedData.curSelectedFilter,
                topicName:this.props.newsFeedData.curSelectedTopic,
                isFetchingFeed: this.props.isFetchingNewsFeedData,
                isFetchingOlderFeedData: this.props.isFetchingOlderNewsFeedData,
                feedData: this.props.newsFeedData.itemsAfterFiltration,
                isFetchingDiscovery: this.props.isFetchingDiscoveryData,
                discoveryData: this.props.newsFeedData.discoveryItems
              })}
          </View>

          <SearchModalBox
          isOpen={this.props.searchModalVisible}
          onClose={()=>this.props.hideBillSearchModal()}
          extraBottomSpace={this.state.keyboardHeight}
          onSearchTermChanged={this.props.onSearchTermChanged}
          searchData={this.props.searchData}
          currentlySearching={this.props.currentlySearching}
          device={this.props.device}
          arrowLocation="top-left"
          onBillTap={(bId, bTitle)=>{
            if(!!this.props.onBillClick){
              this.props.onBillClick(bId);
              this.props.hideBillSearchModal();
            }
          }}
          onUserTap={(userId)=>{
            if(!!this.props.onUserClick){
              this.props.onUserClick(userId);
              this.props.hideBillSearchModal();
            }
          }}

          />
          <KeyboardSpacer onToggle={(keyboardState, keyboardHeight)=>{
              if(keyboardState==true){
                this.setState({
                  keyboardHeight: keyboardHeight
                });
              }else{
                this.setState({
                  keyboardHeight: 0
                });
              }
            }}/>
        </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("@@@@@@@@@@@@@@@@@@@@");
    // console.log("SHOULD THE COMPONENT UPDATE (curTopic):: "+(nextProps.newsFeedData.curSelectedTopic !== this.props.newsFeedData.curSelectedTopic));
    // console.log("SHOULD THE COMPONENT UPDATE (newsFeedData):: "+(nextProps.newsFeedData !== this.props.newsFeedData));
    // console.log("@@@@@@@@@@@@@@@@@@@@");
    return(
      (nextProps.curUser !== this.props.curUser)
      ||
      (nextProps.isFetchingNewsFeedData !== this.props.isFetchingNewsFeedData)
      ||
      (nextProps.isFetchingOlderNewsFeedData !== this.props.isFetchingOlderNewsFeedData)
      ||
      (nextProps.isFetchingDiscoveryData !== this.props.isFetchingDiscoveryData)
      ||
      (nextProps.newsFeedData !== this.props.newsFeedData)
      ||
      (nextProps.searchModalVisible !== this.props.searchModalVisible)
      ||
      (nextProps.topicList !== this.props.topicList)
      ||
      (nextProps.searchData !== this.props.searchData)
      ||
      (nextProps.currentlySearching !== this.props.currentlySearching)
    );
  }
}
NewsFeedRender.propTypes= {
  //TODO: Fill this

  newsFeedData: React.PropTypes.object.isRequired,
  curUser: React.PropTypes.object.isRequired,
  topicList: React.PropTypes.object.isRequired,
  isFetchingNewsFeedData: React.PropTypes.bool.isRequired,
  isFetchingOlderNewsFeedData: React.PropTypes.bool.isRequired,
  isFetchingDiscoveryData: React.PropTypes.bool.isRequired,

  searchData: React.PropTypes.array,
  currentlySearching: React.PropTypes.bool.isRequired,
  searchModalVisible: React.PropTypes.bool.isRequired,
  showBillSearchModal: React.PropTypes.func.isRequired,
  hideBillSearchModal: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,

}

export default NewsFeedRender;
