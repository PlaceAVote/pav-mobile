'use strict';

import React from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  PixelRatio,
} from 'react-native';

import {Colors} from '../../config/constants';
import LinearGradient from 'react-native-linear-gradient';


const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';



//import fontelloConfig from '../../../assets/fonts/paviconFontelloConfig.json';
// const Icon = createIconSetFromIcoMoon(fontelloConfig);
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);





class GridLayoutExample extends React.Component {


  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView contentContainerStyle={styles.list}
        dataSource={ds.cloneWithRows(this.props.topicData)}
        renderRow={this._renderRow}
      />
    );
  }




  renderTopicIconDependingOnChecked (isChecked, rowIconName, rowTitle){
    // console.log("Should be checked: "+isChecked);
    if(isChecked){
      return (<LinearGradient
        colors={['#4D6EB2', '#775B96']}
        start={[0.0, 0.5]} end={[1.0, 0.5]}
        style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon name={rowIconName} style={styles.thumbChecked} size={68}/>
          </View>
          <View style={styles.textAndCheckContainer}>
            <Text style={styles.textChecked}>
              {rowTitle}
            </Text>
            <View style={styles.checkMarkContainerChecked}>
              <Icon name="check-mark" style={styles.checkMark} size={14}/>
            </View>
          </View>
      </LinearGradient>);
    }else{
      return (<View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon name={rowIconName} style={styles.thumb} size={68}/>
          </View>
          <View style={styles.textAndCheckContainer}>
            <Text style={styles.text}>
              {rowTitle}
            </Text>
            <View style={styles.checkMarkContainer}>
            </View>
          </View>
      </View>);
    }
  }




  isCurrentRowChecked(rowKey, selectedList){
    for (var ii= 0,ll=selectedList.length; ii < ll; ii++) {
        if (list[ii] === rowKey) {
          console.log(rowKey+' is checked');
            return true;
        }
    }
    // console.log(rowKey+' NOT checked');
    return false;
  }

  _renderRow(rowData, sectionID, rowID) {


    // var curIconName = this.state.iconNameList[rowID];
    //TODO: Create the initial state, and the logic, to receive the checked list prop as a property right from the state. Implement the onChange method on the parent.
    // let isCurrentRowChecked = this.props.isCheckedList[rowID];

    // console.log("Cur Icon name: "+curIconName);
    // var selectedItems = [];
    // this.isCurrentRowChecked(this.state.keysMap[rowID], selectedItems)
    return (
      <TouchableHighlight onPress={(e) => this._pressRow(rowID,e, rowData)} underlayColor='rgba(0,0,0,0)'>
        <View>
          {this.renderTopicIconDependingOnChecked(rowData.isSelected, rowData.icon, rowData.title)}
        </View>
      </TouchableHighlight>
    );
  }


  // _genRows: function() : Array<string> {
  //
  //   var rowsData = {
  //     titleKeysAndSelectedValues:[],
  //     iconKeys: [],
  //     topicKeys: []
  //   }
  //   let topics = this.props.topics;
  //   // console.log("Topics: "+JSON.stringify(topics));
  //   for (var topicKey in topics) {
  //     var curTopic = topics[topicKey];
  //     rowsData.topicKeys.push(topicKey);
  //     rowsData.iconKeys.push(curTopic.icon);
  //     rowsData.titleKeysAndSelectedValues.push({title: curTopic.title, isSelected: false});
  //   }
  //
  //   // for (var ii = 0, ll=Object.keys(topics).length; ii < ll; ii++) {
  //   // }
  //   return rowsData;
  // },

  _pressRow(rowID, e, rowData) {
    // console.log("Row was pressed with rowData: "+JSON.stringify(rowData));
    if(!this.props.disabled){
        this.props.onSelectedTopicsChange(rowData.key);
    }
  }

}



var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 8,
    width: w*0.42,
    height: w*0.37,
    // backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#543596'
  },
  iconContainer:{
    flex: 1,
    // backgroundColor: 'red',
    justifyContent:'center',
    paddingTop:2,
  },
  thumbChecked:{
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.mainTextColor,
  },
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.secondaryTextColor
  },
  textAndCheckContainer:{
    flex: 0,
    paddingHorizontal: 3,
    justifyContent: 'space-between',
    width: w*0.39,
    // backgroundColor: 'blue',
    flexDirection: "row"
  },
  textChecked: {
    fontSize: getCorrectFontSizeForScreen(w,h,17),
    fontFamily: 'Whitney',
    textAlign: 'center',
    alignSelf:'center',
    color: Colors.mainTextColor,
    // backgroundColor: 'red'
  },
  text: {
    fontSize: getCorrectFontSizeForScreen(w,h,16),
    fontFamily: 'Whitney',
    textAlign: 'center',
    alignSelf:'center',
    color: Colors.thirdTextColor,
    // backgroundColor: 'red'
  },
  checkMark:{
    textAlign: 'center',
    backgroundColor: Colors.transparentColor,
    color: '#A4CC6D'
  },
  checkMarkContainer:{
    borderRadius: 20,
    justifyContent:'center',
    height: w*0.07,
    width: w*0.07,
    borderWidth: 2,
    borderColor: Colors.mainBorderColor,
    backgroundColor:'white'
  },
  checkMarkContainerChecked:{
    borderRadius: 20,
    justifyContent:'center',
    height: w*0.07,
    width: w*0.07,
    borderWidth: 2,
    borderColor: Colors.mainBorderColor,
    backgroundColor:'white'
  }
});
module.exports = GridLayoutExample;
