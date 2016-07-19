/* @flow weak */
/**
 * # TopicCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';





/*A react native button*/
import Button from 'sp-react-native-iconbutton'

/**
* Icons library
*/



import {Colors, ScheneKeys, Other} from '../../../config/constants';
const {REACTIONS, SOCIAL_TYPES} = Other;

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icomoonConfig from '../../../../assets/fonts/icomoon.json';
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'
// import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';
import congratsScreenPhoto from '../../../../assets/congratsScreen.png';


const PADDING_HOR = w*0.022;  //Same as the DiscoveryFeedRender styles.trendingTitleContainer style
const IMAGE_WIDTH = w*0.18;

const styles = StyleSheet.create({

  cardContainer:{
    // flex: 1,
    // backgroundColor: 'blue',
  },

  card:{
    // flex: 1,
    flexDirection:'row',
    backgroundColor: '#ffffff',
    paddingHorizontal:PADDING_HOR,
    paddingVertical: h*0.013,
    // backgroundColor: 'orange',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 1,

    // shadowColor: 'rgba(0, 0, 0, 0.12)',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 2,
    // },
  },

  billImageContainer:{
    // backgroundColor:'red',

  },
  billImage:{
    borderRadius:2,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },

  billInfoContainer:{
    flexDirection:'column',
    justifyContent:'center'
  },
  billTitleContainer:{
    paddingHorizontal:PADDING_HOR,
    width: w-PADDING_HOR-IMAGE_WIDTH,
    // backgroundColor:'red'
  },
  billTitle:{
    // width: w-PADDING_HOR*2-IMAGE_WIDTH
    fontFamily: 'Whitney-Semibold',
    fontSize: getCorrectFontSizeForScreen(8),
    color: Colors.primaryColor,
  },
  billDescriptionContainer:{
    paddingHorizontal:PADDING_HOR,
    width: w-PADDING_HOR-IMAGE_WIDTH,
    paddingTop: h*0.013,
  },
  billDescription:{
    fontFamily: 'Whitney-Semibold',
    fontSize: getCorrectFontSizeForScreen(7),
    color: Colors.sixthTextColor,
  }



});


class TopicCard extends React.Component {
  constructor(props) {
    super(props);
  }


  onBillClick(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId);
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let percentage = Math.abs(this.props.favorPercentage);
    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <TouchableOpacity style={[styles.card, this.props.cardStyle]} onPress={this.onBillClick.bind(this)}>
          <View style={styles.billImageContainer}>
            <PavImage
              defaultSource={congratsScreenPhoto}
              style={styles.billImage}
              source={{uri: this.props.billPhotoUrl}}
              resizeMode='cover'
            />
          </View>
          <View style={styles.billInfoContainer}>
            <View style={styles.billTitleContainer}>
              <Text style={styles.billTitle}>
              {this.props.billTitle}
              </Text>
            </View>

            <View style={styles.billDescriptionContainer}>
              <Text style={styles.billDescription}>
               {this.props.commentCnt} Comments / {percentage}% Vote {this.props.favorPercentage>0?"Yes":"No"}
              </Text>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  }
}




TopicCard.propTypes= {

  billId: React.PropTypes.string.isRequired,
  billTitle: React.PropTypes.string.isRequired,
  billPhotoUrl: React.PropTypes.string.isRequired,
  commentCnt: React.PropTypes.number.isRequired,
  favorPercentage: React.PropTypes.number.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
};
export default TopicCard;
