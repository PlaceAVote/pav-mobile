/* @flow weak */
/**
 * # MoreInfoPageRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {US_STATES, BILL_STATUSES} = Other;
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,

}
from 'react-native';

import {getNumberWithOrdinalSufix} from '../../lib/Utils/numberText';


import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation


// import { createIconSet} from 'react-native-vector-icons';
// const glyphMap = { 'icon-arrow-down': 'l', 'arrow-down': 'l' };
// const PavIcon = createIconSet(glyphMap, 'pav');

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);




/**
* Image library
*/

import PavImage from '../../lib/UI/PavImage'

import moment from 'moment';



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;


import AnimatedPavLineChart from './AnimatedPavLineChart'










class MoreInfoPageRender extends Component {
  constructor(props) {
    super(props);

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),

  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      pageContainer:{
        flex:1,
        backgroundColor:'white'
      },
      scrollViewContainer:{
        flex:1,
      },

      headerText:{
        flex:1,
        paddingHorizontal: w*0.015,
        paddingVertical: h*0.015,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      bodyContainer:{
        paddingVertical: h*0.017,
        paddingHorizontal: w*0.030,
        backgroundColor:'white'
      },
      titleContainer:{
        flex:1,
        backgroundColor: Colors.titleBgColor,
        borderBottomColor: "rgba(0, 0, 0, 0.07)",
        borderBottomWidth: 1,
      },
      titleWithMultipleChildren:{
        flexDirection:'row',
        alignItems:'center'
      },
      bodyText:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      bodyReadMoreText:{
        paddingVertical: h*0.008,
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },


      /* Bill Status */
      statusContainer:{
        flexDirection:'row',
      },

      statusIconContainer:{
        backgroundColor:Colors.titleBgColorDark,
        justifyContent:'center',
        alignItems:'center',
        height: w*0.21,
        width: w*0.21,
      },
      statusIcon:{
        // paddingHorizontal: w*0.011,
        color:Colors.fourthTextColor
      },
      statusTextContainer:{
        flexDirection:'column',
        paddingHorizontal: w*0.015,
      },
      statusTitleText:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      statusDescriptionText:{
        width: w*0.73,
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-Book',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      statusDescription2Text:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-MediumItalic',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      /* CONGRESSMEN AND ORGANISATIONS INVOLVED */

      cnoContainer:{
        flexDirection:'column',
      },
      cnoBillSponsorContainer:{
        flexDirection:'row',
      },
      sponsorImage:{
        height: w*0.21,
        width: w*0.21,
      },
      sponsorTextContainer:{
        flexDirection:'column',
        paddingHorizontal: w*0.025,
      },
      sponsorTitleText:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      sponsorNameText:{
        paddingVertical: h*0.008,
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      sponsorPartyText:{
        paddingVertical: h*0.008,
        color: Colors.primaryColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,9),
      },
      cnoCosponsorContainer:{
        flexDirection:'column',
      },

      coponsorTitleText:{
        paddingVertical: h*0.008,
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      cosponsorCntText:{
        paddingVertical: h*0.004,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      cosponsorVisualGraphContainer:{
        // flexDirection:'row',
        justifyContent:'center',
        paddingVertical: h*0.008,
      },
      chartContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      },
      chart:{
        position: 'absolute',
        top: 16,
        left: 4,
        bottom: 4,
        right: 16,
      },



      /* OFFICIAL TITLE */
      officialTitleText:{
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney Semibold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      }

    });
  }


  getLastIcon(array){
    if(!!array){
      return array[array.length-1]
    }else{
      return "exclamation";
    }
  }


  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }

  handleScroll(e){
    let percentageShow = e.nativeEvent.contentOffset.y/h;
    console.log(percentageShow);
    this.refs.animatedLine.animate(percentageShow>0.62)
  }

  /**
   * ### render method
   */
  render() {

    let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    let sponsor = this.props.billData.sponsor;
    // console.log("BILL DATA: "+JSON.stringify(this.props.billData))
    // console.log("SPONSOR: "+JSON.stringify(sponsor));
    // console.log("@@@@ BILL PDF URL: "+this.props.billData.pdfUrl)
    return(
      <View style={styles.pageContainer}>
        <ScrollView
        style={styles.scrollViewContainer}
        onScroll={this.handleScroll.bind(this)}
        scrollEventThrottle={72}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>
              OFFICIAL SUMMARY
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>
              {this.props.billData.officialSummary}
            </Text>
            <TouchableOpacity onPress={()=>this.props.onDownloadBillAsPDF(this.props.billData.pdfUrl)}>
              <Text style={styles.bodyReadMoreText}>
                Download Full Bill as PDF
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.titleContainer, styles.titleWithMultipleChildren]}>
            <Text style={styles.headerText}>
              BILL STATUS
            </Text>
          </View>
          <View style={[styles.bodyContainer, styles.statusContainer]}>
            <View style={styles.statusIconContainer}>
              <PavIcon name={this.getLastIcon(BILL_STATUSES[this.props.billData.status].icons)} size={32} style={styles.statusIcon}/>
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitleText}>
                {BILL_STATUSES[this.props.billData.status].title}
              </Text>
              <Text style={styles.statusDescriptionText}>
                <Text style={styles.statusDescription2Text}>Meaning:</Text> {BILL_STATUSES[this.props.billData.status].explanation}
              </Text>
            </View>
          </View>

          <View style={[styles.titleContainer, styles.titleWithMultipleChildren]}>
            <Text style={styles.headerText}>
              REPRESENTATIVES AND ORGANISATIONS INVOLVED
            </Text>
          </View>
          <View style={[styles.bodyContainer, styles.cnoContainer]}>
            <TouchableOpacity onPress={()=>{this.props.onSponsorClick(sponsor)}}
            style={styles.cnoBillSponsorContainer}>
              <PavImage
                platform={this.props.platform}
                style={styles.sponsorImage}
                source={{uri: sponsor.photo}}
                resizeMode='cover'
              />
              <View style={styles.sponsorTextContainer}>
                <Text style={styles.sponsorTitleText}>BILL SPONSOR</Text>
                <Text style={styles.sponsorNameText}>{sponsor.firstName} {sponsor.lastName} </Text>
                <Text style={styles.sponsorPartyText}>{sponsor.party} </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.bodyText}>{sponsor.lastName} a {sponsor.party}, has been the representative for {US_STATES[sponsor.state]}'s {getNumberWithOrdinalSufix(sponsor.district)} congressional district since {moment(sponsor.termStart, 'YYYY-MM-DD').format('MMM D, YYYY')} (next election in November {moment(sponsor.termEnd, 'YYYY-MM-DD').format('YYYY')-1}).</Text>
            <View style={styles.cnoCosponsorContainer}>
              <Text style={styles.coponsorTitleText}>BILL CO SPONSORS</Text>
              <Text style={styles.cosponsorCntText}>130 Total</Text>
              <View style={styles.cosponsorVisualGraphContainer}>
                <AnimatedPavLineChart
                finalLinePercentage={0.8}
                finalLineWidth={w*0.9}
                ref="animatedLine"
                leftText="113 D"
                rightText="17 R"
                />
              </View>
            </View>

            {/*<View style={[styles.bodyContainer, styles.statusContainer]}>
              <View style={styles.statusIconContainer}>
                <PavIcon name="happy" size={32} style={styles.statusIcon}/>
              </View>
              <View style={styles.sponsorTextContainer}>
                <Text style={styles.sponsorTitleText}>BILL SPONSOR</Text>
                <Text style={styles.sponsorNameText}>Gun Owners of America</Text>
              </View>
            </View>
            <Text style={styles.bodyText}>
              Gun Owners of America (GOA) is a bla, once upon a bla, because the bla later became more bla than the original bla ever was... There used to be a bla, once upon a bla,
              because the bla later became more bla than the original bla ever was...

              There used to be a bla, once upon a bla, because the bla later became more bla than the original bla ever was...

              There used to be a bla, once upon a bla, because the bla later became more bla than the original bla ever was...
            </Text>*/}
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.headerText}>
                OFFICIAL TITLE
              </Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.officialTitleText}>
                {this.props.billData.officialTitle}
              </Text>
            </View>



        </ScrollView>


      </View>
    );
  }


  onTabFocus(){

  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.billData !== this.props.billData)
      ||
      (nextProps.orientation !== this.props.orientation)
    );
  }

}


export default MoreInfoPageRender;
