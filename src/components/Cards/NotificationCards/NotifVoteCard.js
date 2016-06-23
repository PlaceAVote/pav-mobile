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





const styles = StyleSheet.create({

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

  voteIconContainer:{
      justifyContent:'center',
      alignItems:'center',
      width: w*0.09,
      height: w*0.09,
      backgroundColor: "#8B2392",
      paddingHorizontal:w*0.005,
      borderRadius: 3,
      borderColor: '#ffffff',
      borderWidth: 1,
  },

  voteIcon:{
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
    fontFamily: 'Whitney Book',
    fontSize: getCorrectFontSizeForScreen(w,h,9),
    width: w*0.74,
    // backgroundColor:'red'
  },
  cardExplanTextUnread:{
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney Semibold',
    fontSize: getCorrectFontSizeForScreen(w,h,9),
    width: w*0.74,
  },
  cardBillTextContainer:{

  },
  cardBillText:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney Semibold',
    fontSize: getCorrectFontSizeForScreen(w,h,8),
    width: w*0.74,
    // backgroundColor:'green'
  },
  cardBillTextUnread:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(w,h,8),
    width: w*0.74,
  }



  // voteLocationText:{
  //   // backgroundColor:'yellow',
  //   color: Colors.primaryColor,
  //   fontFamily: 'Whitney Semibold',
  //   fontSize: getCorrectFontSizeForScreen(w,h,9),
  //   width: w*0.7,
  // },



});



class VoteCard extends React.Component {
  constructor(props) {
    super(props);
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

    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={[styles.card, this.props.cardStyle]}>
          <View style={styles.cardIconContainer}>
              <View style={styles.voteIconContainer}>
                <PavIcon name="logo" size={getCorrectFontSizeForScreen(w,h,21)} style={styles.voteIcon}/>
              </View>
          </View>
          <View style={styles.cardDescriptionContainer}>
            <View style={styles.cardExplanTextContainer}>
              <Text style={this.props.isRead===true?styles.cardExplanText:styles.cardExplanTextUnread}>Nice! You just voted on: </Text>
            </View>
            <TouchableOpacity style={styles.cardBillTextContainer} onPress={this.onBillClick.bind(this)}>
              <Text style={this.props.isRead===true?styles.cardBillText:styles.cardBillTextUnread}>{this.props.billTitle} </Text>
            </TouchableOpacity>
            <View style={styles.cardExplanTextContainer}>
              <Text style={this.props.isRead===true?styles.cardExplanText:styles.cardExplanTextUnread}>Keep voting!</Text>
            </View>

          </View>

        </View>
      </View>
    );
  }
}







VoteCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  billTitle: React.PropTypes.string.isRequired,
  billId: React.PropTypes.string.isRequired,
  isRead: React.PropTypes.bool.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
};
export default VoteCard;
