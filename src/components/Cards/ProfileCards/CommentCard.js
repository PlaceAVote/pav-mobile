/**
 * # CommentCard.js
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
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import PavImage from '../../../lib/UI/PavImage'
import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';




const styles = StyleSheet.create({

  cardContainer:{
    flex: 1,
    // alignItems: 'stretch',
    // backgroundColor: 'blue',
    justifyContent:'center',
    paddingHorizontal: 7,
    paddingVertical: 7,

  },

  card:{
    // flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 1,
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
    alignItems:'center',
    // backgroundColor:'purple'
  },
  cardTitleTextAndIconContainer:{
    flexDirection:'row',
    alignItems:'center',
    // backgroundColor:'pink'
  },
  cardTitleTextContainer:{
    paddingHorizontal: w*0.014,
  },
  cardTitleText:{
    // backgroundColor: 'red',
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  cardDateTextContainer:{
    paddingHorizontal: w*0.02,
    // backgroundColor:'pink'
  },
  cardDateText:{
    // backgroundColor:'red',
    // color: Colors.thirdTextColor,
    textAlign:'center',
    color: 'rgba(0, 0, 0, 0.60)',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
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
      backgroundColor: "#708BC4",
      paddingHorizontal:w*0.005,
      paddingVertical:4,
      borderRadius: 3,
      borderColor: '#ffffff',
      borderWidth: 1,
  },

  commentIcon:{
    color: Colors.mainTextColor,
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
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  commentInTextContainer:{
    paddingHorizontal:w*0.005,
  },
  commentInText:{
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  commentLocationTextContainer:{
    paddingHorizontal:w*0.005,
  },
  commentLocationText:{
    // backgroundColor:'yellow',
    color: Colors.primaryColor,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
    width: w*0.7,
  },
  cardContentBody:{
    // backgroundColor:'green'
    // marginTop: h*0.01
    padding:w*0.003,
  },
  cardContentText:{
    // backgroundColor:'green',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(7),
    color: 'rgba(0, 0, 0, 0.54)',
  },



  bodyView:{
    flex:1.45,
    backgroundColor: '#E8E7EE',
  },
  // titleText: {
  //   // backgroundColor: 'black',
  //   fontSize: getCorrectFontSizeForScreen(27),
  //   fontFamily: 'Whitney-SemiBold',
  //   color: Colors.mainTextColor,
  //   textAlign: 'center',
  // },
});


class CommentCard extends React.Component {
  constructor(props) {
    super(props);
  }










  onBillClick(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId);
    }
  }
  onUserClick(){
    if(this.props.onUserClick && !!this.props.userId){
        this.props.onUserClick(this.props.userId);
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={[styles.card, this.props.cardStyle]}>
          <View resizeMode="cover" style={styles.cardTitleContainer}>
            <View style={styles.cardTitleTextAndIconContainer}>
              <View style={styles.commentIconContainer}>
                <PavIcon name="comment" size={getCorrectFontSizeForScreen(15)} style={styles.commentIcon}/>
              </View>
              <View style={styles.cardTitleTextContainer}>
                <Text style={styles.cardTitleText}>NEW COMMENT</Text>
              </View>
            </View>
            <View style={styles.cardDateTextContainer}>
              <Text numberOfLines={2} style={styles.cardDateText}>{this.props.dateTime}</Text>
            </View>
          </View>
          <View style={styles.cardContentContainer}>

            <View style={styles.cardContentHeader}>
              <TouchableOpacity onPress={this.onUserClick.bind(this)}>
                <PavImage
                  defaultSource={defaultUserPhoto}
                  style={styles.userImage}
                  source={{uri: this.props.userPhotoUrl}}
                  resizeMode='cover'
                />
              </TouchableOpacity>
              <View style={styles.commentDescriptionContainer}>
                <TouchableOpacity style={styles.commentNameTextContainer} onPress={this.onUserClick.bind(this)}>
                  <Text style={styles.commentNameText}>{this.props.userFullNameText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentLocationContainer} onPress={this.onBillClick.bind(this)}>
                  <View  style={styles.commentInTextContainer}>
                    <Text style={styles.commentInText}>in</Text>
                  </View>
                  <View  style={styles.commentLocationTextContainer}>
                    <Text style={styles.commentLocationText}>{this.props.commentParentTitle}</Text>
                  </View>
                </TouchableOpacity>

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





CommentCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  dateTime: React.PropTypes.string.isRequired,
  commentParentTitle: React.PropTypes.string.isRequired,
  userFullNameText: React.PropTypes.string.isRequired,
  commentText: React.PropTypes.string,
  userPhotoUrl: React.PropTypes.string,
  commentId: React.PropTypes.string,
  userId: React.PropTypes.string,
  billId: React.PropTypes.string,
  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,

  // score: React.PropTypes.number.isRequired,
  // isLiked: React.PropTypes.bool.isRequired,
  // isDisliked: React.PropTypes.bool.isRequired,
  // billTitle: React.PropTypes.string,
  // onLikeDislikeClick: React.PropTypes.func.isRequired,
  // onReplyClick: React.PropTypes.func.isRequired,
};
export default CommentCard;
