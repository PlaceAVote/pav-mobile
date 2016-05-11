/* @flow weak */
/**
 * # SummaryPageRender.js
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
  ListView,
  RefreshControl,

}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

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













class SummaryPageRender extends Component {
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


      summaryPageContainer:{
        backgroundColor:'white'
      },
      summaryHeaderContainer:{
        flex:1,
        backgroundColor: "#F6F5FF",
        borderBottomColor: "rgba(0, 0, 0, 0.07)",
        borderBottomWidth: 1,

        // shadowColor: 'rgba(0, 0, 0, 0.12)',
      },
      summaryHeaderText:{
        paddingHorizontal: w*0.011,
        paddingVertical: h*0.015,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      summaryBodyContainer:{
        paddingVertical: h*0.015,
        paddingHorizontal: w*0.011,
        backgroundColor:'white'
      },
      summaryFavorContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor: "#F6F5FF",
        borderBottomColor: "rgba(0, 0, 0, 0.07)",
        borderBottomWidth: 1,
        alignItems:'center'
      },
      summaryBodyText:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      summaryBodyReadMoreText:{
        paddingVertical: h*0.008,
        color: Colors.negativeAccentColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      favorIcon:{
        paddingHorizontal: w*0.011,
        color:Colors.accentColor
      },
      againstIcon:{
        paddingHorizontal: w*0.011,
        color:Colors.negativeAccentColor
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
      <View style={styles.summaryPageContainer}>
        <ScrollView>
          <View style={styles.summaryHeaderContainer}>
            <Text style={styles.summaryHeaderText}>
              SHORT SUMMARY
            </Text>
          </View>
          <View style={styles.summaryBodyContainer}>
            <Text style={styles.summaryBodyText}>
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..

              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              vLorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever.. Lorem ipsum for ever and ever..
              Lorem ipsum for ever and ever..
            </Text>
            <Text style={styles.summaryBodyReadMoreText}>
              Read more information about this bill.
            </Text>
          </View>
          <View style={styles.summaryFavorContainer}>
            <PavIcon name="check-mark" size={12} style={styles.favorIcon}/>
            <Text style={styles.summaryHeaderText}>
              POINTS IN FAVOR
            </Text>
          </View>
          <View style={styles.summaryBodyContainer}>
            <Text style={styles.summaryBodyPointsFavorText}>
              - Supports research and data collection of gun violence.
            </Text>
          </View>
          <View style={styles.summaryFavorContainer}>
            <PavIcon name="close" size={13} style={styles.againstIcon}/>
            <Text style={styles.summaryHeaderText}>
              POINTS AGAINST
            </Text>
          </View>
          <View style={styles.summaryBodyContainer}>
            <Text style={styles.summaryBodyPointsFavorText}>
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


export default SummaryPageRender;
