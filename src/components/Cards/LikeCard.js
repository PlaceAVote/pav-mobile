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
// var Icon = require('react-native-vector-icons/FontAwesome');


import {Colors, ScheneKeys} from '../../config/constants';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  Image
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);









class LikeCard extends Component {
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
      cardTitleText:{
        // backgroundColor: 'red',
        paddingHorizontal: 10,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      cardDateText:{
        // backgroundColor: 'red',
        paddingHorizontal: 5,
        // color: Colors.thirdTextColor,
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
          backgroundColor: Colors.accentColor,
          paddingHorizontal:2,
          paddingVertical:4,
          borderRadius: 3,
          borderColor: '#ffffff',
          borderWidth: 1,
      },

      commentIcon:{
        color: Colors.mainTextColor,
        paddingHorizontal:3,
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
        paddingLeft: 5,
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
          <View resizeMode="cover" style={styles.cardTitleContainer}>
            <View style={styles.cardTitleTextAndIconContainer}>
              <View style={styles.commentIconContainer}>
                <PavIcon name="thumbs-up" size={17} style={styles.commentIcon}/>
              </View>
              <Text style={styles.cardTitleText}>COMMENT UPVOTE</Text>
            </View>
            <Text style={styles.cardDateText}>{this.props.dateTime}</Text>
          </View>
          <View style={styles.cardContentContainer}>

            <View style={styles.cardContentHeader}>
              <Image
                style={styles.userImage}
                source={{uri: this.props.userPhotoUrl}}
                resizeMode='cover'
              />
              <View style={styles.commentDescriptionContainer}>
                <View style={styles.commentLocationContainer}>
                  <Text style={styles.commentNameText}>{this.props.userFullNameText}</Text>
                  <Text style={styles.commentInText}>upvoted the following comment: </Text>
                </View>
                <Text style={styles.commentNameText}>{this.props.authorFullNameText}</Text>
                <View style={styles.commentLocationContainer}>
                  <Text style={styles.commentInText}>in</Text>
                  <Text style={styles.commentLocationText}>{this.props.commentParentTitle}</Text>
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



//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default LikeCard;
