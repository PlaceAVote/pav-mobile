import React from 'react'
import {View, Text} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import {Colors, ScheneKeys} from '../../config/constants';

class TabIconFactory extends React.Component {
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
          <View style={{flexDirection:'row', justifyContent:'center', padding:3}}>
            <PavIcon name={iconName} size={25} style={{color: this.props.selected ? Colors.secondaryColor :Colors.secondaryTextColor}}/>
            <View style={{flexDirection: "column", justifyContent: 'center', paddingHorizontal:4}}>
              <Text style={{color: this.props.selected ? Colors.primaryColor :Colors.secondaryTextColor}}>{tabText}</Text>
            </View>
          </View>
        );
    }
}
