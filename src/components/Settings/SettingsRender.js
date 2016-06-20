/* @flow */
/**
 * # SettingsRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



/*A react native button*/
import Button from 'sp-react-native-iconbutton'

import PavSpinner from '../../lib/UI/PavSpinner'

import moment from 'moment'
/**
* Icons library
*/



import {Colors, ScheneKeys} from '../../config/constants';

import React from 'react';
import {StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Picker,
  TouchableOpacity
} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import CardFactory from '../Cards/CardFactory';

import defaultUserPhoto from '../../../assets/defaultUserPhoto.png';
import PavImage from '../../lib/UI/PavImage'
import AccordionPicker from '../EmailSignUp/AccordionPicker';
/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
let Form = t.form.Form;
import Collapsible from 'react-native-collapsible'
import TouchableInput from './TouchableInput';

/**
 * The states were interested in
 */
const {
  SETTINGS
} = ScheneKeys;








class SettingsRender extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      gender:null,
      dob:null,
      residence:null,
      email:null,
      isPrivate:null,
      pronounPickerCollapsed: true,

    }
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


  formUserLocationText(user){
    if(!!user.city){
      if(user.stateProvince!=null){
        return user.city+", "+user.stateProvince
      }else{
        return user.city;
      }
    }else{
      return "Location";
    }

  }



  componentDidMount(){




  }





  onPronounClick(){
    alert("On pronoun")
  }
  onDateClick(){
    alert("On date")
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
        <View style={styles.container}>
          <ScrollView
          style={styles.scroller}
          bounces={false}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                ACCOUNT SETTINGS
              </Text>
            </View>

            <View style={styles.accountSettingsContainer}>
              <View style={styles.imgDobPronounContainer}>
                <PavImage
                  style={styles.userImg}
                  key="settings_user_img"
                  defaultSource={defaultUserPhoto}
                  source={{uri: this.props.curUser}}
                  resizeMode='contain'
                ></PavImage>

                <View style={styles.dobPronounContainer}>

                  <TouchableInput title="Preferred Pronoun " value="His " onTap={this.onPronounClick.bind(this)}/>
                  <TouchableInput title="Date of Birth " value="28/08/1990 " onTap={this.onDateClick.bind(this)}/>

                </View>

              </View>

            </View>



          </ScrollView>
        </View>
    );
  }
  // <Collapsible
  // collapsed={this.state.pronounPickerCollapsed}
  // style={{backgroundColor:'blue'}}
  // align="center"
  // onChange={
  //   (collapsed)=>{this.setState({pronounPickerCollapsed:collapsed})}
  // }
  // >
  //   <Picker
  //     style={styles.pronounPicker}
  //     selectedValue={this.state.gender}
  //     onValueChange={(gender) => this.setState({gender: gender})}>
  //     <Picker.Item label="His" value="male" />
  //     <Picker.Item label="Her" value="female" />
  //     <Picker.Item label="They" value="gay" />
  //   </Picker>
  // </Collapsible>



    /**
     * ## Styles for PORTRAIT
     */
    getPortraitStyles(self){
      return StyleSheet.create({


        container: {
          flex:1,
          flexDirection: 'column',
          // paddingBottom:self.props.isTab===false?0:50, //tab bar height
          paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
          backgroundColor: 'white',
          // marginVertical: 10,
          // marginHorizontal:15
        },
        scroller:{
          flex:1,
        },


        accountSettingsContainer:{
          // flex:1,
          flexDirection:"column",
          paddingHorizontal: w*0.022,
          // backgroundColor:'pink'
        },

        titleContainer:{
          backgroundColor: Colors.titleBgColorDark,
          borderBottomColor: "rgba(0, 0, 0, 0.07)",
          borderBottomWidth: 1,
          paddingHorizontal: w*0.020,
          paddingVertical: h*0.015,
        },

        titleText:{
          color: Colors.primaryColor,
          fontFamily: 'Whitney-Bold',
          fontSize: getCorrectFontSizeForScreen(w,h,9),
        },

        imgDobPronounContainer:{
          flexDirection:'row',
          paddingVertical:h*0.015,
          alignItems:'center',
          // backgroundColor:'orange'
        },
        userImg:{
          width:h*0.21,
          height:h*0.21,
        },

        dobPronounContainer:{
          flex:1,
          flexDirection:'column',
          // backgroundColor:'pink',
          paddingLeft: w*0.015,
          justifyContent:'center'
        },



      });
    }


  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log("########### Cur user update: "+(nextProps.curUser !== this.props.curUser));
  //   return(
  //     (nextProps.device !== this.props.device)
  //     // ||
  //     // (nextProps.isFetchingTimeline !== this.props.isFetchingTimeline)
  //     // ||
  //     // (nextProps.isFetchingOldTimelineData !== this.props.isFetchingOldTimelineData)
  //     // ||
  //     // (nextProps.isFetchingProfile !== this.props.isFetchingProfile)
  //     // ||
  //     // (nextProps.isFetchingFollow !== this.props.isFetchingFollow)
  //     // ||
  //     // (nextProps.curUser !== this.props.curUser)
  //     // ||
  //     // (nextState.dataSource !== this.state.dataSource)
  //     // ||
  //     // (nextProps.lastActivityTimestamp !== this.props.lastActivityTimestamp)
  //     // ||
  //     // (nextProps.voteCnt !== this.props.voteCnt)
  //     // ||
  //     // (nextProps.followerCnt !== this.props.followerCnt)
  //     // ||
  //     // (nextProps.followingCnt !== this.props.followingCnt)
  //     // ||
  //     // (nextProps.currentlyFollowingUser !== this.props.currentlyFollowingUser)
  //   );
  // }
}



SettingsRender.propTypes= {
  // timelineData: React.PropTypes.object,
  curUser: React.PropTypes.object,
  // device: React.PropTypes.object.isRequired,
  // isTab: React.PropTypes.bool,
  // followingCnt: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.number,
  // ]),
  // onFetchOlderTimelineData:React.PropTypes.func.isRequired,

};
export default SettingsRender;
