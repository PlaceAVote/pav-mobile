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
// import * as deviceActions from '../../reducers/device/deviceActions';

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

/**
 *  The SignUpBirthZipcodeForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUpBirthZipcodeForm from './SignUpBirthZipcodeForm';

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
  Image,
  PixelRatio
}
from 'react-native';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation


/**
 * The states were interested in
 */




/**
 * ## Styles
 */
var styles = StyleSheet.create({

  baseContainer: {
    flex:1,
    backgroundColor: Colors.primaryColor,
  },
  contentContainer: {
    flex:1,
    flexDirection: 'column'
  },
  backBtn:{
    top:h*0.05,
    left:w*0.02,
    borderRadius: 0,
    borderWidth: 0,
    position: 'absolute',
    // backgroundColor: 'red',
  },
  explanationContainer:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: Colors.primaryColor,
  },
  inputsContainer:{
    marginTop:15,
    marginBottom:20,
    marginHorizontal:15,
    justifyContent: "flex-end",
    backgroundColor: 'white'

  },
  formContainer:{
    flex:1,
    // backgroundColor: 'red',
    justifyContent:'center'
  },
  footerContainer:{
    backgroundColor: 'white'
  },
  descriptionTextContainer:{
    flex:0.25,
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginVertical: 10
  },
  descriptionText: {
    fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    backgroundColor: Colors.transparentColor,
    // backgroundColor:'black',
    fontSize: getCorrectFontSizeForScreen(w,h,14),
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 21,
  },
  explanImgContainer:{
    flex:0.6,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    //y axis
    marginVertical: 10
  },
  explanImg:{
    height: h*0.35,
    width: w*0.8,
    // backgroundColor: 'red'
  },
  pIndicContainer:{
    backgroundColor: Colors.transparentColor,
    // backgroundColor:'blue',
    flexDirection: 'column',
    justifyContent: 'flex-end', //y axis
    alignItems: 'center',       //x axis
    marginVertical: 5,
  },
  pIndicImg:{

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
    textAlign: 'center',
    fontSize: getCorrectFontSizeForScreen(w,h,14),
  }

});
/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  globalActions
  // ,deviceActions
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







class EmailSignUpStep4Render extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      value: {
        dateOfBirth: this.props.auth.form.fields.dateOfBirth,
      	zipCode: this.props.auth.form.fields.zipCode
      }
    };
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    this.setState({
      value: {
      	dateOfBirth: nextprops.auth.form.fields.dateOfBirth,
      	zipCode: nextprops.auth.form.fields.zipCode
      }
    });
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
  onChange(value) {

    // console.log("Changed"+JSON.stringify(value));
    if (value.dateOfBirth != ''&& value.dateOfBirth != undefined) {
      // console.log("DATE value about to change to: "+value.dateOfBirth);
      this.props.actions.onAuthFormFieldChange('dateOfBirth',value.dateOfBirth, REGISTER_STEP_4);
    }
    if (value.zipCode != '' && value.zipCode != undefined ) {
      this.props.actions.onAuthFormFieldChange('zipCode',value.zipCode, REGISTER_STEP_4);
    }

    if(value.dateOfBirthIsCurBeingPicked!=undefined){
      this.props.actions.onAuthFormFieldChange('dateOfBirthIsCurBeingPicked',value.dateOfBirthIsCurBeingPicked, REGISTER_STEP_4);
    }else{
      this.setState(
        {value}
      );
    }
  }


  renderPageIndicatorIcon(){
    if(this.props.auth.form.fields.dateOfBirthIsCurBeingPicked || this.props.auth.form.fields.zipCodeHasError ){
      return (<View></View>)
    }else{
      return (<View style={styles.pIndicContainer}>
        <Image style={styles.pIndicImg} resizeMode= 'contain' source={require('../../../assets/pIndic4.jpg')}></Image>
      </View>);
    }
  }

  renderDescriptionText(){
    if(this.props.auth.form.fields.dateOfBirthIsCurBeingPicked){
      return (<View></View>)
    }else{
      return (
        <View style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText} >
          Don't get mad, get heard.
          </Text>
          <Text style={styles.descriptionText} >
          Place Your Vote Today and Be Represented!
          </Text>
        </View>
      );
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {


    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>


            <View style={styles.explanationContainer}>
              <View style={styles.explanImgContainer}>
                <Image style={styles.explanImg} resizeMode= 'contain' source={require('../../../assets/signupExpl4.jpg')}></Image>
              </View>
              <Button style={styles.backBtn} iconProps={{name: "chevron-left",size:getCorrectFontSizeForScreen(w,h,20), color: "white"}} onPress={this.props.onBack}/>
              {this.renderDescriptionText()}
              {this.renderPageIndicatorIcon()}
            </View>


            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <View  style={styles.formContainer}>
                  <SignUpBirthZipcodeForm
                    form={this.props.auth.form}
                    value={this.state.value}
                    currentOs={this.props.device.platform}
                    onChange={this.onChange.bind(this)}
                    onNext={this.props.onNextStep}
                  />
                </View>
                <Button textStyle={styles.whiteBtnText} style={styles.nextStepBtn}
                    isDisabled={!this.props.auth.form.isValid.get(REGISTER_STEP_4) || this.props.auth.form.isFetching}
                    onPress={this.props.onNextStep}>
                  Choose topics
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep4Render);
