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
import {toTitleCase} from '../../lib/Utils/genericUtils'


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
import AccordionPicker from '../Templates/AccordionPicker';
/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
let Form = t.form.Form;

import TouchableInput from './TouchableInput';

import InputGenderModalBox from '../Modals/InputGenderModalBox';
import InputBirthdayModalBox from '../Modals/InputBirthdayModalBox';

import NavBarRender from '../NavBar/NavBarRender';
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
const FORM_FONT_SIZE = getCorrectFontSizeForScreen(10);
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
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      // color: Colors.secondaryTextColor,
      color: Colors.fourthTextColor,
      fontSize: getCorrectFontSizeForScreen(10),
      marginBottom: 7,
      fontWeight: FORM_FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
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
    fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    flexWrap: 'wrap',
    // position: 'absolute',
    // backgroundColor: 'red',
    fontSize: getCorrectFontSizeForScreen(10),
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.errorTextColor
    // color:'green',

  },
  textbox: {
    normal: {
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: FORM_INPUT_COLOR,
      // backgroundColor:'red',
      fontSize: FORM_FONT_SIZE,
      // height: 45,
      height: Platform.OS=="ios"?h*0.052:h*0.072,
      paddingHorizontal: w*0.018,
      borderRadius: 1,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,
    },
    // the style applied when a validation error occours
    error: {
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      color: FORM_INPUT_COLOR,
      fontSize: FORM_FONT_SIZE,
      height: Platform.OS=="ios"?h*0.052:h*0.072,
      paddingHorizontal: w*0.018,
      borderRadius: 1,
      borderColor: Colors.errorTextColor,
      borderWidth: 1,

    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
      // backgroundColor:'red',
      fontSize: FORM_FONT_SIZE,
      // height: 45,
      height: Platform.OS=="ios"?h*0.052:h*0.072,
      paddingHorizontal: w*0.018,
      borderRadius: 1,
      borderColor: Colors.mainBorderColor,
      borderWidth: 1,
      color: FORM_DISABLED_COLOR,
      backgroundColor: FORM_DISABLED_BACKGROUND_COLOR
    }
  }
});




const styles = StyleSheet.create({


  container: {
    flex:1,
    flexDirection: 'column',
    // paddingBottom:self.props.isTab===false?0:50, //tab bar height
    // paddingTop:(Platform.OS === 'ios')? 64 : 54,   //nav bar height
    backgroundColor: 'white',
    // marginVertical: 10,
    // marginHorizontal:15
  },
  scroller:{
    flex:1,
  },

  saveBtn:{
    backgroundColor: Colors.accentColor,
    alignSelf:'flex-end',
    borderColor: Colors.mainBorderColor,
    height: 35,
    width: w*0.24,
    // paddingHorizontal: w*0.076,
    // marginTop: NAV_BAR_HEIGHT-BTN_HEIGHT-8,
    // marginRight: 10,
    borderRadius: 2,
  },
  saveBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-Regular',
    fontSize: 18
  },


  accountSettingsContainer:{
    // flex:1,
    flexDirection:"column",
    paddingHorizontal: w*0.022,
    paddingVertical:h*0.008,
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
    fontSize: getCorrectFontSizeForScreen(8),
  },

  imgDobGenderContainer:{
    flexDirection:'row',
    paddingVertical:h*0.015,
    alignItems:'center',
    // backgroundColor:'orange'
  },
  userImg:{
    width:h*0.21,
    height:h*0.21,
  },
  imgEditBtnContainer:{
    flex:1,
    justifyContent:'flex-end',
    padding:w*0.015
  },
  imgEditBtn:{
    alignSelf:'flex-end',
    backgroundColor: 'white',
    borderColor: Colors.mainBorderColor,
    height:24,
    width: w*0.205,

    borderRadius: 2,
  },
  imgEditBtnText:{
    color: Colors.primaryColor,
    textAlign: 'center',
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(7)
  },

  dateOfBirthGenderContainer:{
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
    fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    fontSize: getCorrectFontSizeForScreen(10),
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
    fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    fontSize: getCorrectFontSizeForScreen(9),
    color: Colors.secondaryTextColor,
  },
  isPrivateValueCurSetText:{
    fontFamily: 'Whitney-SemiBold', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
    fontSize: getCorrectFontSizeForScreen(9),
    color: Colors.secondaryTextColor,
  },
  privacyPolicyBtnContainer:{
    paddingVertical: h*0.015,
  },
  privacyPolicyBtn:{
    backgroundColor: "#E1E1E1",
    borderColor: Colors.mainBorderColor,
    paddingVertical: h*0.013,
    paddingHorizontal: w*0.076,
    borderRadius: 1,
  },
  privacyPolicyBtnText:{
    color: Colors.fourthTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(9)
  },

  logoutBtnContainer:{
    paddingVertical: h*0.015,
  },

  logoutBtn:{
    borderWidth: 0,
    // backgroundColor: Colors.trans,
  },

  logoutBtnText:{
    color: Colors.negativeAccentColor,
    textAlign: 'center',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(9)
  },



});




















class SettingsRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      enabled: false,
      genderPickerCollapsed: true,
      formValue: {},
      versionClicks:0

    }
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


  /**
   * ### onFormFieldChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields will be validated by the settingsReducer
   */
  onFormFieldChange(value) {
    // console.log("Initial change: "+JSON.stringify(value));
    this.setState({formValue:value})
  }


  onImageEditClick(){
    if(this.props.isFetching===false){
        this.props.onImageEditClick();
    }
  }

  onGenderClick(){
    if(this.props.isFetching===false){
      this.props.showGenderPickModal();
        // alert("On gender"+(this.props.isFetching===false))
    }
  }
  onDateClick(){
    if(this.props.isFetching===false){
      this.props.showDatePickModal();
      // alert("On date"+(this.props.isFetching===false))
    }
  }

  onResidenceFinishedEditing(){
    if(this.props.fields.isValid.get(SETTINGS) && (this.props.isFetching===false)){
        this.refs.settingsForm.getComponent('email').refs.input.focus();
    }
  }




  onIsPrivateChange(isPrivate){
    this.props.onFieldChange('isPrivate', isPrivate);
  }





  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // form_styles
    let formOptions = {
      stylesheet: formStyles,
      auto: 'placeholders',
      fields: {
        residence:{
          label: 'Residence',
          maxLength: 50,
          editable: (this.props.isFetching===false),
          hasError: this.props.fields.cityHasError || this.props.fields.error,
          error: this.props.fields.error || 'Please give us a valid email address.',
          placeholder: this.props.fields.city || 'Los Angeles',
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
          hasError: this.props.fields.emailHasError || this.props.fields.error,
          error: this.props.fields.error || 'Please give us a valid email address.',
          placeholder: this.props.fields.email || 'mail@example.com',
          returnKeyType: 'done',
          blurOnSubmit : true,
          // onSubmitEditing: this.onEmailFinishedEditing,
          underlineColorAndroid: Colors.accentColor,
          autoCorrect: false,
          autoCapitalize:'words',
          placeholderTextColor: Colors.secondaryTextColor,
          editable: (this.props.isFetching===false),
          keyboardType: "email-address",

        }
      }
    };

    return(
        <View style={styles.container}>
          <NavBarRender
          title="Settings"
          renderRightIcon={
            ()=>
              <Button
                  onPress={this.props.onRightNavBtnClicked}
                  isDisabled={this.props.isFetching}
                  isLoading={this.props.isFetching}
                  style={styles.saveBtn}
                  textStyle={styles.saveBtnText}
              >
                Save
              </Button>
          }
          leftIconIsBack={true}
          onLeftIconPressed={this.props.onLeftNavBtnClicked}
          />
          <ScrollView
          style={styles.scroller}
          bounces={false}
          >
            <TouchableOpacity style={styles.titleContainer} onPress={()=>{
              if(this.state.versionClicks>7){
                alert("App Version "+this.props.appVersion);
                this.setState({versionClicks:0});
              }else{
                this.setState({versionClicks:(this.state.versionClicks+1)});
              }

            }}>
              <Text style={styles.titleText}>
                ACCOUNT SETTINGS
              </Text>
            </TouchableOpacity>

            <View style={styles.accountSettingsContainer}>
              <View style={styles.imgDobGenderContainer}>
                <PavImage
                  style={styles.userImg}
                  key="settings_user_img"
                  defaultSource={defaultUserPhoto}
                  source={{uri: this.props.fields.imgUrl}}
                  resizeMode='contain'
                >
                  <View style={styles.imgEditBtnContainer}>
                    <Button
                    onPress={this.onImageEditClick.bind(this)}
                    isLoading={(this.props.isUpdatingPhoto===true)}
                    isDisabled={(this.props.isFetching===true || this.props.isUpdatingPhoto===true)}
                    style={styles.imgEditBtn}
                    textStyle={styles.imgEditBtnText}>
                    EDIT
                    </Button>
                  </View>
                </PavImage>

                <View style={styles.dateOfBirthGenderContainer}>
                  <TouchableInput title="Gender " value={toTitleCase(this.props.fields.gender) || "Tap to pick a gender"} onTap={this.onGenderClick.bind(this)}/>
                  <TouchableInput title="Date of Birth " value={moment(this.props.fields.dateOfBirth, 'x').format('MM/DD/YYYY')} onTap={this.onDateClick.bind(this)}/>
                </View>
              </View>

              <Form
                ref="settingsForm"
                type={ResidenceEmailFields}
                options={formOptions}
                value={this.state.formValue}
                onChange={this.onFormFieldChange.bind(this)}
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
                    (Currently set to <Text style={styles.isPrivateValueCurSetText}>{this.props.fields.isPrivate===true?"private":"public"})</Text>
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Switch
                    onValueChange={this.onIsPrivateChange.bind(this)}
                    onTintColor={Colors.accentColor}
                    thumbTintColor={Colors.primaryColor}
                    disabled={(this.props.isFetching===true)}
                    value={(this.props.fields.isPrivate===true)} />
                </View>

              </View>


              <View style={styles.privacyPolicyBtnContainer}>
                <Button
                onPress={this.props.onTermsOfServiceClick}
                style={styles.privacyPolicyBtn}
                textStyle={styles.privacyPolicyBtnText}>
                Read our terms of service
                </Button>
              </View>

              <View style={styles.logoutBtnContainer}>
                <Button
                onPress={this.props.onLogoutClick}
                style={styles.logoutBtn}
                textStyle={styles.logoutBtnText}>
                Logout
                </Button>
              </View>


            </View>

          </ScrollView>
          <InputGenderModalBox
          isOpen={this.props.genderPickIsOpen}
          onClose={()=>this.props.hideGenderPickModal()}
          onGenderProvided={(gender)=>{
            this.props.onFieldChange('gender', gender);
            this.props.hideGenderPickModal();
          }}/>
          <InputBirthdayModalBox
          isOpen={this.props.datePickIsOpen}
          onClose={()=>this.props.hideDatePickModal()}
          onDateProvided={(dob)=>{
            this.props.onFieldChange('dateOfBirth', dob);
            this.props.hideDatePickModal();
          }}/>
        </View>
    );
  }


    componentWillUpdate(nextProps, nextState){
      // console.log("New state: "+JSON.stringify(nextState));

      if(nextState.formValue!=null){
        if(nextState.formValue.residence!=null && (this.state.formValue.residence==null || (nextState.formValue.residence!==this.state.formValue.residence))){
          this.props.onFieldChange('city', nextState.formValue.residence);
        }
        if(nextState.formValue.email!=null && (this.state.formValue.email==null || (nextState.formValue.email!==this.state.formValue.email))){
          this.props.onFieldChange('email', nextState.formValue.email);
        }
      }




    }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log("########### Cur user update: "+(nextProps.curUser !== this.props.curUser));
  //   return(
  //     (nextProps.form !== this.props.form)
  //   );
  // }
}


SettingsRender.defaultProps= {
  isPrivate: false,

}
SettingsRender.propTypes= {
  // timelineData: React.PropTypes.object,
  form: React.PropTypes.object,
  // device: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool,
  isUpdatingPhoto: React.PropTypes.bool,
  // followingCnt: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.number,
  // ]),
  onFieldChange:React.PropTypes.func.isRequired,
  genderPickIsOpen:React.PropTypes.bool.isRequired,
  datePickIsOpen:React.PropTypes.bool.isRequired,
  hideGenderPickModal:React.PropTypes.func.isRequired,
  showGenderPickModal:React.PropTypes.func.isRequired,
  hideDatePickModal:React.PropTypes.func.isRequired,
  showDatePickModal:React.PropTypes.func.isRequired,
  onImageEditClick:React.PropTypes.func.isRequired,
  onTermsOfServiceClick:React.PropTypes.func.isRequired,
  onLogoutClick:React.PropTypes.func.isRequired,
};
export default SettingsRender;
