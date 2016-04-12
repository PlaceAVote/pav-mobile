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

/**
 *  The SignUpEmailForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUpEmailForm from './SignUpEmailForm';

import {Colors, ScheneKeys} from '../../config/constants';

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
 const {
   REGISTER_STEP_2
 } = ScheneKeys;




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
    flex:2,
    flexDirection: 'column',
    alignItems: 'center', //x axis
    justifyContent: 'flex-end',
    backgroundColor: Colors.primaryColor
    // ,backgroundColor: 'red'
  },
  footerContainer:{
    flex:1,
    backgroundColor: 'white'
  },
  inputsContainer:{
    flex:1,
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
  descriptionTextContainer:{
    // backgroundColor:'black',
    justifyContent: 'center',
    flex:1//0.23,
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney Book', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: getCorrectFontSizeForScreen(PixelRatio, w,h,14),
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 21,
  },
  explanImgContainer:{
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center', //x axis
    alignItems: 'flex-end',    //y axis
    marginVertical: 10
  },
  explanImg:{
    height: h*0.31,
    width: w*0.70,
    resizeMode: 'contain',
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
    resizeMode: 'contain'
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
    fontSize: getCorrectFontSizeForScreen(PixelRatio, w,h,14),
  }

});
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







class EmailSignUpStep2Render extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      value: {
      	email: this.props.auth.form.fields.email
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
      	email: nextprops.auth.form.fields.email
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
    if (value.email != '') {
      this.props.actions.onAuthFormFieldChange('email',value.email, REGISTER_STEP_2);
    }
    this.setState(
      {value}
    );
  }


  renderPageIndicatorIcon(){
    if(this.props.auth.form.fields.nameHasError || this.props.auth.form.fields.surnameHasError ){
      return (<View></View>)
    }else{
      return (<View style={styles.pIndicContainer}>
        <Image style={styles.pIndicImg} source={require('../../../assets/pIndic2.jpg')}></Image>
      </View>);
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {


    // var onButtonPress = this.props.onButtonPress;
    let self = this;

    let onBtnPress = ()=>{
      this.props.onNextStep();
    },
    onBackBtnPress = ()=>{
      this.props.onBack();
    }

    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>
            <View style={styles.explanationContainer}>
              <Button textStyle={styles.whiteBtnText} style={styles.backBtn} iconProps={{name: "chevron-left",size:20, color: "white"}}
                  onPress={onBackBtnPress}>
              </Button>
              <View style={styles.explanImgContainer}>
                <Image style={styles.explanImg} source={require('../../../assets/signupExpl2.gif')}></Image>
              </View>
              <View style={styles.descriptionTextContainer} >
                <Text style={styles.descriptionText} >
                Welcome to PlaceAVote, a nonpartisan platform that gives you the opportunity to read, debate, and anonymously vote on every bill that is presented before Congress.
                </Text>
              </View>

              {self.renderPageIndicatorIcon()}
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <View  style={styles.formContainer}>
                  <SignUpEmailForm
                    form={this.props.auth.form}
                    value={this.state.value}
                    onChange={self.onChange.bind(self)}
                  />
                </View>
                <Button textStyle={styles.whiteBtnText} style={styles.nextStepBtn}
                    isDisabled={!this.props.auth.form.isValid.get(REGISTER_STEP_2) || this.props.auth.form.isFetching}
                    onPress={onBtnPress}>
                  Next Step
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep2Render);
