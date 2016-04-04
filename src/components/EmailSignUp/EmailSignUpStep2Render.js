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
* Icons library
*/
var Icon = require('react-native-vector-icons/FontAwesome');

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../../components/Header';
/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../../components/ErrorAlert';
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../../components/FormButton';
/**
 *  The SignUpForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import SignUpEmailForm from './SignUpEmailForm';
/**
 * The itemCheckbox will toggle the display of the password fields
 */
import ItemCheckbox from '../../components/ItemCheckbox';
import {Colors, ActionNames} from '../../config/constants';

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
 * The states were interested in
 */
 const {
   REGISTER_STEP_2
 } = ActionNames;




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
    flex:0.64,
    flexDirection: 'column',
    alignItems: 'center', //x axis
    justifyContent: 'flex-end',
    backgroundColor: Colors.primaryColor
    // ,backgroundColor: 'red'
  },
  footerContainer:{
    flex:0.36,
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

  descriptionText: {
    flex:0.3,
    backgroundColor: Colors.transparentColor,
    // backgroundColor:'black',
    fontFamily: 'Whitney Book', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
    fontSize: 14,
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 21,
  },
  explanImgContainer:{
    flex:0.6,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center', //x axis
    alignItems: 'flex-end',    //y axis
    marginVertical: 10
  },
  explanImg:{
    height: 190,
    width: 220,
    resizeMode: 'contain',
    // backgroundColor: 'red'
  },
  pIndicContainer:{
    flex:0.1,
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
    textAlign: 'center'
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
              <Text style={styles.descriptionText} >
              Welcome to PlaceAVote, a nonpartisan platform that gives you the opportunity to read, debate, and anonymously vote on every bill that is presented before Congress.
              </Text>
              {self.renderPageIndicatorIcon()}
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.inputsContainer}>
                <SignUpEmailForm
                  form={this.props.auth.form}
                  value={this.state.value}
                  onChange={self.onChange.bind(self)}
                />
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
