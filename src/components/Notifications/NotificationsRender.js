/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../../reducers/auth/authActions';
import * as globalActions from '../../reducers/global/globalActions';



import LinearGradient from 'react-native-linear-gradient';

/**
 * Immutable
 */
import {Map} from 'immutable';

/*A react native button*/
import Button from 'sp-react-native-iconbutton'

/**
* Icons library
*/



import {Colors, ScheneKeys} from '../../config/constants';

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

/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;



/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
  // globalActions
];

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}










class NotificationsRender extends React.Component {
  constructor(props) {
    super(props);
    let data = [];
    // console.log("Data within getFeedDataSource is :"+data);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); // || r1["event_id"] !== r2["event_id"]
    // ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(){
    return StyleSheet.create({


      container: {
        // backgroundColor: 'orange',
        // flex:1,
        flex:1,
        flexDirection: 'column',
        paddingBottom:50, //tab bar height
        paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
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
        paddingVertical:w*0.002,
      },

      oddCardContainer:{
        backgroundColor: Colors.mainTextColor
      },
      evenCardContainer:{
        backgroundColor: Colors.titleBgColorDark
      }


    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
   getLandscapeStyles(){
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


  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    let styles= isPortrait?this.getPortraitStyles():this.getLandscapeStyles();

    // <ListView
    //   dataSource={this.state.dataSource}
    //   renderRow={(rowData) => <Text>{rowData}</Text>}
    // />

    return(
        <View style={styles.container}>
        <ListView
         enableEmptySections={true}
         style={styles.itemList}
         initialListSize={5}
         dataSource={this.state.dataSource}
         scrollEnabled={true}
         refreshControl={
           <RefreshControl
           refreshing={this.props.isFetchingNotifications}
           onRefresh={this.props.onItemsRefresh}
           tintColor={Colors.primaryColor}
           colors={[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]}
         />}
         renderRow={(rowData, s, rowIt) =>
           <CardFactory
           type="notifications"
           key={rowData.event_id}
           cardStyle={[Platform.OS=="android"?{elevation:5}:{}, (rowIt%2==0)?styles.oddCardContainer:styles.evenCardContainer ]}
           itemData={rowData}
           style={styles.card}
           device={this.props.device}
           curUser={this.props.curUser}
           onUserClick={this.props.onUserClick}
           onBillClick={this.props.onBillClick}
           onCommentClick={this.props.onCommentClick}
           />}
         />

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
        (nextProps.device !== this.props.device)
        ||
        (nextProps.isFetchingNotifications !== this.props.isFetchingNotifications)
        ||
        (nextState.dataSource !== this.state.dataSource)
      );
    }
}







NotificationsRender.propTypes= {
  notifications: React.PropTypes.object,
  device: React.PropTypes.object.isRequired,
  isFetchingNotifications: React.PropTypes.bool.isRequired,

  onItemsRefresh: React.PropTypes.func.isRequired,
  onUserClick: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
  onCommentClick: React.PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsRender);
