'use strict';

import Button from 'sp-react-native-iconbutton';
import ForgotPasswordRender from './ForgotPasswordRender';
import {Actions} from 'react-native-router-flux';
import  Modal from 'react-native-modalbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
} from 'react-native';


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


    render(){

        return (
            <Modal animationDuration={200}
                    swipeToClose={true}
                    swipeThreshold={90}
                    style={styles.modal}
                    position={"center"}
                    isOpen={this.props.isOpen}
                    onClosed={this.props.onModalClosed}>

              <View style={styles.modalVerticalParent}>

                <View style={styles.buttonContainer}>
                  <Button textStyle={styles.whiteBtnText} style={styles.closeBtn} iconProps={{name: "close",size:25, color: "black"}}
                      onPress={this.props.onCloseBtnClicked}>
                  </Button>
                </View>


                <View style={styles.modalContentContainer}>
                  <ForgotPasswordRender
                      onButtonPress={ this.props.onNextBtnClicked }
                      auth={ this.props.auth }
                      global={ this.props.global }
                  />
                </View>

              </View>

            </Modal>
        );
    }
}
var styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: h*0.66,
        width: w*0.94,
    },
    modalVerticalParent:{
      flex:1,
      flexDirection:'column',
      // backgroundColor: 'pink',
      alignItems: 'center'
    },
    buttonContainer:{
      width:35,
      flex:0.1,
      backgroundColor: Colors.transparentColor,
      alignSelf: 'flex-end'
    },
    closeBtn:{
      // position: 'absolute',
      borderRadius: 0,
      borderWidth: 0,
      // backgroundColor: 'blue',
      height: 10,
    },

    modalContentContainer:{
      flex:0.9,
      // backgroundColor: 'blue',
    },
    text: {
        color: "black",
        fontSize: getCorrectFontSizeForScreen(w,h,22),
    },
    whiteBtnText:{
      color: Colors.mainTextColor,
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      textAlign: 'center',
      fontSize: getCorrectFontSizeForScreen(w,h,14),
    }
});

module.exports = ForgotPasswordModalBox;
