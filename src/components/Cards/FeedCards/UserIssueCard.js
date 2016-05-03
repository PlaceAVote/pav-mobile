/**
 * # UserIssueCard.js
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


import {Colors, ScheneKeys} from '../../../config/constants';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import LImage from 'react-native-image-progress';
import Progress from 'react-native-progress';

import LinearGradient from 'react-native-linear-gradient';

const Reactions = {
  NONE:'none',
  HAPPY:'positive',
  NEUTRAL:'neutral',
  SAD:'negative',
};




class UserIssueCard extends Component {
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



      userIssueIconContainer:{
          justifyContent:'center',
          alignItems:'center',
          // width: w*0.09,
          // height: w*0.09,
          // backgroundColor: "#708BC4",
          paddingHorizontal:1,
          paddingVertical:1,
          // borderRadius: 3,
          // borderColor: '#ffffff',
          // borderWidth: 1,
      },

      userIssueIcon:{
        color: Colors.primaryColor,
      },

      userImage:{
        width:w*0.09,
        height:w*0.09,
        // marginHorizontal: 10,
      },


      userIssueFullNameDynamicText:{
        // backgroundColor:'blue',
        color:"#e64a33",
        paddingHorizontal: 3,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      userIssueTitleActionStaticText:{
        color: Colors.thirdTextColor,
        paddingHorizontal: 3,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      cardContentHeader:{
        flex:1,
        // backgroundColor:'green',
        justifyContent:'center',
        paddingVertical: h*0.01
      },

      relatedBillContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: h*0.008,
        paddingHorizontal: w*0.025,
        backgroundColor:'#F6F5FF',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#E7E6ED',
      },

      relatedBillTitleText:{
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,10),
        color: Colors.primaryColor
      },

      relatedBillLinkIcon:{
        color:Colors.fourthTextColor,
      },

      cardFooterContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: h*0.015,

      },
      cardFooterText:{
        flex:1,
        // backgroundColor:'green',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
        color: 'rgba(0, 0, 0, 0.54)',
      },
      cardFooterIconsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'red',
      },

      zeroCntreactionIconContainer:{
        paddingHorizontal:w*0.03,
      },
      reactionIconContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:w*0.01,
        marginHorizontal:w*0.005,
        flexDirection:'row',
        borderRadius: 2,
        borderWidth: 1,
      },

      userVotedContainerView:{
        backgroundColor: '#FFF3CB',
        borderColor: '#C37125',
      },
      othersVotedContainerView:{
        backgroundColor: '#E8E7EE',
        borderColor: '#D6D4E1',
      },


      reactionIcon:{
        paddingHorizontal: w*0.010,
        paddingVertical: h*0.018,
        color: 'rgba(0, 0, 0, 0.74)',
      },
      userVotedReactionIcon:{
        color: '#C37125',
      },
      othersVotedReactionIcon:{
        color: 'rgba(0, 0, 0, 0.74)',
      },

      reactionCountText:{
        paddingHorizontal: w*0.007,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      userVotedText:{
        color:'#C37125'
      },
      othersVotedText:{
        color: 'rgba(0, 0, 0, 0.74)',
      },


      cardContentText:{
        // backgroundColor:'green',
        paddingVertical:h*0.0065,
        lineHeight:h*0.031,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,10),
        color: 'rgba(0, 0, 0, 0.54)',
      },

      relatedArticleContainer:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          paddingVertical: h*0.014,
          // backgroundColor:'red'
      },

      relatedArticleTitleContainer:{
        top:0,
        width:w*0.93,
        height:h*0.15,
        alignSelf:'center',
        position:'absolute',
        justifyContent:'flex-start',
        backgroundColor:Colors.transparentColor
      },
      relatedArticleTitleText:{
        paddingVertical: h*0.015,
        paddingHorizontal: w*0.04,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,11),
        // backgroundColor:'red',
        color:Colors.mainTextColor,
        // textAlign:'center'
      },
      relatedArticleUrlIcon:{
        textAlign:'right',
        paddingHorizontal: w*0.04,
        paddingVertical: h*0.020,
        color:Colors.mainTextColor,
        // backgroundColor:'red',
      },


      articleImage:{
        width:w*0.917,
        height:h*0.15,
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



  renderHeader(styles){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <View style={styles.cardTitleTextAndIconContainer}>
        <Image
          defaultSource={require('../../../../assets/defaultUserPhoto.png')}
          style={styles.userImage}
          source={{uri: this.props.userPhotoUrl}}
          resizeMode='cover'
        />

        <Text style={styles.userIssueFullNameDynamicText}>{this.props.userFullNameText}</Text>
        <Text style={styles.userIssueTitleActionStaticText}>shared an</Text>
        <View style={styles.userIssueIconContainer}>
          <PavIcon name="issues" size={12} style={styles.userIssueIcon}/>
        </View>
        <Text style={styles.userIssueTitleActionStaticText}>Issue</Text>
      </View>
      <Text style={styles.cardDateText}>{this.props.dateTime}</Text>
    </View>);
  }

  // "type": "userissue",
  //
  // "first_name": "Homer",
  // "last_name": "Simpson",
  // "img_url": "https://cdn.placeavote.com/users/ddb6f9ba-c4f2-4b78-9790-8c3d3468d276/profile/img/p200xp200x/9fa929d9-302a-42e7-8c18-f943ea62d56e.jpeg",
  //
  //
  // "comment": "I have 99 issues and this bug is all of them.",
  //
  //
  //  "issue_id": "72e40ba5-711a-4a25-9ba8-2ad9990e1188",
  //  "author_id": "ddb6f9ba-c4f2-4b78-9790-8c3d3468d276",
  //  "event_id": "de712bf9-5baf-4f20-9031-484e4e118218",
  //
  //  "positive_responses": 0,
  //  "neutral_responses": 0,
  //  "negative_responses": 0,
  //
  //  "short_issue_id": "cuQLpXEaSiWbqCrZmQ4RiA",
  //  "user_id": "ddb6f9ba-c4f2-4b78-9790-8c3d3468d276",
  //  "emotional_response": "none",
  //
  //  "timestamp": 1461926704743

  onRelatedArticleClicked(e){
      Linking.openURL("http://www.google.com").catch(err => console.error('An error occurred', err));
      alert("related article clicked");
  }
  onRelatedBillClicked(e){
    alert('related bill clicked - should navigate user to this bill.')
  }

  renderReactionIcon(type, count, userVotedThis, styles){

    if(count>0){
      return (<View style={[styles.reactionIconContainer, userVotedThis?styles.userVotedContainerView:styles.othersVotedContainerView]}>
        <PavIcon name={type} size={19} style={[styles.reactionIcon, userVotedThis?styles.userVotedReactionIcon:styles.othersVotedReactionIcon]}/>
        <Text style={[ styles.reactionCountText, userVotedThis?styles.userVotedText:styles.othersVotedText]}>
          {count+" "}
        </Text>
      </View>);
    }else{
      return (<View style={styles.zeroCntreactionIconContainer}>
        <PavIcon name={type} size={19} style={styles.reactionIcon}/>
      </View>);
    }

  }

  renderRelatedBillLink(styles){
    if(!!this.props.relatedBillTitle && this.props.relatedBillTitle.length>0){
      return (
        <TouchableOpacity style={styles.relatedBillContainer} onPress={this.onRelatedBillClicked.bind(this)}>
          <Text style={styles.relatedBillTitleText}>{this.props.relatedBillTitle}</Text>
          <PavIcon name="bills" size={18} style={styles.relatedBillLinkIcon}/>
        </TouchableOpacity>);
    }else{
      return <View></View>;
    }

  }

  renderRelatedArticlePreview(styles){
    if(!!this.props.relatedArticleUrl && this.props.relatedArticleUrl.length>0){
      if(this.props.device.platform=="ios"){
          return (
            <TouchableOpacity style={styles.relatedArticleContainer} onPress={this.onRelatedArticleClicked.bind(this)}>
              <LImage
                defaultSource={require('../../../../assets/defaultUserPhoto.png')}
                style={styles.articleImage}
                source={{uri: this.props.relatedArticlePhotoUrl}}
                resizeMode='cover'
                indicator={Progress.CircleSnail}
                indicatorProps={{
                  colors:[Colors.primaryColor, Colors.accentColor, Colors.secondaryColor]
                }}
              >
                <LinearGradient
                      colors={['black', 'rgba(0, 0, 0, 0.24)', 'black']}
                      start={[-0.3, 0.0]} end={[1.3, 0.0]}
                      style={styles.relatedArticleTitleContainer}>
                  <Text style={styles.relatedArticleTitleText}>{this.props.relatedArticleTitle}</Text>
                  <PavIcon name="links" size={19} style={styles.relatedArticleUrlIcon}/>
                </LinearGradient>
              </LImage>

            </TouchableOpacity>
          );
      }else{
        return (
          <TouchableOpacity style={styles.relatedArticleContainer} onPress={this.onRelatedArticleClicked.bind(this)}>
            <Image
            defaultSource={require('../../../../assets/defaultUserPhoto.png')}
            style={styles.articleImage}
            source={{uri: this.props.relatedArticlePhotoUrl}}
            resizeMode='cover'
            >
            <LinearGradient
                  colors={['black', 'rgba(0, 0, 0, 0.24)', 'black']}
                  start={[-0.3, 0.0]} end={[1.3, 0.0]}
                  style={styles.relatedArticleTitleContainer}>
              <Text style={styles.relatedArticleTitleText}>{this.props.relatedArticleTitle}</Text>
              <PavIcon name="links" size={19} style={styles.relatedArticleUrlIcon}/>
            </LinearGradient>
            </Image>
          </TouchableOpacity>);
      }
    }else{  //related article does not exist
      return <View></View>;
    }
  }

  renderBody(styles){
    return (
      <View style={styles.cardContentContainer}>

        <View style={styles.cardContentHeader}>
          <Text style={styles.cardContentText}>
          {this.props.issueText}
          </Text>
        </View>

        {this.renderRelatedBillLink(styles)}
        {this.renderRelatedArticlePreview(styles)}
      </View>);
  }

  renderFooter(styles){
      return (<View style={styles.cardFooterContainer}>
        <Text style={styles.cardFooterText}>What's your reaction?</Text>
        <View style={styles.cardFooterIconsContainer}>
          {this.renderReactionIcon("happy", this.props.happyCnt, (this.props.userReaction==Reactions.HAPPY), styles)}
          {this.renderReactionIcon("neutral", this.props.neutralCnt, (this.props.userReaction==Reactions.NEUTRAL), styles)}
          {this.renderReactionIcon("sad", this.props.sadCnt, (this.props.userReaction==Reactions.SAD), styles)}
        </View>
      </View>);
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

          {this.renderHeader(styles)}
          {this.renderBody(styles)}
          {this.renderFooter(styles)}


        </View>
      </View>
    );
  }
}



//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default UserIssueCard;
