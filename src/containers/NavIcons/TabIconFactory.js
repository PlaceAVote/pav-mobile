import React from 'react'
import {View, Text, Dimensions,} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import {Colors, ScheneKeys} from '../../config/constants';
const {height:h, width:w} = Dimensions.get('window');
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'

export default class TabIconFactory extends React.Component {
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
              <PavIcon name={iconName} size={getCorrectFontSizeForScreen(w,h,22)} style={{color: (this.props.selected===true) ? Colors.secondaryColor :Colors.secondaryTextColor}}/>
            </View>
            <View style={{flexDirection: "column", justifyContent: 'center', paddingLeft:w*0.004,paddingRight:w*0.006}}>
              <Text style={{
                color: (this.props.selected===true) ? Colors.primaryColor :Colors.secondaryTextColor,
                fontFamily: 'Whitney',
                fontSize: getCorrectFontSizeForScreen(w,h,8),
                textAlign:'center'
              }}>{tabText}</Text>
            </View>
          </View>
        );
    }
}
