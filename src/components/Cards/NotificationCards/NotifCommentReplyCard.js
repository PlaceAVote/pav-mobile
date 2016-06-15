/**
 * # NotifCommentReplyCard.js
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









class NotifCommentReplyCard extends React.Component {
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
        flexDirection:'row',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        // borderColor: '#ffffff',
        // borderWidth: 1,
        // shadowColor: 'rgba(0, 0, 0, 0.12)',
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //   height: 1,
        //   width: 2,
        // },
        paddingVertical: w*0.013,
      },
      cardIconContainer:{
        flexDirection:'row',
        paddingHorizontal: w*0.03,
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'red'
      },

      userImageContainer:{
          justifyContent:'center',
          alignItems:'center',
          // backgroundColor: "#8B2392",
          // paddingHorizontal:w*0.005,

      },

      userImage:{
        // color: Colors.mainTextColor,
        width: w*0.09,
        height: w*0.09,
        borderRadius: 3,
        borderColor: '#ffffff',
        borderWidth: 1,
      },

      cardDescriptionContainer:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'pink',
        paddingHorizontal: w*0.02,
      },
      cardExplanationContainer:{
        flexDirection:'row',
        // backgroundColor:'purple',
        alignItems:'center'
      },

      cardExplanTextContainer:{
        // paddingHorizontal: w*0.02,
        paddingVertical: w*0.005,
      },
      cardExplanText:{
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney Book',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
        width: w*0.36,
        // backgroundColor:'red'
      },
      cardExplanTextUnread:{
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
        width: w*0.36,
      },
      authorFullnameTextContainer:{
        // backgroundColor:'yellow'
      },
      authorFullnameText:{
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        // backgroundColor:'red'
      },
      authorFullnameTextUnread:{
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      cardBillTextContainer:{

      },
      cardBillText:{
        color: Colors.primaryColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        width: w*0.80,
        // backgroundColor:'green'
      },
      cardBillTextUnread:{
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        width: w*0.80,
      }



      // voteLocationText:{
      //   // backgroundColor:'yellow',
      //   color: Colors.primaryColor,
      //   fontFamily: 'Whitney Semibold',
      //   fontSize: getCorrectFontSizeForScreen(w,h,9),
      //   width: w*0.7,
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




    onUserClick(){
      if(!!this.props.onUserClick && !!this.props.authorId){
        this.props.onUserClick(this.props.authorId)
      }
    }


    onBillClick(){
      if(!!this.props.onBillClick && !!this.props.billId){
        this.props.onBillClick(this.props.billId)
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
          <View style={styles.cardIconContainer}>
            <TouchableOpacity style={styles.userImageContainer}  onPress={this.onUserClick.bind(this)}>
              <PavImage
                defaultSource={defaultUserPhoto}
                style={styles.userImage}
                source={{uri: this.props.userPhotoUrl}}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardDescriptionContainer}>
            <View style={styles.cardExplanationContainer}>
              <TouchableOpacity style={styles.authorFullnameTextContainer} onPress={this.onUserClick.bind(this)}>
                <Text style={this.props.isRead===true?styles.authorFullnameText:styles.authorFullnameTextUnread}>{this.props.authorFullName} </Text>
              </TouchableOpacity>
              <View style={styles.cardExplanTextContainer}>
                <Text style={this.props.isRead===true?styles.cardExplanText:styles.cardExplanTextUnread}> replied to your comment on:</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cardBillTextContainer} onPress={this.onBillClick.bind(this)}>
              <Text style={this.props.isRead===true?styles.cardBillText:styles.cardBillTextUnread}>{this.props.billTitle} </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  }
}







NotifCommentReplyCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  isRead: React.PropTypes.bool.isRequired,
  authorFullName: React.PropTypes.string,
  billId: React.PropTypes.string.isRequired,
  authorId: React.PropTypes.string,
  billTitle: React.PropTypes.string.isRequired,
  userPhotoUrl: React.PropTypes.string,
  onBillClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
};
export default NotifCommentReplyCard;