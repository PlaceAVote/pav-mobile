/* @flow weak */
/**
 * # AccordionBillCommentCardContainer.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';






/**
* Icons library
*/
// var Icon = require('react-native-vector-icons/FontAwesome');


import {Colors, ScheneKeys, Other} from '../../../config/constants';
// const {REACTIONS, SOCIAL_TYPES} = Other;

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

// import PavImage from '../../../lib/UI/PavImage'
import Accordion from 'react-native-collapsible/Accordion'
import BillCommentCard from './BillCommentCard';
import moment from 'moment';



class AccordionBillCommentCardContainer extends Component {
  constructor(props) {
    super(props);
    let replies = this.props.replies || [];
    // console.log("@@: "+JSON.stringify(replies));
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); // || r1["event_id"] !== r2["event_id"]
    this.state={
      repliesSource:ds.cloneWithRows(replies),
      isCollapsed:true
    }
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({

      cardContainer:{
        flex: 1,
        alignItems: 'stretch',
        padding:7,
        // backgroundColor: 'blue',

        marginTop: self.props.device.platform === 'android' ? 56 : 0,
      },


      /* Accordion Header */
      repliesBoxContainer:{
        paddingTop: h*0.041,
        paddingBottom: h*0.012,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // borderWidth: 1,
        // borderColor: 'rgba(0, 0, 0, 0.06)',
        // borderTopWidth:0,
        // borderTopColor: 'rgba(0, 0, 0, 0.06)',
        // borderTopWidth: 1,
      },
      repliesBoxTextContainer:{
        flex:1,
        alignItems:'center',
        // backgroundColor:'red',
      },
      repliesBoxText:{
        flex:1,
        fontSize: getCorrectFontSizeForScreen(w,h,9),
        fontFamily: 'Whitney-Book',
        color: Colors.negativeAccentColor,
      },
      repliesBoxIcon:{
          color: Colors.negativeAccentColor,
      },




      /* Accordion Content */
      commentsList:{
        flex:1,
        paddingTop: h*0.025,
        // backgroundColor: '#E8E7EE',
      },
      commentCard:{
        // marginTop: h*0.017
      }



    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({
    });
  }


  onHeaderClick(){
    // alert("Render accordion content");
      this.setState({
        isCollapsed:!this.state.isCollapsed
      })
  }

  renderAccordionHeader(styles){
    return (
      <TouchableOpacity onPress={this.onHeaderClick.bind(this)} style={styles.repliesBoxContainer}>
        <View style={styles.repliesBoxTextContainer}>
          <Text style={styles.repliesBoxText}>{this.props.replies.length>1?this.props.replies.length+" Replies ":"1 Reply"}  {this.state.isCollapsed==true?"(Tap to expand)":"(Tap to collapse)"}</Text>
        </View>
        <PavIcon name={this.state.isCollapsed==true?"arrow-down":"arrow-up"} size={15} style={styles.repliesBoxIcon}/>
      </TouchableOpacity>
    );
  }








  //TODO: THE LIST Footer will be the reply box








  renderAccordionContent(styles){
    return (<ListView
       enableEmptySections={true}
       style={styles.commentsList}
       dataSource={this.state.repliesSource}
       renderRow={(rowData) =>(
           <BillCommentCard
             key={rowData.comment_id}
             style={styles.commentCard}
             commentLvl={this.props.commentLvl}
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
             onRepliesClick={this.props.onRepliesClick}
             onUserClick={this.props.onUserClick}
             onLikeDislikeClick={this.props.onLikeDislikeClick}
             onReplyClick={this.props.onReplyClick}
             />)
       }
       initialListSize={2}
       />);
  }

  // onCollapsedChange(isCollapsed){
  //
  // }




  // onChange={
  //   (index)=>{if(index===false){this.onCollapsedChange(true)}else{this.onCollapsedChange(false)}}
  // }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View style={[styles.cardContainer,this.props.style]}>
        <Accordion
          style={styles.container}
          sections={['Date']}
          renderHeader={this.renderAccordionHeader.bind(this, styles)}
          renderContent={this.renderAccordionContent.bind(this, styles)}
          collapsed={this.state.isCollapsed}
          underlayColor={Colors.transparentColor}

        />
      </View>
    );
  }

  componentWillReceiveProps (nextProps) {
    // console.log("ROK1: "+nextProps.replies);
    if (nextProps.replies!=null) {
      let previousRepliesData = this.props.replies;
      let nextRepliesData = nextProps.replies;
      if(previousRepliesData==null || (previousRepliesData!==nextRepliesData) ){
        this.setState({
          repliesSource: this.state.repliesSource.cloneWithRows(nextRepliesData)
        })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.device.orientation !== this.props.device.orientation)
      ||
      (nextState.repliesSource !== this.state.repliesSource)
      ||
      (nextState.isCollapsed !==this.state.isCollapsed)
    );
  }

}






AccordionBillCommentCardContainer.defaultProps = {commentLvl: 0};
AccordionBillCommentCardContainer.propTypes= {

  replies:React.PropTypes.array.isRequired,

  onRepliesClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onLikeDislikeClick: React.PropTypes.func.isRequired,
  onReplyClick: React.PropTypes.func.isRequired,


  device: React.PropTypes.object.isRequired,
  collapsed: React.PropTypes.bool.isRequired,
  commentLvl: React.PropTypes.number.isRequired,


  // onRepliesClick: React.PropTypes.func.isRequired,

};
export default AccordionBillCommentCardContainer;
