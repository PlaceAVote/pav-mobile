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
  TouchableOpacity
} from 'react-native';


import {Colors} from '../../config/constants';

// import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import {timeout} from '../../lib/Utils/genericUtils'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation


import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

// import congratsScreenPhoto from '../../../assets/congratsScreen.png';
// import moment from 'moment';
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
    backgroundColor:'white'
  },
  text:{
    fontSize:30,
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
        <TouchableOpacity style={styles.mainContainer} onPress={this.dismissModal}>
          <Text style={styles.text}>No internet</Text>
        </TouchableOpacity>
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
