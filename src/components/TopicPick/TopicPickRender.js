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
// const  Button = require('sp-react-native-iconbutton');
import Button from 'sp-react-native-iconbutton'


/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../../components/ErrorAlert';

import TopicPickGrid from './TopicPickGrid';
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

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  Image
}
from 'react-native';

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation





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







class TopicPickRender extends Component {


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
        marginTop:20,
        marginLeft:3,
        // position: 'absolute',
        borderRadius: 0,
        borderWidth: 0,
        alignSelf: 'flex-start',
        // backgroundColor: 'blue',
        height: 10
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
        fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
        backgroundColor: Colors.transparentColor,
        // backgroundColor:'black',
        fontSize: 18,
        color: Colors.mainTextColor,
        textAlign: 'center',
        marginHorizontal: 21,
      },
      explanImgContainer:{
        flex:0.6,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',    //y axis
        marginVertical: 10
      },
      explanImg:{
        height: 200,
        width: 200,
        resizeMode: 'cover',
        backgroundColor: 'red'
      },

      nextStepBtn: {
        backgroundColor: Colors.accentColor,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.mainBorderColor,
        height: 65
      },
      whiteBtnText:{
        fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
        color: Colors.mainTextColor,
        textAlign: 'center'
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





  renderBackButton(){
    if(!this.props.backButtonEnabled){
      return (<View></View>)
    }else{
      return (
        <Button style={styles.backBtn} textStyle={styles.whiteBtnText} iconProps={{name: "chevron-left",size:20, color: "white"}}
            onPress={this.props.onBack}>
        </Button>
      );
    }
  }


  onSelectedTopicsChange(topic){
    console.log("on selected topics change: "+topic)
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
              {this.renderBackButton()}
              <View style={styles.descriptionTextContainer}>
                <Text style={styles.descriptionText} >
                Finally, help us tailor the content we serve you, by telling us what topics you are most interested in voting on.
                </Text>
              </View>
            </View>

            <View style={styles.topicsContainer}>
              <TopicPickGrid
              topicData={this.getTopicData(this.props.auth.form.fields.topicsList.toJS())}
              onSelectedTopicsChange={this.onSelectedTopicsChange.bind(this)}

              />
            </View>

            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <Button textStyle={styles.whiteBtnText}
                  style={styles.nextStepBtn}
                  onPress={this.props.onNextStep}>
                  {this.props.nextButtonText}
                </Button>
              </View>
            </View>


        </View>
      </View>
    );
  }
}
//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default connect(mapStateToProps, mapDispatchToProps)(TopicPickRender);
