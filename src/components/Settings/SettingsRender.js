/* @flow */
/**
 * # SettingsRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



/*A react native button*/
import Button from 'sp-react-native-iconbutton'

import PavSpinner from '../../lib/UI/PavSpinner'

import moment from 'moment'
/**
* Icons library
*/



import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Picker,
  TouchableOpacity,
  Switch
} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import CardFactory from '../Cards/CardFactory';

import defaultUserPhoto from '../../../assets/defaultUserPhoto.png';
import PavImage from '../../lib/UI/PavImage'
import AccordionPicker from '../EmailSignUp/AccordionPicker';
/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
let Form = t.form.Form;
import Collapsible from 'react-native-collapsible'
import TouchableInput from './TouchableInput';

/**
 * The states were interested in
 */
const {
  SETTINGS
} = ScheneKeys;





// here we are: define your domain model
const ResidenceEmailFields = t.struct({
  residence: t.maybe(t.String),  // an optional string
  email: t.maybe(t.String)  // an optional string
});


const FORM_INPUT_COLOR = Colors.thirdTextColor;
const FORM_DISABLED_COLOR = '#777777';
const FORM_DISABLED_BACKGROUND_COLOR = '#eeeeee';
const FORM_FONT_SIZE = getCorrectFontSizeForScreen(w,h,10);
const FORM_FONT_WEIGHT = '500';

const formStyles = Object.freeze({
  fieldset: {
    flexDirection: 'column'
  },

  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      flex:1,
      paddingVertical: h*0.008,
      // marginBottom: 10
    },
    error: {
      flex:1,
      paddingVertical: h*0.008,
      // marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      // color: Colors.secondaryTextColor,
      color: Colors.fourthTextColor,
      fontSize: getCorrectFontSizeForScreen(w,h,10),
      marginBottom: 7,
      fontWeight: FORM_FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      color: Colors.errorTextColor,
      fontSize: FORM_FONT_SIZE,
      marginBottom: 7,
      fontWeight: FORM_FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: Colors.helpTextColor,
      fontSize: FORM_FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: Colors.helpTextColor,
      fontSize: FORM_FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    flexWrap: 'wrap',
    // position: 'absolute',
    // backgroundColor: 'red',
    fontSize: getCorrectFontSizeForScreen(w,h,10),
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.errorTextColor
    // color:'green',

  },
  textbox: {
    normal: {
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      color: FORM_INPUT_COLOR,
      // backgroundColor:'red',
      fontSize: FORM_FONT_SIZE,
      // height: 45,
      paddingVertical: h*0.022,
      paddingHorizontal: w*0.018,
      borderRadius: 1,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,
    },
    // the style applied when a validation error occours
    error: {
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      color: FORM_INPUT_COLOR,
      fontSize: FORM_FONT_SIZE,
      height: 45,
      borderRadius: 1,
      borderColor: Colors.errorTextColor,
      borderWidth: 1,

    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
      fontSize: FORM_FONT_SIZE,
      height: 36,
      borderRadius: 1,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,
      color: FORM_DISABLED_COLOR,
      backgroundColor: FORM_DISABLED_BACKGROUND_COLOR
    }
  }
});



class SettingsRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      gender:null,
      dob:null,
      residence:null,
      email:null,
      isPrivate:null,
      pronounPickerCollapsed: true,

    }
  }







  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal:10
      },

      titleText: {
        // backgroundColor: 'black',
        fontSize: getCorrectFontSizeForScreen(w,h,27),
        color: Colors.mainTextColor,
        textAlign: 'center',
      }

    });
  }


  formUserLocationText(user){
    if(!!user.city){
      if(user.stateProvince!=null){
        return user.city+", "+user.stateProvince
      }else{
        return user.city;
      }
    }else{
      return "Location";
    }

  }



  componentDidMount(){




  }





  onPronounClick(){
    alert("On pronoun")
  }
  onDateClick(){
    alert("On date")
  }

  onResidenceFinishedEditing(){
    if(this.props.form.isValid.get(SETTINGS) && !this.props.form.isFetching){
        this.refs.settingsForm.getComponent('email').refs.input.focus();
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {





    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // form_styles
    let formOptions = {
      stylesheet: formStyles,
      auto: 'placeholders',
      fields: {
        residence:{
          label: 'Residence',
          maxLength: 50,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.emailHasError || this.props.form.error,
          error: this.props.form.error || 'Please give us a valid email address.',
          placeholder: 'Los Angeles',
          returnKeyType: 'next',
          blurOnSubmit : true,
          onSubmitEditing: this.onResidenceFinishedEditing,
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          autoCapitalize:'none',
          placeholderTextColor: Colors.secondaryTextColor,
          // autoFocus: true,
          // keyboardType: "email-address"
        },
        email: {
          label: 'Email',
          maxLength: 50,
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.emailHasError || this.props.form.error,
          error: this.props.form.error || 'Please give us a valid email address.',
          placeholder: 'mail@example.com',
          returnKeyType: 'done',
          blurOnSubmit : true,
          // onSubmitEditing: this.onEmailFinishedEditing,
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          autoCapitalize:'words',
          placeholderTextColor: Colors.secondaryTextColor,
          // autoFocus: true,
          keyboardType: "email-address"

        }
      }
    };
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
        <View style={styles.container}>
          <ScrollView
          style={styles.scroller}
          bounces={false}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                ACCOUNT SETTINGS
              </Text>
            </View>

            <View style={styles.accountSettingsContainer}>
              <View style={styles.imgDobPronounContainer}>
                <PavImage
                  style={styles.userImg}
                  key="settings_user_img"
                  defaultSource={defaultUserPhoto}
                  source={{uri: this.props.curUser}}
                  resizeMode='contain'
                ></PavImage>

                <View style={styles.dobPronounContainer}>
                  <TouchableInput title="Preferred Pronoun " value="His " onTap={this.onPronounClick.bind(this)}/>
                  <TouchableInput title="Date of Birth " value="28/08/1990 " onTap={this.onDateClick.bind(this)}/>
                </View>
              </View>

              <Form
                ref="settingsForm"
                type={ResidenceEmailFields}
                options={formOptions}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                PASSWORD & PRIVACY SETTINGS
              </Text>
            </View>
            <View style={styles.passwordPrivacyContainer}>
              <View style={styles.isPrivateTitleContainer}>
                <Text style={styles.isPrivateTitle}>
                  Make my profile page private so no one can view it
                </Text>
              </View>

              <View style={styles.isPrivateValueContainer}>
                <View style={styles.isPrivateValueTextContainer}>
                  <Text style={styles.isPrivateTitle}>
                    Private:
                  </Text>
                  <Text style={styles.isPrivateValueText}>
                    (Currently set to <Text style={styles.isPrivateValueCurSetText}>{this.state.isPrivate===false?"public":"private"})</Text>
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Switch
                    onValueChange={(value) => this.setState({isPrivate:value})}
                    onTintColor={Colors.accentColor}
                    thumbTintColor={Colors.primaryColor}

                    value={this.state.isPrivate} />
                </View>
              </View>

            </View>

          </ScrollView>
        </View>
    );
  }
  // <Collapsible
  // collapsed={this.state.pronounPickerCollapsed}
  // style={{backgroundColor:'blue'}}
  // align="center"
  // onChange={
  //   (collapsed)=>{this.setState({pronounPickerCollapsed:collapsed})}
  // }
  // >
  //   <Picker
  //     style={styles.pronounPicker}
  //     selectedValue={this.state.gender}
  //     onValueChange={(gender) => this.setState({gender: gender})}>
  //     <Picker.Item label="His" value="male" />
  //     <Picker.Item label="Her" value="female" />
  //     <Picker.Item label="They" value="gay" />
  //   </Picker>
  // </Collapsible>



    /**
     * ## Styles for PORTRAIT
     */
    getPortraitStyles(self){
      return StyleSheet.create({


        container: {
          flex:1,
          flexDirection: 'column',
          // paddingBottom:self.props.isTab===false?0:50, //tab bar height
          paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
          backgroundColor: 'white',
          // marginVertical: 10,
          // marginHorizontal:15
        },
        scroller:{
          flex:1,
        },


        accountSettingsContainer:{
          // flex:1,
          flexDirection:"column",
          paddingHorizontal: w*0.022,
          paddingBottom:h*0.008,
          // backgroundColor:'pink'
        },

        titleContainer:{
          backgroundColor: Colors.titleBgColorDark,
          borderBottomColor: "rgba(0, 0, 0, 0.07)",
          borderBottomWidth: 1,
          paddingHorizontal: w*0.020,
          paddingVertical: h*0.015,
        },

        titleText:{
          color: Colors.primaryColor,
          fontFamily: 'Whitney-Bold',
          fontSize: getCorrectFontSizeForScreen(w,h,8),
        },

        imgDobPronounContainer:{
          flexDirection:'row',
          paddingVertical:h*0.015,
          alignItems:'center',
          // backgroundColor:'orange'
        },
        userImg:{
          width:h*0.21,
          height:h*0.21,
        },

        dobPronounContainer:{
          flex:1,
          flexDirection:'column',
          // backgroundColor:'pink',
          paddingLeft: w*0.015,
          justifyContent:'center'
        },




        passwordPrivacyContainer:{
          flexDirection:"column",
          paddingHorizontal: w*0.022,
          paddingBottom:h*0.008,
        },
        isPrivateTitleContainer:{
          paddingVertical:h*0.015,
        },
        isPrivateTitle:{
          fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          fontSize: getCorrectFontSizeForScreen(w,h,10),
          color: Colors.fourthTextColor,
        },
        isPrivateValueContainer:{
          paddingVertical:h*0.015,
          flexDirection:'row',
        },
        isPrivateValueTextContainer:{
          flex:1,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingRight: w*0.025,
          // backgroundColor:'pink'
        },
        switchContainer:{
          // backgroundColor:'purple',
          alignItems:'center'
        },
        isPrivateValueText:{
          fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          fontSize: getCorrectFontSizeForScreen(w,h,9),
          color: Colors.secondaryTextColor,
        },
        isPrivateValueCurSetText:{
          fontFamily: 'Whitney Semibold', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
          fontSize: getCorrectFontSizeForScreen(w,h,9),
          color: Colors.secondaryTextColor,
        },




      });
    }


  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log("########### Cur user update: "+(nextProps.curUser !== this.props.curUser));
  //   return(
  //     (nextProps.device !== this.props.device)
  //     // ||
  //     // (nextProps.isFetchingTimeline !== this.props.isFetchingTimeline)
  //     // ||
  //     // (nextProps.isFetchingOldTimelineData !== this.props.isFetchingOldTimelineData)
  //     // ||
  //     // (nextProps.isFetchingProfile !== this.props.isFetchingProfile)
  //     // ||
  //     // (nextProps.isFetchingFollow !== this.props.isFetchingFollow)
  //     // ||
  //     // (nextProps.curUser !== this.props.curUser)
  //     // ||
  //     // (nextState.dataSource !== this.state.dataSource)
  //     // ||
  //     // (nextProps.lastActivityTimestamp !== this.props.lastActivityTimestamp)
  //     // ||
  //     // (nextProps.voteCnt !== this.props.voteCnt)
  //     // ||
  //     // (nextProps.followerCnt !== this.props.followerCnt)
  //     // ||
  //     // (nextProps.followingCnt !== this.props.followingCnt)
  //     // ||
  //     // (nextProps.currentlyFollowingUser !== this.props.currentlyFollowingUser)
  //   );
  // }
}



SettingsRender.propTypes= {
  // timelineData: React.PropTypes.object,
  curUser: React.PropTypes.object,
  // device: React.PropTypes.object.isRequired,
  // isTab: React.PropTypes.bool,
  // followingCnt: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.number,
  // ]),
  // onFetchOlderTimelineData:React.PropTypes.func.isRequired,

};
export default SettingsRender;
