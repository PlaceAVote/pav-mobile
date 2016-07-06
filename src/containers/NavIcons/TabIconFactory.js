import React from 'react'
import {View, Text, Dimensions,} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import {Colors, ScheneKeys} from '../../config/constants';
const {height:h, width:w} = Dimensions.get('window');
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'

/**
 *           Imports
 *
 * Redux
 */
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
      ...state
  };
}


class TabIconFactory extends React.Component {



    renderNotificationCount(){
      let unreadCount = this.props.notifications.unreadCnt;
      if(this.props.name===ScheneKeys.TAB_NOTIFS && unreadCount>0){
        return (
          <View style={{
            position:"absolute",
            top:0,
            right:0,
            backgroundColor:Colors.negativeAccentColor,
            paddingHorizontal:2,
            borderRadius:2,
          }}>
            <Text style={{
              color:Colors.mainTextColor,
              // backgroundColor: Colors.transparentColor,
              fontFamily: 'Whitney',
              // textAlign:'center',
              fontSize: getCorrectFontSizeForScreen(8),
            }}>{unreadCount}</Text>
          </View>
        );
      }else{
        return <View></View>;
      }
    }


    render(){
        let iconName = "", tabText;
        switch(this.props.name){
          case ScheneKeys.TAB_NEWS:
          case ScheneKeys.TAB_NEWS+"2":
            iconName="mailbox";
            tabText = "News Feed";
            break;
          case ScheneKeys.TAB_NOTIFS:
            iconName="ios-pulse-strong";
            tabText = "Notifications";
            // console.log("Notifications array: "+this.props.notifications);
            break;
          case ScheneKeys.TAB_PROFILE:
            iconName="person"
            tabText = "Profile";
            break;
          default:
            break;
        }
        return (
          <View style={{flex:1, top:5, flexDirection:'row', justifyContent:'center', alignItems:'center', paddingHorizontal:w*0.05}}>
            <View style={{paddingLeft:w*0.006,paddingRight:w*0.004, paddingVertical:h*0.005}}>
              <PavIcon name={iconName} size={getCorrectFontSizeForScreen(22)} style={{color: (this.props.selected===true) ? Colors.secondaryColor :Colors.secondaryTextColor}}/>
              {this.renderNotificationCount()}
            </View>
            <View style={{flexDirection: "column", justifyContent: 'center', paddingLeft:w*0.004,paddingRight:w*0.006}}>
              <Text style={{
                color: (this.props.selected===true) ? Colors.primaryColor :Colors.secondaryTextColor,
                fontFamily: 'Whitney',
                fontSize: getCorrectFontSizeForScreen(8),
                textAlign:'center'
              }}>{tabText}</Text>
            </View>
          </View>
        );
    }
}
export default connect(mapStateToProps)(TabIconFactory);
