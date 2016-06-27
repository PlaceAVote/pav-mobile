/* @flow weak */
/**
 * # FeedVoteCard.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';




/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'

/**
* Icons library
*/



import {Colors, ScheneKeys} from '../../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'
import defaultUserPhoto from '../../../../assets/defaultUserPhoto.png';


const styles = StyleSheet.create({

  cardContainer:{
    flex: 1,
    alignItems: 'stretch',
    // backgroundColor: 'blue',
    paddingHorizontal: 7,
    paddingVertical: 7,

  },

  card:{
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  cardTitleContainer:{

    flexDirection:'row',
    paddingHorizontal: w*0.02,
    paddingVertical: w*0.02,
    justifyContent:'space-between',
    alignItems:'center'
  },
  cardTitleTextAndIconContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  cardTitleText:{
    // backgroundColor: 'red',
    color: Colors.primaryColor,
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(w,h,8),
  },
  cardDateText:{
    // backgroundColor: 'red',
    paddingHorizontal: 5,
    // color: Colors.thirdTextColor,
    color: 'rgba(0, 0, 0, 0.60)',
    fontFamily: 'Whitney Semibold',
    fontSize: getCorrectFontSizeForScreen(w,h,8),
  },

  cardContentContainer:{
    flex:1,
    // backgroundColor:'red',
    justifyContent:'center',
    paddingHorizontal: w*0.02,
    paddingBottom: h*0.012,
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
  },
  cardContentHeader:{
    paddingVertical:h*0.01,
    flexDirection:'row',
    // backgroundColor:'red',
    alignItems:'center'
  },
  imageContainer:{
  },


  voteDescriptionContainer:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    padding: 5
  },



  userImage:{
    width:w*0.09,
    height:w*0.09,
    // marginHorizontal: 10,
  },

  voteNameTextContainer:{
    paddingHorizontal: w*0.02,
  },
  voteNameText:{
    // backgroundColor:'blue',
    color:"#e64a33",
    fontFamily: 'Whitney Semibold',
    fontSize: getCorrectFontSizeForScreen(w,h,8),
  },

  voteInText:{
    color: Colors.thirdTextColor,
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,8),
  },
  voteLocationTextContainer:{
    // backgroundColor:'yellow',

    paddingHorizontal: w*0.02,
    // flexDirection:'column',
    // flexWrap: 'wrap',
    paddingVertical:h*0.001,
  },
  voteLocationText:{
    // backgroundColor:'yellow',
    color: Colors.primaryColor,
    fontFamily: 'Whitney Semibold',
    fontSize: getCorrectFontSizeForScreen(w,h,8),
    // width: w*0.56,
  },


});

class FeedVoteCard extends React.Component {
  constructor(props) {
    super(props);
  }


  onBillClick(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId);
    }
  }
  onUserClick(){
    if(this.props.onUserClick && !!this.props.userId){
        this.props.onUserClick(this.props.userId);
    }
  }


  renderHeader(){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <View style={styles.cardTitleTextAndIconContainer}>
        <Text style={styles.cardTitleText}>NEW VOTE</Text>
      </View>
      <Text style={styles.cardDateText}>{this.props.timeString}</Text>
    </View>);
  }

  renderBody(){
    return (<View style={styles.cardContentContainer}>

      <View style={styles.cardContentHeader}>
        <TouchableOpacity style={styles.imageContainer} onPress={this.onUserClick.bind(this)}>
          <PavImage
            platform={Platform.OS}
            defaultSource={defaultUserPhoto}
            style={styles.userImage}
            source={{uri: this.props.userPhotoUrl}}
            resizeMode='cover'
          />
        </TouchableOpacity>
        <View style={styles.voteDescriptionContainer}>
          <TouchableOpacity style={styles.voteNameTextContainer} onPress={this.onUserClick.bind(this)}>
            <Text style={styles.voteNameText}>{this.props.userFullNameText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.voteLocationTextContainer} onPress={this.onBillClick.bind(this)}>
            <Text style={styles.voteLocationText} numberOfLines={2}><Text style={styles.voteInText}>voted on the bill  </Text>{this.props.voteParentTitle}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>);
  }


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={[styles.card, this.props.cardStyle]}>
          {this.renderHeader()}
          {this.renderBody()}
        </View>
      </View>
    );
  }
}

FeedVoteCard.propTypes= {
  timeString: React.PropTypes.string.isRequired,
  voteParentTitle: React.PropTypes.string.isRequired,
  userFullNameText: React.PropTypes.string.isRequired,
  userPhotoUrl: React.PropTypes.string,
};

//isDisabled={this.props.isDisabled}
// onPress={this.props.onPress}
export default FeedVoteCard;
