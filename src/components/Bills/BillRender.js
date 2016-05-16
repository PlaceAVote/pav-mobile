/* @flow weak */
/**
 * # BillRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import LinearGradient from 'react-native-linear-gradient';

import SummaryPageRender from './SummaryPageRender';
import MoreInfoPageRender from './MoreInfoPageRender';
import BillStatusPageRender from './BillStatusPageRender';


import {stripBrsFromText} from '../../lib/Utils/htmlTextStripper';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'


import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);




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













class BillRender extends Component {
  constructor(props) {
    super(props);
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        backgroundColor: 'white',
        flex:1,
        flexDirection: 'column',
        paddingTop:64, //nav bar height
        paddingBottom:50, //tab bar height
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
        height: h*0.26
      },
      headerContainer:{
        flex:1,
        flexDirection: 'column',
      },
      headerTitleContainer:{
        // backgroundColor:'purple'
        flex:1,
        justifyContent:'center',
        alignItems:'center',  //horizontally
      },
      headerTitle:{
        backgroundColor: Colors.transparentColor,
        paddingVertical: h*0.015,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,18),
      },
      headerBtnsContainer:{
        // backgroundColor:'pink',
        flexDirection:'row',
        paddingVertical: h*0.020,
        justifyContent:'space-around',
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
      tagsLblContainer:{
        justifyContent:'center',
        backgroundColor:'red',
        height:23,
      },
      tagsLblText:{
        backgroundColor: Colors.transparentColor,
        paddingHorizontal: w*0.011,
        color: Colors.secondaryTextColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },

      tagBtn:{
        justifyContent:'center',
        height:23,
        borderRadius: 2,
        borderWidth: 1,
        backgroundColor: Colors.accentColor,
        borderColor: Colors.accentColor
      },
      tagTitleText:{
        backgroundColor: Colors.transparentColor,
        paddingHorizontal: w*0.020,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },






      /* BODY */
      pagesContainer:{
        flex:1,
        // backgroundColor:'blue',
        // backgroundColor:'red'
      },
      tabText:{
        paddingHorizontal: w*0.009,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
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
        paddingVertical: h*0.005,
      },
      // btnIconStyle:{
      //   marginHorizontal: 10
      // },
      footerBtnText:{
        paddingHorizontal: w*0.008,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
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
        backgroundColor: "#F4F4F4",
        borderWidth:1,
        borderColor: 'rgba(0, 0, 0, 0.11)',
        borderTopWidth:2,

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
        color: 'rgba(0, 0, 0, 0.71)',
        paddingHorizontal: w*0.020,
      }



    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
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


  renderHeader(billData, platform, styles){
    // console.log("bill: "+JSON.stringify(billData))
    if(!!billData){
      return (
        <PavImage
        key="bill_header"
        platform={platform}
        style={styles.billImage}
        source={{uri: billData.featured_img_link}}
        resizeMode='cover'
        >
          <LinearGradient
              colors={['black', 'rgba(0, 0, 0, 0.41)', 'black']}
              start={[-0.3, 0.0]} end={[1.3, 0.0]}
              style={styles.headerContainer}
              >
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{billData.featured_bill_title}</Text>
              </View>
              <View style={styles.headerBtnsContainer}>

                <View style={styles.headerSocialShareBtnContainer}>
                  <TouchableOpacity onPress={this.onTwitterBtnClicked.bind(this)}>
                    <PavIcon name="social-twitter" size={18} style={styles.headerSocialShareBtn}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onFacebookBtnClicked.bind(this)}>
                    <PavIcon name="facebook" size={16} style={styles.headerSocialShareBtn}/>
                  </TouchableOpacity>
                </View>

                <View style={styles.headerTagBtnContainer}>
                  <Text style={styles.tagsLblText}>Tags: </Text>
                  {billData.pav_tags.map((tag, i) =>
                    (<TouchableOpacity
                      key={"tag"+i+"btn"}
                      onPress={this.props.onTagPress}
                      style={styles.tagBtn}>
                      <Text key={"tag"+i+"txt"}style={styles.tagTitleText}>{tag}</Text>
                    </TouchableOpacity>)
                  )}
                </View>

              </View>
          </LinearGradient>
        </PavImage>);
    }else{
      return <Text key="bill_header">NO DATA</Text>
    }

  }
// onChangeTab={(data)=>{this.props.onTopicSelected(this.state.pagesToRender[data.i].key)}}
  renderBody(billData, styles){

    if(!!billData){
      return (<ScrollableTabView
        ref="scrollableTabView"
        renderTabBar={() =>
          <DefaultTabBar
            indicatorPosition="bottom"
            indicatorArrowsEnabled={false}
            underlineColor={Colors.negativeAccentColor}
            activeTextColor={Colors.primaryColor}
            inactiveTextColor={Colors.primaryColor}
            backgroundColor='rgba(255, 255, 255, 0.85)'
          />}
        initialPage={1}
        style={styles.pagesContainer}
        tabBarTextStyle={styles.tabText}
      >
        <SummaryPageRender
          tabLabel="Summary"
          billData={{
              shortSummary: billData.featured_bill_summary,
              pointAgainst: billData.points_against,
              pointInFavor: billData.points_infavor,

            }}
          orientation={this.props.device.orientation}
          goToMoreInfoPage={()=>this.refs.scrollableTabView.goToPage(1)}
        />
        <MoreInfoPageRender
          tabLabel="Bill Info "
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
              }
            }}
          onDownloadBillAsPDF={this.props.onDownloadBillAsPDF}
          onSponsorClick={this.props.onSponsorClick}
          orientation={this.props.device.orientation}
          goToReadEntireBillPage={()=>alert("Read entire bill")}
          platform={this.props.device.platform}
        />

        <BillStatusPageRender
          tabLabel="Status "
          orientation={this.props.device.orientation}
          billStatus={billData.status}
        />


      <View tabLabel="Comments"><Text>Comments</Text></View>

     </ScrollableTabView>);
   }else{
     return <View></View>;
   }
  }


  renderFooter(styles){
    return (
      <View style={styles.billBtnsContainer}>
        <TouchableOpacity style={styles.footerBtn} onPress={this.props.onVoteBtnPress}>
          <PavIcon name="bolt" size={16} style={styles.footerBtnIcon}/>
          <Text style={styles.footerBtnText}>I'M READY TO VOTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={()=>this.refs.scrollableTabView.goToPage(2)}>
          <PavIcon name="comment" size={16} style={styles.footerBtnIcon}/>
          <Text style={styles.footerBtnText}>COMMENT</Text>
        </TouchableOpacity>
      </View>);
  }




  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View style={styles.container}>
        <View style={styles.billContainer}>
          {this.renderHeader(this.props.bill.data, this.props.device.platform, styles)}
          {this.renderBody(this.props.bill.data, styles)}
        </View>
        {this.renderFooter(styles)}
      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.bill !== this.props.bill)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
    );
  }

}


export default BillRender;
