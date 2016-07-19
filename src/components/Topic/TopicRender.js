/* @flow weak */
/**
 * # DiscoveryRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



// import LinearGradient from 'react-native-linear-gradient';






import {Colors, ScheneKeys, TOPICS} from '../../config/constants';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, ListView, RefreshControl} from 'react-native';
import {toTitleCase} from '../../lib/Utils/genericUtils'
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import PavSpinner from '../../lib/UI/PavSpinner'
import congratsScreenPhoto from '../../../assets/congratsScreen.png';

import TransparentNavBarRender from '../NavBar/TransparentNavBarRender';

import CardFactory from '../Cards/CardFactory';
import PavImage from '../../lib/UI/PavImage'
import backIcon from '../../../assets/back_chevron.png';


const styles = StyleSheet.create({


  container: {
    backgroundColor: '#E8E7EE',
    flex:1,
    flexDirection: 'column',
    justifyContent:'center'
  },

  topicImageContainer:{
    position:'absolute'
  },
  topicImage:{
    width: w,
    height: h*0.25,
  },

  backIconContainer:{
    top:25,
    paddingHorizontal:w*0.023,
    position:'absolute',
    // backgroundColor:'yellow',
  },
  backImg:{
    // backgroundColor:'red',
    height: 25,
    width: 30,
  },

  itemList:{
    // backgroundColor:'purple',
    marginTop: 15,
  },

  topicTitleContainer:{
    paddingTop:h*0.07,
    paddingBottom:h*0.02,
    backgroundColor:Colors.transparentColor
  },
  topicTitle:{
    fontFamily: 'Whitney-Regular',
    fontSize: getCorrectFontSizeForScreen(15),
    color: Colors.mainTextColor,
    textAlign: 'center',
  },
  cardContainer:{
    paddingHorizontal: w*0.05,
    paddingVertical:h*0.003,
  }


});


class DiscoveryRender extends React.Component {
  constructor(props) {
    super(props);
    let data = [];
    if(!!props.topicData){
      data = props.topicData.toJS();
    }
    // console.log("Data within getFeedDataSource is :"+data);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>  (r1 !== r2)});
    // console.log("@@@ TOPIC KEY: "+props.topicKey+" with topics: "+JSON.stringify(TOPICS))
    this.state = {
      dataSource: ds.cloneWithRows(data),
      topic: TOPICS[props.topicKey]
    };

  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.topicData!=null &&  nextProps.topicData!== this.props.topicData) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.topicData.toJS())
      })
    }
  }

  componentWillMount(){
  }

  /**
   * ### render method
   */
  render() {



    return(
      <View style={styles.container}>
        <View style={styles.topicImageContainer}>
          <PavImage
            defaultSource={congratsScreenPhoto}
            style={styles.topicImage}
            source={this.state.topic.img}
            resizeMode='cover'
          />
        </View>



        <ListView
         enableEmptySections={true}
         style={[styles.itemList, this.props.style]}
         initialListSize={5}
         pageSize={5}
         dataSource={this.state.dataSource}
         onEndReached={()=>{
           if(!!this.props.onFetchMoreItems){
             this.props.onFetchMoreItems(this.props.topicKey)
           }
         }}
         onEndReachedThreshold={200}
         renderHeader={()=>(
           <View style={styles.topicTitleContainer}>
             <Text style={styles.topicTitle}>
               {this.state.topic.title}
             </Text>
           </View>
        )}
         refreshControl={
           <RefreshControl
           refreshing={(this.props.isFetchingTopicData===true)}
           onRefresh={this.props.onRefresh}
           {...Platform.select({
              ios: {
              },
              android: {
                colors:[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]
              }
            })}
         />}

         renderRow={(rowData) =>
           <CardFactory
           type="topic"
           key={rowData.event_id}
           style={styles.cardContainer}
           itemData={rowData}
           onBillClick={this.props.onBillClick}
           onSocialClick={this.props.onSocialClick}
           />}
         />
         <TouchableOpacity style={styles.backIconContainer} onPress={this.props.onLeftNavBtnClicked}>
           <PavImage resizeMode='contain' style={styles.backImg} source={backIcon} />
         </TouchableOpacity>
      </View>
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return(
  //     // nextProps.parentVisible==true &&
  //     (nextProps.bill !== this.props.bill)
  //     ||
  //     (nextProps.billData !== this.props.billData)
  //     ||
  //     (nextProps.isFetchingBillData !== this.props.isFetchingBillData)
  //     ||
  //     (nextProps.device.orientation !== this.props.device.orientation)
  //     ||
  //     (nextState.minimumImgHeight!==this.state.minimumImgHeight)
  //   );
  // }

}

DiscoveryRender.propTypes= {
  topicKey: React.PropTypes.string.isRequired,
  isFetchingTopicData: React.PropTypes.bool.isRequired,
  topicData: React.PropTypes.object,
  onSocialClick: React.PropTypes.func.isRequired,
  onLeftNavBtnClicked: React.PropTypes.func.isRequired,
  onFetchMoreItems: React.PropTypes.func.isRequired,
  onBillClick: React.PropTypes.func.isRequired,
};
export default DiscoveryRender;
