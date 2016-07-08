/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as globalActions from '../../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
// import Button from 'sp-react-native-iconbutton';
import Button from 'sp-react-native-iconbutton'


/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../../components/ErrorAlert';

import TopicPickGrid from './TopicPickGrid';
import WelcomeModalBox from '../Modals/WelcomeModalBox';
/**
 *  The SignUpBirthZipcodeForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */


import {Colors, ScheneKeys} from '../../config/constants';

/**
 * The states were interested in
 */
const {
  REGISTER_STEP_4
} = ScheneKeys;

import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableHighlight, View, Image, PixelRatio} from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  globalActions
];

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}







class TopicPickRender extends React.Component {


  /**
   * ## Styles
   */
  getStyles() {
    return StyleSheet.create({

      baseContainer: {
        flex:1,
        backgroundColor: Colors.primaryColor,
      },
      contentContainer: {
        flex:1,
        flexDirection: 'column'
      },
      backBtn:{
        alignItems:'flex-start',
        top:h*0.05,
        left:w*0.02,
        width:w*0.15,
        height:w*0.15,
        borderWidth: 0,
        position: 'absolute',
      },
      backBtnIconContainer:{
        paddingVertical:w*0.03,
      },
      backBtnIcon:{
        // backgroundColor: 'pink',
        color: '#FFFFFF',
      },
      explanationContainer:{
        flex:this.props.backButtonEnabled?0.25:0.21,
        flexDirection: 'column',
        backgroundColor: Colors.primaryColor,
      },
      topicsContainer:{
        flex:this.props.backButtonEnabled?0.58:0.62,
        backgroundColor: 'white'
      },

      inputsContainer:{
        marginTop:15,
        marginBottom:20,
        marginHorizontal:15,
        justifyContent: "flex-end",
        backgroundColor: 'white'

      },
      footerContainer:{
        flex:0.17,
        backgroundColor: 'white'
      },
      descriptionTextContainer:{
        flex:1,
        // backgroundColor: 'red',
        justifyContent: 'center'
      },
      descriptionText: {
        fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
        backgroundColor: Colors.transparentColor,
        // backgroundColor:'black',
        fontSize: getCorrectFontSizeForScreen(13),
        color: Colors.mainTextColor,
        textAlign: 'center',
        marginHorizontal: w*0.14,
      },
      nextStepBtn: {
        backgroundColor: Colors.accentColor,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.mainBorderColor,
        height: 60
      },
      whiteBtnText:{
        fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
        color: Colors.mainTextColor,
        textAlign: 'center',
        fontSize: getCorrectFontSizeForScreen(14)
      }

    });
  }

  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    // this.state ={
    //   value: {
    //
    //   }
    // };
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    // this.setState({
    //   value: {
    //   	dateOfBirth: nextprops.auth.form.fields.dateOfBirth,
    //   	zipCode: nextprops.auth.form.fields.zipCode
    //   }
    // });
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  // onChange(value) {
  //
  //   // console.log("Changed"+JSON.stringify(value));
  //   if (value.dateOfBirth != ''&& value.dateOfBirth != undefined) {
  //     // console.log("DATE value about to change to: "+value.dateOfBirth);
  //     this.props.actions.onAuthFormFieldChange('dateOfBirth',value.dateOfBirth, REGISTER_STEP_4);
  //   }
  //   if (value.zipCode != '' && value.zipCode != undefined ) {
  //     this.props.actions.onAuthFormFieldChange('zipCode',value.zipCode, REGISTER_STEP_4);
  //   }
  //
  //   if(value.dateOfBirthIsCurBeingPicked!=undefined){
  //     this.props.actions.onAuthFormFieldChange('dateOfBirthIsCurBeingPicked',value.dateOfBirthIsCurBeingPicked, REGISTER_STEP_4);
  //   }else{
  //     this.setState(
  //       {value}
  //     );
  //   }
  // }





  renderBackButton(styles){
    if(!this.props.backButtonEnabled){
      return (<View></View>)
    }else{
      return (
        <Button onPress={this.props.onBack}
          style={styles.backBtn}
          isDisabled={false}
          isLoading={false}
          iconContainerStyle={styles.backBtnIconContainer}
          customIcon={()=><PavIcon name="arrow-left" size={25} style={styles.backBtnIcon}/>}
        />
      );
    }
  }


  onSelectedTopicsChange(topic){
    // console.log("on selected topics change: "+topic)
    this.props.actions.onSelectedTopicsChange(topic);
  }



  getTopicData(topicList){
    var data = [];
    for (var topicKey in topicList) {
      var curTopic = topicList[topicKey];
      data.push({
        title:curTopic.title,
        isSelected: curTopic.isSelected,
        icon: curTopic.icon,
        key: topicKey
      })
    }
    return data;
  }



  modalPopupRender(enabled, errorMsg){
    if(enabled){
      if(!!errorMsg){
        return (<WelcomeModalBox
        isOpen={enabled}
        modalButtonDisabled = {this.props.modalButtonDisabled}
        onModalClosed={this.props.onModalClosed}
        modalText="Oops"
        modalText2={errorMsg}
        modalBtnText="Back"
        btnBackground={Colors.errorTextColor}
         />);
      }else{
        return (<WelcomeModalBox
        isOpen={enabled}
        modalButtonDisabled = {this.props.modalButtonDisabled}
        onModalClosed={this.props.onModalClosed}
        modalText="Its a thrill to have you with us"
        modalText2="You are now registered."
        modalBtnText="Lets get started"
        btnBackground={Colors.accentColor}
         />);
      }

    }else{
      return <View></View>;
    }

  }
  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {


    let styles = this.getStyles();
    // var onButtonPress = this.props.onButtonPress;


    // topics={this.props.auth.form.fields.topicsList.toJS()}
    // selectedTopics={this.props.auth.form.fields.selectedTopicsList.toArray()}


    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>


            <View style={styles.explanationContainer}>
              <View style={styles.descriptionTextContainer}>
                <Text style={styles.descriptionText} >
                Finally, help us tailor the content we serve you, by telling us what topics you are most interested in voting on.
                </Text>
              </View>
              {this.renderBackButton(styles)}
            </View>

            <View style={styles.topicsContainer}>
              <TopicPickGrid
              topicData={this.getTopicData(this.props.auth.form.fields.topicsList.toJS())}
              onSelectedTopicsChange={this.onSelectedTopicsChange.bind(this)}
              disabled={this.props.auth.form.isFetching}
              />
            </View>

            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <Button textStyle={styles.whiteBtnText}
                  style={styles.nextStepBtn}
                  onPress={this.props.onNextStep}
                  isDisabled={this.props.auth.form.isFetching || this.props.auth.user.isLoggedIn}
                  isLoading={this.props.auth.form.isFetching}
                  activityIndicatorColor={Colors.mainTextColor}
                  >
                  Finish
                </Button>
              </View>
            </View>

        </View>
        {this.modalPopupRender(this.props.modalPopupEnabled,this.props.modalPopupErrorMsg)}
      </View>
    );
  }
  shouldComponentUpdate(nextProps) {
    return (
      (nextProps.auth.user.isLoggedIn!==this.props.auth.user.isLoggedIn)
      ||
      (nextProps.auth.form.isFetching!==this.props.auth.form.isFetching)
      ||
      (nextProps.auth.form.fields.topicsList!==this.props.auth.form.fields.topicsList)
      ||
      (nextProps.modalPopupEnabled!==this.props.modalPopupEnabled)
      ||
      (nextProps.modalPopupErrorMsg!==this.props.modalPopupErrorMsg)
    )

  }
}
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(TopicPickRender);
