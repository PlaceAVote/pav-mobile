/* @flow weak */
/**
 * # CommentsTabRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SORT_FILTERS} = Other;
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ListView, RefreshControl} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


import BillCommentCard from '../Cards/BillCards/BillCommentCard';
import CommentReplyCard from '../Cards/BillCards/CommentReplyCard';
// import _ from 'underscore';
import moment from 'moment';
import {List} from 'immutable';
/**
* Image library
*/

// import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;

const styles = StyleSheet.create({


  commentsPageContainer:{
    flex:1,
    backgroundColor: '#E8E7EE',
  },
  headerContainer:{
    paddingBottom: h*0.020,
  },
  sortContainer:{
    backgroundColor: 'white',
    paddingHorizontal: w*0.027,
    paddingVertical: h*0.010,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    // borderWidth:1,
    // borderColor: 'rgba(0, 0, 0, 0.11)',
    // borderBottomWidth:1,

    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    // backgroundColor:'pink'
  },
  sortByTitleTextContainer:{
    paddingHorizontal: w*0.027,
    paddingVertical: h*0.011,
  },
  sortByTitleText:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,9),
  },
  sortBtnsContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    paddingHorizontal: w*0.027,
    // backgroundColor:'purple'
  },
  sortBtn:{
    justifyContent:'center',
    // alignItems:'center',
    // backgroundColor:'pink',
    paddingHorizontal: w*0.027,
    paddingVertical: h*0.011,
  },
  sortBtnText:{
    // backgroundColor:'green',
    color: Colors.primaryColor,
    fontSize: getCorrectFontSizeForScreen(w,h,8),
    // backgroundColor:Colors.transparentColor
  },
  sortBtnActiveText:{
    fontFamily: 'Whitney-Bold',
  },
  sortBtnInactiveText:{
    fontFamily: 'Whitney',
  },
  sortBtnActive:{
    borderBottomColor:Colors.negativeAccentColor,
    borderBottomWidth:2,

  },
  sortBtnInactive:{
    borderBottomWidth:0,
  },


  /* ROWS */
  commentCard:{
    paddingVertical: h*0.011,
  },


});



class CommentsTabRender extends React.Component {
  constructor(props) {
    super(props);
    let commentData;
    if(this.props.commentData!=null){
      if(this.props.commentData instanceof List){
        commentData = this.props.commentData.toJS();
      }else{
        commentData = this.props.commentData;
      }
    }else{
      commentData = [];
    }
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); // || r1["event_id"] !== r2["event_id"]
    this.state={
      curSortFilter: SORT_FILTERS.HIGHEST_RATE,
      commentDataSource:ds.cloneWithRows(commentData),
      lastRowY:0,
      nowScrollingToBottom:false,
      listHeight:0
    }
  }




  onTabFocus(){

  }







  renderSortHeader(){
    return (
      <View style={styles.sortContainer}>
        <View style={styles.sortByTitleTextContainer}>
          <Text style={styles.sortByTitleText}>Sort by: </Text>
        </View>
        <View style={styles.sortBtnsContainer}>
          <TouchableOpacity style={[styles.sortBtn, (this.state.curSortFilter==SORT_FILTERS.HIGHEST_RATE?styles.sortBtnActive:styles.sortBtnInactive)]} onPress={()=>{this.setState({curSortFilter:SORT_FILTERS.HIGHEST_RATE});this.props.onCommentsRefresh(SORT_FILTERS.HIGHEST_RATE);}}>
            <Text style={[styles.sortBtnText, styles.sortBtnActiveText]}>Highest Rated </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sortBtn, (this.state.curSortFilter==SORT_FILTERS.NEWEST?styles.sortBtnActive:styles.sortBtnInactive)]} onPress={()=>{this.setState({curSortFilter:SORT_FILTERS.NEWEST}); ;this.props.onCommentsRefresh(SORT_FILTERS.NEWEST);} }>
            <Text style={[styles.sortBtnText, styles.sortBtnInactiveText]}>Newest </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }





  scrollToBottom(bottomY){
    if(!!this.state.lastRowY || bottomY){
      if(this.state.nowScrollingToBottom==false){
        this.setState({
            nowScrollingToBottom: true
        });
      }
      let scrollDistance = bottomY || this.state.lastRowY;
      let scrollResponder = this.refs.commentPageRenderList.getScrollResponder();
      // console.log("Now scrolling to: "+scrollDistance);
      scrollResponder.scrollResponderScrollTo({x: 0, y: scrollDistance, animated: true});
    }
  }

  async onCommentPostToBill(comment){
    if(!!comment && comment.length>0){
      if(!!this.props.billId && !!this.props.onCommentPost){
          let postSuccessful = await this.props.onCommentPost(comment, {billId: this.props.billId, newCommentLvl: 0});
          if(postSuccessful == true){
            setTimeout(()=>{
                this.scrollToBottom();
            },500)

          }
          return postSuccessful;
      }
    }
  }

  async onCommentPostToComment(){
    if(!!this.props.onCommentPost){
        return await this.props.onCommentPost(...arguments);
    }
  }


  renderHeader(){
    return (
      <View style={styles.headerContainer}>
        <CommentReplyCard
          id={this.props.billId}
          orientation={this.props.device.orientation}
          onPostBtnPress={this.onCommentPostToBill.bind(this)}
          postBtnEnabled={(this.props.commentsBeingFetched==false && this.props.commentBeingAltered==false)}
          postBtnLoading={(this.props.commentBeingAltered==true)}
        />
        {this.renderSortHeader()}
      </View>
    );
  }



  // Dimensions.get(this.refs.stat_scrollview.getInnerViewNode(), (...data)=>{console.log(data)});
  // this.refs.stat_scrollview.scrollTo({y:, animated:true});

  /**
   * ### render method
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);


    // console.log("CommentsTabRender rebder .commentBeingAltered: "+this.props.commentBeingAltered);
    return(
      <ListView
         ref="commentPageRenderList"
         enableEmptySections={true}
         style={styles.commentsPageContainer}
         initialListSize={2}
         dataSource={this.state.commentDataSource}
         onLayout={(event) => {
              var {height} = event.nativeEvent.layout;
              this.setState({
                  listHeight : height
              });
          }}
         renderHeader={()=>this.renderHeader(styles)}
         onMomentumScrollEnd={(e)=>{
           if(this.state.nowScrollingToBottom==true){
             setTimeout(()=>{
                //  let isAnimating = this.refs.commentPageRenderList.getScrollResponder().scrollResponderIsAnimating();
                //  console.log("Momentum ended while animating was: "+isAnimating)
                 if(this.refs.commentPageRenderList.getScrollResponder().scrollResponderIsAnimating()==false && this.state.nowScrollingToBottom==true){
                   this.setState({
                       nowScrollingToBottom: false
                   });
                 }
             }, 250);
           }

         }}
         renderRow={(rowData) =>{
           return (
             <BillCommentCard
               onLayout={(event) => {
                    var {height, y} = event.nativeEvent.layout;
                    let offsetY = y-(this.state.listHeight-height); //we could just do offsetY = y, but that would mean that our listview would scroll to the comments 0 y and keep an empty space below it, so we don't.
                    this.setState({
                        lastRowY : offsetY
                    });
                    // console.log("comment: "+rowData.body+"lastRowY: "+this.state.lastRowY+". Now scrolling: "+this.state.nowScrollingToBottom+" WHEN y of it is: "+y);
                    if(this.state.nowScrollingToBottom==true){
                      this.scrollToBottom(offsetY);
                    }
                }}
               style={styles.commentCard}
               key={rowData.comment_id}
               device={this.props.device}
               alwaysBreakCommentsToNewScreen={true}
               commentData={{
                 commentBeingAltered: this.props.commentBeingAltered,
                 commentLvl:0,
                 baseCommentLvl:0,
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
               onUserClick={this.props.onCommentUserClick}
               onLikeDislikeClick={this.props.onCommentLikeDislikeClick}
               onCommentPost={this.onCommentPostToComment.bind(this)}
               />

           )}
         }
         refreshControl={
           <RefreshControl
             refreshing={(this.props.commentsBeingFetched==true)}
             onRefresh={()=>this.props.onCommentsRefresh(this.state.curSortFilter)}
             tintColor={Colors.primaryColor}
             title="Loading..."
             titleColor={Colors.primaryColor}
             colors={[Colors.primaryColor, '#00ff00', Colors.accentColor]}
           />
         }
      />
    );
  }



  componentWillReceiveProps (nextProps) {
    // console.log("ROK1: "+nextProps.commentData);
    if (nextProps.commentData!=null) {
      let previousCommentData = this.props.commentData;
      let nextCommentData = nextProps.commentData;
      if(previousCommentData==null || (previousCommentData!==nextCommentData)){
        this.setState({
          commentDataSource: this.state.commentDataSource.cloneWithRows(nextCommentData.toJS())
        })
      }
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.commentsBeingFetched !== this.props.commentsBeingFetched)
      ||
      (nextProps.commentBeingAltered !== this.props.commentBeingAltered)
      ||
      (nextProps.device !== this.props.device)
      ||
      (nextState.curSortFilter !== this.state.curSortFilter)
      ||
      (nextState.commentDataSource !== this.state.commentDataSource)
    );
  }

}

CommentsTabRender.propTypes = {

  billId: React.PropTypes.string,
  commentData: React.PropTypes.object,
  device: React.PropTypes.object.isRequired,
  commentBeingAltered: React.PropTypes.bool.isRequired,
  commentsBeingFetched: React.PropTypes.bool.isRequired,
  topCommentsBeingFetched: React.PropTypes.bool.isRequired,
  onShowMoreCommentsClick: React.PropTypes.func.isRequired,
  onCommentUserClick: React.PropTypes.func.isRequired,
  onCommentLikeDislikeClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired,
  onCommentsRefresh: React.PropTypes.func.isRequired,

}

export default CommentsTabRender;
