  /* @flow weak */
/**
 * # BillStatusPageRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {BILL_STATUSES} = Other;
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
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


/**
* Image library
*/

// import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;













class BillStatusPageRender extends Component {
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


      statusPageContainer:{
        flex:1,
        backgroundColor:'white'
      },
      scrollViewContainer:{
        flex:1,
      },
      statusHeaderContainer:{
        flex:1,
        backgroundColor: Colors.titleBgColor,
        borderBottomColor: "rgba(0, 0, 0, 0.07)",
        borderBottomWidth: 1,

        // shadowColor: 'rgba(0, 0, 0, 0.12)',
      },
      statusHeaderText:{
        paddingHorizontal: w*0.011,
        paddingVertical: h*0.015,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      finalItemPadding:{
        paddingBottom: h*0.015,
      },





      statusIconsContainer:{
        flex:1,
        flexDirection:'column',
        // justifyContent:'space-between',
        alignItems:'center',
      },
      statusPartContainer:{
        flex:1,
        flexDirection:'row',
        // backgroundColor:'purple',
        alignItems:"center",
      },


      /* LEFT SIDE */
      lineViewContainer:{
        paddingHorizontal: w*0.04,
        flexDirection:'column',
        // width:10,
        justifyContent:'center',
        // backgroundColor:'red',
        alignItems:'center'
      },
      line:{
        // flex:1,
        height:h*0.08,
        width:8,
        // marginHorizontal:6,
        backgroundColor:Colors.negativeAccentColor,
      },
      iconContainer:{
        backgroundColor:Colors.titleBgColor,
        padding: w*0.04,
        borderRadius:2,
        borderWidth:1,
        borderColor: "rgba(0, 0, 0, 0.07)",
      },

      activeStatusIcon:{
        // paddingHorizontal: w*0.011,
        color:Colors.primaryColor,
        // backgroundColor:'purple',
      },
      inactiveStatusIcon:{
        color:Colors.titleBgColorDark,
      },









      /* RIGHT SIDE */

      explanationsContainer:{
        flexDirection:'column',
        paddingHorizontal: w*0.05,
        // backgroundColor:'yellow'
      },
      statusTitleText:{
        width: w*0.6,
        paddingVertical: h*0.008,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      inactiveStatusText:{
        color: Colors.helpTextColor,
      },
      activeStatusText:{
        color: Colors.thirdTextColor,
      },
      statusDescriptionText:{
        width: w*0.6,
        paddingVertical: h*0.008,
        fontFamily: 'Whitney-Book',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      statusDescription2Text:{
        paddingVertical: h*0.008,
        fontFamily: 'Whitney-MediumItalic',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },



    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }




  createStatusRow(active, iconName, title, explanation, styles, finalItem){
    finalItem = finalItem || false;
    let key = iconName+Date();
    console.log("Active: "+active);
    return (<View key={key+"_container"} style={finalItem==true?[styles.statusPartContainer,styles.finalItemPadding]:styles.statusPartContainer}>


      <View key={key+"_line_container"} style={styles.lineViewContainer}>
        <View key={key+"_line_1"} style={styles.line}></View>
        <View key={key+"_icon_container"} style={styles.iconContainer}>
          <PavIcon key={key+"_icon"} name={iconName} size={55} style={active?styles.activeStatusIcon:styles.inactiveStatusIcon}/>
        </View>
        {finalItem==true?<View></View>:<View key={key+"_line_2"} style={styles.line}></View>}
      </View>

      <View key={key+"_explan_container"} style={styles.explanationsContainer}>
        <Text key={key+"_title"} style={active==true?[styles.statusTitleText, styles.activeStatusText]:[styles.statusTitleText, styles.inactiveStatusText]}>{title}</Text>
        <Text key={key+"_description"} style={active==true?[styles.statusDescriptionText, styles.activeStatusText]:[styles.statusDescriptionText, styles.inactiveStatusText]}>
          <Text style={active==true?[styles.statusDescription2Text, styles.activeStatusText]:[styles.statusDescription2Text, styles.inactiveStatusText]}> Meaning:</Text> {explanation}
        </Text>
      </View>
    </View>);
  }



  houseIconShouldBeRenderedFirst(billHistory){
    return (
      (!!billHistory.house_passage_result && billHistory.house_passage_result=="pass" && !!billHistory.senate_passage_result && billHistory.senate_passage_result=="failed")
      ||
      (!!billHistory.house_passage_result && billHistory.house_passage_result=="pass" && !billHistory.senate_passage_result)
      ||
      (!billHistory.house_passage_result && !billHistory.senate_passage_result)
    )
  }



  createHouseIcon(billHistory, styles){
    if(!!billHistory.house_passage_result && billHistory.house_passage_result=="pass"){ //a vote took place in the House and the bill passed
      return {element: (this.createStatusRow(true,"bill-house-pass", "Passed House", BILL_STATUSES["PASS_OVER:HOUSE"].explanation, styles)), lastItem:false}
    }else if(!!billHistory.house_passage_result && billHistory.house_passage_result=="fail"){ //a vote took place in the House and the bill was rejected
      return {element: (this.createStatusRow(true,"bill-house-reject", BILL_STATUSES["FAIL:ORIGINATING:HOUSE"].title, BILL_STATUSES["FAIL:ORIGINATING:HOUSE"].explanation, styles, true)), lastItem:true} //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
    }else{  //not vote has taken place yet in the house
      return {element: (this.createStatusRow(false,"bill-house", "No House Vote Yet.", "The House hasn't voted for this bill yet.", styles)), lastItem:false}
    }
  }

  createSenateIcon(billHistory, styles){
    if(!!billHistory.senate_passage_result && billHistory.senate_passage_result=="pass"){ //a vote took place in the House and the bill passed
      return {element: (this.createStatusRow(true,"bill-senate-pass", "Passed Senate", BILL_STATUSES["PASS_OVER:SENATE"].explanation, styles)), lastItem:false}
    }else if(!!billHistory.senate_passage_result && billHistory.senate_passage_result=="fail"){ //a vote took place in the House and the bill was rejected
      return {element: (this.createStatusRow(true,"bill-senate-reject", BILL_STATUSES["FAIL:ORIGINATING:SENATE"].title, BILL_STATUSES["FAIL:ORIGINATING:SENATE"].explanation, styles, true)), lastItem:true}
    }else{  //not vote has taken place yet in the house
      return {element: (this.createStatusRow(false,"bill-senate", "No Senate Vote Yet.", "The Senate hasn't voted for this bill yet.", styles)), lastItem:false}
    }
  }


  createIconsBasedOnBillStatus(billStatus, billHistory, styles){
    let iconElements = [];
    // let icons=BILL_STATUSES[billStatus].icons;
    // let title = BILL_STATUSES[billStatus].title;
    // let explanation = BILL_STATUSES[billStatus].explanation;

    iconElements.push(this.createStatusRow(true, "introduced", BILL_STATUSES["INTRODUCED"].title, BILL_STATUSES["INTRODUCED"].explanation, styles));
    iconElements.push(this.createStatusRow(true, "committee", BILL_STATUSES["REPORTED"].title, BILL_STATUSES["REPORTED"].explanation, styles));


    let houseFirst = this.houseIconShouldBeRenderedFirst(billHistory);
    if(houseFirst==true){
      let house = this.createHouseIcon(billHistory, styles);
      iconElements.push(house.element)
      if(house.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
      let senate = this.createSenateIcon(billHistory, styles);
      iconElements.push(senate.element)
      if(senate.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
    }else{
      let senate = this.createSenateIcon(billHistory, styles);
      iconElements.push(senate.element)
      if(senate.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
      let house = this.createHouseIcon(billHistory, styles);
      iconElements.push(house.element)
      if(house.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
    }

    if(billHistory.enacted==true && billHistory.vetoed==false){
      iconElements.push(this.createStatusRow(true, "bill-passed", BILL_STATUSES["PASSED:BILL"].title, BILL_STATUSES["PASSED:BILL"].explanation, styles,true));
    }else if(billHistory.enacted==true && billHistory.vetoed==true){
      iconElements.push(this.createStatusRow(true, "bill-passed", BILL_STATUSES["PROV_KILL:VETO"].title, BILL_STATUSES["PROV_KILL:VETO"].explanation, styles, true));   //TODO: perhaps add more statuses after the veto here in the future
    }else{  //NOT enacted and NOT vetoed
      if((!!billHistory.house_passage_result && billHistory.house_passage_result=="pass") && (!!billHistory.senate_passage_result && billHistory.senate_passage_result=="pass")){ //it passed both in the house and the senate
          iconElements.push(this.createStatusRow(true, "bill-passed", "Awaiting for the president to vote.", "The bill has passed from both the House and the Senate and we are now waiting for the president to sign the bill into a law.", styles, true));
      }else{
        iconElements.push(this.createStatusRow(false, "bill-passed", "Awaiting for the houses to aggree.", "The bill cannot go to the president before both the House and the Senate vote for it.", styles, true));
      }
    }







    // alert(icons);
    return iconElements;
  }



  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View style={styles.statusPageContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.statusHeaderContainer}>
            <Text style={styles.statusHeaderText}>
              BILL STATUS
            </Text>
          </View>

          <View style={styles.statusIconsContainer}>
            {this.createIconsBasedOnBillStatus(this.props.billStatus,this.props.billHistory, styles)}
          </View>




        </ScrollView>


      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.billHistory !== this.props.billHistory)
      ||
      (nextProps.billStatus !== this.props.billStatus)
      ||
      (nextProps.orientation !== this.props.orientation)
    );
  }

}


export default BillStatusPageRender;
