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
import SignUpNameSurnameForm from './SignUpNameSurnameForm';
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




/**
 * ## Styles
 */
var styles = StyleSheet.create({

  baseContainer: {
    flex:1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex:1,
    flexDirection: 'column',

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
    justifyContent: "flex-end"
  },
  footerContainer:{
    backgroundColor: 'white'
  },
  descriptionText: {
    backgroundColor: Colors.transparentColor,
    fontSize: 16,
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 5,
    marginBottom: 3
  },
  explanImgContainer:{
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  explanImg:{
    marginTop: 50,
    height: 270,
    width: 270,
    resizeMode: 'contain'
  },
  pIndicContainer:{
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pIndicImg:{
    marginTop: 30,
    marginBottom: 10,
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







class EmailSignUpStep1RenderRender extends Component {
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

    console.log("Changed"+JSON.stringify(value));
    if (value.name != '') {
      this.props.actions.onAuthFormFieldChange('name',value.name);
    }
    if (value.surname != '') {
      this.props.actions.onAuthFormFieldChange('surname',value.surname);
    }

    this.setState(
      {value}
    );
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
    }


    return(
      <View style={styles.baseContainer}>
        <View style={styles.contentContainer}>


            <View style={styles.explanationContainer}>


              <View style={styles.explanImgContainer}>
                <Image style={styles.explanImg} source={require('../../../assets/signupExpl1.jpg')}></Image>
              </View>



              <Text style={styles.descriptionText} >
              In a perfect world, your vote would be represented by your Congressman. In reality, lobbyists and rich donors are overshadowing your voice with their cushy stacks of green and influential power.
              </Text>


            </View>


            <View style={styles.footerContainer}>
              <View style={styles.pIndicContainer}>
                <Image style={styles.pIndicImg} source={require('../../../assets/pIndic1.jpg')}></Image>
              </View>
              <View style={styles.inputsContainer}>
                <SignUpNameSurnameForm
                  form={this.props.auth.form}
                  value={this.state.value}
                  onChange={self.onChange.bind(self)}
                />
                <Button textStyle={styles.whiteBtnText} style={styles.nextStepBtn}
                    isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpStep1RenderRender);
