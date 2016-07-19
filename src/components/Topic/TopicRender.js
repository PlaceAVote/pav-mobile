/* @flow weak */
/**
 * # DiscoveryRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



// import LinearGradient from 'react-native-linear-gradient';






import {Colors, ScheneKeys, Other} from '../../config/constants';

const {SOCIAL_TYPES} = Other;
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {toTitleCase} from '../../lib/Utils/genericUtils'
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import PavSpinner from '../../lib/UI/PavSpinner'
import congratsScreenPhoto from '../../../assets/congratsScreen.png';

import NavBarRender from '../NavBar/NavBarRender';


import PavImage from '../../lib/UI/PavImage'



const styles = StyleSheet.create({


  container: {
    backgroundColor: 'orange',
    flex:1,
    flexDirection: 'column',

  },


});


class DiscoveryRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={curImgHeight:0}
  }


  /**
   * ### render method
   */
  render() {

    return(
      <View style={styles.container}>
        <NavBarRender
        title={toTitleCase(this.props.topicTitle)}
        leftIconIsBack={true}
        onLeftIconPressed={this.props.onLeftNavBtnClicked}
        />
        <Text>
        {toTitleCase(this.props.topicTitle)}
        </Text>

      </View>
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return(
  //     // nextProps.parentVisible==true &&
  //     (nextProps.bill !== this.props.bill)
  //     ||
  //     (nextProps.billData !== this.props.billData)
  //     ||
  //     (nextProps.isFetchingBillData !== this.props.isFetchingBillData)
  //     ||
  //     (nextProps.device.orientation !== this.props.device.orientation)
  //     ||
  //     (nextState.minimumImgHeight!==this.state.minimumImgHeight)
  //   );
  // }

}

DiscoveryRender.propTypes= {
  topicTitle: React.PropTypes.string.isRequired,
  isFetchingTopicData: React.PropTypes.bool.isRequired,
  topicData: React.PropTypes.object.isRequired,
  onSocialClick: React.PropTypes.func.isRequired,
  onLeftNavBtnClicked: React.PropTypes.func.isRequired,
};
export default DiscoveryRender;
