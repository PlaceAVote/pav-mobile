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
  Animated

}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


import AnimatedStatusCard from "./AnimatedStatusCard";

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
    this.state={
      statusVisible:false
    }
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

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
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
    let keyName = "house_status_card";
    if(!!billHistory.house_passage_result && billHistory.house_passage_result=="pass"){ //a vote took place in the House and the bill passed
      return {ref: {keyName}, element: (<AnimatedStatusCard lineHeight={h*0.08} ref={keyName} key={keyName} active={true} iconName="bill-house-pass" title="Passed House" explanation={BILL_STATUSES["PASS_OVER:HOUSE"].explanation} finalItem={false}/>), lastItem:false}
    }else if(!!billHistory.house_passage_result && billHistory.house_passage_result=="fail"){ //a vote took place in the House and the bill was rejected
      return {ref: {keyName}, element: (<AnimatedStatusCard lineHeight={h*0.08}  ref={keyName} key={keyName} active={true} iconName="bill-house-reject" title={BILL_STATUSES["FAIL:ORIGINATING:HOUSE"].title} explanation={BILL_STATUSES["FAIL:ORIGINATING:HOUSE"].explanation} finalItem={true}/>), lastItem:true} //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
    }else{  //not vote has taken place yet in the house
      return {ref: {keyName}, element: (<AnimatedStatusCard lineHeight={h*0.08}  ref={keyName} key={keyName} active={false} iconName="bill-house" title="No House Vote Yet." explanation="The House hasn't voted for this bill yet." finalItem={false}/>), lastItem:false}
    }
  }

  createSenateIcon(billHistory, styles){
    let keyName = "senate_status_card";
    if(!!billHistory.senate_passage_result && billHistory.senate_passage_result=="pass"){ //a vote took place in the House and the bill passed
      return {ref: {keyName}, element: (<AnimatedStatusCard lineHeight={h*0.08} ref={keyName} key={keyName} active={true} iconName="bill-senate-pass" title="Passed Senate" explanation={BILL_STATUSES["PASS_OVER:SENATE"].explanation} finalItem={false}/>), lastItem:false}
    }else if(!!billHistory.senate_passage_result && billHistory.senate_passage_result=="fail"){ //a vote took place in the House and the bill was rejected
      return {ref: {keyName}, element: (<AnimatedStatusCard lineHeight={h*0.08} ref={keyName}  key={keyName} active={true} iconName="bill-senate-reject" title={BILL_STATUSES["FAIL:ORIGINATING:SENATE"].title} explanation={BILL_STATUSES["FAIL:ORIGINATING:SENATE"].explanation} finalItem={true}/>), lastItem:true} //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
    }else{  //not vote has taken place yet in the house
      return {ref: {keyName}, element: (<AnimatedStatusCard lineHeight={h*0.08} ref={keyName}  key={keyName} active={false} iconName="bill-senate" title="No Senate Vote Yet." explanation="The Senate hasn't voted for this bill yet." finalItem={false}/>), lastItem:false}
    }
  }


  createIconsBasedOnBillStatus(billStatus, billHistory, styles){
    let iconElements = [];

    // let icons=BILL_STATUSES[billStatus].icons;
    // let title = BILL_STATUSES[billStatus].title;
    // let explanation = BILL_STATUSES[billStatus].explanation;
    iconElements.push(<AnimatedStatusCard lineHeight={h*0.08} ref="introduced_status_card"  key="introduced_status_card" active={true} iconName="introduced" title={BILL_STATUSES["INTRODUCED"].title} explanation={BILL_STATUSES["INTRODUCED"].explanation} finalItem={false}/>)
    iconElements.push(<AnimatedStatusCard lineHeight={h*0.08} ref="committee_status_card" key="committee_status_card" active={true} iconName="committee" title={BILL_STATUSES["REPORTED"].title} explanation={BILL_STATUSES["REPORTED"].explanation} finalItem={false}/>)

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

    let keyName="enacted_status_card"
    if(billHistory.enacted==true && billHistory.vetoed==false){
      iconElements.push(<AnimatedStatusCard lineHeight={h*0.08} ref={keyName}  key={keyName} active={true} iconName="bill-passed" title={BILL_STATUSES["PASSED:BILL"].title} explanation={BILL_STATUSES["PASSED:BILL"].explanation} finalItem={true}/>)
    }else if(billHistory.enacted==true && billHistory.vetoed==true){
      iconElements.push(<AnimatedStatusCard lineHeight={h*0.08} ref={keyName}  key={keyName} active={true} iconName="bill-passed" title={BILL_STATUSES["PROV_KILL:VETO"].title} explanation={BILL_STATUSES["PROV_KILL:VETO"].explanation} finalItem={true}/>)//TODO: perhaps add more statuses after the veto here in the future
    }else{  //NOT enacted and NOT vetoed
      if((!!billHistory.house_passage_result && billHistory.house_passage_result=="pass") && (!!billHistory.senate_passage_result && billHistory.senate_passage_result=="pass")){ //it passed both in the house and the senate
        iconElements.push(<AnimatedStatusCard lineHeight={h*0.08} ref={keyName}  key={keyName} active={false} iconName="bill-passed" title="Awaiting for the president to vote." explanation="The bill has passed from both the House and the Senate and we are now waiting for the president to sign the bill into a law." finalItem={true}/>)
      }else{
        iconElements.push(<AnimatedStatusCard lineHeight={h*0.08} ref={keyName}  key={keyName} active={false} iconName="bill-passed" title="Awaiting for the houses to aggree." explanation="The bill cannot go to the president before both the House and the Senate vote for it." finalItem={true}/>)
      }
    }

    return iconElements;
  }





  async onTabFocus(){
      if(!!this.props.billHistory && this.state.statusVisible==false){

        let scrollResponder = this.refs.stat_scrollview.getScrollResponder();
        scrollResponder.scrollResponderScrollTo({x: 0, y: 0, animated: true});
        let houseFirst = this.houseIconShouldBeRenderedFirst(this.props.billHistory);
        let toAnimateArr = ["introduced_status_card", "committee_status_card", houseFirst==true?"house_status_card":"senate_status_card",houseFirst==true?"senate_status_card":"house_status_card", "enacted_status_card"];
        // console.log("To animate array length: "+toAnimateArr.length);

        for(var iii=0,lll=toAnimateArr.length;iii<lll;iii++){
          let toBeAnimated = toAnimateArr[iii];
          // console.log(" with toBeAnimated: "+toBeAnimated);
          await this.refs[toBeAnimated].animate();
          if(iii<4){
              scrollResponder.scrollResponderScrollTo({x: 0, y: (iii+1)*h*0.26, animated: true});
          }
          // Dimensions.get(this.refs.stat_scrollview.getInnerViewNode(), (...data)=>{console.log(data)});
          // this.refs.stat_scrollview.scrollTo({y:, animated:true});
        }
        this.setState({statusVisible:true});
      }
  }


  /**
   * ### render method
   */
  render() {

    // this.animateCardsIfNeeded(this.props.isCurrent==true);


    let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View style={styles.statusPageContainer}>
        <ScrollView ref="stat_scrollview" style={styles.scrollViewContainer}>
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
