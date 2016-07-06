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
  DatePickerAndroid
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

class InputBirthdayModalBox extends React.Component {
    constructor(){
        super();
        this.datePickerIsOpen=false;
        this.state={
          date: new Date(),
        }
    }


    getStyles(extraBottomSpace){
        return StyleSheet.create({
            modal: {
                // justifyContent: 'center',
                // alignItems: 'center',
                height: (h*0.45),
                // width: w*1,
                // paddingBottom:(h*0.08)+extraBottomSpace,
                // backgroundColor: 'red'
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
              fontSize: getCorrectFontSizeForScreen(7),
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
              fontSize: getCorrectFontSizeForScreen(7),
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
              // backgroundColor: Colors.titleBgColor,
              backgroundColor:'white',
              justifyContent:'center',
              // paddingHorizontal:w*0.01,
              // paddingVertical:w*0.018,
              borderRadius:2,
            },

            datePickerContainer:{
              flex:1,
              justifyContent:'center',
              // backgroundColor:'red',
            },
            datePicker:{
              // flex:1,
              // backgroundColor:'green',
              alignSelf:'center',
            },



            //content
            pasteLinkTextContainer:{
              justifyContent:'center',
              paddingHorizontal: w*0.025,
            },

            pasteLinkText:{
              fontFamily: 'Whitney',
              fontSize: getCorrectFontSizeForScreen(9),
              // backgroundColor:'red',
              color:Colors.fourthTextColor,
              // textAlign:'center'
            },



            inputText:{
              // flex:1,
              width:w*0.7,
              backgroundColor:'white',
              borderRadius: 2,
              borderWidth: 1,
              borderColor: '#E7E6ED',
              paddingHorizontal:w*0.01,
              textAlignVertical: "center",
              fontFamily: 'Whitney Book',
              fontSize: getCorrectFontSizeForScreen(10),
              color: Colors.thirdTextColor,
            },

            arrowBtnIcon:{
              // borderTopWidth: 15,
              // borderTopColor: 'red',
              // borderTopColor: Colors.titleBgColor,
              color: Colors.titleBgColor,
            }




        });
    }



    onDone(){
      if(!!this.props.onDateProvided){
        this.props.onDateProvided(moment(this.state.date).format('x'));
      }
    }

    onClose(){
      if(!!this.props.onClose){
        this.props.onClose();
      }
    }

    onDateChange(date){
      this.setState({date:date});
    }




    async openDatepicker(){
      console.log("Datepicker is open: "+this.datePickerIsOpen);
      if(this.props.isOpen===true && this.datePickerIsOpen===false){
        this.datePickerIsOpen = true;
        try {
           const {action, year, month, day} = await DatePickerAndroid.open({date: new Date()})
           console.log("Date action: "+action);
           if (action === DatePickerAndroid.dismissedAction) {
             this.props.onClose();
             this.datePickerIsOpen = false;
           } else {
             var newDate = new Date(year, month, day);
             this.props.onDateProvided(moment(newDate).format('x'));
             this.datePickerIsOpen = false;
           }
          //  this.setState(newState);
         } catch ({code, message}) {
           console.log("DatePickerAndroid failed: "+message);
           this.props.onClose();
         }
       }

    }

    render(){



      this.openDatepicker();



      return (
          <View></View>
      );
    }

}


InputBirthdayModalBox.defaultProps={
    extraBottomSpace:0
}
InputBirthdayModalBox.propTypes= {
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onDateProvided: React.PropTypes.func.isRequired,
  extraBottomSpace: React.PropTypes.number
};
module.exports = InputBirthdayModalBox;
