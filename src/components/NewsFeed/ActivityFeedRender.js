/* @flow weak */
/**
 * # ActivityFeedRender.js
 *
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, ListView} from 'react-native';
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
    let data = this.props.feedData || [];
    // console.log("Data within getFeedDataSource is :"+data);
    let ds = null;
    if(this.props.type=="feed"){
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); // || r1["event_id"] !== r2["event_id"]
    }else{
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>  (r1 !== r2) || (r1['bill_id'] !== r2['bill_id']) });
    }
    // ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({
      itemList:{
        flex:1,
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



  componentWillReceiveProps (nextProps) {
    if (nextProps.feedData!=null &&  nextProps.feedData!== this.props.feedData) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.feedData)
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.feedData !== this.props.feedData)
      ||
      (nextProps.device !== this.props.device)
      ||
      (nextProps.style !== this.props.style)
      ||
      (nextProps.curUser !== this.props.curUser)
    );
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
         dataSource={this.state.dataSource}
         scrollEnabled={this.props.type=="discovery"?false:true}
         renderRow={(rowData) =>
           <CardFactory
           type="newsfeed"
           key={rowData.event_id}
           itemData={rowData}
           device={this.props.device}
           curUser={this.props.curUser}

           onUserClick={this.props.onUserClick}
           onBillClick={this.props.onBillClick}
           onLikeDislikeClick={this.props.onLikeDislikeClick}
           onReplyClick={this.props.onReplyClick}
           onReactionClick={this.props.onReactionClick}
           onCommentClick={this.props.onCommentClick}
           onSocialClick={this.props.onSocialClick}
           />}
         />);
  }
}



export default ActivityFeedRender;
