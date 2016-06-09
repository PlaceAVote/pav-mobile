/**
 * # VoteCard.js
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









class VoteCard extends React.Component {
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
        alignItems:'center'
      },
      cardTitleTextContainer:{
        paddingHorizontal: w*0.014,
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


      voteDescriptionContainer:{
        flexDirection:'column',
        // backgroundColor:'red',
      },


      voteIconContainer:{
          justifyContent:'center',
          alignItems:'center',
          width: w*0.09,
          height: w*0.09,
          backgroundColor: "#8B2392",
          paddingHorizontal:w*0.005,
          paddingVertical:4,
          borderRadius: 3,
          borderColor: '#ffffff',
          borderWidth: 1,
      },

      voteIcon:{
        color: Colors.mainTextColor,
      },

      voteRowContainer:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
      },
      voteNameTextContainer:{
        paddingHorizontal: w*0.001,
      },
      voteNameText:{
        // backgroundColor:'blue',
        color:"#e64a33",
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      voteInTextContainer:{
        paddingHorizontal: w*0.01,
      },
      voteInText:{
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      voteLocationTextContainer:{
        paddingHorizontal: w*0.005,
        paddingVertical: h*0.003,
      },
      voteLocationText:{
        // backgroundColor:'yellow',
        color: Colors.primaryColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
        width: w*0.7,
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
          <View style={styles.cardTitleContainer}>
            <View style={styles.cardTitleTextAndIconContainer}>
              <View style={styles.voteIconContainer}>
                <PavIcon name="logo" size={26} style={styles.voteIcon}/>
              </View>
              <View style={styles.cardTitleTextContainer}>
                <Text style={styles.cardTitleText}>NEW VOTE</Text>
              </View>
            </View>
            <View style={styles.cardDateTextContainer}>
              <Text style={styles.cardDateText}>{this.props.dateTime}</Text>
            </View>
          </View>
          <View style={styles.cardContentContainer}>
            <View style={styles.cardContentHeader}>
              <View style={styles.voteDescriptionContainer}>
                <View style={styles.voteRowContainer}>
                  <TouchableOpacity style={styles.voteNameTextContainer} onPress={()=>this.onUserClick(this.props.userId)}>
                    <Text style={styles.voteNameText}>{this.props.userFullNameText}</Text>
                  </TouchableOpacity>
                  <View style={styles.voteInTextContainer}>
                    <Text style={styles.voteInText}>voted on the bill: </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.voteLocationTextContainer} onPress={()=>this.onBillClick(this.props.billId)}>
                  <Text style={styles.voteLocationText}>{this.props.voteParentTitle}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}







VoteCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  dateTime: React.PropTypes.string.isRequired,
  userFullNameText: React.PropTypes.string.isRequired,
  voteParentTitle: React.PropTypes.string,
  userId: React.PropTypes.string,
  billId: React.PropTypes.string,
  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
};
export default VoteCard;
