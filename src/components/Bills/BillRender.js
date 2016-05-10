/* @flow weak */
/**
 * # BillRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';


/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as globalActions from '../../reducers/global/globalActions';



import LinearGradient from 'react-native-linear-gradient';



/*A react native button*/
import Button from 'sp-react-native-iconbutton'

var ProgressBar = require('ProgressBarAndroid');




import {Colors, ScheneKeys, Other} from '../../config/constants';
// const {NEWS_FEED_FILTERS} = Other;
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
* Icons library
*/

var Icon = require('react-native-vector-icons/FontAwesome');
var LImage = require('react-native-image-progress');
var Progress = require('react-native-progress');




/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;













class BillRender extends Component {
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


      container: {
        // backgroundColor: 'orange',
        flex:1,
        flexDirection: 'column',
        paddingTop:64, //nav bar height
        paddingBottom:50, //tab bar height
        // marginVertical: 10,
        // marginHorizontal:15
      },
      scrollView:{
        flex:1,
        backgroundColor: '#E8E7EE',
      },
      headerView:{
        paddingVertical:h*0.02,
        paddingHorizontal:w*0.016,
        // backgroundColor:'red'
      },

      bodyLoadingContainer:{
        flex:1,
        // height:h*0.5,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red'
      },
      bodyContainerView:{
        flex:1,
        backgroundColor:'red'
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
    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
        <View style={styles.container}>
          <Text>Bill screen</Text>
        </View>
    );
  }
}


export default BillRender;
