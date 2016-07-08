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
import {StyleSheet, Text, View, TouchableOpacity, Linking, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window');

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'

import LinearGradient from 'react-native-linear-gradient';
import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';


const styles = StyleSheet.create({

  cardContainer:{
    flex: 1,
    alignItems: 'stretch',
    // backgroundColor: 'pink',
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
    fontSize: getCorrectFontSizeForScreen(8),
  },
  cardDateText:{
    // backgroundColor: 'red',
    paddingHorizontal: 5,
    // color: Colors.thirdTextColor,
    color: 'rgba(0, 0, 0, 0.60)',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
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

  userIssueFullNameDynamicTextContainer:{
    paddingHorizontal: w*0.01,
  },
  userIssueFullNameDynamicText:{
    // backgroundColor:'blue',
    color:"#e64a33",
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(8),
  },
  userIssueTitleActionStaticTextContainer:{
    paddingHorizontal: w*0.002,
  },
  userIssueTitleActionStaticText:{
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
  },

  cardContentHeader:{
    flex:1,
    // backgroundColor:'green',
    justifyContent:'center',
    // paddingVertical: h*0.01
    paddingVertical:h*0.0165,
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
    width:w*0.81,
    fontFamily: 'Whitney-Italic',
    fontSize: getCorrectFontSizeForScreen(10),
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
  cardFooterTextContainer:{
    paddingHorizontal:w*0.008,
  },
  cardFooterText:{
    flex:1,
    // backgroundColor:'green',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(9),
    color: 'rgba(0, 0, 0, 0.54)',
  },
  cardFooterIconsContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    // backgroundColor:'red',
  },
  reactionContainer:{
    justifyContent:'center',
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
    textAlignVertical:'center',
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

  reactionCountTextContainer:{
    paddingHorizontal: w*0.007,
  },
  reactionCountText:{
    textAlign:'center',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(7),
  },
  userVotedText:{
    color:'#C37125'
  },
  othersVotedText:{
    color: 'rgba(0, 0, 0, 0.74)',
  },


  cardContentText:{
    // backgroundColor:'green',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(10),
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
  relatedArticleTitleTextContainer:{
    paddingVertical: h*0.015,
    paddingHorizontal: w*0.04,
  },
  relatedArticleTitleText:{
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(11),
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
    // backgroundColor:'blue'

  },
  userDetailsTouchableView:{
    flexDirection:'row',
    alignItems:'center',
  },


});


class FeedUserIssueCard extends React.Component {
  constructor(props) {
    super(props);
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






  renderHeader(){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <View style={styles.cardTitleTextAndIconContainer}>
        <TouchableOpacity style={styles.userDetailsTouchableView} onPress={this.onUserClick.bind(this)}>
          <PavImage platform={Platform.OS}
            defaultSource={defaultUserPhoto}
            style={styles.userImage}
            source={{uri: this.props.userPhotoUrl}}
            resizeMode='cover'
          />
          <View style={styles.userIssueFullNameDynamicTextContainer}>
            <Text style={styles.userIssueFullNameDynamicText}>{this.props.userFullNameText}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.userIssueTitleActionStaticTextContainer}>
          <Text style={styles.userIssueTitleActionStaticText}>shared an</Text>
        </View>
        <View style={styles.userIssueIconContainer}>
          <PavIcon name="issues" size={12} style={styles.userIssueIcon}/>
        </View>
        <Text style={styles.userIssueTitleActionStaticText}>Issue</Text>
      </View>
      <Text style={styles.cardDateText}>{this.props.timeString}</Text>
    </View>);
  }


  renderBody(){
    return (
      <View style={styles.cardContentContainer}>

        <View style={styles.cardContentHeader}>
          <Text style={styles.cardContentText} lineHeight={h*0.031}>
          {this.props.issueText}
          </Text>
        </View>

        {this.renderRelatedBillLink()}
        {this.renderRelatedArticlePreview()}
      </View>);
  }

  renderFooter(){
      return (<View style={styles.cardFooterContainer}>
        <View style={styles.cardFooterTextContainer}>
          <Text style={styles.cardFooterText}>What's your reaction?</Text>
        </View>
        <View style={styles.cardFooterIconsContainer}>
          <TouchableOpacity style={styles.reactionContainer} onPress={this.onHappyClick.bind(this)}>
            {this.renderReactionIcon("happy", this.props.happyCnt, (this.props.userReaction==REACTIONS.HAPPY))}
          </TouchableOpacity>
          <TouchableOpacity style={styles.reactionContainer} onPress={this.onNeutralClick.bind(this)}>
            {this.renderReactionIcon("neutral", this.props.neutralCnt, (this.props.userReaction==REACTIONS.NEUTRAL))}
          </TouchableOpacity>
          <TouchableOpacity style={styles.reactionContainer} onPress={this.onSadClick.bind(this)}>
            {this.renderReactionIcon("sad", this.props.sadCnt, (this.props.userReaction==REACTIONS.SAD))}
          </TouchableOpacity>
        </View>
      </View>);
  }



  renderReactionIcon(type, count, userVotedThis){

    if(count>0){
      return (<View style={[styles.reactionIconContainer, userVotedThis?styles.userVotedContainerView:styles.othersVotedContainerView]}>
        <PavIcon name={type} size={19} style={[styles.reactionIcon, userVotedThis?styles.userVotedReactionIcon:styles.othersVotedReactionIcon]}/>
        <View style={styles.reactionCountTextContainer}>
          <Text style={[ styles.reactionCountText, userVotedThis?styles.userVotedText:styles.othersVotedText]}>
            {count+" "}
          </Text>
        </View>
      </View>);
    }else{
      return (<View style={styles.zeroCntreactionIconContainer}>
        <PavIcon name={type} size={19} style={styles.reactionIcon}/>
      </View>);
    }

  }

  renderRelatedBillLink(){
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

  renderRelatedArticlePreview(){
    if(!!this.props.relatedArticleUrl && this.props.relatedArticleUrl.length>0){
      return (
      <TouchableOpacity style={styles.relatedArticleContainer} onPress={this.onRelatedArticleClicked.bind(this)}>
        <PavImage platform={Platform.OS}
          style={styles.articleImage}
          source={{uri: this.props.relatedArticlePhotoUrl}}
          resizeMode='cover'
        >
          <LinearGradient
                colors={['black', 'rgba(0, 0, 0, 0.24)', 'black']}
                start={[-0.3, 0.0]} end={[1.3, 0.0]}
                style={styles.relatedArticleTitleContainer}>
              <View  style={styles.relatedArticleTitleTextContainer}>
                <Text style={styles.relatedArticleTitleText}>{this.props.relatedArticleTitle}</Text>
              </View>
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

    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={[styles.card, this.props.cardStyle]}>

          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}


        </View>
      </View>
    );
  }

}



FeedUserIssueCard.propTypes= {
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
