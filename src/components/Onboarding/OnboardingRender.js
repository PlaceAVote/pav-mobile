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





const FOOTER_BTN_CONTAINER_HEIGHT = 55;

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  swiper:{
    // backgroundColor:'purple'
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
    this.state = {
      scrollAnim:new Animated.Value(0),
      curIndex:0
    }

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


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@# IS PORTRAIT : "+isPortrait);
    // let styles= isPortrait?portraitStyles:landscapeStyles;


// {listener:(e)=>{console.log(e.nativeEvent.contentOffset.x)}}
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

           <AnimatedImage scrollAnim={this.state.scrollAnim} isPortrait={isPortrait} position={this.state.curIndex}/>
           <AnimatedLine scrollAnim={this.state.scrollAnim}  position={this.state.curIndex}/>

           <Swiper
           loop={false /*False because otherwise it messes up our animation from 0 to 3 index*/}
           style={styles.swiper}
           height={h-FOOTER_BTN_CONTAINER_HEIGHT}
           showsButtons={true}
           paginationStyle={isPortrait===true?{bottom:24}:{bottom:0}}
           dot={<View style={[styles.dot, styles.inactiveDot]}/>}
           activeDot={<View style={[styles.dot, styles.activeDot]}/>}
           nextButton={<Text style={styles.nextPrevBtn}>›</Text>}
           prevButton={<Text style={styles.nextPrevBtn}>‹</Text>}
           onPageScroll={
             Animated.event(
             [{nativeEvent: {offset: this.state.scrollAnim}}],
             {listener: (e)=>this.setState({curIndex:e.nativeEvent.position})}
            )
            }
           onScroll={Animated.event(
             [{nativeEvent: {contentOffset: {x: this.state.scrollAnim}}}]
           )}

           scrollEventThrottle={100}
           >

             <SliderPage1Render isPortrait={isPortrait}/>
             <SliderPage2Render isPortrait={isPortrait}/>
             <SliderPage3Render isPortrait={isPortrait}/>

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
