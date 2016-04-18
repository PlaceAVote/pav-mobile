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
 *  The SignUpForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUpNameSurnameForm from './SignUpNameSurnameForm';

import {Colors, ScheneKeys} from '../../config/constants';

/**
 * The states were interested in
 */
const {
  REGISTER_STEP_1
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
    marginTop:h*0.03,
    marginLeft:w*0.04,
    position: 'absolute',
    borderRadius: 0,
    borderWidth: 0,
    // backgroundColor: 'blue',
  },
  explanationContainer:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: Colors.primaryColor,
    // backgroundColor: 'red',
  },
  inputsContainer:{
    marginTop:15,
    marginBottom:20,
    marginHorizontal:15,
    justifyContent: "flex-end",
    backgroundColor: 'white'

  },
  footerContainer:{
    backgroundColor: 'white'
  },
  descriptionTextContainer:{
    flex:1,
    // backgroundColor: 'yellow',
    justifyContent:'center'
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontFamily: 'Whitney Book', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: getCorrectFontSizeForScreen(w,h,14),
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 21,
    marginVertical: 3,
  },
  explanImgContainer:{
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  explanImg:{
    height: h*0.36,
    width: w*0.60,
    // backgroundColor: 'red'
  },
  pIndicContainer:{
    backgroundColor: Colors.transparentColor,
    flexDirection: 'row',
    justifyContent: 'center'
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
    color: Colors.mainTextColor,
    fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
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







class EmailSignUpStep1Render extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state ={
      value: {
        name: this.props.auth.form.fields.name,
      	surname: this.props.auth.form.fields.surname
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
      	name: nextprops.auth.form.fields.name,
      	surname: nextprops.auth.form.fields.surname
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
    if (value.name != '') {
      this.props.actions.onAuthFormFieldChange('name',value.name, REGISTER_STEP_1);
    }
    if (value.surname != '') {
      this.props.actions.onAuthFormFieldChange('surname',value.surname, REGISTER_STEP_1);
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
        <Image style={styles.pIndicImg} resizeMode= 'contain' source={require('../../../assets/pIndic1.jpg')}></Image>
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
                <Image style={styles.explanImg} resizeMode= 'cover' source={require('../../../assets/signupExpl1.jpg')}></Image>
              </View>



              <View style={styles.descriptionTextContainer}>
                <Text style={styles.descriptionText} >
                In a perfect world, your vote would be represented by your Congressman. In reality, lobbyists and rich donors are overshadowing your voice with their cushy stacks of green and influential power.
                </Text>
              </View>

              {self.renderPageIndicatorIcon()}
            </View>


            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <SignUpNameSurnameForm
                  form={this.props.auth.form}
                  value={this.state.value}
                  onChange={self.onChange.bind(self)}
                />
                <Button textStyle={styles.whiteBtnText} style={styles.nextStepBtn}
                    isDisabled={!this.props.auth.form.isValid.get(REGISTER_STEP_1) || this.props.auth.form.isFetching}
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep1Render);
