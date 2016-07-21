'use strict';

// import Button from 'sp-react-native-iconbutton';
// import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';


import {Colors} from '../../config/constants';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import {timeout} from '../../lib/Utils/genericUtils'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation


import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import alarmImg from '../../../assets/alarmSnooze.png';


const styles = StyleSheet.create({
  modal: {
      justifyContent: 'center',
      alignItems: 'center',
      // height: h,
      width: w*1,
      // paddingBottom:(h*0.08),
      // backgroundColor: '#00000088'
      backgroundColor: Colors.transparentColor,

  },
  mainContainer:{
    // flex:1,
    backgroundColor:'white',
    width: w*0.8,
    height: h*0.5,
    justifyContent:'center',
    alignItems:'center'
  },
  titleContainer:{
    paddingVertical:h*0.05,
  },
  title:{
    // backgroundColor: Colors.transparentColor,
    color: Colors.fourthTextColor ,
    textAlign:'center',
    fontFamily: 'Whitney-SemiBold',
    fontSize: getCorrectFontSizeForScreen(18),
  },

  alarmImage:{
    width: w*0.3,
    height: w*0.3,
  },

  descriptionContainer:{
    paddingVertical:h*0.05,
    paddingHorizontal:w*0.05,
  },
  description:{
    color: Colors.fourthTextColor ,
    textAlign:'center',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(14),
  }

});

class StatusModal extends React.Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    // this.state = {
    //   message: props.error,
    //   hide: props.hide,
    // }
  }

  // show or hide Modal based on 'hide' prop
  render() {
    return (<Modal
        backdrop={true}
        animationDuration={100}
        style={styles.modal}
        swipeToClose={false}
        isOpen={true}
      >
        <View style={styles.mainContainer}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Whooops..</Text>
          </View>

          <Image style={styles.alarmImage} source={alarmImg}/>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>Your internet connection is too slow or not responding. Please check your connection and try again.</Text>
          </View>

        </View>
      </Modal>)
  }

}


StatusModal.defaultProps={
    // extraBottomSpace:0
};
StatusModal.propTypes= {
  // isOpen: React.PropTypes.bool.isRequired,
  // onClose: React.PropTypes.func.isRequired,
  // onUrlAttached: React.PropTypes.func.isRequired,
  // extraBottomSpace: React.PropTypes.number
};
export default StatusModal;
