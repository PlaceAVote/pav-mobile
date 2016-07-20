/* @flow weak */
/**
 * # AnimatedStatusCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../../config/constants';
import React from 'react';
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation


import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);




const styles = StyleSheet.create({


        statusPartContainer:{
          // flex:1,
          flexDirection:'row',
          // backgroundColor:'purple',
          alignItems:"flex-start",
          // marginVertical:5,
        },


        /* LEFT SIDE */
        lineViewContainer:{
          flex:1,
          paddingHorizontal: w*0.04,
          flexDirection:'column',
          // width:10,
          // justifyContent:'flex-end',
          // backgroundColor:'orange',
          alignItems:'center'
        },
        line:{
          width:8,
          // marginHorizontal:6,
          borderLeftWidth:2,
          borderRightWidth:2,
        },
        activeLine:{
          borderLeftColor:"#DE4a0388",
          borderRightColor:"#DE403388",
          backgroundColor:Colors.negativeAccentColor,
        },
        inactiveLine:{
          borderLeftColor:Colors.helpTextColor,
          borderRightColor:Colors.helpTextColor,
          backgroundColor:Colors.helpTextColor,
        },
        iconContainer:{
          // flex:1,
          backgroundColor:Colors.titleBgColor,
          borderRadius:2,
          borderWidth:1,
          borderColor: "rgba(0, 0, 0, 0.07)",
          paddingVertical: w*0.03,
          paddingHorizontal: w*0.03,
          justifyContent:'center',
          alignItems:'center'
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
          // flex:1,
          // alignSelf:'center',
          flexDirection:'column',
          paddingHorizontal: w*0.05,
          // backgroundColor:'pink'
        },
        statusTitleText:{
          width: w*0.52,
          paddingVertical: h*0.008,
          fontFamily: 'Whitney-Bold',
          fontSize: getCorrectFontSizeForScreen(8),
        },
        inactiveStatusText:{
          color: Colors.helpTextColor,
        },
        activeStatusText:{
          color: Colors.thirdTextColor,
        },
        statusDescriptionText:{
          width: w*0.52,
          paddingVertical: h*0.008,
          fontFamily: 'Whitney-Light',
          fontSize: getCorrectFontSizeForScreen(7),
        },
        statusDescription2Text:{
          paddingVertical: h*0.008,
          fontFamily: 'Whitney-Italic',
          fontSize: getCorrectFontSizeForScreen(8),
        },



})



class AnimatedStatusCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line_A_Height: new Animated.Value(0),
      line_B_Height: new Animated.Value(0),
      curOpacity: new Animated.Value(0),
    }

    this.animationCanRun = true;
    this.animation = Animated.sequence([          // after decay, in parallel:
      Animated.timing(                          // Base: spring, decay, timing
        this.state.line_A_Height,                 // Animate `bounceValue`
        {
          toValue: this.props.lineHeight,
          duration: 300,
          easing: Easing.inOut(Easing.quad)
          // easing: Easing.elastic(2), // Springy
          // friction: 6,
          // tension:35,
        }
      ),
      Animated.timing(                          // Base: spring, decay, timing
        this.state.curOpacity,                 // Animate `bounceValue`
        {
          toValue: 1,                         // Animate to smaller size
          duration: 200,
        }
      ),
      Animated.timing(                          // Base: spring, decay, timing
        this.state.line_B_Height,                 // Animate `bounceValue`
        {
          toValue: this.props.lineHeight,
          duration: 300,
          delay:this.props.finalItem===true?0:600,
          // friction: 6,
          // tension:35,
        }
      ),
   ]);
  }




  async animate() {
    this.state.line_A_Height.setValue(0);     // Start at 0
    this.state.line_B_Height.setValue(0);     // Start at 0
    this.state.curOpacity.setValue(0);     // Start at 0
    let self = this;
    return new Promise(function(resolve, reject){
      if(self.animationCanRun===false || self.animation==null){
        console.log("AnimatedStatusCard unmounted");
        reject("AnimatedStatusCard unmounted, we can no longer keep on animating.");
      }else{
        // console.log("Self.animation: "+self.animation+" start: "+self.animation.start);
        self.animation.start(resolve);                    // start the sequence group
      }
   });
 }


 getCardYPosition(){
   return this.yPosition;
 }


 componentWillUnmount(){
  //  console.log("Animation sudden stop: "+this.animation.active)
   this.animationCanRun = false;
   this.animation.stop();
 }


  /**
   * ### render method
   */
  render() {

    let key = this.props.iconName+Date();
    let lastActiveItem = (this.props.active===false || this.props.finalItem===true);
    return (<View key={key+"_container"} onLayout={(e)=>{ this.yPosition = e.nativeEvent.layout.y}} style={this.props.finalItem==true?[styles.statusPartContainer,styles.finalItemPadding]:styles.statusPartContainer}>
      <View key={key+"_line_container"} style={styles.lineViewContainer}>
        <Animated.View key={key+"_line_1"} style={[styles.line, {height:this.state.line_A_Height}, (this.props.active===true)?styles.activeLine:styles.inactiveLine]}></Animated.View>
        <Animated.View key={key+"_icon_container"} style={[styles.iconContainer, {opacity: this.state.curOpacity}]}>
          <PavIcon key={key+"_icon"} name={this.props.iconName} size={51} style={this.props.active?styles.activeStatusIcon:styles.inactiveStatusIcon}/>
        </Animated.View>
        {lastActiveItem?<View></View>:<Animated.View key={key+"_line_2"} style={[styles.line, {height:this.state.line_B_Height}, lastActiveItem?styles.inactiveLine:styles.activeLine]}></Animated.View>}
      </View>
      <Animated.View key={key+"_explan_container"} style={[styles.explanationsContainer, {opacity: this.state.curOpacity, marginTop:this.props.lineHeight*1}]}>
        <Text key={key+"_title"} style={this.props.active==true?[styles.statusTitleText, styles.activeStatusText]:[styles.statusTitleText, styles.inactiveStatusText]}>{this.props.title}</Text>
        <Text key={key+"_description"} style={this.props.active==true?[styles.statusDescriptionText, styles.activeStatusText]:[styles.statusDescriptionText, styles.inactiveStatusText]}>
          <Text style={this.props.active==true?[styles.statusDescription2Text, styles.activeStatusText]:[styles.statusDescription2Text, styles.inactiveStatusText]}> Meaning:</Text> {this.props.explanation}
        </Text>
      </Animated.View>
    </View>)
  }
}

AnimatedStatusCard.propTypes={
  active: React.PropTypes.bool.isRequired,
  finalItem: React.PropTypes.bool.isRequired,
  lineHeight:React.PropTypes.number.isRequired,
  iconName: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  explanation: React.PropTypes.string.isRequired,
};
export default AnimatedStatusCard;
