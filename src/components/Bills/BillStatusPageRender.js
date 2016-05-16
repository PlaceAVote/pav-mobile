  /* @flow weak */
/**
 * # BillStatusPageRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {BILL_STATUSES} = Other;
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













class BillStatusPageRender extends Component {
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


      statusPageContainer:{
        flex:1,
        backgroundColor:'white'
      },
      scrollViewContainer:{
        flex:1,
      },
      statusHeaderContainer:{
        flex:1,
        backgroundColor: Colors.titleBgColor,
        borderBottomColor: "rgba(0, 0, 0, 0.07)",
        borderBottomWidth: 1,

        // shadowColor: 'rgba(0, 0, 0, 0.12)',
      },
      statusHeaderText:{
        paddingHorizontal: w*0.011,
        paddingVertical: h*0.015,
        color: Colors.primaryColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },





      statusIconsContainer:{
        flex:1,
        flexDirection:'column',
        // justifyContent:'space-between',
        alignItems:'center',
      },
      statusPartContainer:{
        flex:1,
        flexDirection:'row',
        // backgroundColor:'purple',
        alignItems:"center",
      },


      /* LEFT SIDE */
      lineViewContainer:{
        paddingHorizontal: w*0.04,
        flexDirection:'column',
        // width:10,
        justifyContent:'center',
        // backgroundColor:'red',
        alignItems:'center'
      },
      line:{
        // flex:1,
        height:h*0.08,
        width:8,
        // marginHorizontal:6,
        backgroundColor:Colors.negativeAccentColor,
      },
      iconContainer:{
        backgroundColor:Colors.titleBgColor,
        padding: w*0.04,
        borderRadius:2,
        borderWidth:1,
        borderColor: "rgba(0, 0, 0, 0.07)",
      },

      statusIcon:{
        // paddingHorizontal: w*0.011,
        color:Colors.primaryColor,
        // backgroundColor:'purple',
      },









      /* RIGHT SIDE */

      explanationsContainer:{
        flexDirection:'column',
        paddingHorizontal: w*0.05,
        // backgroundColor:'yellow'
      },
      statusTitleText:{
        width: w*0.6,
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },
      statusDescriptionText:{
        width: w*0.6,
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-Book',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
      },
      statusDescription2Text:{
        paddingVertical: h*0.008,
        color: Colors.thirdTextColor,
        fontFamily: 'Whitney-MediumItalic',
        fontSize: getCorrectFontSizeForScreen(w,h,8),
      },



    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }

  createIconsBasedOnBillStatus(billStatus, styles){
    let iconElements = [];
    billStatus = "PASSED:BILL";
    let icons=BILL_STATUSES[billStatus].icons;
    let title = BILL_STATUSES[billStatus].title;
    let explanation = BILL_STATUSES[billStatus].explanation;

    for (let ii=0, ll=icons.length;ii<ll;ii++){
      iconElements.push(
        <View key={"container_"+ii} style={styles.statusPartContainer}>


          <View style={styles.lineViewContainer}>
            <View style={styles.line}></View>
            <View style={styles.iconContainer}>
              <PavIcon name={icons[ii]} size={55} style={styles.statusIcon}/>
            </View>
            <View style={styles.line}></View>
          </View>

          <View style={styles.explanationsContainer}>
            <Text style={styles.statusTitleText}>{title}</Text>
            <Text style={styles.statusDescriptionText}>
              <Text style={styles.statusDescription2Text}>Meaning:</Text> {explanation}
            </Text>
          </View>
        </View>



      )
    }
    // alert(icons);
    return iconElements;
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
      <View style={styles.statusPageContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.statusHeaderContainer}>
            <Text style={styles.statusHeaderText}>
              BILL STATUS
            </Text>
          </View>

          <View style={styles.statusIconsContainer}>
            {this.createIconsBasedOnBillStatus(this.props.billStatus, styles)}
          </View>




        </ScrollView>


      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.billStatus !== this.props.billStatus)
      ||
      (nextProps.orientation !== this.props.orientation)
    );
  }

}


export default BillStatusPageRender;
