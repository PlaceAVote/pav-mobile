/* @flow weak */
/**
 * # VoteRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import LinearGradient from 'react-native-linear-gradient';

import {stripBrsFromText} from '../../lib/Utils/htmlTextStripper';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'


// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
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













class VoteRender extends React.Component {
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
        backgroundColor: 'black',
        flex:1,
        flexDirection: 'column',
        // marginVertical: 10,
        // marginHorizontal:15
      },

      /* HEADER */
      billImage:{
        flex:1,
        // height: h*0.29
      },
      headerContainer:{
        flex:1,
        flexDirection: 'column',
      },

      closeBtnContainer:{
        paddingVertical: h*0.015,
        paddingHorizontal: w*0.015,
        backgroundColor:Colors.transparentColor,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
      },
      closeBtnTextContainer:{
        paddingVertical: h*0.015,
        paddingHorizontal: w*0.015,
      },
      closeBtnText:{
        backgroundColor: Colors.transparentColor,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
        textAlign:'center'
      },
      closeBtnIcon:{
        color: Colors.mainTextColor,
        backgroundColor: Colors.transparentColor,
      },





      headerTitleContainer:{
        // backgroundColor:'purple'
        flex:1,
        justifyContent:'center',
        alignItems:'center',  //horizontally
      },
      headerTitle:{
        backgroundColor: Colors.transparentColor,
        paddingVertical: h*0.015,
        paddingHorizontal: w*0.015,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,18),
        textAlign:'center'
      },





      /* FOOTER */
      voteFooterContainer:{
        flexDirection: 'row',
      },

      /* FOOTER - FOR */
      voteForBtn:{
        backgroundColor: Colors.accentColor,
      },

      /* FOOTER - AGAINST */
      voteAgainstBtn:{
        backgroundColor: Colors.negativeAccentColor,
      },

      /* FOOTER - BOTH */
      voteBtn:{
        flex:1,
        borderColor: Colors.mainBorderColor,
        height:60,
        borderRadius:0,
      },

      btnText:{
        color: Colors.mainTextColor,
        textAlign: 'center',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,14),
      },
      btnIconStyle:{
        color: Colors.mainTextColor,
        paddingTop:2,
        // backgroundColor:'green',

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
    let bilLData = this.props.bill.data;
    // console.log("@@@ BILL: "+JSON.stringify(bilLData));
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <View
      style={styles.container}>
        <PavImage
        key="vote_header"
        platform={this.props.device.platform}
        style={styles.billImage}
        source={{uri: bilLData.featured_img_link}}
        resizeMode='cover'
        >
          <LinearGradient
              colors={['black', 'rgba(0, 0, 0, 0.41)', 'black']}
              start={[-0.3, 0.0]} end={[1.3, 0.0]}
              style={styles.headerContainer}
              >
              <TouchableOpacity onPress={this.props.onCloseBtnTap}
              style={styles.closeBtnContainer}>
                <PavIcon name="close-badge" size={17} style={styles.closeBtnIcon}/>
                <View style={styles.closeBtnTextContainer}>
                  <Text style={styles.closeBtnText}>CLOSE</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{bilLData.featured_bill_title}</Text>
              </View>
          </LinearGradient>
        </PavImage>





        <View key="vote_footer" style={styles.voteFooterContainer}>
          <Button onPress={this.props.onVoteForBtnPressed}
            style={[styles.voteBtn, styles.voteForBtn]}
            isDisabled={false}
            isLoading={false}
            activityIndicatorColor={Colors.mainTextColor}
            textStyle={styles.btnText}
            customIcon={()=><PavIcon name="arrow-up" size={16} style={styles.btnIconStyle}/>}
          >
            Vote In Favor
          </Button>
          <Button onPress={this.props.onVoteAgainstBtnPressed}
            style={[styles.voteBtn, styles.voteAgainstBtn]}
            isDisabled={false}
            isLoading={false}
            activityIndicatorColor={Colors.mainTextColor}
            textStyle={styles.btnText}
            customIcon={()=><PavIcon name="arrow-down" size={16} style={styles.btnIconStyle}/>}
          >
            Vote Against
          </Button>
        </View>





      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.bill !== this.props.bill)
      ||
      (nextProps.device.orientation !== this.props.device.orientation)
    );
  }

}


export default VoteRender;
