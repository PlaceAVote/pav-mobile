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
              fontFamily: 'Whitney-Regular',
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
            tabText = "Feed";
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
          <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', paddingHorizontal:w*0.02}}>
            <View style={{paddingRight:w*0.004, paddingVertical:h*0.005}}>
              <PavIcon name={iconName} size={20} style={{color: (this.props.selected===true) ? Colors.secondaryColor :Colors.secondaryTextColor}}/>
              {this.renderNotificationCount()}
            </View>
            <View style={{justifyContent: 'center', paddingLeft:w*0.004}}>
              <Text style={{
                color: (this.props.selected===true) ? Colors.primaryColor :Colors.secondaryTextColor,
                fontFamily: 'Whitney-Regular',
                fontSize: 12,
                textAlign:'center'
              }}>{tabText}</Text>
            </View>
          </View>
        );
    }
}
export default connect(mapStateToProps)(TabIconFactory);
