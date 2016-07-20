  /* @flow weak */
  /**
   * # StatusTabRender.js
   *
   * This class is a little complicated as it handles multiple states.
   *
   */
  'use strict';



  import {Colors, ScheneKeys, Other} from '../../config/constants';
  const {BILL_STATUSES} = Other;
  import React from 'react';
  import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated} from 'react-native';
  import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
  import {timeout} from '../../lib/Utils/genericUtils'
  import Dimensions from 'Dimensions';
  const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

  import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
  import icomoonConfig from '../../../assets/fonts/icomoon.json';
  const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


  import AnimatedStatusCard from '../Cards/BillCards/AnimatedStatusCard';
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






const BILL_REPORTED = 1;  //0 is INTRODUCED, 4 IS PASSED but we don't need those (Total of 5)
const LINE_HEIGHT = h*0.08;
const TITLE_VER_PADDING = h*0.015;


const styles = StyleSheet.create({


  statusPageContainer:{
    flex:1,
    // backgroundColor:'red'
  },
  scrollViewContainer:{
    flex:1,
  },
  statusHeaderContainer:{
    backgroundColor: Colors.titleBgColor,
    borderBottomColor: "rgba(0, 0, 0, 0.07)",
    borderBottomWidth: 1,
    paddingHorizontal: w*0.011,
    paddingVertical: TITLE_VER_PADDING,

    // shadowColor: 'rgba(0, 0, 0, 0.12)',
  },
  statusHeaderText:{
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(7),
  },
  finalItemPadding:{
    paddingBottom: h*0.015,
  },

  statusIconsContainer:{
    // flex:1,
    flexDirection:'column',
    // backgroundColor:'red',
    // justifyContent:'space-between',
    alignItems:'center',
  },

});



class StatusTabRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      statusAnimationFinished:false
    }
    this.isVisible = true;
  }






  houseIconShouldBeRenderedFirst(billHistory){



    let houseIsFirst =  (
      (billHistory.house_passage_result!=null && billHistory.house_passage_result=="pass" && billHistory.senate_passage_result!=null && billHistory.senate_passage_result=="failed")
      ||
      (billHistory.senate_passage_result==null)
    )
    // console.log("BILL HISTORY: "+JSON.stringify(billHistory)+ "@@ FIRST? "+houseIsFirst)
    return houseIsFirst;
  }






  createHouseOrSenateIcon(result, iconName, name, passStatusData, failStatusData){
    let keyName = name.toLowerCase()+"_status_card";

    // console.log("Pass name: "+iconName+"-pass");
    // console.log("Reject name: "+iconName+"-reject");
    // console.log("Fail status data: "+failStatusData.explanation);
    // console.log("Pass status data: "+passStatusData.explanation);
    if(!!result && result=="pass"){ //a vote took place in the House and the bill passed
      return {ref: {keyName}, active: true, element: (<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName} key={keyName} active={true} iconName={iconName+"-pass"} title={"Passed "+name} explanation={passStatusData.explanation} finalItem={false}/>), lastItem:false}
    }else if(!!result && result=="fail"){ //a vote took place in the House and the bill was rejected
      return {ref: {keyName}, active: true, element: (<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={true} iconName={iconName+"-reject"} title={failStatusData.title} explanation={failStatusData.explanation} finalItem={true}/>), lastItem:true} //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
    }else{  //not vote has taken place yet in the house
      return {ref: {keyName}, active: false, element: (<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={false} iconName={iconName} title={"No "+name+" Vote Yet."} explanation={"The "+name+" hasn't voted for this bill yet."} finalItem={false}/>), lastItem:false}
    }
  }




  createIconsBasedOnBillStatus(billStatus, billHistory){
    let iconElements = [];

    // let icons=BILL_STATUSES[billStatus].icons;
    // let title = BILL_STATUSES[billStatus].title;
    // let explanation = BILL_STATUSES[billStatus].explanation;
    iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT}  ref="introduced_status_card"  key="introduced_status_card" active={true} iconName="introduced" title={BILL_STATUSES["INTRODUCED"].title} explanation={BILL_STATUSES["INTRODUCED"].explanation} finalItem={false}/>)
    iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref="committee_status_card" key="committee_status_card" active={true} iconName="committee" title={BILL_STATUSES["REPORTED"].title} explanation={BILL_STATUSES["REPORTED"].explanation} finalItem={false}/>)
    this.lastActiveItem = BILL_REPORTED;
    let houseFirst = this.houseIconShouldBeRenderedFirst(billHistory);

    if(houseFirst==true){

      let house = this.createHouseOrSenateIcon(billHistory.house_passage_result, "bill-house", "House", BILL_STATUSES["PASS_OVER:HOUSE"], BILL_STATUSES["FAIL:ORIGINATING:HOUSE"]);
      iconElements.push(house.element)
      if(house.active===true){this.lastActiveItem = iconElements.length-1;} //if thats the lact active item, update the lastActive flag
      if(house.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }


      let senate = this.createHouseOrSenateIcon(billHistory.senate_passage_result, "bill-senate", "Senate", BILL_STATUSES["PASS_OVER:SENATE"], BILL_STATUSES["FAIL:ORIGINATING:SENATE"]);
      iconElements.push(senate.element)
      if(senate.active===true){this.lastActiveItem = iconElements.length-1;} //if thats the lact active item, update the lastActive flag
      if(senate.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }

    }else{
      let senate = this.createHouseOrSenateIcon(billHistory.senate_passage_result, "bill-senate", "Senate", BILL_STATUSES["PASS_OVER:SENATE"], BILL_STATUSES["FAIL:ORIGINATING:SENATE"]);
      iconElements.push(senate.element)
      if(senate.active===true){this.lastActiveItem = iconElements.length-1;} //if thats the lact active item, update the lastActive flag
      if(senate.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }

      let house = this.createHouseOrSenateIcon(billHistory.house_passage_result, "bill-house", "House", BILL_STATUSES["PASS_OVER:HOUSE"], BILL_STATUSES["FAIL:ORIGINATING:HOUSE"]);
      iconElements.push(house.element)
      if(house.active===true){this.lastActiveItem = iconElements.length-1;} //if thats the lact active item, update the lastActive flag
      if(house.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }

    }

    let keyName="enacted_status_card"
    if(billHistory.enacted==true && billHistory.vetoed==false){
      iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={true} iconName="bill-passed" title={BILL_STATUSES["PASSED:BILL"].title} explanation={BILL_STATUSES["PASSED:BILL"].explanation} finalItem={true}/>)
      this.lastActiveItem = iconElements.length-1
    }else if(billHistory.enacted==true && billHistory.vetoed==true){
      iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={true} iconName="bill-passed" title={BILL_STATUSES["PROV_KILL:VETO"].title} explanation={BILL_STATUSES["PROV_KILL:VETO"].explanation} finalItem={true}/>)//TODO: perhaps add more statuses after the veto here in the future
      this.lastActiveItem = iconElements.length-1
    }else{  //NOT enacted and NOT vetoed
      if((!!billHistory.house_passage_result && billHistory.house_passage_result=="pass") && (!!billHistory.senate_passage_result && billHistory.senate_passage_result=="pass")){ //it passed both in the house and the senate
        iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={false} iconName="bill-passed" title="Awaiting for the president to vote." explanation="The bill has passed from both the House and the Senate and we are now waiting for the president to sign the bill into a law." finalItem={true}/>)
        this.lastActiveItem = iconElements.length-1
      }else{
        iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={false} iconName="bill-passed" title="Awaiting for the houses to aggree." explanation="The bill cannot go to the president before both the House and the Senate vote for it." finalItem={true}/>)
      }
    }

    return iconElements;
  }



  componentWillMount(){
    this.isVisible = true;
  }

  componentWillUnmount(){
    this.isVisible = false;
  }

  async onTabFocus(){
      if(!!this.props.billHistory && this.state.statusAnimationFinished==false && this.props.parentVisible===true && this.isVisible===true){
        await timeout(300); //to give some time to the animatedStatusCard onLayout to run.
        let scrollResponder = this.refs.stat_scrollview;
        scrollResponder.scrollTo({x: 0, y: 0, animated: true});
        let houseFirst = this.houseIconShouldBeRenderedFirst(this.props.billHistory);
        let toAnimateArr = ["introduced_status_card", "committee_status_card", houseFirst==true?"house_status_card":"senate_status_card",houseFirst==true?"senate_status_card":"house_status_card", "enacted_status_card"];
        // console.log("To animate array length: "+toAnimateArr.length);
        let animatedCnt = 0;

        // console.log("toAnimateArr.length: "+toAnimateArr.length);
        let iii,lll;
        for(iii=0,lll=toAnimateArr.length;iii<lll;iii++){
          let toBeAnimated = toAnimateArr[iii];
          // console.log(" with toBeAnimated: "+toBeAnimated);

          let curCard = this.refs[toBeAnimated];
          let curCardYPos = curCard.getCardYPosition();


          if(curCard!=null && this.props.parentVisible===true){
            animatedCnt++;

            if(this.isVisible===true &&(iii<=this.lastActiveItem || this.lastActiveItem==4)){
              scrollResponder.scrollTo({x: 0, y: curCardYPos+(TITLE_VER_PADDING*2.3), animated: true});
              // console.log("Card Y: "+curCardYPos+" Now scrolling to +35");
            }
            await curCard.animate();

            // console.log("isVisible?: "+this.isVisible+" last active item: "+this.lastActiveItem+" current iteration "+iii);

          }else{
            break;
          }
        }

        if(animatedCnt==lll){ // all animations took place
          this.setState({statusAnimationFinished:true});
        }
      }
  }






  /*
  onScroll={(e)=>{
      let {contentOffset, contentSize, layoutMeasurement} = e.nativeEvent;
      if(contentSize.height>this.totalContentHeight){
        this.totalContentHeight = contentSize.height;
      }
      this.usefulHeight = this.totalContentHeight-layoutMeasurement.height  //useful height is the TOTAL content height MINUS the element (scrollview) height (which is constantly the same)
      // console.log("New useful height: "+this.usefulHeight+ " cur scr");
      console.log("ON SCROLL: "+contentOffset.y);
  }}
  */


  /**
   * ### render method
   */
  render() {
    return(
      <View style={styles.statusPageContainer}>
        <ScrollView ref="stat_scrollview"
        style={styles.scrollViewContainer}
        >
          <View style={styles.statusHeaderContainer}>
            <Text style={styles.statusHeaderText}>
              BILL STATUS
            </Text>
          </View>

          <View style={styles.statusIconsContainer}>
            {this.createIconsBasedOnBillStatus(this.props.billStatus,this.props.billHistory)}
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


export default StatusTabRender;
