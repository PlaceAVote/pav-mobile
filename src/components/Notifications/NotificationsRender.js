/**
 * # NotificationsRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */




import {Colors, ScheneKeys} from '../../config/constants';
import Button from 'sp-react-native-iconbutton'
import React from 'react';
import {StyleSheet, Text, View, ListView, RefreshControl, Platform} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import NotifVoteCard from '../Cards/NotificationCards/NotifVoteCard'
import CardFactory from '../Cards/CardFactory';
import NavBarRender from '../NavBar/NavBarRender';
import PavSpinner from '../../lib/UI/PavSpinner'
/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;







const styles = StyleSheet.create({


  container: {
    // backgroundColor: 'orange',
    flex:1,
    flexDirection: 'column',
    paddingBottom:50, //tab bar height
    // paddingTop:(Platform.OS === 'ios')? 64 : 54,   //nav bar height
    backgroundColor: '#E8E7EE',
    // marginVertical: 10,
    // marginHorizontal:15
  },
  itemList:{
    flex:1,
    backgroundColor: '#E8E7EE',
  },

  card:{
    paddingHorizontal:0,//w*0.001,
    paddingVertical:0.3,
  },

  noNotificationsContainer:{
    // flex:1,
    // backgroundColor: 'orange',
    flexDirection: 'column',
    paddingHorizontal:w*0.14,
    paddingVertical:h*0.05,
    // justifyContent:'center',
    alignItems:'center'
  },
  noNotificationsIcon:{
    color: Colors.fourthTextColor,
    paddingVertical: h*0.013,
  },
  noNotificationsTitleContainer:{
    paddingVertical: h*0.013,
  },
  noNotificationsTitle:{
    color: Colors.fourthTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(11),
  },
  noNotificationsDescriptionContainer:{
    paddingVertical: h*0.019,
  },
  noNotificationsDescription:{
    textAlign: 'center',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(9),
  },
  takeMeThereBtn:{
    width: w*0.6,
    marginVertical: h*0.015,
    backgroundColor: Colors.accentColor,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.mainBorderColor,
    height: 45
  },
  takeMeThereBtnTxt:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(10),
  },

});


class NotificationsRender extends React.Component {
  constructor(props) {
    super(props);
    let data = props.notifications.toJS() || [];
    // console.log("Data within getFeedDataSource is :"+data);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); // || r1["event_id"] !== r2["event_id"]
    // ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }






  renderNotifications(){
    if(!!this.state.dataSource && this.state.dataSource.getRowCount()>0){
      return (
        <ListView
         enableEmptySections={true}
         style={styles.itemList}
         initialListSize={7}
         dataSource={this.state.dataSource}
         scrollEnabled={true}
         onEndReached={()=>{
           if(this.props.onFetchOlderNotifications){
             this.props.onFetchOlderNotifications()
           }
         }}
         onEndReachedThreshold={20}
         renderFooter={()=>{
           if(this.props.isFetchingOlderNotifications===true){
             return <View style={{paddingVertical:h*0.05}}><PavSpinner/></View>
           }else{
             return <View></View>;
           }
         }}
         refreshControl={
           <RefreshControl
           refreshing={this.props.isFetchingNotifications===true}
           onRefresh={this.props.onItemsRefresh}
           colors={[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]}
         />}
         renderRow={(rowData, s, rowIt) =>
           <CardFactory
           type="notifications"
           key={rowData.event_id}
           cardStyle={[Platform.OS=="android"?{elevation:5}:{}, (rowIt%2==0)?{ backgroundColor: rowData.read===false?Colors.oddRowBgHighlightColor:Colors.oddRowBgColor}:{backgroundColor: rowData.read===false?Colors.evenRowBgHighlightColor:Colors.evenRowBgColor} ]}
           itemData={rowData}
           isRead={rowData.read}
           style={styles.card}
           device={this.props.device}
           curUser={this.props.curUser}
           onUserClick={this.props.onUserClick}
           onBillClick={this.props.onBillClick}
           onCommentClick={this.props.onCommentClick}
           />}
         />
      )
    }else{  //there were no notifications
      return (
        <View style={styles.noNotificationsContainer}>
          <PavIcon name="sad" size={24} style={styles.noNotificationsIcon}/>
          <View style={styles.noNotificationsTitleContainer}>
            <Text style={styles.noNotificationsTitle}>
            You don't have any notifications yet!
            </Text>
          </View>
          <View style={styles.noNotificationsDescriptionContainer}>
            <Text style={styles.noNotificationsDescription}>
            Visit your Discovery Feed and join in the conversation.
            </Text>
          </View>
          <Button
              textStyle={styles.takeMeThereBtnTxt}
              style={styles.takeMeThereBtn}
              activityIndicatorColor={Colors.mainTextColor}
              onPress={this.props.onTakeMeThereClick}>
            Take me there
          </Button>
        </View>
      )
    }
  }


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // let styles= isPortrait?this.getPortraitStyles():this.getLandscapeStyles();
    return(
        <View style={styles.container}>
        <NavBarRender title="Notifications"/>
          {this.renderNotifications()}
        </View>
    );
  }



    componentWillReceiveProps (nextProps) {
      if (nextProps.notifications!=null &&  nextProps.notifications!== this.props.notifications) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.notifications.toJS())
        })
      }
    }


    shouldComponentUpdate(nextProps, nextState) {
      // console.log("########### Cur user update: "+(nextProps.curUser !== this.props.curUser));
      return(
        (nextProps.device.orientation !== this.props.device.orientation)
        ||
        (nextProps.isFetchingNotifications !== this.props.isFetchingNotifications)
        ||
        (nextProps.isFetchingOlderNotifications !== this.props.isFetchingOlderNotifications)
        ||
        (nextState.dataSource !== this.state.dataSource)
      );
    }
}







NotificationsRender.propTypes= {
  notifications: React.PropTypes.object,
  device: React.PropTypes.object.isRequired,
  isFetchingNotifications: React.PropTypes.bool.isRequired,
  isFetchingOlderNotifications: React.PropTypes.bool.isRequired,
  onItemsRefresh: React.PropTypes.func.isRequired,
  onFetchOlderNotifications: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onCommentClick: React.PropTypes.func.isRequired,
  onTakeMeThereClick: React.PropTypes.func.isRequired,
};
export default NotificationsRender;
