'use strict';

import Button from 'sp-react-native-iconbutton';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ListView,
  RefreshControl,
  Platform
} from 'react-native';


import {Colors} from '../../config/constants';

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import CardFactory from '../Cards/CardFactory';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import congratsScreenPhoto from '../../../assets/congratsScreen.png';
import moment from 'moment';
import PavSpinner from '../../lib/UI/PavSpinner';

class SearchModalBox extends React.Component {
    constructor(props){
        super(props);
        let data = [];
        if(!!props.searchData){
          data = props.searchData;
        }
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


    getStyles(extraBottomSpace, resultsExist, currentlySearching){
        return StyleSheet.create({
            modalPointingTop: {
                justifyContent: 'center',
                alignItems: 'center',
                height: resultsExist===true?h-((Platform.OS === 'ios' || (Platform.Version > 19) )? 84 : 44):null,
                width: w*1,
                paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar heights
                paddingBottom:(h*0.08)+extraBottomSpace,
                // backgroundColor: '#00000088'
                backgroundColor: Colors.transparentColor,

            },
            modalPointingBot:{
              justifyContent: 'center',
              alignItems: 'center',
              height: resultsExist===true?h-((Platform.OS === 'ios' || (Platform.Version > 19) )? 84 : 44):null,
              width: w*1,
              paddingBottom:(h*0.08)+extraBottomSpace,
              // backgroundColor: '#00000088'
              backgroundColor: Colors.transparentColor,
            },

            container:{
              flex:1,
              width: w*0.95,
              borderRadius:3,
              backgroundColor: Colors.titleBgColor,
            },

            //BUTTONS

            btnContainer:{
              // flex:1,
              width: w*0.95,
              flexDirection:'row',
              justifyContent:'flex-end',
              // backgroundColor:'red'
            },
            closeBtnContainer:{
              // paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
              // backgroundColor:'pink',
              backgroundColor:Colors.transparentColor,
              flexDirection:'row',
              justifyContent:'flex-end',
              // alignSelf:'flex-start',
              alignItems:'center',
            },
            closeBtnTextContainer:{
              paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
            },
            closeBtnText:{
              backgroundColor: Colors.transparentColor,
              color: Colors.mainTextColor,
              fontFamily: 'Whitney-Bold',
              fontSize: getCorrectFontSizeForScreen(7),
              textAlign:'center'
            },
            closeBtnIcon:{
              color: Colors.mainTextColor,
              backgroundColor: Colors.transparentColor,
            },


            doneBtnContainer:{
              // paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
              backgroundColor:Colors.transparentColor,
              // backgroundColor:'purple',
              flexDirection:'row',
              justifyContent:'flex-end',
              // alignSelf:'flex-end',
              alignItems:'center',
            },
            doneBtnTextContainer:{
              paddingVertical: h*0.015,
              paddingHorizontal: w*0.015,
            },
            doneBtnText:{
              backgroundColor: Colors.transparentColor,
              color: Colors.mainTextColor,
              fontFamily: 'Whitney-Bold',
              fontSize: getCorrectFontSizeForScreen(7),
              textAlign:'center'
            },
            doneBtnIcon:{
              color: Colors.mainTextColor,
              backgroundColor: Colors.transparentColor,
            },












            //header

            header:{
              // flex:1,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              paddingHorizontal:w*0.01,
              paddingVertical:w*0.018,
              ...Platform.select({
                ios: {
                  shadowColor: 'rgba(0, 0, 0, 0.32)',
                  shadowOpacity: resultsExist===true?0.8:0,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 1,
                    width: 2,
                  },
                },
                android: {
                  borderBottomWidth:1,
                  borderBottomColor:'rgba(0, 0, 0, 0.12)',
                },
              }),
            },


            searchBillTextContainer:{
              justifyContent:'center',
              paddingHorizontal: w*0.025,
            },

            searchBillText:{
              fontFamily: 'Whitney-Regular',
              fontSize: getCorrectFontSizeForScreen(9),
              // backgroundColor:'red',
              color:Colors.fourthTextColor,
              // textAlign:'center'
            },

            inputText:{
              // flex:1,
              height:h*0.06,
              width:currentlySearching?w*0.5:w*0.6,
              backgroundColor:'white',
              borderRadius: 2,
              borderWidth: 1,
              borderColor: '#E7E6ED',
              paddingHorizontal:w*0.01,
              textAlignVertical: "top",
              fontFamily: 'Whitney-Light',
              fontSize: getCorrectFontSizeForScreen(10),
              color: Colors.thirdTextColor,
            },
            spinner:{
              // backgroundColor:'red'
            },


            //body

            body:{
              flex:1,
              flexDirection:'column',
              justifyContent:'center',
              paddingHorizontal:w*0.01,
              paddingVertical:w*0.018,
            },
            itemList:{
              flex:1,
            },







            topArrowBtnIconContainer:{
              // backgroundColor:'yellow',
              width: w*0.95,
              paddingHorizontal:w*0.005,
              justifyContent:'flex-end',
              alignItems:'flex-start'
            },
            botArrowBtnIconContainer:{
              paddingLeft:w*0.05,
              width: w*0.95,
              justifyContent:'flex-end',
              alignItems:'flex-start'
            },
            arrowBtnIcon:{
              // borderTopWidth: 15,
              // borderTopColor: 'red',
              // borderTopColor: Colors.titleBgColor,
              color: Colors.titleBgColor,
            }




        });
    }


    onDone(){

    }

    onClose(){
      if(!!this.props.onClose){
        this.props.onClose();
      }
    }

    renderSpinner(styles){

      if(this.props.currentlySearching===true){
        return <PavSpinner style={styles.spinner} size={Platform.OS==="ios"?"small":"Small"}/>
      }else{
        return <View></View>;
      }

    }





    renderUtilUiTop(arrowLocation, styles){
      if(arrowLocation=="top-left"){
        return (<View style={styles.topArrowBtnIconContainer}>
            <PavIcon name="activeIndicatorShrinked" size={9} style={styles.arrowBtnIcon}/>
          </View>);
      }else if(arrowLocation=="bot-center"){
        return (<View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.onClose.bind(this)} style={styles.closeBtnContainer}>
              <PavIcon name="close-badge" size={17} style={styles.closeBtnIcon}/>
              <View style={styles.closeBtnTextContainer}>
                <Text style={styles.closeBtnText}>CLOSE</Text>
              </View>
          </TouchableOpacity>
        </View>)
      }else{
        return <View></View>;
      }
    }

    renderUtilUiBot(arrowLocation, styles){
      if(arrowLocation=="bot-center"){
        return (<View style={styles.botArrowBtnIconContainer}>
          <PavIcon name="activeIndicatorShrinkedBot" size={9} style={styles.arrowBtnIcon}/>
        </View>);
      }else if(arrowLocation=="top-left"){
        return (<View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.onClose.bind(this)} style={styles.closeBtnContainer}>
              <PavIcon name="close-badge" size={17} style={styles.closeBtnIcon}/>
              <View style={styles.closeBtnTextContainer}>
                <Text style={styles.closeBtnText}>CLOSE</Text>
              </View>
          </TouchableOpacity>
        </View>)
      }else{
        return <View></View>;
      }
    }


    render(){
      let styles = this.getStyles(this.props.extraBottomSpace, (!!this.props.searchData && this.props.searchData.length>0), (this.props.currentlySearching===true));
      let refreshProps = Platform.OS=="ios"?{
        // tintColor:Colors.primaryColor,
        // title:"Loading...",
        // titleColor:Colors.primaryColor
      }:
      {
        colors:[Colors.primaryColor, Colors.negativeAccentColor, Colors.accentColor]
      };
        return (
            <Modal
                backdrop={true}
                animationDuration={200}
                swipeThreshold={90}
                style={(this.props.arrowLocation=="bot-center")?styles.modalPointingBot:styles.modalPointingTop}
                position={(this.props.arrowLocation=="bot-center")?"bottom":"top"}
                swipeToClose={true}
                isOpen={this.props.isOpen}
                onClosed={this.onClose.bind(this)}
              >



              {this.renderUtilUiTop(this.props.arrowLocation, styles)}
              <View style={styles.container}>

                <View style={styles.header}>
                  <View style={styles.searchBillTextContainer}>
                    <Text  style={styles.searchBillText}>Search for a bill: </Text>
                  </View>
                  <TextInput
                      style={styles.inputText}
                      onChangeText={(text) => {if(!!this.props.onSearchTermChanged){this.props.onSearchTermChanged(text)}}}
                      value={this.state.url}
                      autoFocus={true}
                      multiline={false}
                      placeholder="Any text related to the bill."
                      keyboardType="url"
                      autoCorrect={false}
                      selectionColor={Colors.primaryColor}
                      placeholderTextColor={Colors.secondaryTextColor}
                      onSubmitEditing={this.onDone.bind(this)}
                      returnKeyType="search"
                      autoCapitalize="none"
                  />
                  {this.renderSpinner(styles)}
                </View>
                <View style={styles.body}>
                  <ListView
                     enableEmptySections={true}
                     style={styles.itemList}
                     initialListSize={5}
                     dataSource={this.state.dataSource}
                     renderRow={(rowData, s , rowId) =>(
                       <CardFactory
                         type="search"
                         restrictSearchTo={this.props.restrictSearchTo}
                         key={"search"+rowId}
                         cardStyle={Platform.OS=="android"?{elevation:5}:{}}
                         itemData={rowData}
                         device={this.props.device}
                         onBillClick={this.props.onBillTap}
                         onUserClick={this.props.onUserTap}
                       />)
                     }
                   />
                </View>
              </View>
              {this.renderUtilUiBot(this.props.arrowLocation, styles)}


            </Modal>
        );
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.searchData!=null &&  nextProps.searchData!== this.props.searchData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.searchData)
        })
      }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return(
    //     (nextProps.device.orientation !== this.props.device.orientation)
    //     ||
    //     (nextProps.style !== this.props.style)
    //     ||
    //     (nextProps.curUser !== this.props.curUser)
    //     ||
    //     (nextState.dataSource !== this.state.dataSource)
    //   );
    // }
}


SearchModalBox.defaultProps={
    extraBottomSpace:0,
    currentlySearching:false,
    arrowLocation:"bot-center"
}
SearchModalBox.propTypes= {
  isOpen: React.PropTypes.bool.isRequired,
  restrictSearchTo: React.PropTypes.string,
  device: React.PropTypes.object.isRequired,
  searchData: React.PropTypes.array,
  arrowLocation: React.PropTypes.oneOf(['bot-center', 'top-left']),
  onSearchTermChanged: React.PropTypes.func.isRequired,
  currentlySearching: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onBillTap: React.PropTypes.func,
  onUserTap: React.PropTypes.func,
  extraBottomSpace: React.PropTypes.number
};
module.exports = SearchModalBox;
