/* @flow weak */
/**
 * # NewsFeedRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';






import {Colors, ScheneKeys, NEWS_FEED_FILTERS} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, Platform, PanResponder} from 'react-native';
import {getCorrectFontSizeForScreen, updateScreenSizesByOrientation} from '../../lib/Utils/multiResolution'
import {timeout} from '../../lib/Utils/genericUtils'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import KeyboardSpacer from 'react-native-keyboard-spacer';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PavTabBar from '../ScrollerTabBar/PavTabBar';

/**
* Icons library
*/



import ActivityFeedRender from './ActivityFeedRender';
import DiscoveryFeedRender from './DiscoveryFeedRender';
import SearchFeedRender from './SearchFeedRender';
import SearchModalBox from '../Modals/SearchModalBox';
import NavBarRender from '../NavBar/NavBarRender';

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
          backgroundColor: '#E8E7EE',
          // paddingTop:(Platform.OS === 'ios')? 64 : 54,   //nav bar height
          paddingBottom:50, //tab bar height
          // backgroundColor: 'orange',
          // marginVertical: 10,
          // marginHorizontal:15
        },

        headerView:{
          paddingTop:h*0.02,
          paddingHorizontal:w*0.016,
          paddingBottom:7,  //CAUTION: same as card paddingTop
          // backgroundColor:'red'
        },

        bodyLoadingContainer:{
          flex:1,
          // height:h*0.5,
          justifyContent:'center',
          alignItems:'center',
          // backgroundColor:'red'
        },


        tabContainer:{
          backgroundColor:'#ffffff',
          ...Platform.select({
             ios: {
               marginBottom:5,
               shadowColor: 'rgba(0, 0, 0, 0.3)',
               shadowOpacity: 0.8,
               shadowRadius: 2,
               shadowOffset: {
                 height: 1,
                 width: 5,
               },
             },
             android: {
               elevation:2.5,
             },
           }),

        },
        tabText:{
          paddingHorizontal: w*0.009,
          fontSize: getCorrectFontSizeForScreen(9),
          textAlign:'center',
        },
});



class NewsFeedRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={keyboardHeight: 0}
    // this._swipeDetected = false;
  }


  async componentWillReceiveProps(nextProps){
    let nextFilter = nextProps.curSelectedFilter;

    if (nextFilter!=null &&  nextFilter!=this.props.curSelectedFilter) {
      // console.log("@@@@@@@@@@@@@@@@@@@@ Next filter: "+nextFilter+" when old was: "+this.props.curSelectedFilter)
      await timeout(200);
      this.refs.scrollableNewsFeedTab.goToPage(nextFilter);
    }
    if(nextProps.device.orientation != this.props.device.orientation && !!this.pavTabBar){
        // console.log("NEWS feed device orientation"+nextProps.device.orientation)
        // console.log("Height : "+h+" width: "+w);
        // let scrWidth = nextProps.device.orientation!=="LANDSCAPE"?h:w;
        this.pavTabBar.onOrientationChange(updateScreenSizesByOrientation({w,h}, (nextProps.device.orientation!="LANDSCAPE")).w)
    }

  }





  /**
   * ### render method
   */
  render() {
    // {...this._panResponder.panHandlers}


    /*
    renderTabBar={() =>
      <BillTabBar
        underlineColor={Colors.negativeAccentColor}
        activeTextColor={Colors.primaryColor}
        inactiveTextColor={Colors.primaryColor}
        backgroundColor='rgba(255, 255, 255, 0.85)'
        textStyle={styles.tabText}
      />}
    */

    // this.refs.scrollableNewsFeedTab.goToPage(1)

    return(
        <View style={styles.container}>
          <NavBarRender
          title="News Feed"
          leftIconName="ios-search-strong"
          leftIconSize={30}
          onLeftIconPressed={this.props.onLeftNavBtnClicked}
          rightIconName="issues"
          rightIconSize={25}
          onRightIconPressed={this.props.onRightNavBtnClicked}
          device={this.props.device}
          />




          <ScrollableTabView
            ref="scrollableNewsFeedTab"
            onChangeTab={({i, ref}) => {
              // console.log("Tab changed: "+i);
              if(this.props.onFilterChanged!=null){
                  this.props.onFilterChanged(i)
              }
            }}
            renderTabBar={() =>
              <PavTabBar
                ref={(pavTabBar) => { this.pavTabBar = pavTabBar }}
                giveTabABorder={true}
                underlineColor={Colors.negativeAccentColor}
                activeTextColor='black'
                inactiveTextColor='black'
                backgroundColor='rgba(255, 255, 255, 0.85)'
                textStyle={styles.tabText}
                style={styles.tabContainer}
              />}
              style={styles.pagesContainer}
          >
            <ActivityFeedRender
            key="ActivityFeedRender"
            tabLabel="Activity Feed"
            feedData={this.props.newsFeedItems}
            device={this.props.device}
            curUser={this.props.curUser}
            type="feed"
            curFilter={this.props.curSelectedFilter}
            oldDataBeingFetched={this.props.isFetchingOlderNewsFeedData}
            beingRefreshed={((this.props.isFetchingNewsFeedData===false && this.props.newsFeedItems!=null)===false)}
            onRefresh={this.props.onFeedRefresh}
            onUserClick={this.props.onUserClick}
            onBillClick={this.props.onBillClick}
            onLikeDislikeClick={this.props.onLikeDislikeClick}
            onReplyClick={this.props.onReplyClick}
            onReactionClick={this.props.onReactionClick}
            onCommentClick={this.props.onCommentClick}
            onSocialClick={this.props.onSocialClick}
            onFetchMoreItems={this.props.onFetchMoreItems}
           />

           <DiscoveryFeedRender
             key="DiscoveryFeedRender"
             tabLabel="Discovery Feed"
             trendingItems={this.props.trendingItems}
             isFetchingTrendingData={this.props.isFetchingTrendingData}
             onRefreshTrendingItems={this.props.onRefreshTrendingItems}
             onBillClick={this.props.onBillClick}
             onTopicClick={this.props.onTopicClick}
             />

         </ScrollableTabView>


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
    // console.log("@@@@@@@@@@@@@@@@@@@@");
    return(
      (nextProps.curUser !== this.props.curUser)
      ||
      (nextProps.isFetchingNewsFeedData !== this.props.isFetchingNewsFeedData)
      ||
      (nextProps.isFetchingOlderNewsFeedData !== this.props.isFetchingOlderNewsFeedData)
      ||
      (nextProps.isFetchingTrendingData !== this.props.isFetchingTrendingData)
      ||
      (nextProps.newsFeedItems !== this.props.newsFeedItems)
      ||
      (nextProps.trendingData !== this.props.trendingData)
      ||
      (nextProps.searchModalVisible !== this.props.searchModalVisible)
      ||
      (nextProps.searchData !== this.props.searchData)
      ||
      (nextProps.currentlySearching !== this.props.currentlySearching)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
    );
  }
}
NewsFeedRender.propTypes= {

  device: React.PropTypes.object.isRequired,
  newsFeedItems: React.PropTypes.object,
  trendingItems: React.PropTypes.object,
  curSelectedFilter: React.PropTypes.number.isRequired,

  curUser: React.PropTypes.object.isRequired,
  isFetchingNewsFeedData: React.PropTypes.bool.isRequired,
  isFetchingOlderNewsFeedData: React.PropTypes.bool.isRequired,
  isFetchingTrendingData: React.PropTypes.bool.isRequired,

  onLeftNavBtnClicked: React.PropTypes.func.isRequired,
  onRightNavBtnClicked: React.PropTypes.func.isRequired,

  searchData: React.PropTypes.array,
  currentlySearching: React.PropTypes.bool.isRequired,
  searchModalVisible: React.PropTypes.bool.isRequired,
  showBillSearchModal: React.PropTypes.func.isRequired,
  hideBillSearchModal: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onFilterChanged: React.PropTypes.func.isRequired,
  onTopicClick: React.PropTypes.func.isRequired,
  onRefreshTrendingItems: React.PropTypes.func.isRequired,
}

export default NewsFeedRender;
