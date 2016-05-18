/* @flow weak */
/**
 * # CommentsPageRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ListView,
  RefreshControl

}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


import BillCommentCard from '../Cards/BillCards/BillCommentCard';
import CommentReplyBox from './CommentReplyBox';

import moment from 'moment';
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



const SORT_FILTERS={
  HIGHEST_RATE:'highest-score',
  NEWEST:'latest',
}









class CommentsPageRender extends Component {
  constructor(props) {
    super(props);
    let commentData = [];
    if(!!this.props.commentData ){
      let commentData = this.props.commentData;
    }
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


      commentsPageContainer:{
        flex:1,
        backgroundColor: '#E8E7EE',
      },
      headerContainer:{

      },
      sortContainer:{
        paddingHorizontal: w*0.027,
        paddingVertical: h*0.010,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        // borderWidth:1,
        borderColor: 'rgba(0, 0, 0, 0.11)',
        borderBottomWidth:1,

        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 2,
        },
        // backgroundColor:'pink'
      },
      sortByTitleText:{
        paddingHorizontal: w*0.027,
        paddingVertical: h*0.011,
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
        // backgroundColor:'red'
      },
      sortBtnText:{
        // backgroundColor:'green',
        paddingHorizontal: w*0.027,
        paddingVertical: h*0.011,
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
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }

  onTabFocus(){

  }




  componentWillReceiveProps (nextProps) {
    // console.log("ROK1: "+nextProps.commentData);
    if (nextProps.commentData!=null) {
      let previousCommentData = this.props.commentData;
      let nextCommentData = nextProps.commentData;
      if(previousCommentData==null || (previousCommentData!==nextCommentData) ){
        this.setState({
          commentDataSource: this.state.commentDataSource.cloneWithRows(nextCommentData.toJS())
        })
      }
    }
  }


  renderSortHeader(styles){
    return (
      <View style={styles.sortContainer}>
        <Text style={styles.sortByTitleText}>Sort by: </Text>
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





  renderHeader(styles){
    return (
      <View style={styles.headerContainer}>
        <CommentReplyBox
          orientation={this.props.device.orientation}
          onPostBtnPress={(comment)=>{alert("Comment: "+comment)}}
        />
        {this.renderSortHeader(styles)}
      </View>
    );
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
      <ListView
         enableEmptySections={true}
         style={styles.commentsPageContainer}
         initialListSize={2}
         dataSource={this.state.commentDataSource}
         renderHeader={()=>this.renderHeader(styles)}

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
               timeString={moment(rowData.timestamp).fromNow()}
               userFullNameText={rowData.author_first_name+" "+rowData.author_last_name}
               commentText={rowData.body}
               userPhotoUrl={rowData.author_img_url}
               likeCount={rowData.score}
               isLiked={rowData.liked}
               isDisliked={rowData.disliked}
               userId={rowData.author}
               commentId={rowData.comment_id}
               billId={rowData.bill_id}
               replies={rowData.replies}
               isTopCommentInFavor={rowData.isTopCommentInFavor}
               isTopCommentAgainst={rowData.isTopCommentAgainst}

               onRepliesClick={this.props.onCommentRepliesClick}
               onUserClick={this.props.onCommentUserClick}
               onLikeDislikeClick={this.props.onCommentLikeDislikeClick}
               onReplyClick={this.props.onCommentReplyClick}

               />

           )}
         }
         refreshControl={
           <RefreshControl
             refreshing={this.props.commentsAreFetching || this.props.topCommentsAreFetching}
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

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.commentData !== this.props.commentData)
      ||
      (nextProps.commentsAreFetching !== this.props.commentsAreFetching)
      ||
      (nextProps.device !== this.props.device)
      ||
      (nextState.curSortFilter !== this.state.curSortFilter)
    );
  }

}


export default CommentsPageRender;
