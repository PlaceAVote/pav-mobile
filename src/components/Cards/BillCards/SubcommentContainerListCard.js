    /* @flow weak */
    /**
     * # SubcommentContainerListCard.js
     *
     * This class is basically a list that holds subcomments
     *
     */
    'use strict';


    import {Colors} from '../../../config/constants';
    import React from 'react';
    import {StyleSheet, Text, View, ListView, RefreshControl} from 'react-native';
    import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
    import Dimensions from 'Dimensions';
    const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
    import BillCommentCard from './BillCommentCard';
    import moment from 'moment';
    import {List} from 'immutable';
    import _ from 'underscore';









    class SubcommentContainerListCard extends React.Component {
      constructor(props) {
        super(props);
        let replies = [];
        if(!!this.props.replies){
          if(this.props.replies instanceof List){
            replies = this.props.replies.toJS();
          }else{
            replies = this.props.replies;
          }
        }
        let ds = new ListView.DataSource({rowHasChanged:this.shouldListRowUpdate.bind(this)});
        // console.log("Subcomment elem started with replies: "+replies);
        this.state={
          repliesSource:ds.cloneWithRows(replies),
        }
      }





      shouldListRowUpdate(prevRow, nextRow){
        if(!(this.props.replies instanceof List)){
          if(prevRow!=null && nextRow!=null){
              return ((prevRow !== nextRow) || (prevRow.comment_id !== nextRow.comment_id));
          }
        }
        return (prevRow !== nextRow);
      }


      /**
       * ## Styles for PORTRAIT
       */
      getPortraitStyles(self){
        return StyleSheet.create({

          /* List Content */
          commentsList:{
            flex:1,
            // backgroundColor: '#E8E7EE',
          },
          commentCard:{
            // marginTop: h*0.017
          }



        });
      }


      render(){
        let isPortrait = (this.props.device.orientation!="LANDSCAPE");
        let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
        return (
          <ListView
           enableEmptySections={true}
           style={[styles.commentsList, this.props.style]}
           dataSource={this.state.repliesSource}
           renderHeader={this.props.header}
           renderRow={(rowData) =>(
               <BillCommentCard
                 key={rowData.comment_id}
                 style={styles.commentCard}
                 device={this.props.device}
                 commentData={{
                   commentBeingTampered: this.props.commentBeingTampered,
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
                 onCommentPost={this.props.onCommentPost}
                 />)
           }
           refreshControl={this.getRefreshControllsIfNeeded.bind(this)}
           />);
      }

      getRefreshControllsIfNeeded(){
        if(this.props.refreshable==true){
          return (<RefreshControl
            refreshing={this.props.commentsBeingFetched}
            onRefresh={this.props.onCommentsRefresh}
            tintColor={Colors.primaryColor}
            title="Loading..."
            titleColor={Colors.primaryColor}
            colors={[Colors.primaryColor, '#00ff00', Colors.accentColor]}
          />);
        }else{
          return <View></View>;
        }
      }

      componentWillReceiveProps (nextProps) {
        if (nextProps.replies!=null) {
          let previousRepliesData = this.props.replies;
          let nextRepliesData = nextProps.replies;
          if(previousRepliesData==null || (nextRepliesData!==previousRepliesData)){
            // console.log("Comment lvl: "+this.props.commentLvl+" WE GOT IN YAY");
            // if(this.props.commentLvl==2){
            //   console.log("@@ previous replies data: "+JSON.stringify(previousRepliesData)+"@@");
            //   console.log("@@ nextRepliesData: "+JSON.stringify(nextRepliesData)+"@@");
            //   console.log("@@ nextRepliesData vs previous: "+(nextRepliesData===previousRepliesData)+"@@");
            // }
            if(nextRepliesData instanceof List){
              console.log("New datasource in our subcomment container list: "+nextProps.replies+" with length: "+nextProps.replies.size+" when previous had length: "+this.props.replies.size);
              this.setState({
                repliesSource: this.state.repliesSource.cloneWithRows(nextRepliesData.toJS())
              })
            }else{
              console.log("New datasource in our subcomment container list: "+nextProps.replies+" with length: "+nextProps.replies.length+" when previous had length: "+this.props.replies.length);
              this.setState({
                repliesSource: this.state.repliesSource.cloneWithRows(nextRepliesData)
              })
            }
          }
        }
      }

      shouldComponentUpdate(nextProps, nextState) {
        return(
          (nextProps.device.orientation !== this.props.device.orientation)
          ||
          (nextState.repliesSource !== this.state.repliesSource)
        );
      }

    }
    SubcommentContainerListCard.propTypes= {
      style: View.propTypes.style,
      header:React.PropTypes.func,
      replies: React.PropTypes.oneOfType([
        React.PropTypes.array.isRequired,
        React.PropTypes.instanceOf(List).isRequired
      ]),
      refreshable: React.PropTypes.bool,
      commentsBeingFetched: React.PropTypes.bool,
      commentBeingTampered: React.PropTypes.bool.isRequired,

      onCommentsRefresh: React.PropTypes.func,
      onShowMoreCommentsClick: React.PropTypes.func.isRequired,
      onUserClick: React.PropTypes.func.isRequired,
      onLikeDislikeClick: React.PropTypes.func.isRequired,
      onCommentPost: React.PropTypes.func.isRequired,
      device: React.PropTypes.object.isRequired,
      commentLvl: React.PropTypes.number.isRequired,
    };


    export default SubcommentContainerListCard;
