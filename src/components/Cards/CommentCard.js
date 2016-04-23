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









class CommentCard extends Component {
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
        paddingHorizontal: 15,
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
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,15),
      },
      cardDateText:{
        // backgroundColor: 'red',
        paddingHorizontal: 5,
        color: Colors.secondaryTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,12),
      },

      cardContentContainer:{
        padding : 15,
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
        flexDirection:'column'
      },
      cardContentHeader:{
        flex:1,
        paddingVertical:5,
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
          backgroundColor:Colors.primaryColor,
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
        marginHorizontal: 10,
      },
      commentLocationContainer:{
        flexDirection:'row',
        alignItems:'center'
      },
      commentNameText:{
        // backgroundColor:'blue',
        color:"#EC6F5A",
        paddingHorizontal: 5,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,12),
      },
      commentInText:{
        color: Colors.thirdTextColor,
        paddingHorizontal: 5,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      commentLocationText:{
        // backgroundColor:'yellow',
        color: Colors.primaryColor,
        paddingHorizontal: 1,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      cardContentBody:{
        // backgroundColor:'green'
      },
      cardContentText:{
        padding:2,
        // backgroundColor:'green',
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
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View resizeMode="cover" style={styles.cardTitleContainer}>
            <View style={styles.cardTitleTextAndIconContainer}>
              <View style={styles.commentIconContainer}>
                <PavIcon name="comment" size={20} style={styles.commentIcon}/>
              </View>
              <Text style={styles.cardTitleText}>New Comment</Text>
            </View>
            <Text style={styles.cardDateText}>17:54 15 October 2015</Text>
          </View>
          <View style={styles.cardContentContainer}>

            <View style={styles.cardContentHeader}>
              <Image
                style={styles.userImage}
                source={{uri: 'https://cdn.placeavote.com/img/profile/profile-picture.png'}}
                resizeMode='cover'
              />
              <View style={styles.commentDescriptionContainer}>
                <Text style={styles.commentNameText}>Adelle Charles</Text>
                <View style={styles.commentLocationContainer}>
                  <Text style={styles.commentInText}>in</Text>
                  <Text style={styles.commentLocationText}>whatever bla bla lba lba</Text>
                </View>

              </View>
            </View>
            <View style={styles.cardContentBody}>
              <Text style={styles.cardContentText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris sagittis pellentesque lacus eleifend lacinia...
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
export default CommentCard;
