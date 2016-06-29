/* @flow weak */
/**
 * # SearchBillCard.js
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
import {StyleSheet, Text, View, TouchableOpacity, Linking, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../../lib/UI/PavImage'
import congratsScreenPhoto from '../../../../assets/congratsScreen.png';
import LinearGradient from 'react-native-linear-gradient';


class SearchBillCard extends React.Component {
  constructor(props) {
    super(props);
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){


    return StyleSheet.create({

      cardContainer:{
        flex: 1,
        alignItems: 'stretch',
        // backgroundColor: Colors.transparentColor,
        paddingHorizontal: 7,
        paddingVertical: 7,

      },

      card:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        borderColor: '#ffffff',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 2,
        },
      },
      cardTitleContainer:{
        flex: 1,
        flexDirection:'row',
        paddingHorizontal: w*0.02,
        paddingVertical: w*0.02,
        justifyContent:'space-between',
        alignItems:'center'
      },

      billTitleText:{
        backgroundColor: Colors.transparentColor,
        paddingHorizontal: 10,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },

      cardContentContainer:{
        // backgroundColor:'red',
        paddingHorizontal: w*0.02,
        paddingBottom: h*0.012,

        flexDirection:'column'
      },





      billImage:{
        height:self.props.cardHeight,
        width:null
      },



      cardContentTextContainer:{
        flex:1,
        // backgoundColor:'green',
        justifyContent:'center',
        paddingVertical: h*0.01,
        paddingHorizontal: w*0.02,
        borderStyle: 'solid',
        borderTopColor: 'rgba(255, 255, 255, 0.8)',
        borderTopWidth: 1,
      },


      cardContentText:{
        backgroundColor:Colors.transparentColor,
        paddingVertical:h*0.0065,

        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
        color: Colors.mainTextColor,
      },


    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal:10
      },

      titleText: {
        // backgroundColor: 'black',
        fontSize: getCorrectFontSizeForScreen(w,h,27),
        color: Colors.mainTextColor,
        textAlign: 'center',
      }

    });
  }



  renderHeader(styles){
    return (<View resizeMode="cover" style={styles.cardTitleContainer}>
      <Text style={styles.billTitleText}>{this.props.subjectTitle}</Text>
    </View>);
  }



  renderBody(styles){
    return (
      <View style={styles.cardContentContainer}>

        <View style={styles.cardContentTextContainer}>
          <Text style={styles.cardContentText} lineHeight={h*0.031}>
          {this.props.billTitle}
          </Text>
        </View>


      </View>);
  }



  onBillClicked(){
    if(this.props.onBillClick && !!this.props.billId){
      this.props.onBillClick(this.props.billId, this.props.billTitle);
    }
  }




  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View style={[styles.cardContainer, this.props.style]}>
        <View style={[styles.card, this.props.cardStyle]}>
          <TouchableOpacity  onPress={this.onBillClicked.bind(this)}>
            <PavImage
            platform={Platform.OS}
            source={congratsScreenPhoto}
            style={styles.billImage}
            resizeMode='cover'
            >
              <LinearGradient
                  style={{flex:1}}
                  colors={['rgba(0, 0, 0, 0.77)', 'rgba(0, 0, 0, 0.52)', 'rgba(0, 0, 0, 0.77)',]}
                  start={[-0.3, 0.0]} end={[1.3, 0.0]}>
                  {this.renderHeader(styles)}
                  {this.renderBody(styles)}
              </LinearGradient>
            </PavImage>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SearchBillCard.defaultProps= {
  cardHeight: h*0.13
}
SearchBillCard.propTypes= {
  device: React.PropTypes.object.isRequired,
  subjectTitle: React.PropTypes.string.isRequired,
  billTitle: React.PropTypes.string,
  billId: React.PropTypes.string,
  onBillClick: React.PropTypes.func,
};
export default SearchBillCard;
