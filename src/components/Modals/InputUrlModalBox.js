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
  TouchableOpacity
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

class InputUrlModalBox extends React.Component {
    constructor(){
        super();
        this.state={
          url:""
        }
    }


    getStyles(extraBottomSpace){
        return StyleSheet.create({
            modal: {
                justifyContent: 'center',
                alignItems: 'center',
                height: (h*0.33+extraBottomSpace),
                width: w*1,
                paddingBottom:(h*0.08)+extraBottomSpace,
                // backgroundColor: '#00000088'
                backgroundColor: Colors.transparentColor,

            },


            btnContainer:{
              // flex:1,
              width: w*0.9,
              flexDirection:'row',
              justifyContent:'space-between',
              // backgroundColor:'red'
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
              color: Colors.mainTextColor,
              fontFamily: 'Whitney-Bold',
              fontSize: getCorrectFontSizeForScreen(w,h,7),
              textAlign:'center'
            },
            doneBtnIcon:{
              color: Colors.mainTextColor,
              backgroundColor: Colors.transparentColor,
            },





            content:{
              flex:1,
              flexDirection:'row',
              backgroundColor: Colors.titleBgColor,
              justifyContent:'center',
              paddingHorizontal:w*0.01,
              paddingVertical:w*0.018,
              borderRadius:1,
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
              fontSize: getCorrectFontSizeForScreen(w,h,10),
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
      if(!!this.props.onUrlAttached){
        this.props.onUrlAttached(this.state.url);
      }
    }

    onClose(){
      if(!!this.props.onClose){
        this.props.onClose();
      }
    }



    render(){
      let styles = this.getStyles(this.props.extraBottomSpace);
        return (
            <Modal
                backdrop={true}
                animationDuration={200}
                swipeThreshold={90}
                style={styles.modal}
                position="bottom"
                swipeToClose={true}
                isOpen={this.props.isOpen}
                onClosed={this.onClose.bind(this)}
              >
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={this.onClose.bind(this)} style={styles.closeBtnContainer}>
                    <PavIcon name="close-badge" size={17} style={styles.closeBtnIcon}/>
                    <View style={styles.closeBtnTextContainer}>
                      <Text style={styles.closeBtnText}>CLOSE</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDone.bind(this)} style={styles.doneBtnContainer}>
                    <PavIcon name="add" size={17} style={styles.doneBtnIcon}/>
                    <View style={styles.doneBtnTextContainer}>
                      <Text style={styles.doneBtnText}>ATTACH</Text>
                    </View>
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <View style={styles.pasteLinkTextContainer}>
                  <Text  style={styles.pasteLinkText}>Paste Link: </Text>
                </View>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => this.setState({url:text})}
                    value={this.state.url}
                    autoFocus={true}
                    multiline={false}
                    placeholder="http://www.domain.com"
                    keyboardType="url"
                    autoCorrect={false}
                    selectionColor={Colors.primaryColor}
                    onSubmitEditing={this.onDone.bind(this)}
                    returnKeyType="done"
                    autoCapitalize="none"
                />
              </View>
              <PavIcon name="activeIndicatorShrinkedBot" size={9} style={styles.arrowBtnIcon}/>
            </Modal>
        );
    }
}


InputUrlModalBox.defaultProps={
    extraBottomSpace:0
}
InputUrlModalBox.propTypes= {
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onUrlAttached: React.PropTypes.func.isRequired,
  extraBottomSpace: React.PropTypes.number
};
module.exports = InputUrlModalBox;
