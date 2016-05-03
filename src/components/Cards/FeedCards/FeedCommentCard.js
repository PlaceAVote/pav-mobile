/* @flow weak */
/**
 * # FeedCommentCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';




/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'

/**
* Icons library
*/
// var Icon = require('react-native-vector-icons/FontAwesome');


import {Colors, ScheneKeys} from '../../../config/constants';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'





class FeedCommentCard extends Component {
  constructor(props) {
    super(props);
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){


    return StyleSheet.create({

      cardContainer:{
        flex: 1,
        alignItems: 'stretch',
        // backgroundColor: 'blue',
        paddingHorizontal: 7,
        paddingVertical: 7,
        marginTop: self.props.device.platform === 'android' ? 56 : 0,
      },

      card:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        borderColor: '#ffffff',
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 2,
        },
      },
      cardTitleContainer:{
        flex: 1,
        flexDirection:'row',
        paddingHorizontal: w*0.02,
        paddingVertical: w*0.02,
        justifyContent:'space-between',
        alignItems:'center'
      },
      cardTitleTextAndIconContainer:{
        flexDirection:'row',
        alignItems:'center'
      },
      cardTitleText:{
        // backgroundColor: 'red',
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      cardDateText:{
        // backgroundColor: 'red',
        paddingHorizontal: 5,
        // color: Colors.thirdTextColor,
        color: 'rgba(0, 0, 0, 0.60)',
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      cardContentContainer:{
        // backgroundColor:'red',
        paddingHorizontal: w*0.02,
        paddingBottom: h*0.012,
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
        flexDirection:'column'
      },
      cardContentHeader:{
        flex:1,
        paddingVertical:h*0.01,
        flexDirection:'row',
        // backgroundColor:'red',
        alignItems:'center'
      },


      commentDescriptionContainer:{
        flexDirection:'column',
        // backgroundColor:'red',
        padding: 5
      },



      userImage:{
        width:w*0.09,
        height:w*0.09,
        // marginHorizontal: 10,
      },
      commentLocationContainer:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
      },
      commentNameText:{
        // backgroundColor:'blue',
        color:"#e64a33",
        paddingHorizontal: 5,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      commentInText:{
        color: Colors.thirdTextColor,
        paddingHorizontal: 5,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      commentLocationText:{
        // backgroundColor:'yellow',
        color: Colors.primaryColor,
        paddingHorizontal: 1,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        width: w*0.7,
      },
      cardContentBody:{
        // backgroundColor:'green'
        // marginTop: h*0.01
      },
      cardContentText:{
        padding:2,
        // backgroundColor:'green',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
        color: 'rgba(0, 0, 0, 0.54)',
      },


      footerContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor: '#EDECF1',
        borderStyle: 'solid',
        borderColor: 'rgba(216, 214, 226, 0.5)',
        borderTopColor: 'rgba(216, 214, 226, 0.7)',
        borderLeftColor: 'rgba(216, 214, 226, 0.5)',
        borderRightColor: 'rgba(216, 214, 226, 0.5)',
        borderBottomColor: 'rgba(216, 214, 226, 1)',
        borderWidth: 1,
      },
      likeDislikeButtonContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:w*0.015,
        paddingVertical: h*0.009,
        // backgroundColor:'red'
      },
      replyButtonContainer:{
        flex:1,
        // backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: h*0.009,
        borderStyle: 'solid',
        borderLeftColor: '#D8D6E2',
        borderLeftWidth: 1,
      },
      likeDislikeIcon:{
        color: Colors.fourthTextColor,
        paddingHorizontal:w*0.04,
      },
      likeCountText:{
        color: Colors.accentColor,
        paddingHorizontal:w*0.04,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      replyButtonText:{
        flex:1,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
        // backgroundColor:'brown'
      },


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
      },


    });
  }

  onLikeClick(e){
    alert("Like clicked");
  }

  onDislikeClick(e){
    alert("Dislike clicked");
  }

  onReplyClick(e){
    alert("Reply clicked");
  }

  onBillClick(e){
    alert("Bill clicked");
  }

  onUserClick(e){
    alert("User clicked");
  }

  renderHeader(styles){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <View style={styles.cardTitleTextAndIconContainer}>
        <Text style={styles.cardTitleText}>NEW COMMENT</Text>
      </View>
      <Text style={styles.cardDateText}>{this.props.timeString}</Text>
    </View>);
  }

  renderBody(styles){
    return (<View style={styles.cardContentContainer}>

      <View style={styles.cardContentHeader}>
        <TouchableOpacity onPress={this.onUserClick.bind(this)}>
          <PavImage
            platform={this.props.device.platform}
            defaultSource={require('../../../../assets/defaultUserPhoto.png')}
            style={styles.userImage}
            source={{uri: this.props.userPhotoUrl}}
            resizeMode='cover'
          />
        </TouchableOpacity>
        <View style={styles.commentDescriptionContainer}>
          <TouchableOpacity onPress={this.onUserClick.bind(this)}>
            <Text style={styles.commentNameText}>{this.props.userFullNameText}</Text>
          </TouchableOpacity>
          <View style={styles.commentLocationContainer}>
            <Text style={styles.commentInText}>in</Text>
            <TouchableOpacity onPress={this.onBillClick.bind(this)}>
              <Text style={styles.commentLocationText}>{this.props.commentParentTitle}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <View style={styles.cardContentBody}>
        <Text style={styles.cardContentText}>
        {this.props.commentText}
        </Text>
      </View>
    </View>);
  }

  renderFooter(styles){
    return (
      <View style={styles.footerContainer}>
        <View style={styles.likeDislikeButtonContainer}>
          <TouchableOpacity onPress={this.onLikeClick.bind(this)}>
            <PavIcon name="thumbs-up" size={15} style={styles.likeDislikeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDislikeClick.bind(this)}>
            <PavIcon name="thumbs-down" size={15} style={styles.likeDislikeIcon}/>
          </TouchableOpacity>
          <Text style={styles.likeCountText}>{this.props.likeCount}</Text>
        </View>
        <TouchableOpacity onPress={this.onReplyClick.bind(this)} style={styles.replyButtonContainer}>
          <Text style={styles.replyButtonText}>REPLY</Text>
        </TouchableOpacity>
      </View>);
  }


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={styles.card}>
          {this.renderHeader(styles)}
          {this.renderBody(styles)}
          {this.renderFooter(styles)}
        </View>
      </View>
    );
  }
}

FeedCommentCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  timeString: React.PropTypes.string.isRequired,
  commentParentTitle: React.PropTypes.string.isRequired,
  userFullNameText: React.PropTypes.string.isRequired,
  commentText: React.PropTypes.string.isRequired,
  userPhotoUrl: React.PropTypes.string.isRequired,
  likeCount: React.PropTypes.number.isRequired,
};

//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default FeedCommentCard;
