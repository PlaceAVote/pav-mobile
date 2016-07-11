/**
 * # OnboardingRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';


import SliderPage1Render from './SliderPage1Render';
import SliderPage2Render from './SliderPage2Render';
import SliderPage3Render from './SliderPage3Render';
import AnimatedImage from './AnimatedImage';
import AnimatedLine from './AnimatedLine';


/*A react native button*/
import Button from 'sp-react-native-iconbutton';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'

import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Platform, StatusBar, Animated} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;





const FOOTER_BTN_CONTAINER_HEIGHT = 55, IMG_SIZE_BIG = w*.37, IMG_SIZE_SMALL = w*.15;

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  swiper:{
    // backgroundColor:'red'
  },
  dot:{
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inactiveDot:{
    backgroundColor:'rgba(255,255,255,.2)',
  },
  activeDot:{
    backgroundColor: 'white',
  },
  nextPrevBtn:{
    fontSize: 50,
    color: 'rgba(255,255,255,.5)',
    fontFamily: 'Arial',
  },
  footerContainer:{
    flex:1,
    // backgroundColor:'red',
    justifyContent:'flex-end',

  },
  btnsConainer:{
    flexDirection:'row',
  },
  signInBtn:{
    flex:1,
    height:FOOTER_BTN_CONTAINER_HEIGHT,
    borderRadius:0,
    backgroundColor: Colors.primaryColor,
    borderWidth: 0,
  },
  registerBtn:{
    flex:1,
    height:FOOTER_BTN_CONTAINER_HEIGHT,
    borderRadius:0,
    backgroundColor: Colors.alternativeAccentColor,
    borderWidth: 0,
  },
  footerBtnText:{
    backgroundColor:Colors.transparentColor,
    color: Colors.mainTextColor,
    fontSize: getCorrectFontSizeForScreen(14),
    fontFamily: 'Whitney-SemiBold',
  },



});






class OnboardingRender extends React.Component {
  constructor(props) {
    super(props);
    // this.previousScrollOffset = 0
    this.state = {
      scrollAnim:new Animated.Value(0),
      // curIndex:0
    }
    // this._previousIndex = 0;

  }



  renderFooter(){
    return (
      <View style={styles.footerContainer}>

        <View style={styles.btnsConainer}>
          <Button
          onPress={this.props.onSignInBtnPress}
          isDisabled={this.props.isFetchingAuth}
          style={styles.signInBtn}
          textStyle={styles.footerBtnText}>
          Sign In
          </Button>
          <Button
          onPress={this.props.onSignUpBtnPress}
          isDisabled={this.props.isFetchingAuth}
          style={styles.registerBtn}
          textStyle={styles.footerBtnText}>
          Register
          </Button>

        </View>

      </View>
    )
  }

  // determineNextOrPreviousBasedOnOffset(curOffset){
  //   if(curOffset>this.previousScrollOffset){
  //     return NEXT;
  //   }else if(curOffset<this.previousScrollOffset){
  //     return PREVIOUS;
  //   }else{
  //     return SAME;
  //   }
  // }

  // onMomentumScrollBegin(e, state, context){
  //   if(e.nativeEvent.contentOffset){
  //     let curOffset = e.nativeEvent.contentOffset.x;
  //     let scrollDirection = this.determineNextOrPreviousBasedOnOffset(curOffset);
  //     // console.log("@@ Cur offset: "+curOffset+" previous: "+this.previousScrollOffset+" scroll direction: "+scrollDirection);
  //
  //     // this.updateIndex(state, curOffset);
  //
  //     this.previousScrollOffset = curOffset;
  //   }
  //   // console.log(JSON.stringify(state.index));
  //
  //   // alert(state.index);
  // }

  onSwiperScroll(event:Object){
    this.setState({curScroll:event.nativeEvent.contentOffset.x-event.nativeEvent.layoutMeasurement.width})
  }


 //  updateIndex(state, offset) {
 //
 //    let dir = 'x';
 //    let index = state.index
 //    // console.log("offset[dir]: "+offset[dir])
 //    // console.log("state.offset[dir]: "+state.offset[dir])
 //    let diff = offset - this.previousScrollOffset
 //    let step = state.width;
 //    console.log("Step: "+step);
 //     // Do nothing if offset no change.
 //     if(!diff) return
 //
 //     // Note: if touch very very quickly and continuous,
 //     // the variation of `index` more than 1.
 //     // parseInt() ensures it's always an integer
 //     index = parseInt(index + diff / step)
 //     console.log("Index was: "+index+ " διφφ:"+diff / step)
 //     if(index <= -1) {
 //       console.log("Index was "+index+", thus we correct to : "+state.total - 1);
 //       index = state.total - 1
 //       this.previousScrollOffset = step * state.total
 //     }
 //     else if(index >= state.total) {
 //       console.log("Index was "+index+", thus we correct to : "+0);
 //       index = 0
 //       this.previousScrollOffset = step
 //     }else{
 //       console.log("Index: "+index+" offset: "+offset)
 //     }
 //
 // }


// onMomentumScrollBegin={this.onMomentumScrollBegin.bind(this)}

  apl(e){
    console.log("@@@S: "+JSON.stringify(e.nativeEvent.contentOffset))

  }


  // scaleImage(to){
  //   Animated.timing(
  //      this.state.scrollAnim,         // Auto-multiplexed
  //      {
  //         toValue: to,
  //         duration: 400,  // Velocity makes it move
  //      } // Back to zero
  //    ).start();
  // }

  // onMomentumScrollEnd(e, state){
    // if(state.index==0 && this._previousIndex==(state.total-1)){
    //   this.scaleImage(IMG_SIZE_BIG);
    // }
    // else if(state.index==(state.total-1) && this._previousIndex==0){
    //   this.scaleImage(IMG_SIZE_BIG);
    // }
    // this.setState({curIndex:state.index});
  // }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // let styles= isPortrait?portraitStyles:landscapeStyles;


    return(
      <LinearGradient
              colors={['#4D6EB2', '#6B55A2']}
              start={[-0.3, 0.0]} end={[1.3, 0.0]}
              style={styles.container}>
          <StatusBar
              backgroundColor="#4A5E83"
              translucent={false}
              barStyle="light-content"
           />



           <AnimatedImage scrollAnim={this.state.scrollAnim}/>
           <AnimatedLine scrollAnim={this.state.scrollAnim}/>

           <Swiper
           loop={false /*False because otherwise it messes up our animation from 0 to 3 index*/}
           style={styles.swiper}
           height={h-FOOTER_BTN_CONTAINER_HEIGHT}
           showsButtons={true}
           dot={<View style={[styles.dot, styles.inactiveDot]}/>}
           activeDot={<View style={[styles.dot, styles.activeDot]}/>}
           nextButton={<Text style={styles.nextPrevBtn}>›</Text>}
           prevButton={<Text style={styles.nextPrevBtn}>‹</Text>}
           onScroll={Animated.event(
             [{nativeEvent: {contentOffset: {x: this.state.scrollAnim}}}],
             {listener:this.apl}
           )}

           scrollEventThrottle={100}
           >

             <SliderPage1Render/>
             <SliderPage2Render/>
             <SliderPage3Render/>

           </Swiper>
           {this.renderFooter()}

      </LinearGradient>
    );
  }
}



OnboardingRender.propTypes= {
  isFetchingAuth: React.PropTypes.bool,
  onSignUpBtnPress:React.PropTypes.func.isRequired,
  onSignInBtnPress:React.PropTypes.func.isRequired,

};

export default OnboardingRender;
