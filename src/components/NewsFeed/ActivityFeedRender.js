/* @flow weak */
/**
 * # ActivityFeedRender.js
 *
 */
'use strict';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  View,
  ListView,
}
from 'react-native';
// import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'

// import Dimensions from 'Dimensions';
// const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// const icomoonConfig = require('../../../assets/fonts/icomoon.json');
// const PavIcon = createIconSetFromIcoMoon(icomoonConfig);


/**
* Cards
*/
import CardFactory from '../Cards/CardFactory';







class ActivityFeedRender extends Component {
  constructor(props) {
    super(props);
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({
      itemList:{
        flex:1,
        // backgroundColor:'red'
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














  getFeedDataSource(data){
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.event_id !== r2.event_id});
    return ds.cloneWithRows(data);
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
        <ListView
         enableEmptySections={true}
         style={[styles.itemList, this.props.style]}
         initialListSize={5}
         dataSource={this.getFeedDataSource(this.props.feedData)}
         renderRow={(rowData) =>
           <CardFactory
           type="newsfeed"
           key={rowData.event_id}
           itemData={rowData}
           device={this.props.device}
           curUser={this.props.curUser}
           />}
         />);
  }
}



export default ActivityFeedRender;
