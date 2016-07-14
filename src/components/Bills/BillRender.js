/* @flow weak */
/**
 * # BillRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import LinearGradient from 'react-native-linear-gradient';

import SummaryTabRender from './SummaryTabRender';
import InfoTabRender from './InfoTabRender';
import StatusTabRender from './StatusTabRender';
import CommentsTabRender from './CommentsTabRender';


import {stripBrsFromText} from '../../lib/Utils/htmlTextStripper';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'


import ScrollableTabView from 'react-native-scrollable-tab-view';
import BillTabBar from './BillTabBar';
// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

import {Colors, ScheneKeys, Other} from '../../config/constants';

const {SOCIAL_TYPES} = Other;
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import PavSpinner from '../../lib/UI/PavSpinner'
import congratsScreenPhoto from '../../../assets/congratsScreen.png';


/**
* Icons library
*/

import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;










const styles = StyleSheet.create({


  container: {
    backgroundColor: 'white',
    flex:1,
    flexDirection: 'column',
    paddingTop:(Platform.OS === 'ios')? 64 : 54,   //nav bar height

    // paddingBottom:50, //tab bar height //TODO: Uncomment this if we have a tab bar

    // marginVertical: 10,
    // marginHorizontal:15
  },
  billContainer:{
    flex:1,
    // backgroundColor: 'blue',
  },


  //HEADER
  billImage:{
    // flex:1,
    // height: h*0.26
  },
  headerContainer:{
    flex:1,
    flexDirection: 'column',
  },
  headerTitleContainer:{
    // backgroundColor:'purple',
    flex:1,
    width:w,
    justifyContent:'center',
    alignItems:'flex-start',  //horizontally
    paddingVertical: h*0.013,
    paddingHorizontal: w*0.025,
  },
  headerTitle:{
    backgroundColor: Colors.transparentColor,
    color: Colors.mainTextColor,
    fontFamily: 'Whitney-Regular',
    // textAlign:'center',
    fontSize: getCorrectFontSizeForScreen(15),
  },
  // headerTitleContainer:{
  //   backgroundColor:'purple',
  //   flex:1,
  //   justifyContent:'center',
  //   alignItems:'center',  //horizontally
  //   paddingVertical: h*0.013,
  //   paddingHorizontal: w*0.012,
  // },
  // headerTitle:{
  //   backgroundColor: Colors.transparentColor,
  //   color: Colors.mainTextColor,
  //   fontFamily: 'Whitney-Regular',
  //   textAlign:'center',
  //   fontSize: getCorrectFontSizeForScreen(15),
  // },

  headerBtnsContainer:{
    // backgroundColor:'pink',
    flexDirection:'row',
    paddingVertical: h*0.020,
    // justifyContent:'space-between', //was 'space-around'
    paddingHorizontal: w*0.015, //was 0
    alignItems:'center'
  },
  headerSocialShareBtnContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red'
  },
  headerSocialShareBtn:{
    backgroundColor: Colors.transparentColor,
    color: Colors.secondaryTextColor,
    paddingHorizontal: w*0.020,
  },
  headerTagBtnContainer:{
    // backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },

  tagsLblTextContainer:{
    paddingHorizontal: w*0.011,
  },
  tagsLblText:{
    backgroundColor: Colors.transparentColor,
    color: Colors.secondaryTextColor,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(9),
  },

  tagBtn:{
    justifyContent:'center',
    height:23,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: Colors.accentColor,
    borderColor: Colors.accentColor
  },
  tagBtnContainer:{
    paddingHorizontal: w*0.003,
  },
  tagTitleTextContainer:{
    paddingHorizontal: w*0.020,
  },
  tagTitleText:{
    backgroundColor: Colors.transparentColor,
    color: Colors.mainTextColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(8),
  },






  /* BODY */
  pagesContainer:{
    flex:1,
    // backgroundColor:'blue',
    // backgroundColor:'red'
  },
  spinnerContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red',
  },
  tabText:{
    paddingHorizontal: w*0.009,
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(8),
    color: Colors.primaryColor,
    textAlign:'center',
  },
  /* BODY - Pages */

  summaryPageContainer:{
    backgroundColor:'white'
  },










  //FOOTER
  billBtnsContainer:{

    flexDirection: 'row',
    justifyContent:'space-between',
    paddingVertical: h*0.010,
    paddingHorizontal: w*0.038,
    borderTopWidth:1,
    borderTopColor: Colors.alternativeAccentColor,
  },
  // btnIconStyle:{
  //   marginHorizontal: 10
  // },
  footerBtnTextContainer:{
    justifyContent:'center',
    paddingHorizontal: w*0.028,
  },
  footerBtnText:{
    color: Colors.mainTextColor,
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(10),
    textAlign:'center',
    // backgroundColor:'blue',
  },

  footerBtn:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    width: w*0.45,
    paddingHorizontal:w*0.010,
    paddingVertical: h*0.020,
    borderRadius:2,
    backgroundColor: "#ED9518",
    borderWidth:0,

    // borderWidth:1,
    // borderColor: 'rgba(0, 0, 0, 0.11)',
    // borderTopWidth:2,

    // shadowColor: 'rgba(0, 0, 0, 0.12)',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 2,
    // },
  },
  footerBtnIcon:{
    // backgroundColor: 'red',
    color: Colors.mainTextColor,
    paddingLeft: w*0.020,
    paddingRight: w*0.002,
  }



});


class BillRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={curImgHeight:0}
  }



  onTwitterBtnClicked(billData){
    if(this.props.onSocialClick){
      this.props.onSocialClick(SOCIAL_TYPES.TWITTER, billData);
    }
  }

  onFacebookBtnClicked(billData){
    if(this.props.onSocialClick){
      this.props.onSocialClick(SOCIAL_TYPES.FACEBOOK, billData);
    }
  }


  renderBillTags(tags){
    if(tags!=null){
      return (<View style={styles.headerTagBtnContainer}>
        <View style={styles.tagsLblTextContainer}>
          <Text style={styles.tagsLblText}>Tags: </Text>
        </View>
        {tags.map((tag, i) =>
          (<View key={"tag"+i+"container"} style={styles.tagBtnContainer}><TouchableOpacity
            key={"tag"+i+"btn"}
            onPress={()=>this.props.onTagPress(tag)}
            style={styles.tagBtn}>
            <View  key={"tag"+i+"txtContainer"} style={styles.tagTitleTextContainer}>
              <Text key={"tag"+i+"txt"} style={styles.tagTitleText}>{tag.toUpperCase()}</Text>
            </View>
          </TouchableOpacity></View>)
        )}
      </View>);
    }else{
      return <View></View>;
    }
  }

  renderHeader(billData, platform){
    // console.log("bill: "+JSON.stringify(billData))
    if(!!billData){

      let billTitle = billData.featured_bill_title || billData.short_title;
      return (
        <PavImage
        key="bill_header"
        platform={platform}
        style={[styles.billImage, {height:(this.state.curImgHeight<=0?null:this.state.curImgHeight)}]}
        defaultSource={congratsScreenPhoto}
        source={{uri: billData.featured_img_link}}
        resizeMode='cover'
        onLayout={(e)=>{
          let {height} = e.nativeEvent.layout;
          let minimumImgHeight = h*0.23;
          // console.log("Min height implementation: "+minimumImgHeight+" when the image height was "+height);
          if(height<= minimumImgHeight){
            this.setState({curImgHeight:minimumImgHeight});
          }
        }}
        >
          <LinearGradient
              colors={['black', 'rgba(0, 0, 0, 0.41)', 'black']}
              start={[-0.3, 0.0]} end={[1.3, 0.0]}
              style={styles.headerContainer}
              >
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{billTitle}</Text>
              </View>
              <View style={styles.headerBtnsContainer}>

                <View style={styles.headerSocialShareBtnContainer}>
                  <TouchableOpacity onPress={this.onTwitterBtnClicked.bind(this, billData)}>
                    <PavIcon name="social-twitter" size={18} style={styles.headerSocialShareBtn}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onFacebookBtnClicked.bind(this, billData)}>
                    <PavIcon name="facebook" size={16} style={styles.headerSocialShareBtn}/>
                  </TouchableOpacity>
                </View>

                {this.renderBillTags(billData.pav_tags)}


              </View>
          </LinearGradient>
        </PavImage>);
    }else{
      return <Text key="bill_header"></Text>
    }
  }
// onChangeTab={(data)=>{this.props.onTopicSelected(this.state.pagesToRender[data.i].key)}}
  renderBody(data){
    let {billData, commentData, isFetchingComments, isFetchingTopComments, isFetchingcommentBeingAltered} = data;

    if(!!billData){
      return (<ScrollableTabView
        key="bill_render_body"
        ref="scrollableTabView"
        onChangeTab={({i, ref}) => {if(i==1){if(this.props.parentVisible===true){this.refs.status_tab.onTabFocus();} }}}
        renderTabBar={() =>
          <BillTabBar
            underlineColor={Colors.negativeAccentColor}
            activeTextColor={Colors.primaryColor}
            inactiveTextColor={Colors.primaryColor}
            backgroundColor='rgba(255, 255, 255, 0.85)'
            textStyle={styles.tabText}
          />}
        initialPage={this.props.initTab}
        style={styles.pagesContainer}
      >
        <SummaryTabRender

          tabLabel="Summary"
          ref="summary_tab"
          billData={{
              shortSummary: billData.featured_bill_summary,
              pointAgainst: billData.points_against,
              pointInFavor: billData.points_infavor,
            }}
          orientation={this.props.device.orientation}
          goToMoreInfoPage={()=>this.refs.scrollableTabView.goToPage(1)}
          parentVisible={this.props.parentVisible}
        />

        <StatusTabRender

          tabLabel="Status "
          ref="status_tab"
          orientation={this.props.device.orientation}
          billStatus={billData.status}
          billHistory={billData.history}
          parentVisible={this.props.parentVisible}
        />


        <InfoTabRender

          tabLabel="Bill Info "
          ref="info_tab"
          billData={{
              officialSummary: stripBrsFromText(billData.summary),
              officialTitle: billData.official_title,
              pdfUrl: billData.last_version.urls.pdf,
              status: billData.status,
              sponsor:{
                photo: billData.sponsor.img_url,
                firstName: billData.sponsor.first_name,
                lastName: billData.sponsor.last_name,
                party:  billData.sponsor.current_term.party,
                state:  billData.sponsor.state,
                termStart:  billData.sponsor.current_term.start,
                termEnd:  billData.sponsor.current_term.end,
                district:  billData.sponsor.current_term.district,
                sponsorUrl:  billData.sponsor.current_term.url,
              },
              coSponsorsCount:{
                independent: billData.cosponsors_count.independent,
                republican: billData.cosponsors_count.republican,
                democrat: billData.cosponsors_count.democrat,
                total: (billData.cosponsors_count.independent+billData.cosponsors_count.republican+billData.cosponsors_count.democrat)
              }
            }}
          onDownloadBillAsPDF={this.props.onDownloadBillAsPDF}
          onSponsorClick={this.props.onSponsorClick}
          orientation={this.props.device.orientation}
          parentVisible={this.props.parentVisible}
        />


        <CommentsTabRender

          tabLabel="Comments"
          ref="comments_tab"
          commentData={commentData}
          billId={billData.bill_id}
          commentBeingAltered={isFetchingcommentBeingAltered}
          commentsBeingFetched={isFetchingComments}
          topCommentsBeingFetched={isFetchingTopComments}
          onCommentsRefresh={this.props.onCommentsRefresh}
          onCommentUserClick={this.props.onCommentUserClick}
          onCommentLikeDislikeClick={this.props.onCommentLikeDislikeClick}
          onCommentPost={this.props.onCommentPost}
          onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
          device={this.props.device}
          parentVisible={this.props.parentVisible}
        />

     </ScrollableTabView>);
   }else{
     return <PavSpinner key="bill_render_body" />;
   }
  }


  renderFooter(alreadyVoted, voteBtnEnabled){
    if(alreadyVoted!=null){
      // console.log("@@@@@@@@ Vote button enabled: "+voteBtnEnabled);
      return (
        <View style={styles.billBtnsContainer}>


            <Button
            onPress={alreadyVoted===true?()=>{alert("You have already voted on this bill.")}:this.props.onVoteBtnPress}
            isDisabled={(voteBtnEnabled===false)}
            isLoading={(voteBtnEnabled===false)}
            style={styles.footerBtn}
            textStyle={styles.footerBtnText}>
            {alreadyVoted===true?"Already Voted":"Vote Now"}
            </Button>

        </View>);
    }else{
      return <View></View>;
    }

  }




  /**
   * ### render method
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);

    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    let billData;
    if(!!this.props.billData){
      billData = this.props.billData.toJS()
    }
    return(
      <View style={styles.container}>
        <View style={styles.billContainer}>
          {this.renderHeader(billData, Platform.OS)}
          {this.renderBody({
            billData: billData,
            commentData: this.props.bill.comments,
            isFetchingComments: this.props.bill.isFetching.billComments,
            isFetchingTopComments: this.props.bill.isFetching.billTopComments,
            isFetchingcommentBeingAltered: this.props.bill.commentBeingAltered,
          })}
        </View>
        {this.renderFooter((billData&&billData.user_voted), (billData!=null))}
      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      // nextProps.parentVisible==true &&
      (nextProps.bill !== this.props.bill)
      ||
      (nextProps.billData !== this.props.billData)
      ||
      (nextProps.isFetchingBillData !== this.props.isFetchingBillData)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
      ||
      (nextState.minimumImgHeight!==this.state.minimumImgHeight)
    );
  }

}

// billTitle="Whatevah"
// subjectTitle="Whatevah"
// favorPercentage={23}


BillRender.propTypes= {

  device: React.PropTypes.object.isRequired,
  bill: React.PropTypes.object.isRequired,
  isFetchingBillData: React.PropTypes.bool.isRequired,
  billData: React.PropTypes.object,
  initTab: React.PropTypes.number,
  parentVisible: React.PropTypes.bool.isRequired,
  onSocialClick: React.PropTypes.func.isRequired,
  onVoteBtnPress: React.PropTypes.func.isRequired,
  onSponsorClick: React.PropTypes.func.isRequired,
  onDownloadBillAsPDF: React.PropTypes.func.isRequired,
  onCommentsRefresh: React.PropTypes.func.isRequired,
  onCommentUserClick: React.PropTypes.func.isRequired,
  onCommentLikeDislikeClick: React.PropTypes.func.isRequired,
  onShowMoreCommentsClick: React.PropTypes.func.isRequired,
  onCommentPost: React.PropTypes.func.isRequired,
  onTagPress: React.PropTypes.func.isRequired,
};
export default BillRender;
