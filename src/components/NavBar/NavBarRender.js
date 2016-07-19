/* @flow weak */
/**
 * # NavBarRender.js
 *
 * This class will serve as our custom nav bar
 *
 */
'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

import Button from 'sp-react-native-iconbutton'
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import LinearGradient from 'react-native-linear-gradient';

import {Colors, ScheneKeys} from '../../config/constants';

import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../lib/UI/PavImage'
import defaultUserPhoto from '../../../assets/back_chevron.png';



const styles = StyleSheet.create({


  navBarContainer: {
    // flex:1,

    paddingTop:(Platform.OS === 'ios')? 10 : 0,
    height:(Platform.OS === 'ios')? 64 : 54,   //nav bar height
    // backgroundColor: 'orange',

  },
  iconsContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  },


  backImg:{
    height: 22,
    // width:null,
  },


  iconContainer:{
    paddingHorizontal:w*0.020
  },
  icon:{
    color:'white',
    backgroundColor: Colors.transparentColor,
    textShadowColor: '#00000066',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius:2,
  },

  titleContainer:{
    height:(Platform.OS === 'ios')? 64 : 54,   //nav bar height,
    width:w,
    top:0,
    paddingTop:(Platform.OS === 'ios')? 10 : 0,
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red',

  },

  title:{
    backgroundColor: Colors.transparentColor,
    color: Colors.mainTextColor,
    fontFamily: 'Whitney-Semibold',
    fontSize: 18,
    textShadowColor: '#00000066',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius:2,
  }



});






class NavBarRender extends React.Component {
  constructor(props) {
    super(props);
  }



  renderLeftButton(){
    if(!!this.props.leftIconName){
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={this.props.onLeftIconPressed}>
          <PavIcon name={this.props.leftIconName} size={this.props.leftIconSize} style={[styles.icon, this.props.leftIconStyle]}/>
        </TouchableOpacity>
      )
    }else if(!!this.props.renderLeftIcon){
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={this.props.onLeftIconPressed}>
          {this.props.renderLeftIcon()}
        </TouchableOpacity>
      )
    }else if (this.props.leftIconIsBack===true){
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={this.props.onLeftIconPressed}>
          <PavImage resizeMode='contain' style={styles.backImg} source={defaultUserPhoto} />



        </TouchableOpacity>
      )
    }else{
      return <View></View>;
    }
  }

  renderRightButton(){
    if(!!this.props.rightIconName){
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={this.props.onRightIconPressed}>
          <PavIcon name={this.props.rightIconName} size={this.props.rightIconSize} style={[styles.icon, this.props.rightIconStyle]}/>
        </TouchableOpacity>
      )
    }else if(!!this.props.renderRightIcon){
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={this.props.onRightIconPressed}>
          {this.props.renderRightIcon()}
        </TouchableOpacity>
      )
    }else{
      return <View></View>;
    }
  }

  /**
   * ### render method
   */
  render() {

    return(

      <LinearGradient
          colors={['#4D6EB2', '#6B55A2']}
          start={[-0.3, 0.0]} end={[1.3, 0.0]}
          style={styles.navBarContainer}
          >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
          <View style={styles.iconsContainer}>
            {this.renderLeftButton()}

            {this.renderRightButton()}
          </View>
        </LinearGradient>
    );
  }

}



NavBarRender.defaultProps={
  rightIconSize: 30,
  leftIconSize: 30,
  leftIconIsBack:false
}
NavBarRender.propTypes= {
  title: React.PropTypes.string.isRequired,

  leftIconIsBack: React.PropTypes.bool,

  leftIconName: React.PropTypes.string,
  leftIconSize: React.PropTypes.number,
  onLeftIconPressed: React.PropTypes.func,
  leftIconStyle: React.PropTypes.any,
  renderLeftIcon: React.PropTypes.func,

  rightIconName: React.PropTypes.string,
  rightIconSize: React.PropTypes.number,
  onRightIconPressed: React.PropTypes.func,
  rightIconStyle: React.PropTypes.any,
  renderRightIcon: React.PropTypes.func,

};
export default NavBarRender;
