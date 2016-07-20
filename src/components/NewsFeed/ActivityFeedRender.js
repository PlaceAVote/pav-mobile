/* @flow weak */
/**
 * # ActivityFeedRender.js
 *
 */
'use strict';

import React from 'react';
import {StyleSheet, View, ListView, Platform, RefreshControl, Text} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'

import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavSpinner from '../../lib/UI/PavSpinner'

/**
* Cards
*/
import CardFactory from '../Cards/CardFactory';
import {Colors, Other} from '../../config/constants';
const {NEWS_FEED_FILTERS} = Other;


const styles = StyleSheet.create({
  itemList:{
    flex:1,
  },
  cardStyle:{
    ...Platform.select({
       ios: {
        //  height:h*0.2,
       },
       android: {
         elevation:2.5,
        //  backgroundColor:'red'
       },
     }),
  },
  recentActivityTextContainer:{
    paddingHorizontal: w*0.02,
    paddingVertical: h*0.012,
    // top:0,
    // width:w,
    // height:h*0.065,
    // position:'absolute',
    // backgroundColor: "green",
  },
  recentActivityText: {

    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(10),
    color: Colors.fifthTextColor,
    // textAlign: 'center',
  },

});

class ActivityFeedRender extends React.Component {
  constructor(props) {
    super(props);
    let data = [];
    if(!!props.feedData){
      data = props.feedData.toJS();
    }
    // console.log("Data within getFeedDataSource is :"+data);
    let ds = null;
    if(this.props.type=="feed"){
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)}); // || r1["event_id"] !== r2["event_id"]
    }else{
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>  (r1 !== r2) || (r1['bill_id'] !== r2['bill_id'])});
    }
    // ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }




  renderRecentActivityText(shouldRender, text){


  }

  /*
   *
   *
   *   FILTERS     FILTERS     FILTERS     FILTERS     FILTERS     FILTERS
   *
  */

    getHeaderTextBasedOnFilter(curSelectedFilter, userFirstName){
      switch(curSelectedFilter){
        case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
          return "Welcome back"+(userFirstName==null?"":", "+userFirstName)+"! Here's whats new: ";
        case NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER:
          return "Here's whats new from the people you follow: ";
        case NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER:
          return "Here's whats new from the bills you follow: ";
        case NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER:
          return "Here are some bills you might be interested in: ";
        case NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER:
          return "Here are a few statistics you might be interested in: ";
      }
    }


  /**
   * ### render method
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);


    return(
        <ListView
         enableEmptySections={true}
         style={[styles.itemList, this.props.style]}
         initialListSize={5}
         pageSize={5}
         dataSource={this.state.dataSource}
         onEndReached={()=>{
           if(this.props.onFetchMoreItems){
             if(this.props.type!=="discovery"){ //if we are in discovery mode
               this.props.onFetchMoreItems(this.props.curFilter)
             }
           }
         }}
         onEndReachedThreshold={200}
         renderHeader={()=>{
           if(this.props.curFilter!=null){
             return (
               <View style={styles.recentActivityTextContainer}>
                 <Text style={styles.recentActivityText}>
                   {this.getHeaderTextBasedOnFilter(this.props.curFilter, this.props.curUser.firstName)}
                 </Text>
               </View>);
           }else{
             return <View></View>;
           }
         }}
         refreshControl={
           <RefreshControl
             refreshing={(this.props.beingRefreshed===true)}
             onRefresh={this.props.onRefresh}
             {...Platform.select({
                ios: {
                  color:Colors.mainTextColor
                },
                android: {
                  colors:[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]
                }
              })}
           />
         }
         renderFooter={()=>{
           if(this.props.oldDataBeingFetched===true){
             return <PavSpinner/>
           }else{
             return <View></View>;
           }
         }}
         renderRow={(rowData) =>
           <CardFactory
           type="newsfeed"
           key={rowData.event_id}
           style={styles.cardContainer}
           cardStyle={styles.cardStyle}
           cardHeight={(this.props.type==="discovery")?h*0.25:null}
           itemData={rowData}
           curUser={this.props.curUser}
           onUserClick={this.props.onUserClick}
           onBillClick={this.props.onBillClick}
           onLikeDislikeClick={this.props.onLikeDislikeClick}
           onReplyClick={this.props.onReplyClick}
           onReactionClick={this.props.onReactionClick}
           onCommentClick={this.props.onCommentClick}
           onSocialClick={this.props.onSocialClick}
           />}
         />);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.feedData!=null &&  nextProps.feedData!== this.props.feedData) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.feedData.toJS())
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // alert("activity feed render "+(nextProps.device.orientation !== this.props.device.orientation)
    // ||
    // (nextProps.style !== this.props.style)
    // ||
    // (nextProps.curUser !== this.props.curUser)
    // ||
    // (nextState.dataSource !== this.state.dataSource))
    return(
      (nextProps.beingRefreshed !== this.props.beingRefreshed)
      ||
      (nextProps.style !== this.props.style)
      ||
      (nextProps.curUser !== this.props.curUser)
      ||
      (nextState.dataSource !== this.state.dataSource)
    );
  }

}



ActivityFeedRender.propTypes= {
  beingRefreshed: React.PropTypes.bool.isRequired,
  oldDataBeingFetched: React.PropTypes.bool.isRequired,
  device: React.PropTypes.object.isRequired,
  curUser: React.PropTypes.object.isRequired,
  curFilter:React.PropTypes.string.isRequired,
  onRefresh: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onReplyClick: React.PropTypes.func.isRequired,
  onReactionClick: React.PropTypes.func.isRequired,
  onCommentClick: React.PropTypes.func.isRequired,
  onSocialClick: React.PropTypes.func.isRequired,
  onFetchMoreItems: React.PropTypes.func.isRequired,
};
export default ActivityFeedRender;
