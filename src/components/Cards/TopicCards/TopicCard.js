/* @flow weak */
/**
 * # TopicCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';





/*A react native button*/
import Button from 'sp-react-native-iconbutton'

/**
* Icons library
*/



import {Colors, ScheneKeys, Other} from '../../../config/constants';
const {REACTIONS, SOCIAL_TYPES} = Other;

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'
// import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';
import congratsScreenPhoto from '../../../../assets/congratsScreen.png';

import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({

  cardContainer:{
    // flex: 1,
    // backgroundColor: 'blue',

  },

  card:{
    // flex: 1,
    flexDirection:'column',
    backgroundColor: '#ffffff',
    // paddingHorizontal:PADDING_HOR,
    // paddingVertical: h*0.013,
    // backgroundColor: 'orange',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 0.5,

    // shadowColor: 'rgba(0, 0, 0, 0.12)',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 2,
    // },
  },

  billImage:{
    borderRadius:2,
    height: h*0.16,
  },

  gradientContainer:{
    // backgroundColor:'red',
    flex:1,
    justifyContent:'flex-end',
    paddingVertical:h*0.020,
    paddingHorizontal:w*.022,
  },
  billTitle:{
    backgroundColor:Colors.transparentColor,
    fontFamily: 'Whitney-Semibold',
    fontSize: getCorrectFontSizeForScreen(9),
    color: Colors.mainTextColor,
  },



  billDescriptionContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:w*.022,
    paddingVertical: h*0.011,
  },
  billDescription:{
    fontFamily: 'Whitney-Semibold',
    fontSize: getCorrectFontSizeForScreen(7),
    color: Colors.sixthTextColor,
  },
  cardFooterSocialShareIconsContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red'
  },
  cardFooterSocialShareIcon:{
    color: Colors.secondaryTextColor,
    paddingHorizontal: w*0.020,
  },



});


class TopicCard extends React.Component {
  constructor(props) {
    super(props);
  }


  onBillClick(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId);
    }
  }



  onTwitterBtnClicked(){
    if(this.props.onSocialClick){
      this.props.onSocialClick(SOCIAL_TYPES.TWITTER, {billId: this.props.billId, billTitle:this.props.billTitle, favorPercentage:this.props.favorPercentage});
    }
  }

  onFacebookBtnClicked(){
    if(this.props.onSocialClick){
      this.props.onSocialClick(SOCIAL_TYPES.FACEBOOK, {billId: this.props.billId, billTitle:this.props.billTitle, favorPercentage:this.props.favorPercentage});
    }
  }



  renderBody(){
    return (
      <TouchableOpacity onPress={this.onBillClick.bind(this)}>
        <PavImage
          defaultSource={congratsScreenPhoto}
          indicatorProps={{color:Colors.mainTextColor, size:40}}
          style={styles.billImage}
          source={{uri: this.props.billImgUrl}}
          resizeMode='cover'
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.62)', 'rgba(0, 0, 0, 0.51)', 'rgba(0, 0, 0, 0.62)']}
            start={[-0.3, 0.0]} end={[1.3, 0.0]}
            style={styles.gradientContainer}
            >
              <Text style={styles.billTitle}>
              {this.props.billTitle}
              </Text>
          </LinearGradient>
        </PavImage>
      </TouchableOpacity>
    )
  }
  renderFooter(){
    let percentage = Math.abs(this.props.favorPercentage);
    return (
      <View style={styles.billDescriptionContainer}>
        <Text style={styles.billDescription}>
         {this.props.commentCnt} Comments / {percentage}% Vote {this.props.favorPercentage>0?"Yes":"No"}
        </Text>
        <View style={styles.cardFooterSocialShareIconsContainer}>
          <TouchableOpacity onPress={this.onTwitterBtnClicked.bind(this)}>
            <PavIcon name="social-twitter" size={18} style={styles.cardFooterSocialShareIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onFacebookBtnClicked.bind(this)}>
            <PavIcon name="facebook" size={15} style={styles.cardFooterSocialShareIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }



  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {


    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={[styles.card, this.props.cardStyle]}>
          {this.renderBody()}
          {this.renderFooter()}
        </View>
      </View>
    );
  }
}




TopicCard.propTypes= {
  billId: React.PropTypes.string.isRequired,
  billTitle: React.PropTypes.string.isRequired,
  billSubjectTitle: React.PropTypes.string.isRequired,
  billImgUrl: React.PropTypes.string.isRequired,
  commentCnt: React.PropTypes.number.isRequired,
  favorPercentage: React.PropTypes.number.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onSocialClick: React.PropTypes.func.isRequired,
};
export default TopicCard;
