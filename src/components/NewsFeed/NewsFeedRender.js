/* @flow weak */
/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as globalActions from '../../reducers/global/globalActions';



import LinearGradient from 'react-native-linear-gradient';

/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'

var ProgressBar = require('ProgressBarAndroid');

import moment from 'moment'



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {NEWS_FEED_FILTERS} = Other;
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicatorIOS,
  TouchableOpacity
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

/**
* Icons library
*/

var Icon = require('react-native-vector-icons/FontAwesome');
var LImage = require('react-native-image-progress');
var Progress = require('react-native-progress');


/**
* Cards
*/
import CardFactory from '../Cards/CardFactory';
// import FeedUserIssueCard from '../Cards/FeedCards/FeedUserIssueCard';
// import FeedBillCard from '../Cards/FeedCards/FeedBillCard';
// import FeedCommentCard from '../Cards/FeedCards/FeedCommentCard';
// import FeedVoteCard from '../Cards/FeedCards/FeedVoteCard';


/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
  // globalActions
];

function mapStateToProps(state) {
  return {
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











class NewsFeedRender extends Component {
  constructor(props) {
    super(props);

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),

  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        paddingTop:64, //nav bar height
        paddingBottom:50, //tab bar height
        // marginVertical: 10,
        // marginHorizontal:15
      },


      bodyView:{
        flex:1,
        backgroundColor: '#E8E7EE',
      },
      bodyLoadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },

      cardsContainer:{
        // backgroundColor:'red',
      },





      recentActivityText: {
        // top:0,
        // width:w,
        // height:h*0.065,
        // position:'absolute',
        // backgroundColor: "rgba(0,0,0,0.06)",
        paddingHorizontal: w*0.009,
        paddingVertical: h*0.02,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,10),
        color: Colors.fifthTextColor,
        // textAlign: 'center',
      },
      scrollView:{
        flex:1
      },
      scrollerViewHeader:{
        // backgroundColor: "rgba(0,0,0,0.06)",
        flex:1,
        flexDirection:'column',
        padding:10,
      },
      filtersViewContainer:{
        backgroundColor: "white",
        flexDirection:'row',
      },
      expandedFilterContainer:{
        flex:3,
        // backgroundColor:'yellow',
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
        // alignItems:'center',
        justifyContent:'center'
      },
      collapsedFilterContainer:{
        flex:1,
        justifyContent:'center',
        // paddingHorizontal:w*0.037,
        // paddingVertical:h*0.015,
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        borderLeftWidth:1,
      },
      filterContent:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:w*0.015,
        paddingTop:h*0.013,
        paddingBottom:h*0.006,
        // backgroundColor:'blue'
    },
    inactiveFilterIcon:{
      paddingHorizontal:3,
      color:Colors.primaryColor
    },
    activeFilterIcon:{
      paddingHorizontal:3,
      color:Colors.negativeAccentColor
    },
      filterText:{
        paddingHorizontal: w*0.009,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,5),
        color: Colors.thirdTextColor,

      },
      filterIndicatorIconContainer:{
        // backgroundColor:'red',
        // alignSelf:'center',
        // justifyContent:'flex-end',
      },
      activeFilterIndicatorIcon:{
        // backgroundColor:'yellow',
        alignSelf:'center',
        color:'#E8E7EE'
      },
      inactiveFilterIndicatorIcon:{
        // backgroundColor:'yellow',
        alignSelf:'center',
        color:Colors.transparentColor
      }

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal:10
      },

      titleText: {
        // backgroundColor: 'black',
        fontSize: getCorrectFontSizeForScreen(w,h,27),
        color: Colors.mainTextColor,
        textAlign: 'center',
      }

    });
  }









/*
 HEADER - FILTERS
*/

  renderNewsFeedHeader(curSelectedFilter, styles, userFirstName){
    return (
      <View style={styles.scrollerViewHeader}>
        {this.renderFilterView(curSelectedFilter, styles)}

      <Text style={styles.recentActivityText}>{this.getHeaderTextBasedOnFilter(curSelectedFilter, userFirstName)}</Text>
    </View>);
  }

  getHeaderTextBasedOnFilter(curSelectedFilter, userFirstName){
    switch(curSelectedFilter){
      case NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER:
        return "Welcome back, "+userFirstName+"! Here's whats new: ";
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

  renderFilterView(nameOfActiveFilter, styles){
    return (
      <View style={styles.filtersViewContainer}>
        {this.renderFilterButton((NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER==nameOfActiveFilter), "globe", NEWS_FEED_FILTERS.ALL_ACTIVITY_FILTER, styles)}
        {this.renderFilterButton((NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER==nameOfActiveFilter), "add-lined", NEWS_FEED_FILTERS.FOLLOWING_ACTIVITY_FILTER, styles)}
        {this.renderFilterButton((NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER==nameOfActiveFilter), "bills", NEWS_FEED_FILTERS.BILL_ACTIVITY_FILTER, styles)}
        {this.renderFilterButton((NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER==nameOfActiveFilter), "binoculars", NEWS_FEED_FILTERS.DISCOVER_ACTIVITY_FILTER, styles)}
        {this.renderFilterButton((NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER==nameOfActiveFilter), "trending-graph", NEWS_FEED_FILTERS.STATISTICS_ACTIVITY_FILTER, styles)}
      </View>
    );
  }

  renderFilterButton(isActive, iconName, filterName, styles){
    if(isActive){
      return(
        <View style={styles.expandedFilterContainer}>
          <TouchableOpacity style={styles.filterContent} onPress={()=>{this.props.onFilterBtnClick(filterName)}}>
            <PavIcon name={iconName} size={15} style={styles.activeFilterIcon}/>
            <Text style={styles.filterText}>{filterName}</Text>
          </TouchableOpacity>
          <View style={styles.filterIndicatorIconContainer}>
            <PavIcon name="activeIndicatorShrinked" size={7} style={styles.activeFilterIndicatorIcon}/>
          </View>
        </View>);
    }else{
      return(
        <View style={styles.collapsedFilterContainer}>
          <TouchableOpacity style={styles.filterContent} onPress={()=>{this.props.onFilterBtnClick(filterName)}}>
            <PavIcon name={iconName} size={15} style={styles.inactiveFilterIcon}/>
          </TouchableOpacity>
          <View style={styles.filterIndicatorIconContainer}>
            <PavIcon name="activeIndicatorShrinked" size={7} style={styles.inactiveFilterIndicatorIcon}/>
          </View>
        </View>);
    }
  }




  parseFeedDataIntoComponents(items, styles, user){
    if(!!items){
      var cards = [];
      for(var ii=0, ll=items.length;ii<ll;ii++){ //for each timeline item
        let curFeedItem = items[ii];
        // console.log(ii+" @ "+JSON.stringify(curFeedItem))
        cards.push(<CardFactory
          type="newsfeed"
          key={curFeedItem.event_id}
          style={styles.card}
          itemData={curFeedItem}
          device={this.props.device}
          curUser={user}
          />);
      }
      return cards;
    }
  }



  /*
  BODY - FEED
  */
  renderNewsFeedBody(dataReady, styles){
    if(dataReady==true){
      return(<View style={styles.cardsContainer}>
        {this.parseFeedDataIntoComponents(this.props.newsfeed.newsFeedData.items, styles, this.props.auth.user)}
        </View>);
    }else{
      if(this.props.device.platform=="android"){
          return (
          <View style={styles.bodyLoadingContainer}>
            <ProgressBar styleAttr="Large" color="red" />
          </View>);
      }else if(this.props.device.platform=="ios"){
          return (
            <View style={styles.bodyLoadingContainer}>
              <ActivityIndicatorIOS
                animating={true}
                size="large"
              />
            </View>);
      }else{
        return (<View style={styles.bodyLoadingContainer}><Text>Now Loading</Text></View>);
      }

    }
  }

/*
  <FeedVoteCard
  device={this.props.device}
  timeString="10 minutes ago"
  userFullNameText="Ioannis Kokkinidis"
  voteParentTitle="A bill title"
  userPhotoUrl="https://cdn.placeavote.com/users/3f52df6d-de6f-4564-abf3-be64f9f7fbbe/profile/img/p200xp200x/6458ceb0-fe46-4cd9-97cc-e6994ba66f71.jpeg"
  />
  <FeedCommentCard
  device={this.props.device}
  timeString="10 minutes ago"
  userFullNameText="Ioannis Kokkinidis"
  commentParentTitle="A bill title"
  commentText="A comment"
  likeCount={127}
  userPhotoUrl="https://cdn.placeavote.com/users/3f52df6d-de6f-4564-abf3-be64f9f7fbbe/profile/img/p200xp200x/6458ceb0-fe46-4cd9-97cc-e6994ba66f71.jpeg"
  isLiked={false}
  isDisliked={true}
  />
  <FeedBillCard
  subjectTitle="Crime"
  billTitle="Should an Attack on a Police Officer be Considered a Hate Crime?"
  billImgUrl="https://cdn.placeavote.com/bills/114/images/hr4760-114/main.jpg"
  commentCnt={20}
  favorPercentage={62}
  device={this.props.device}
  />
  <FeedUserIssueCard
  device={this.props.device}
  timeString="20 minutes ago"
  userFullNameText="Ioannis Kokkinidis"
  issueText="I can't share bills without a true comment"
  userPhotoUrl="https://cdn.placeavote.com/users/3f52df6d-de6f-4564-abf3-be64f9f7fbbe/profile/img/p200xp200x/6458ceb0-fe46-4cd9-97cc-e6994ba66f71.jpeg"
  relatedArticleUrl="http://www.bbc.co.uk/news/technology-36168863"
  relatedArticleTitle="Craig Wright revealed as Bitcoin creator Satoshi Nakamoto - BBC News"
  relatedArticlePhotoUrl="https://cdn.placeavote.com/users/issues/images/c3b436bf-8fb5-4c02-b76d-f3b2859dd65f/main.jpg"
  relatedBillTitle="E-Free Act"
  userReaction="positive"
  happyCnt={23}
  neutralCnt={1}
  sadCnt={2}
  />*/








  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
        <View style={styles.container}>
          <View style={styles.bodyView}>
            <ScrollView style={styles.scrollView}>
              {this.renderNewsFeedHeader(this.props.newsfeed.newsFeedData.curSelectedFilter, styles, this.props.auth.user.firstName)}
              {this.renderNewsFeedBody((!this.props.newsfeed.isFetching.newsFeedData && this.props.newsfeed.newsFeedData.items!=null), styles)}
            </ScrollView>
          </View>
        </View>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedRender);
