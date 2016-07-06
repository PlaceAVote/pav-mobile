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
const ICON_HEIGHT = h*0.148;
const HEADER_HEIGHT = h*0.045

// totalHeight = HEADER_HEIGHT + ((cardCnt-1) * LINE_HEIGHT)

const styles = StyleSheet.create({


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
    paddingHorizontal: w*0.011,
    paddingVertical: h*0.015,

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
    flex:1,
    flexDirection:'column',
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
    this.totalContentHeight = 0;  //this is the total content height of the scroll view (all the cards and header etc)
    this.usefulHeight = 0; //This is the total height minus the last view our scroller will have (we need this variable because theres no way to scroll the scroll view pivoting from the bottom y (react only allows us to pivot from the top y), therefore we act as if its height was this variable)
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
    iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref="introduced_status_card"  key="introduced_status_card" active={true} iconName="introduced" title={BILL_STATUSES["INTRODUCED"].title} explanation={BILL_STATUSES["INTRODUCED"].explanation} finalItem={false}/>)
    iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref="committee_status_card" key="committee_status_card" active={true} iconName="committee" title={BILL_STATUSES["REPORTED"].title} explanation={BILL_STATUSES["REPORTED"].explanation} finalItem={false}/>)
    let lastActive = BILL_REPORTED;
    let houseFirst = this.houseIconShouldBeRenderedFirst(billHistory);

    if(houseFirst==true){

      let house = this.createHouseOrSenateIcon(billHistory.house_passage_result, "bill-house", "House", BILL_STATUSES["PASS_OVER:HOUSE"], BILL_STATUSES["FAIL:ORIGINATING:HOUSE"]);
      iconElements.push(house.element)
      if(house.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
      lastActive = house.active===true?2:lastActive;

      let senate = this.createHouseOrSenateIcon(billHistory.senate_passage_result, "bill-senate", "Senate", BILL_STATUSES["PASS_OVER:SENATE"], BILL_STATUSES["FAIL:ORIGINATING:SENATE"]);
      iconElements.push(senate.element)
      if(senate.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
      lastActive = senate.active===true?3:lastActive;
    }else{
      let senate = this.createHouseOrSenateIcon(billHistory.senate_passage_result, "bill-senate", "Senate", BILL_STATUSES["PASS_OVER:SENATE"], BILL_STATUSES["FAIL:ORIGINATING:SENATE"]);
      iconElements.push(senate.element)
      if(senate.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
      lastActive = senate.active===true?2:lastActive;
      let house = this.createHouseOrSenateIcon(billHistory.house_passage_result, "bill-house", "House", BILL_STATUSES["PASS_OVER:HOUSE"], BILL_STATUSES["FAIL:ORIGINATING:HOUSE"]);
      iconElements.push(house.element)
      if(house.lastItem==true){
        return iconElements; //this ought to be the last status, since the bill is dead, therefore theres is no need to keep going.
      }
      lastActive = house.active===true?3:lastActive;
    }

    let keyName="enacted_status_card"
    if(billHistory.enacted==true && billHistory.vetoed==false){
      iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={true} iconName="bill-passed" title={BILL_STATUSES["PASSED:BILL"].title} explanation={BILL_STATUSES["PASSED:BILL"].explanation} finalItem={true}/>)
      lastActive = 4;
    }else if(billHistory.enacted==true && billHistory.vetoed==true){
      iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={true} iconName="bill-passed" title={BILL_STATUSES["PROV_KILL:VETO"].title} explanation={BILL_STATUSES["PROV_KILL:VETO"].explanation} finalItem={true}/>)//TODO: perhaps add more statuses after the veto here in the future
      lastActive = 4;
    }else{  //NOT enacted and NOT vetoed
      if((!!billHistory.house_passage_result && billHistory.house_passage_result=="pass") && (!!billHistory.senate_passage_result && billHistory.senate_passage_result=="pass")){ //it passed both in the house and the senate
        iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={false} iconName="bill-passed" title="Awaiting for the president to vote." explanation="The bill has passed from both the House and the Senate and we are now waiting for the president to sign the bill into a law." finalItem={true}/>)
      }else{
        iconElements.push(<AnimatedStatusCard lineHeight={LINE_HEIGHT} ref={keyName}  key={keyName} active={false} iconName="bill-passed" title="Awaiting for the houses to aggree." explanation="The bill cannot go to the president before both the House and the Senate vote for it." finalItem={true}/>)
      }
    }
    this.lastActiveItem = lastActive;
    // totalHeight = HEADER_HEIGHT + ((cardCnt-1) * LINE_HEIGHT)
    this.totalContentHeight = HEADER_HEIGHT + (((iconElements.length*2)-1)*LINE_HEIGHT)+(iconElements.length*ICON_HEIGHT);
    this.usefulHeight = this.totalContentHeight;
    // console.log("@@@@@@@ TOTAL height"+this.totalContentHeight);
    // console.log("@@@@@@@ HEADER_HEIGHT: "+HEADER_HEIGHT);
    // console.log("Lines height: "+(((iconElements.length*2)-1)*LINE_HEIGHT));
    // console.log("Icons height: "+(iconElements.length*ICON_HEIGHT))

    return iconElements;
  }


  // this.props.parentVisible==true

  componentWillMount(){
    this.isVisible = true;
  }

  componentWillUnmount(){
    this.isVisible = false;
  }

  async onTabFocus(){
      if(!!this.props.billHistory && this.state.statusAnimationFinished==false && this.props.parentVisible===true && this.isVisible===true){

        let scrollResponder = this.refs.stat_scrollview.getScrollResponder();
        scrollResponder.scrollResponderScrollTo({x: 0, y: 0, animated: true});
        let houseFirst = this.houseIconShouldBeRenderedFirst(this.props.billHistory);
        let toAnimateArr = ["introduced_status_card", "committee_status_card", houseFirst==true?"house_status_card":"senate_status_card",houseFirst==true?"senate_status_card":"house_status_card", "enacted_status_card"];
        // console.log("To animate array length: "+toAnimateArr.length);
        let animatedCnt = 0;




        let scrollOffsetsDependingOnCurCardIt = [0.18, 0.59, 0.88, 1.15, 1.03]  //Those will be the percentages we scroll to based on the iii iteration value. i.e if the first element  of this array is 0.5 that means that on the first animation we will scroll to 50% of the scroll view content height
        /*To find out the values above I used the onScroll method and got the e.nativeLayout.contentOffset.y / e.nativeLayout.contentSize.height, got to where I want to scroll and marked the percentage*/
        // console.log("this.usefulHeight: "+this.usefulHeight)

        console.log("toAnimateArr.length: "+toAnimateArr.length);
        let iii,lll;
        for(iii=0,lll=toAnimateArr.length;iii<lll;iii++){
          let toBeAnimated = toAnimateArr[iii];
          // console.log(" with toBeAnimated: "+toBeAnimated);

          let curCard = this.refs[toBeAnimated];


          if(curCard!=null && this.props.parentVisible===true){
            animatedCnt++;


            await curCard.animate();

            if(this.isVisible===true && (iii<this.lastActiveItem || this.lastActiveItem==4)){
              scrollResponder.scrollResponderScrollTo({x: 0, y: scrollOffsetsDependingOnCurCardIt[iii]*this.usefulHeight, animated: true});
            }


            // if((iii+2<lll) && this.isVisible===true){ // if thats below the n-2 iteration
            //   console.log("below n-2 "+(iii+1)*h*0.26);
            //   scrollResponder.scrollResponderScrollTo({x: 0, y: (iii+1)*h*0.26, animated: true});
            // }
            // if((iii+2==lll) && this.isVisible===true){// if thats the n-2 iteration
            //   console.log("n-2 "+(lll-1)*h*0.22);
            //     scrollResponder.scrollResponderScrollTo({x: 0, y: (lll-1)*h*0.22, animated: true});
            // }
          }else{
            break;
          }

          // Dimensions.get(this.refs.stat_scrollview.getInnerViewNode(), (...data)=>{console.log(data)});
          // this.refs.stat_scrollview.scrollTo({y:, animated:true});
        }

        if(animatedCnt==lll){ // all animations took place
          this.setState({statusAnimationFinished:true});
        }
      }
  }






  /*

  */


  /**
   * ### render method
   */
  render() {

    // this.animateCardsIfNeeded(this.props.isCurrent==true);


    // let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View style={styles.statusPageContainer}>
        <ScrollView ref="stat_scrollview"
        style={styles.scrollViewContainer}
        scrollEventThrottle={300}
        onScroll={(e)=>{
            let {contentOffset, contentSize, layoutMeasurement} = e.nativeEvent;
            if(contentSize.height>this.totalContentHeight){
              this.totalContentHeight = contentSize.height;
            }
            this.usefulHeight = this.totalContentHeight-layoutMeasurement.height  //useful height is the TOTAL content height MINUS the element (scrollview) height (which is constantly the same)
            // console.log("New useful height: "+this.usefulHeight+ " cur scr");
            // console.log("ON SCROLL: "+contentOffset.y+" percent: "+(contentOffset.y/this.usefulHeight));
        }}
        onContentSizeChange={
          (cw, contentHeight)=>{

            // if(contentHeight>this.totalContentHeight){
            //   console.log("New content height: "+contentHeight);
            //   this.totalContentHeight = contentHeight;
            // }
          }
        }
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
