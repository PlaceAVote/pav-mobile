/* @flow weak */
/**
 * # CommentsRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import LinearGradient from 'react-native-linear-gradient';


/*A react native button*/
// import Button from 'sp-react-native-iconbutton'



// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SORT_FILTERS} = Other;
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ListView, RefreshControl} from 'react-native';
// import ProgressBar from 'ProgressBarAndroid';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import BillCommentCard from '../Cards/BillCards/BillCommentCard';
import moment from 'moment';
// import _ from 'underscore';

/**
* Icons library
*/

import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;













class CommentsRender extends React.Component {
  constructor(props) {
    super(props);
    let commentData = this.props.commentData.toJS() || [];
    // console.log("@@: "+JSON.stringify(commentData));
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); // || r1["event_id"] !== r2["event_id"]
    this.state={
      curSortFilter: SORT_FILTERS.HIGHEST_RATE,
      commentDataSource:ds.cloneWithRows(commentData),
    }
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        backgroundColor: 'white',
        flex:1,
        flexDirection: 'column',
        paddingTop:64, //nav bar height
        paddingBottom:50, //tab bar height
        // marginVertical: 10,
        // marginHorizontal:15
      },
      commentsPageContainer:{
        flex:1,
        backgroundColor: '#E8E7EE',
      },



      //HEADER
      billImage:{
        // flex:1,
        // height: h*0.26
      },
      headerContainer:{
        flex:1,
        flexDirection: 'column',
      },
      headerTitleContainer:{
        // backgroundColor:'purple'
        flex:1,
        justifyContent:'center',
        alignItems:'center',  //horizontally
      },
      headerTitle:{
        backgroundColor: Colors.transparentColor,
        paddingVertical: h*0.020,
        paddingHorizontal: w*0.012,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,12),
      },

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }

  renderHeader(billData, platform, styles){
    // console.log("bill: "+JSON.stringify(billData))
    if(!!billData){
      return (
        <PavImage
          key="bill_header"
          platform={platform}
          style={styles.billImage}
          source={{uri: billData.featured_img_link}}
          resizeMode='cover'
        >
          <LinearGradient
              colors={['black', 'rgba(0, 0, 0, 0.41)', 'black']}
              start={[-0.3, 0.0]} end={[1.3, 0.0]}
              style={styles.headerContainer}
              >
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{billData.featured_bill_title}</Text>
              </View>
          </LinearGradient>
        </PavImage>);
    }else{
      return <Text key="bill_header"></Text>
    }
  }





    onCommentPostToComment(){
      if(!!this.props.onCommentPost){
          let postSuccessful = this.props.onCommentPost(...arguments);
          if(postSuccessful==true){
              // this.onCommentPostSuccess()
              //TODO scroll listview down
          }
          return postSuccessful;
      }
    }

  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View style={styles.container}>
        <ListView
           enableEmptySections={true}
           style={styles.commentsPageContainer}
           initialListSize={3}
           dataSource={this.state.commentDataSource}
           renderHeader={()=>this.renderHeader(this.props.billData, this.props.device.platform, styles)}
           removeClippedSubviews={true}
           renderRow={(rowData) =>{
            //  console.log("Comment: "+JSON.stringify(rowData))
            //  console.log("Cur comment id: "+rowData.comment_id+" when top comment id is: "+this.props.topCommentInFavorId);
            //  if(this.props.topCommentInFavorId==rowData["comment_id"]){
            //     console.log("top in favor")
            //  }

             return (
               <BillCommentCard
                 style={styles.commentCard}
                 key={rowData.comment_id}
                 device={this.props.device}
                 commentData={{
                   commentBeingPosted: this.props.commentBeingPosted,
                   commentLvl:this.props.commentLvl,
                   timeString:moment(rowData.timestamp).fromNow(),
                   userFullNameText:rowData.author_first_name+" "+rowData.author_last_name,
                   commentText:rowData.body,
                   userPhotoUrl:rowData.author_img_url,
                   likeCount:rowData.score,
                   isLiked:rowData.liked,
                   isDisliked:rowData.disliked,
                   userId:rowData.author,
                   commentId:rowData.comment_id,
                   billId:rowData.bill_id,
                   replies:rowData.replies,
                   isTopCommentInFavor:rowData.isTopCommentInFavor,
                   isTopCommentAgainst:rowData.isTopCommentAgainst,
                 }}
                 onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
                 onUserClick={this.props.onUserClick}
                 onLikeDislikeClick={this.props.onLikeDislikeClick}
                 onCommentPost={this.onCommentPostToComment.bind(this)}
                 />

             )}
           }
           refreshControl={
             <RefreshControl
               refreshing={this.props.commentsBeingFetched}
               onRefresh={()=>this.props.onCommentsRefresh(this.state.curSortFilter)}
               tintColor={Colors.primaryColor}
               title="Loading..."
               titleColor={Colors.primaryColor}
               colors={[Colors.primaryColor, '#00ff00', Colors.accentColor]}
             />
           }
        />
      </View>
    );


  }



  componentWillReceiveProps (nextProps) {
    if (nextProps.commentData!=null) {
      let previousCommentData = this.props.commentData;
      let nextCommentData = nextProps.commentData;
      // console.log("ROK1 CommentsRender BEFORE @@@@@@ EQUAL: "+(previousCommentData===nextCommentData));
      if(previousCommentData==null || (previousCommentData!==nextCommentData) ){
        // console.log("ROK1 AFTER @@@@@@ : "+nextProps.commentData);
        this.setState({
          commentDataSource: this.state.commentDataSource.cloneWithRows(nextCommentData.toJS())
        })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.commentBeingPosted !== this.props.commentBeingPosted)
      ||
      (nextProps.commentsBeingFetched !== this.props.commentsBeingFetched)
      ||
      (nextProps.billData !== this.props.billData)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
      ||
      (nextState.curSortFilter !== this.state.curSortFilter)
      ||
      (nextState.commentDataSource !== this.state.commentDataSource)

    );
  }

}

CommentsRender.propTypes = {
  commentData: React.PropTypes.object.isRequired,
  billData: React.PropTypes.object.isRequired,
  device: React.PropTypes.object.isRequired,
  commentsBeingFetched: React.PropTypes.bool.isRequired,
  commentBeingPosted: React.PropTypes.bool.isRequired,

  onShowMoreCommentsClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired,
  onCommentsRefresh: React.PropTypes.func.isRequired,
}
export default CommentsRender;
