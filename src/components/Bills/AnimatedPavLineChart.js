/* @flow weak */
/**
 * # AnimatedPavLineChart.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation


// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);





const styles = StyleSheet.create({
  lineContainer:{
    // backgroundColor:'pink',
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
  },
  line:{
    height:22,
    backgroundColor:Colors.primaryColor,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent:'center',
    alignItems:'center'
  },
  line2:{
    height:22,
    backgroundColor:Colors.negativeAccentColor,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent:'center',
    alignItems:'center'
    // borderColor: Colors.transparentColor
  }

})



class AnimatedPavLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      HIDDEN_LINE_PROPS : {lineW: this.props.finalLineWidth*0.25, textOpacity:0},
      curLine1Width:new Animated.Value(this.props.finalLineWidth*0.25),
      curLine2Width:new Animated.Value(this.props.finalLineWidth*0.25),
      curOpacity:new Animated.Value(0),
    }
  }




  animate(show) {
    if(this.state.isVisible==show){
      return;
    }else{
      let initialLine1Width, finalLine1Width, initialLine2Width, finalLine2Width,initialOpacity,finalOpacity;

      if(show==false && this.state.isVisible==true){
        finalLine1Width = this.state.HIDDEN_LINE_PROPS.lineW, initialLine1Width = this.props.finalLinePercentage*this.props.finalLineWidth;
        finalLine2Width = this.state.HIDDEN_LINE_PROPS.lineW, initialLine2Width = (1-this.props.finalLinePercentage)*this.props.finalLineWidth;
        finalOpacity = this.state.HIDDEN_LINE_PROPS.textOpacity, initialOpacity = 1;
      }else if(show==true && this.state.isVisible==false){
        initialLine1Width = this.state.HIDDEN_LINE_PROPS.lineW, finalLine1Width = this.props.finalLinePercentage*this.props.finalLineWidth;
        initialLine2Width = this.state.HIDDEN_LINE_PROPS.lineW, finalLine2Width = (1-this.props.finalLinePercentage)*this.props.finalLineWidth;
        initialOpacity = this.state.HIDDEN_LINE_PROPS.textOpacity, finalOpacity = 1;
      }else{
        return;
      }

      this.state.curLine1Width.setValue(initialLine1Width);     // Start at 0
      this.state.curLine2Width.setValue(initialLine2Width);     // Start at 0
      this.state.curOpacity.setValue(initialOpacity);     // Start at 0


      Animated.parallel([          // after decay, in parallel:
        Animated.spring(                          // Base: spring, decay, timing
          this.state.curLine1Width,                 // Animate `bounceValue`
          {
            toValue: finalLine1Width,
            // friction: 6,
            // tension:35,
          }
        ),
        Animated.spring(                          // Base: spring, decay, timing
          this.state.curLine2Width,                 // Animate `bounceValue`
          {
            toValue: finalLine2Width,
            // friction: 6,
            // tension:35,
          }
        ),
        Animated.timing(                          // Base: spring, decay, timing
          this.state.curOpacity,                 // Animate `bounceValue`
          {
            toValue: finalOpacity,                         // Animate to smaller size
            duration: 200,
          }
        ),

     ]).start();                    // start the sequence group
     this.setState(
       {isVisible: show}
     )
    }
   }




  /**
   * ### render method
   */
  render() {

    return(
      <View style={styles.lineContainer}>
        <Animated.View style={[
          styles.line,
          {
            width: this.state.curLine1Width,
            // transform: [{scaleX: this.state.curLine1Width}]
          }
        ]}>
          <Animated.Text style={[
            styles.text1,
            {
              opacity: this.state.curOpacity,
              // transform: [{scaleX: this.state.curLine1Width}]
            }
          ]}>{this.props.leftText}</Animated.Text>
        </Animated.View>
        <Animated.View style={[
          styles.line2,
          {
            width: this.state.curLine2Width,
            // transform: [{scaleX: this.state.curLine1Width}]
          }
        ]}>
          <Animated.Text style={[
            styles.text2,
            {
              opacity: this.state.curOpacity,
              // transform: [{scaleX: this.state.curLine1Width}]
            }
          ]}>{this.props.rightText}</Animated.Text>
        </Animated.View>
      </View>


    );
  }

  // <Animated.View                         // Base: Image, Animated.Text, View
  //  style={{
  //    backgroundColor:Colors.primaryColor,
  //    flex:(this.state.curLine1Width)
  //  }}
  // />
  // <Animated.View                         // Base: Image, Animated.Text, View
  //  style={{
  //    backgroundColor:Colors.negativeAccentColor,
  //    flex:(1-this.state.curLine1Width)
  //  }}
  // />
  // shouldComponentUpdate(nextProps, nextState) {
  //   return(
  //     (nextProps.billData !== this.props.billData)
  //     ||
  //     (nextProps.orientation !== this.props.orientation)
  //   );
  // }

}

AnimatedPavLineChart.propTypes= {
  // animate: React.PropTypes.func.isRequired,
  leftText: React.PropTypes.string,
  rightText: React.PropTypes.string,
  finalLineWidth: React.PropTypes.number.isRequired,
  finalLinePercentage: React.PropTypes.number.isRequired,
};
export default AnimatedPavLineChart;
