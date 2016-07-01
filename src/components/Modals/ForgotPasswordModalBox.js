'use strict';

import Button from 'sp-react-native-iconbutton';


import Modal from 'react-native-modalbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import {Colors} from '../../config/constants';

class ForgotPasswordModalBox extends React.Component {
    constructor(){
        super();
    }
    // componentWillMount(){
    //     this.setState({isOpen: true});
    // }


    renderErrorTextIfExists(){
      if(this.props.forgotPasswordErrorValue!==false){
        return (
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorText} >
            Please enter your valid email address.
            </Text>
          </View>
        )
      }
    }
    render(){

        return (
            <Modal animationDuration={200}
                    swipeToClose={true}
                    swipeThreshold={90}
                    style={styles.modal}
                    position={"center"}
                    isOpen={this.props.isOpen}
                    onClosed={this.props.onModalClosed}>

              <TouchableOpacity style={styles.closeBtnContainer} onPress={this.props.onCloseBtnClicked} >
                  <PavIcon name="close-badge" size={17} style={styles.closeBtnIcon}/>
                  <View style={styles.closeBtnTextContainer}>
                    <Text style={styles.closeBtnText}>CLOSE</Text>
                  </View>
              </TouchableOpacity>
              <View style={styles.contentContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.titleText} >
                  Forgot Password
                  </Text>
                </View>
                <View style={styles.descriptionTextContainer}>
                  <Text style={styles.descriptionText}>
                  Please enter your email address. {"\n"}A link will be generated for you to reset your password.
                  </Text>
                </View>
                {this.renderErrorTextIfExists()}

                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => this.props.onForgotPasswordTextChange(text)}
                    value={this.props.forgotPasswordTextValue}
                    autoFocus={true}
                    multiline={false}
                    placeholder="Please type your email address."
                    keyboardType="email-address"
                    autoCorrect={false}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={Colors.secondaryTextColor}
                    onSubmitEditing={this.props.onNextBtnClicked}
                    returnKeyType="send"
                    autoCapitalize="none"
                />

                <Button textStyle={styles.whiteBtnText}
                    style={styles.sendButton}
                    isDisabled={this.props.forgotPasswordDisabled}
                    isLoading={this.props.auth.form.isFetching}
                    activityIndicatorColor={Colors.mainTextColor}
                    onPress={this.props.onNextBtnClicked}>
                  Send
                </Button>
              </View>
            </Modal>
        );
    }
}
var styles = StyleSheet.create({
    modal: {
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: h*0.55,
        width: w*0.94,
        backgroundColor:Colors.transparentColor
    },



    closeBtnContainer:{
      // paddingVertical: h*0.015,
      paddingHorizontal: w*0.015,
      // backgroundColor:'pink',
      // backgroundColor:'red',
      flexDirection:'row',
      // justifyContent:'flex-end',
      alignSelf:'flex-end',
      alignItems:'center',
    },
    closeBtnTextContainer:{
      paddingVertical: h*0.015,
      paddingHorizontal: w*0.015,
    },
    closeBtnText:{
      color: Colors.mainTextColor,
      fontFamily: 'Whitney-Bold',
      fontSize: getCorrectFontSizeForScreen(w,h,7),
      textAlign:'center'
    },
    closeBtnIcon:{
      color: Colors.mainTextColor,
    },




    contentContainer: {
      flex:1,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'center',
      // alignItems:'center',
      // marginVertical: 10,
      // marginHorizontal:10,
      // backgroundColor: 'pink'
    },







    titleTextContainer:{
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginVertical: 10,
      // backgroundColor: 'orange'
    },
    titleText: {
      // backgroundColor: Colors.transparentColor,
      fontFamily: 'Whitney Semibold', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      fontSize: getCorrectFontSizeForScreen(w,h,16),
      color: Colors.thirdTextColor,
      textAlign: 'center',

    },

    descriptionTextContainer:{
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginVertical: 10
      // backgroundColor: 'orange'
    },
    descriptionText: {
      // backgroundColor: Colors.transparentColor,
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      fontSize: getCorrectFontSizeForScreen(w,h,10),
      color: Colors.thirdTextColor,
      textAlign: 'center',

    },

    errorTextContainer:{
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 10,
      // backgroundColor: 'orange'
    },
    errorText: {
      // backgroundColor: Colors.transparentColor,
      fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      fontSize: getCorrectFontSizeForScreen(w,h,8),
      color: Colors.negativeAccentColor,
      textAlign: 'center',

    },




    inputText:{
      // flex:1,
      height:h*0.06,
      // width:w*0.7,
      marginHorizontal:w*0.05,
      marginVertical:h*0.01,
      backgroundColor:'white',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: '#E7E6ED',
      paddingHorizontal:w*0.01,
      textAlignVertical: "top",
      fontFamily: 'Whitney Book',
      fontSize: getCorrectFontSizeForScreen(w,h,10),
      color: Colors.thirdTextColor,
    },



    sendButton: {
      marginVertical:h*0.03,
      alignSelf:'center',
      height: 40,
      width: w*0.5,
      backgroundColor: Colors.accentColor,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: Colors.mainBorderColor,

    },

    whiteBtnText:{
      color: Colors.mainTextColor,
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      textAlign: 'center',
      fontSize: getCorrectFontSizeForScreen(w,h,14),
    },




});
ForgotPasswordModalBox.propTypes= {
  isOpen: React.PropTypes.bool.isRequired,
  forgotPasswordErrorValue: React.PropTypes.any.isRequired,
  forgotPasswordDisabled: React.PropTypes.bool.isRequired,
  forgotPasswordTextValue: React.PropTypes.string,
  onModalClosed: React.PropTypes.func.isRequired,
  onNextBtnClicked: React.PropTypes.func.isRequired,
  onForgotPasswordTextChange: React.PropTypes.func.isRequired,
};
module.exports = ForgotPasswordModalBox;
