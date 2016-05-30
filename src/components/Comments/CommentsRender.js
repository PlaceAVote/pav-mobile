/* @flow weak */
/**
 * # CommentsRender.js
 *
 * This class is our render class for the comments container
 *
 */
'use strict';



import LinearGradient from 'react-native-linear-gradient';
import {Colors, Other} from '../../config/constants';
const {SORT_FILTERS} = Other;
import React from 'react';
import {StyleSheet, Text, View, ActivityIndicatorIOS} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import PavImage from '../../lib/UI/PavImage'
import SubcommentContainerListCard from '../Cards/BillCards/SubcommentContainerListCard';
import {List} from 'immutable';
import ProgressBar from 'ProgressBarAndroid';










class CommentsRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      curSortFilter: SORT_FILTERS.HIGHEST_RATE,
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
        // paddingBottom:50, //tab bar height //TODO: Uncomment this if we have a tab bar
        // marginVertical: 10,
        // marginHorizontal:15
      },
      spinnerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
      },


      //Subcomment list
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


    onCommentsRefresh(){
      if(!!this.props.onCommentsRefresh){
          this.props.onCommentsRefresh(this.state.curSortFilter)
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
    if(this.props.replies!=null && this.props.billData!=null && this.props.commentLvl!=null){
      return(
        <View style={styles.container}>
          <SubcommentContainerListCard
            header={this.renderHeader.bind(this,this.props.billData, this.props.device.platform, styles)}
            style={styles.commentsPageContainer}
            replies={this.props.replies}
            device={this.props.device}
            commentBeingTampered={this.props.commentBeingTampered}
            commentLvl={this.props.commentLvl+1}
            baseCommentLvl={this.props.commentLvl}
            onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
            onUserClick={this.props.onUserClick}
            onLikeDislikeClick={this.props.onLikeDislikeClick}
            onCommentPost={this.props.onCommentPost}
            refresable={true}
            onCommentsRefresh={this.onCommentsRefresh.bind(this)}
            commentsBeingFetched={this.props.commentsBeingFetched}
            />
        </View>
      );
    }else{
      if(this.props.device.platform=="android"){
          return (
          <View key="bill_render_body" style={styles.spinnerContainer}>
            <ProgressBar styleAttr="Large" color="red" />
          </View>);
      }else if(this.props.device.platform=="ios"){
          return (
            <View key="bill_render_body" style={styles.spinnerContainer}>
              <ActivityIndicatorIOS
                animating={true}
                size="large"
              />
            </View>);
      }else{
        return <View key="bill_render_body" style={styles.spinnerContainer}><Text>Now Loading</Text></View>;
      }
    }


  }




  shouldComponentUpdate(nextProps, nextState) {
    return(
      nextProps.parentVisible==true &&
      ((nextProps.commentBeingTampered !== this.props.commentBeingTampered)
      ||
      (nextProps.commentsBeingFetched !== this.props.commentsBeingFetched)
      ||
      (nextProps.billData !== this.props.billData)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
      ||
      (nextState.curSortFilter !== this.state.curSortFilter)
      ||
      (nextProps.replies !== this.props.replies))
    );
  }

}

CommentsRender.propTypes = {
  replies: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.instanceOf(List),
  ]),
  billData: React.PropTypes.object,
  commentLvl: React.PropTypes.number,
  device: React.PropTypes.object.isRequired,
  commentsBeingFetched: React.PropTypes.bool.isRequired,
  commentBeingTampered: React.PropTypes.bool.isRequired,
  parentVisible: React.PropTypes.bool.isRequired,
  onShowMoreCommentsClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired,
  onCommentsRefresh: React.PropTypes.func.isRequired,
}
export default CommentsRender;
