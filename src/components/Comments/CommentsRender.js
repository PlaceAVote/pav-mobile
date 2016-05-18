/* @flow weak */
/**
 * # CommentsRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import LinearGradient from 'react-native-linear-gradient';


/*A react native button*/
// import Button from 'sp-react-native-iconbutton'



// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

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
  TouchableOpacity,
}
from 'react-native';
// import ProgressBar from 'ProgressBarAndroid';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);




/**
* Icons library
*/

import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;













class CommentsRender extends Component {
  constructor(props) {
    super(props);
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      container: {
        backgroundColor: 'white',
        flex:1,
        flexDirection: 'column',
        paddingTop:64, //nav bar height
        paddingBottom:50, //tab bar height
        // marginVertical: 10,
        // marginHorizontal:15
      },



      //HEADER
      billImage:{
        // flex:1,
        // height: h*0.26
      },
      headerContainer:{
        flex:1,
        flexDirection: 'column',
      },
      headerTitleContainer:{
        // backgroundColor:'purple'
        flex:1,
        justifyContent:'center',
        alignItems:'center',  //horizontally
      },
      headerTitle:{
        backgroundColor: Colors.transparentColor,
        paddingVertical: h*0.020,
        paddingHorizontal: w*0.012,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,12),
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

  renderHeader(billData, platform, styles){
    // console.log("bill: "+JSON.stringify(billData))
    if(!!billData){
      return (
        <PavImage
          key="bill_header"
          platform={platform}
          style={styles.billImage}
          source={{uri: billData.featured_img_link}}
          resizeMode='cover'
        >
          <LinearGradient
              colors={['black', 'rgba(0, 0, 0, 0.41)', 'black']}
              start={[-0.3, 0.0]} end={[1.3, 0.0]}
              style={styles.headerContainer}
              >
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{billData.featured_bill_title}</Text>
              </View>
          </LinearGradient>
        </PavImage>);
    }else{
      return <Text key="bill_header"></Text>
    }
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
        {this.renderHeader(this.props.billData, this.props.device.platform, styles)}
      </View>
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return(
  //     (nextProps.bill !== this.props.bill)
  //     ||
  //     (nextProps.device.orientation !== this.props.device.orientation)
  //   );
  // }

}


export default CommentsRender;
