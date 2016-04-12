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
 *  The SignUpPasswordForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUpPasswordForm from './SignUpPasswordForm';

import {Colors, ScheneKeys} from '../../config/constants';

/**
 * The states were interested in
 */
const {
  REGISTER_STEP_3
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
    flexDirection: 'column',
    backgroundColor: Colors.primaryColor,
  },
  inputsContainer:{
    flex:1,
    marginTop:15,
    marginBottom:20,
    marginHorizontal:15,
    justifyContent: "space-between",
    backgroundColor: 'white'
  },
  formContainer:{
    flex:1,
    // backgroundColor: 'red',
    justifyContent:'center'
  },
  footerContainer:{
    flex:1,
    backgroundColor: 'white'
  },
  descriptionTextContainer:{
    // backgroundColor:'black',
    justifyContent: 'center',
    marginVertical:15,
    flex:1//0.23,
  },
  descriptionText: {
    fontFamily: 'Whitney Light', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    backgroundColor: Colors.transparentColor,
    // backgroundColor:'black',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, w,h,14),
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 21,
  },
  explanImgContainer:{
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',    //y axis
    marginVertical: 5
  },
  explanImg:{
    height: h*0.23,
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







class EmailSignUpStep3Render extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      value: {
        password: this.props.auth.form.fields.password,
      	passwordAgain: this.props.auth.form.fields.passwordAgain
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
      	password: nextprops.auth.form.fields.password,
      	passwordAgain: nextprops.auth.form.fields.passwordAgain
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
    if (value.password != '') {
      this.props.actions.onAuthFormFieldChange('password',value.password, REGISTER_STEP_3);
    }
    if (value.passwordAgain != '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain',value.passwordAgain, REGISTER_STEP_3);
    }

    this.setState(
      {value}
    );
  }


  renderPageIndicatorIcon(){
    if(this.props.auth.form.fields.passwordHasError || this.props.auth.form.fields.passwordAgainHasError ){
      return (<View></View>)
    }else{
      return (<View style={styles.pIndicContainer}>
        <Image style={styles.pIndicImg} resizeMode= 'contain' source={require('../../../assets/pIndic3.jpg')}></Image>
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
                <Image style={styles.explanImg} resizeMode= 'contain' source={require('../../../assets/signupExpl3.jpg')}></Image>
              </View>


              <View style={styles.descriptionTextContainer} >
                <Text style={styles.descriptionText} >
                Help change Congress in making your voice louder than lobbyists by supporting and electing representatives who promise to utilize PlaceAVote in seeing how their districts are voting on each legislative issue and bill, and having their vote be a true reflection of the majority of their constituents.
                </Text>
              </View>


              {self.renderPageIndicatorIcon()}
            </View>


            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <View  style={styles.formContainer}>
                  <SignUpPasswordForm
                    form={this.props.auth.form}
                    value={this.state.value}
                    onChange={self.onChange.bind(self)}
                  />
                </View>
                <Button textStyle={styles.whiteBtnText} style={styles.nextStepBtn}
                    isDisabled={!this.props.auth.form.isValid.get(REGISTER_STEP_3) || this.props.auth.form.isFetching}
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep3Render);
