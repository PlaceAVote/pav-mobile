/**
 * # NotifIssueResponseCard.js
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



import {Colors, ScheneKeys, Other} from '../../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


const EMOTIONS = {
  positive:{iconName: "happy", color:Colors.accentColor },
  neutral:{iconName: "neutral", color:"#FABC25" },
  negative:{iconName: "sad", color:Colors.negativeAccentColor },
};

const styles = StyleSheet.create({

  cardContainer:{
    // flex: 1,
    // alignItems: 'stretch',
    // backgroundColor: 'blue',
    // paddingHorizontal: 7,
    // paddingVertical: 7,

  },

  card:{

    // flex: 1,
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
    paddingVertical: w*0.021,
  },
  cardIconContainer:{
    flexDirection:'row',
    paddingHorizontal: w*0.03,
    justifyContent:'space-between',
    alignItems:'center',
    // backgroundColor:'red'
  },

  emotionIconContainer:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:Colors.titleBgColor,
      width: w*0.09,
      height: w*0.09,
      paddingHorizontal:w*0.005,
      borderRadius: 3,
      borderColor: '#ffffff',
      borderWidth: 1,
  },


  emotionIcon:{
    color: Colors.mainTextColor,
  },

  cardDescriptionContainer:{
    flex:1,
    flexDirection:'column',
    // backgroundColor:'pink',
    paddingHorizontal: w*0.02,


  },
  cardExplanTextContainer:{
    // paddingHorizontal: w*0.02,
    paddingVertical: w*0.005,
  },
  cardExplanText:{
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(9),
    width: w*0.74,
    // backgroundColor:'red'
  },
  cardExplanTextUnread:{
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(9),
    width: w*0.74,
  },
  userFullNameTextContainer:{

  },
  userFullNameText:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
    width: w*0.74,
    // backgroundColor:'green'
  },
  userFullNameTextUnread:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(8),
    width: w*0.74,
  }



  // voteLocationText:{
  //   // backgroundColor:'yellow',
  //   color: Colors.primaryColor,
  //   fontFamily: 'Whitney-SemiBold',
  //   fontSize: getCorrectFontSizeForScreen(9),
  //   width: w*0.7,
  // },



});


class NotifIssueResponseCard extends React.Component {
  constructor(props) {
    super(props);
  }






    onUserClick(){
      if(!!this.props.onUserClick && !!this.props.userId){
        this.props.onUserClick(this.props.userId)
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
          <View style={styles.cardIconContainer}>
              <View style={styles.emotionIconContainer}>
                <PavIcon name={EMOTIONS[this.props.emotion].iconName} size={getCorrectFontSizeForScreen(21)} style={[styles.emotionIcon, {color:EMOTIONS[this.props.emotion].color}]}/>
              </View>
          </View>
          <View style={styles.cardDescriptionContainer}>
            <TouchableOpacity style={styles.userFullNameTextContainer} onPress={this.onUserClick.bind(this)}>
              <Text style={this.props.isRead===false?styles.userFullNameText:styles.userFullNameTextUnread}>{this.props.userFullName} </Text>
            </TouchableOpacity>
            <View style={styles.cardExplanTextContainer}>
              <Text style={this.props.isRead===false?styles.cardExplanText:styles.cardExplanTextUnread}>added a reaction to your issue. </Text>
            </View>

          </View>

        </View>
      </View>
    );
  }
}







NotifIssueResponseCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  isRead: React.PropTypes.bool.isRequired,
  userId: React.PropTypes.string.isRequired,
  userFullName: React.PropTypes.string.isRequired,
  emotion: React.PropTypes.string.isRequired,
  onUserClick: React.PropTypes.func.isRequired,

};
export default NotifIssueResponseCard;
