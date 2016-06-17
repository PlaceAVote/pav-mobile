/* @flow weak */
/**
 * # FeedBillCard.js
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
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'
import congratsScreenPhoto from '../../../../assets/congratsScreen.png';
import LinearGradient from 'react-native-linear-gradient';


class FeedBillCard extends React.Component {
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
        // backgroundColor: Colors.transparentColor,
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
        // flex: 1,
        flexDirection:'row',
        paddingHorizontal: w*0.02,
        paddingVertical: w*0.02,
        justifyContent:'space-between',
        alignItems:'center'
      },

      billTitleText:{
        backgroundColor: Colors.transparentColor,
        paddingHorizontal: 10,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      cardContentContainer:{
        // backgroundColor:'red',
        flex:1,
        paddingHorizontal: w*0.02,
        paddingBottom: h*0.012,
        justifyContent:'center',
        flexDirection:'column'
      },





      billImage:{
        height:self.props.cardHeight,
        width:null
      },



      cardContentHeader:{
        flex:1,
        // backgroundColor:'green',
        justifyContent:'center',
        paddingVertical: h*0.01,
        borderStyle: 'solid',
        borderTopColor: 'rgba(255, 255, 255, 0.8)',
        borderTopWidth: 1,
      },




      cardFooterContainer:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: h*0.011,
        // backgroundColor:'black'
      },
      cardFooterContentContainer:{
        flex:1,
        flexDirection:'row',
        // backgroundColor:'red'
      },
      cardFooterTextContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal: w*0.025,
      },
      cardFooterTitleText:{

        // backgroundColor:'green',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        color: Colors.primaryColor
      },
      cardFooterValueText:{
        // backgroundColor:'green',
        // paddingHorizontal: w*0.010,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        color: Colors.primaryColor
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



      cardContentText:{
        backgroundColor:Colors.transparentColor,
        paddingVertical:h*0.0065,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,10),
        color: Colors.mainTextColor,
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
      }

    });
  }



  renderHeader(styles){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <Text style={styles.billTitleText}>{this.props.subjectTitle}</Text>
    </View>);
  }



  renderBody(styles){
    return (
      <View style={styles.cardContentContainer}>

        <View style={styles.cardContentHeader}>
          <Text style={styles.cardContentText} lineHeight={h*0.031}>
          {this.props.billTitle}
          </Text>
        </View>


      </View>);
  }

  renderFavourPercentageText(favorPercentage, styles){
    if(favorPercentage>0 && favorPercentage!=50){
      return (
        <View style={styles.cardFooterTextContainer}>
          <Text style={styles.cardFooterValueText}>{favorPercentage}% </Text>
          <Text style={styles.cardFooterTitleText}>Vote In Favor</Text>
        </View>);
    }else if(favorPercentage==50){
      return (
        <View style={styles.cardFooterTextContainer}>
          <Text style={styles.cardFooterTitleText}>Vote 50% - 50%</Text>
        </View>);
    }else{
      return (<View style={styles.cardFooterTextContainer}>
        <Text style={styles.cardFooterTitleText}>No votes yet</Text>
      </View>);
    }
  }

  renderFooter(styles){
      return (<View style={styles.cardFooterContainer}>

        <View style={styles.cardFooterContentContainer}>
          <TouchableOpacity style={styles.cardFooterTextContainer} onPress={this.onCommentsClicked.bind(this)}>
            <Text style={styles.cardFooterValueText}>{this.props.commentCnt} </Text>
            <Text style={styles.cardFooterTitleText}>Comments</Text>
          </TouchableOpacity>
          {this.renderFavourPercentageText(this.props.favorPercentage, styles)}
        </View>

        <View style={styles.cardFooterSocialShareIconsContainer}>
          <TouchableOpacity onPress={this.onTwitterBtnClicked.bind(this)}>
            <PavIcon name="social-twitter" size={18} style={styles.cardFooterSocialShareIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onFacebookBtnClicked.bind(this)}>
            <PavIcon name="facebook" size={15} style={styles.cardFooterSocialShareIcon}/>
          </TouchableOpacity>
        </View>
      </View>);
  }

  onTwitterBtnClicked(){
    if(this.props.onSocialClick){
      this.props.onSocialClick(SOCIAL_TYPES.TWITTER, {billTitle:this.props.billTitle, subjectTitle:this.props.subjectTitle, favorPercentage:this.props.favorPercentage});
    }
  }

  onFacebookBtnClicked(){
    if(this.props.onSocialClick){
      this.props.onSocialClick(SOCIAL_TYPES.FACEBOOK, {billTitle:this.props.billTitle, subjectTitle:this.props.subjectTitle, favorPercentage:this.props.favorPercentage});
    }
  }

  onBillClicked(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId);
    }
  }

  onCommentsClicked(){
    if(this.props.onCommentClick && !!this.props.billId){
      this.props.onCommentClick(this.props.billId);
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
          <TouchableOpacity style={{flex:1}} onPress={this.onBillClicked.bind(this)}>
            <PavImage
            platform={this.props.device.platform}
            defaultSource={congratsScreenPhoto}
            style={styles.billImage}
            source={{uri: this.props.billImgUrl}}
            resizeMode='cover'
            >
              <LinearGradient
                  style={{flex:1}}
                  colors={['black', 'rgba(0, 0, 0, 0.24)', 'black']}
                  start={[-0.3, 0.0]} end={[1.3, 0.0]}>
                  {this.renderHeader(styles)}
                  {this.renderBody(styles)}
              </LinearGradient>
            </PavImage>
          </TouchableOpacity>
          {this.renderFooter(styles)}
        </View>
      </View>
    );
  }
}


FeedBillCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  subjectTitle: React.PropTypes.string.isRequired,
  billTitle: React.PropTypes.string,
  billImgUrl: React.PropTypes.string,
  commentCnt: React.PropTypes.number.isRequired,
  favorPercentage: React.PropTypes.number.isRequired,
};
export default FeedBillCard;
