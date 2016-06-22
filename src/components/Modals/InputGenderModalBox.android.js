'use strict';

import Button from 'sp-react-native-iconbutton';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Picker
} from 'react-native';


import {Colors} from '../../config/constants';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import BillCommentCard from '../Cards/BillCards/BillCommentCard';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import congratsScreenPhoto from '../../../assets/congratsScreen.png';
import moment from 'moment';

class InputGenderModalBox extends React.Component {
    constructor(){
        super();
        this.state={
          gender:"male"
        }
    }


    getStyles(extraBottomSpace){
        return StyleSheet.create({
            modal: {
                // justifyContent: 'center',
                // alignItems: 'center',
                height: (h*0.40),
                // width: w*1,
                // paddingBottom:(h*0.08)+extraBottomSpace,
                backgroundColor: '#00000088'
                // backgroundColor: Colors.transparentColor,

            },



            btnContainer:{
              // flex:1,
              flexDirection:'row',
              justifyContent:'space-between',
              backgroundColor:Colors.primaryColor
            },
            closeBtnContainer:{
              // paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
              // backgroundColor:'pink',
              backgroundColor:Colors.transparentColor,
              flexDirection:'row',
              justifyContent:'flex-end',
              // alignSelf:'flex-start',
              alignItems:'center',
            },
            closeBtnTextContainer:{
              paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
            },
            closeBtnText:{
              backgroundColor: Colors.transparentColor,
              color: Colors.mainTextColor,
              fontFamily: 'Whitney-Bold',
              fontSize: getCorrectFontSizeForScreen(w,h,7),
              textAlign:'center'
            },
            closeBtnIcon:{
              color: Colors.mainTextColor,
              backgroundColor: Colors.transparentColor,
            },


            doneBtnContainer:{
              // paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
              backgroundColor:Colors.transparentColor,
              // backgroundColor:'purple',
              flexDirection:'row',
              justifyContent:'flex-end',
              // alignSelf:'flex-end',
              alignItems:'center',
            },
            doneBtnTextContainer:{
              paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
            },
            doneBtnText:{
              backgroundColor: Colors.transparentColor,
              // color: Colors.mainTextColor,
              color: Colors.accentColor,
              fontFamily: 'Whitney-Bold',
              fontSize: getCorrectFontSizeForScreen(w,h,7),
              textAlign:'center'
            },
            doneBtnIcon:{
              color: Colors.accentColor,
              backgroundColor: Colors.transparentColor,
            },





            content:{
              flex:1,
              // width: w*1,
              // flexDirection:'row',
              backgroundColor: Colors.titleBgColor,
              justifyContent:'center',
              // paddingHorizontal:w*0.01,
              // paddingVertical:w*0.018,
              borderRadius:2,
            },

            genderPickerContainer:{
              flex:1,
              // backgroundColor:'green',
              justifyContent:'center',
            },
            genderPicker:{
              // flex:1,
              // backgroundColor:'red',
              // width: w*1,
            },



            //content
            pasteLinkTextContainer:{
              justifyContent:'center',
              paddingHorizontal: w*0.025,
            },

            pasteLinkText:{
              fontFamily: 'Whitney',
              fontSize: getCorrectFontSizeForScreen(w,h,9),
              // backgroundColor:'red',
              color:Colors.fourthTextColor,
              // textAlign:'center'
            },



            maleTextContainer:{
              paddingVertical: h*0.015,
            },
            maleText:{
              fontFamily: 'Whitney',
              fontSize: getCorrectFontSizeForScreen(w,h,15),
              // backgroundColor:'red',
              color:Colors.fourthTextColor,
              textAlign:'center'
            },
            femaleTextContainer:{
              paddingVertical: h*0.015,
            },
            femaleText:{
              fontFamily: 'Whitney',
              fontSize: getCorrectFontSizeForScreen(w,h,15),
              // backgroundColor:'red',
              color:Colors.fourthTextColor,
              textAlign:'center'
            },
            nonbinaryTextContainer:{
              paddingVertical: h*0.015,
            },
            nonbinaryText:{
              fontFamily: 'Whitney',
              fontSize: getCorrectFontSizeForScreen(w,h,15),
              // backgroundColor:'red',
              color:Colors.fourthTextColor,
              textAlign:'center'
            }




        });
    }


    onDone(gender){
      if(!!this.props.onGenderProvided){
        this.props.onGenderProvided(gender);
      }
    }

    onClose(){
      if(!!this.props.onClose){
        this.props.onClose();
      }
    }



    render(){
      let styles = this.getStyles(this.props.extraBottomSpace);
      let backgroundColor= TouchableNativeFeedback.Ripple(Colors.accentColor);
        return (
            <Modal
                backdrop={true}
                animationDuration={200}
                swipeThreshold={90}
                style={styles.modal}
                position="bottom"
                swipeToClose={false}
                isOpen={this.props.isOpen}
                onClosed={this.onClose.bind(this)}
              >

              <View style={styles.content}>
                <View style={styles.btnContainer}>
                  <TouchableNativeFeedback onPress={this.onClose.bind(this)}  backgroundColor={backgroundColor}>
                    <View style={styles.closeBtnContainer}  >
                      <PavIcon name="close-badge" size={17} style={styles.closeBtnIcon}/>
                      <View style={styles.closeBtnTextContainer}>
                        <Text style={styles.closeBtnText}>CLOSE</Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                </View>
                <View style={styles.genderPickerContainer}>
                  <TouchableNativeFeedback onPress={()=>this.onDone("male")} backgroundColor={backgroundColor}>
                    <View style={styles.maleTextContainer}>
                      <Text style={styles.maleText}>Male</Text>
                    </View>
                 </TouchableNativeFeedback>
                 <TouchableNativeFeedback onPress={()=>this.onDone("female")}  backgroundColor={backgroundColor}>
                   <View style={styles.femaleTextContainer}>
                     <Text style={styles.femaleText}>Female</Text>
                   </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>this.onDone("non-binary")}  backgroundColor={backgroundColor}>
                  <View style={styles.nonbinaryTextContainer}>
                    <Text style={styles.nonbinaryText}>Non-Binary</Text>
                  </View>
               </TouchableNativeFeedback>
                </View>


              </View>
            </Modal>
        );
    }
}


InputGenderModalBox.defaultProps={
    extraBottomSpace:0
}
InputGenderModalBox.propTypes= {
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onGenderProvided: React.PropTypes.func.isRequired,
  extraBottomSpace: React.PropTypes.number
};
module.exports = InputGenderModalBox;
