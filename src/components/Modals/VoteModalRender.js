/* @flow weak */
'use strict';

import Button from 'sp-react-native-iconbutton';
import {Actions} from 'react-native-router-flux';
import React from 'react-native';

const {
  View,
  Text,
  StyleSheet,
  PixelRatio
} = React;

import {Colors} from '../../config/constants';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation






class VoteModalBox extends React.Component {
    constructor(){
        super();
    }
    // componentWillMount(){
    //     this.setState({isOpen: true});
    // }

    renderXbutton(shouldRender, styles){
      if(shouldRender){
        return (<View style={styles.buttonContainer}>
          <Button textStyle={styles.whiteBtnText} style={styles.closeBtn} iconProps={{name: "close",size:25, color: "black"}}
              onPress={this.props.onCloseBtnClicked}>
          </Button>
        </View>);
      }else{
        return <View></View>;
      }

    }

    getStyles(){
        return StyleSheet.create({
            modal: {
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                height: h*1,
                width: w*1,
            },
            modalVerticalParent:{
              flex:1,
              flexDirection:'column',
              // backgroundColor: 'pink',
              alignItems: 'center'
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
                fontSize: getCorrectFontSizeForScreen(w,h,22)
            },
            whiteBtnText:{
              color: Colors.mainTextColor,
              fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
              textAlign: 'center'
            },









              baseContainer: {
                flex:1,
                // backgroundColor: 'red',
              },
              contentContainer: {
                flex:1,
                // backgroundColor: 'blue',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center',
                marginVertical: 10,
                marginHorizontal:10,
                // backgroundColor: 'pink'
              },
              sendButton: {
                width: w*0.5,
                backgroundColor: this.props.btnBackground,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: Colors.mainBorderColor,
                marginTop: 15,
                height: 60
              },
              explanationContainer:{
                flex:0.65,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center'
                // backgroundColor: 'orange'
              },
              descriptionText: {
                backgroundColor: Colors.transparentColor,
                fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
                fontSize: getCorrectFontSizeForScreen(w,h,21),
                color: Colors.thirdTextColor,
                textAlign: 'center',
                marginHorizontal: 10,
                marginVertical: 10
              },
              descriptionText2: {
                backgroundColor: Colors.transparentColor,
                fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
                fontSize: getCorrectFontSizeForScreen(w,h,17),
                color: Colors.thirdTextColor,
                textAlign: 'center',
                marginHorizontal: 10,
                marginVertical: 10
              },
              formContainer:{
                flex:0.25,
                width: w*0.85,
                // backgroundColor: 'green',
                flexDirection: 'row',
                justifyContent:'center',
                alignItems:'center'
              },
              buttonContainer:{
                flex:0.35,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent:'center',
                alignItems:'center'
              }
        });
    }
    render(){
      let styles = this.getStyles();
        return (
          <View style={styles.modalVerticalParent}>

            <View style={styles.modalContentContainer}>
              <View style={styles.baseContainer}>
                <View style={styles.contentContainer}>

                  <View style={styles.explanationContainer}>
                    <Text style={styles.descriptionText} >{this.props.modalText}</Text>
                    <Text style={styles.descriptionText2}>{this.props.modalText2}</Text>
                  </View>

                  <View style={styles.buttonContainer}>
                    <Button textStyle={styles.whiteBtnText} style={styles.sendButton}
                        isDisabled={this.props.modalButtonDisabled}
                        onPress={()=>{
                          this.refs.welcomeModal.close();
                        }}>
                      {this.props.modalBtnText}
                    </Button>
                  </View>
                </View>
              </View>

            </View>

          </View>
        );
    }
}


module.exports = VoteModalBox;
