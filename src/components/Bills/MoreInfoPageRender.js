/* @flow weak */
/**
 * # MoreInfoPageRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,

}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation


// import { createIconSet} from 'react-native-vector-icons';
// const glyphMap = { 'icon-arrow-down': 'l', 'arrow-down': 'l' };
// const PavIcon = createIconSet(glyphMap, 'pav');

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


/**
* Image library
*/

// import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;













class MoreInfoPageRender extends Component {
  constructor(props) {
    super(props);

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),

  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      pageContainer:{
        flex:1,
        backgroundColor:'white'
      },
      scrollViewContainer:{
        flex:1,
      },

      headerText:{
        paddingHorizontal: w*0.011,
        paddingVertical: h*0.015,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      bodyContainer:{
        paddingVertical: h*0.015,
        paddingHorizontal: w*0.011,
        backgroundColor:'white'
      },
      titleContainer:{
        flex:1,
        backgroundColor: Colors.titleBgColor,
        borderBottomColor: "rgba(0, 0, 0, 0.07)",
        borderBottomWidth: 1,
      },
      titleWithMultipleChildren:{
        flexDirection:'row',
        alignItems:'center'
      },
      bodyText:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      bodyReadMoreText:{
        paddingVertical: h*0.008,
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },


      statusContainer:{
        flexDirection:'row',
        paddingVertical: h*0.015,
        paddingHorizontal: w*0.011,
        backgroundColor:'white'
      },
      statusIconContainer:{
        backgroundColor:Colors.titleBgColorDark,
        padding: w*0.071,
      },
      statusIcon:{
        // paddingHorizontal: w*0.011,
        color:Colors.fourthTextColor
      },
      statusTextContainer:{
        flexDirection:'column',
        paddingHorizontal: w*0.015,
      },
      statusTitleText:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      statusDescriptionText:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-Book',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      statusDescription2Text:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-MediumItalic',

        fontSize: getCorrectFontSizeForScreen(w,h,8),
      }


    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }



  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View style={styles.pageContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>
              OFFICIAL SUMMARY
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..

              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              vLorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever..
            </Text>
            <TouchableOpacity onPress={this.props.goToMoreInfoPage}>
              <Text style={styles.bodyReadMoreText}>
                Read more information about this bill.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.titleContainer, styles.titleWithMultipleChildren]}>
            <Text style={styles.headerText}>
              BILL STATUS
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusIconContainer}>
              <PavIcon name="happy" size={32} style={styles.statusIcon}/>
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitleText}>
                Bill Introduced
              </Text>
              <Text style={styles.statusDescriptionText}>
                <Text style={styles.statusDescription2Text}>Meaning:</Text> This bill has been introduced by its sponsors.
              </Text>
            </View>

          </View>
          <View style={[styles.titleContainer, styles.titleWithMultipleChildren]}>
            <Text style={styles.headerText}>
              POINTS AGAINST
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyPointsFavorText}>
              - Puts more restrictions on law abiding-gun owners..
            </Text>
          </View>
        </ScrollView>


      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.summaryData !== this.props.summaryData)
      ||
      (nextProps.orientation !== this.props.orientation)
    );
  }

}


export default MoreInfoPageRender;
