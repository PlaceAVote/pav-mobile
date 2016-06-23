/**
 * # LikeCard.js
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



import {Colors, ScheneKeys} from '../../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';








class LikeCard extends React.Component {
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

      },

      card:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        borderColor: '#ffffff',
        borderWidth: 1,
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
      cardTitleTextContainer:{
        paddingHorizontal: 10,
      },
      cardTitleText:{
        // backgroundColor: 'red',
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      cardDateTextContainer:{
        // paddingHorizontal: w*0.02,
        // backgroundColor:'pink'
      },
      cardDateText:{
        // backgroundColor:'red',
        // color: Colors.thirdTextColor,
        textAlign:'center',
        width: w*0.29,
        color: 'rgba(0, 0, 0, 0.60)',
        fontFamily: 'Whitney',
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


      commentIconContainer:{
          justifyContent:'center',
          alignItems:'center',
          width: w*0.09,
          height: w*0.09,
          paddingHorizontal:w*0.005,
          paddingVertical:4,
          borderRadius: 3,
          borderColor: '#ffffff',
          borderWidth: 1,
      },

      commentIcon:{
        color: Colors.mainTextColor,
      },
      likeIcon:{
        backgroundColor: Colors.accentColor,
      },
      dislikeIcon:{
        backgroundColor: Colors.negativeAccentColor,
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
      commentNameTextContainer:{
        paddingHorizontal:w*0.005,
      },
      commentNameText:{
        // backgroundColor:'blue',
        color:"#e64a33",
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      commentInTextContainer:{
        paddingHorizontal:w*0.005,
      },
      commentInText:{
        // backgroundColor:'red',
        // width:w*0.36,
        textAlign:'center',
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      commentFollowingTextContainer:{
        paddingHorizontal:w*0.012,
        // backgroundColor:'pink',
      },
      commentFollowingText:{
        // backgroundColor:'red',
        width:w*0.37,
        // textAlign:'center',
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      commentLocationTextContainer:{
        paddingHorizontal:w*0.005,
      },
      commentLocationText:{
        // backgroundColor:'yellow',
        color: Colors.primaryColor,
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



      bodyView:{
        flex:1.45,
        backgroundColor: '#E8E7EE',
      },
      // titleText: {
      //   // backgroundColor: 'black',
      //   fontSize: getCorrectFontSizeForScreen(w,h,27),
      //   fontFamily: 'Whitney Semibold',
      //   color: Colors.mainTextColor,
      //   textAlign: 'center',
      // },
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


  onUserClick(userId){
    if(!!this.props.onUserClick && userId!=null){
      this.props.onUserClick(userId);
    }
  }

  onBillClick(billId){
    if(!!this.props.onBillClick && billId!=null){
      this.props.onBillClick(billId);
    }
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
        <View style={[styles.card, this.props.cardStyle]}>
          <View resizeMode="cover" style={styles.cardTitleContainer}>
            <View style={styles.cardTitleTextAndIconContainer}>
              <View style={[styles.commentIconContainer, this.props.isLike?styles.likeIcon:styles.dislikeIcon]}>
                <PavIcon
                name={this.props.isLike?"thumbs-up":"thumbs-down"}
                size={getCorrectFontSizeForScreen(w,h,15)}
                style={styles.commentIcon}
                />
              </View>
              <View style={styles.cardTitleTextContainer}>
                <Text style={styles.cardTitleText}>COMMENT {this.props.isLike?"UPVOTE":"DOWNVOTE"}</Text>
              </View>
            </View>
            <View style={styles.cardDateTextContainer}>
              <Text style={styles.cardDateText}>{this.props.dateTime}</Text>
            </View>
          </View>
          <View style={styles.cardContentContainer}>

            <View style={styles.cardContentHeader}>
              <TouchableOpacity onPress={()=>this.onUserClick(this.props.userId)}>
                <Image
                  style={styles.userImage}
                  source={{uri: this.props.userPhotoUrl}}
                  defaultSource={defaultUserPhoto}
                  resizeMode='cover'
                />
              </TouchableOpacity>
              <View style={styles.commentDescriptionContainer}>
                <View style={styles.commentLocationContainer}>
                  <TouchableOpacity style={styles.commentNameTextContainer} onPress={()=>this.onUserClick(this.props.userId)}>
                    <Text style={styles.commentNameText}>{this.props.userFullNameText}</Text>
                  </TouchableOpacity>
                  <View  style={styles.commentFollowingTextContainer}>
                    <Text style={styles.commentFollowingText}>{this.props.isLike?"upvoted":"downvoted"} the following comment: </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.commentNameTextContainer} onPress={()=>this.onUserClick(this.props.authorId)}>
                  <Text style={styles.commentNameText}>{this.props.authorFullNameText}</Text>
                </TouchableOpacity>
                <View style={styles.commentLocationContainer}>
                  <View  style={styles.commentInTextContainer}>
                    <Text style={styles.commentInText}>in</Text>
                  </View>
                  <TouchableOpacity style={styles.commentLocationTextContainer} onPress={()=>this.onBillClick(this.props.billId)}>
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
          </View>
        </View>
      </View>
    );
  }
}







LikeCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  dateTime: React.PropTypes.string.isRequired,
  userFullNameText: React.PropTypes.string.isRequired,
  authorFullNameText: React.PropTypes.string,
  commentParentTitle: React.PropTypes.string.isRequired,
  commentText: React.PropTypes.string.isRequired,
  userPhotoUrl: React.PropTypes.string,
  authorId: React.PropTypes.string,
  userId: React.PropTypes.string.isRequired,
  billId: React.PropTypes.string.isRequired,
  isLike: React.PropTypes.bool.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired
};
export default LikeCard;
