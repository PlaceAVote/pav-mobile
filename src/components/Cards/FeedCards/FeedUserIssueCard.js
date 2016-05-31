/**
 * # FeedUserIssueCard.js
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
const {REACTIONS, SOCIAL_TYPES} = Other;

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'

import LinearGradient from 'react-native-linear-gradient';
import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';





class FeedUserIssueCard extends React.Component {
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
        paddingHorizontal: w*0.02,
      },
      cardTitleContainer:{
        flex: 1,
        flexDirection:'row',
        // paddingHorizontal: w*0.02,
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
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      cardContentContainer:{
        // backgroundColor:'brown',
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
        // backgroundColor:'red'
      },
      cardFooterText:{
        flex:1,
        // backgroundColor:'green',
        paddingHorizontal:w*0.008,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
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
          paddingVertical: h*0.014,
          // backgroundColor:'green'
      },

      relatedArticleTitleContainer:{
        flex:1,
        justifyContent:'flex-start',
        backgroundColor:Colors.transparentColor,
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
        flex:1,
        // width:w*0.917,
        // height:h*0.15,
        backgroundColor:'blue'

      },
      userDetailsTouchableView:{
        flexDirection:'row',
        alignItems:'center',
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




  onRelatedArticleClicked(){
    if(this.props.onSocialClick && !!this.props.relatedArticleUrl){
      this.props.onSocialClick(SOCIAL_TYPES.SIMPLE_URL, {url:this.props.relatedArticleUrl});
    }
  }
  onRelatedBillClicked(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId);
    }
  }
  onUserClick(){
    if(this.props.onUserClick && !!this.props.userId){
        this.props.onUserClick(this.props.userId);
    }
  }

  onHappyClick(){
    if(!!this.props.onReactionClick && !!this.props.issueId && this.props.userReaction!=null){
      this.props.onReactionClick(this.props.issueId, REACTIONS.HAPPY, this.props.userReaction);
    }
  }
  onNeutralClick(){
    if(!!this.props.onReactionClick && !!this.props.issueId && this.props.userReaction!=null){
      this.props.onReactionClick(this.props.issueId, REACTIONS.NEUTRAL, this.props.userReaction);
    }
  }
  onSadClick(){
    if(!!this.props.onReactionClick && !!this.props.issueId && this.props.userReaction!=null){
      this.props.onReactionClick(this.props.issueId, REACTIONS.SAD, this.props.userReaction);
    }
  }






  renderHeader(styles){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <View style={styles.cardTitleTextAndIconContainer}>
        <TouchableOpacity style={styles.userDetailsTouchableView} onPress={this.onUserClick.bind(this)}>
          <PavImage platform={this.props.device.platform}
            defaultSource={defaultUserPhoto}
            style={styles.userImage}
            source={{uri: this.props.userPhotoUrl}}
            resizeMode='cover'
          />
          <Text style={styles.userIssueFullNameDynamicText}>{this.props.userFullNameText}</Text>
        </TouchableOpacity>
        <Text style={styles.userIssueTitleActionStaticText}>shared an</Text>
        <View style={styles.userIssueIconContainer}>
          <PavIcon name="issues" size={12} style={styles.userIssueIcon}/>
        </View>
        <Text style={styles.userIssueTitleActionStaticText}>Issue</Text>
      </View>
      <Text style={styles.cardDateText}>{this.props.timeString}</Text>
    </View>);
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
          <TouchableOpacity  onPress={this.onHappyClick.bind(this)}>
            {this.renderReactionIcon("happy", this.props.happyCnt, (this.props.userReaction==REACTIONS.HAPPY), styles)}
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.onNeutralClick.bind(this)}>
            {this.renderReactionIcon("neutral", this.props.neutralCnt, (this.props.userReaction==REACTIONS.NEUTRAL), styles)}
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.onSadClick.bind(this)}>
            {this.renderReactionIcon("sad", this.props.sadCnt, (this.props.userReaction==REACTIONS.SAD), styles)}
          </TouchableOpacity>
        </View>
      </View>);
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
      return (
      <TouchableOpacity style={styles.relatedArticleContainer} onPress={this.onRelatedArticleClicked.bind(this)}>
        <PavImage platform={this.props.device.platform}
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
        </PavImage>
      </TouchableOpacity>);
    }else{  //related article does not exist
      return <View></View>;
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
        <View style={styles.card}>

          {this.renderHeader(styles)}
          {this.renderBody(styles)}
          {this.renderFooter(styles)}


        </View>
      </View>
    );
  }

}



FeedUserIssueCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  timeString: React.PropTypes.string.isRequired,
  issueId: React.PropTypes.string.isRequired,
  userPhotoUrl: React.PropTypes.string,
  relatedArticleUrl: React.PropTypes.string,
  relatedArticleTitle: React.PropTypes.string,
  relatedArticlePhotoUrl: React.PropTypes.string,
  relatedBillTitle: React.PropTypes.string,
  userReaction: React.PropTypes.string.isRequired,
  happyCnt: React.PropTypes.number.isRequired,
  neutralCnt: React.PropTypes.number.isRequired,
  sadCnt: React.PropTypes.number.isRequired,

  onSocialClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onReactionClick: React.PropTypes.func.isRequired,
};
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default FeedUserIssueCard;
