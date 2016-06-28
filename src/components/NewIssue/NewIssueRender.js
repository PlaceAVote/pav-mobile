/* @flow weak */
/**
 * # NewIssueRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, TextInput} from 'react-native';

import Button from 'sp-react-native-iconbutton'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import LinearGradient from 'react-native-linear-gradient';

import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;

import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import {extractUrlFromTextIfAvailable, timeout} from '../../lib/Utils/genericUtils'

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import PavImage from '../../lib/UI/PavImage'
import defaultUserPhoto from '../../../assets/defaultUserPhoto.png';
import congratsScreenPhoto from '../../../assets/congratsScreen.png';

import InputUrlModalBox from '../Modals/InputUrlModalBox';
import SearchModalBox from '../Modals/SearchModalBox';


/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;






const styles = StyleSheet.create({


  container: {
    flex:1,
    flexDirection: 'column',
    paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
    // backgroundColor: 'orange',
    // marginVertical: 10,
    // marginHorizontal:15
  },


  //Header text

  headerTextContainer:{
      // backgroundColor:'pink',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:w*0.02,
      paddingVertical:w*0.026,

      borderRadius:2,
  },
  headerTextContainerShadowAndroid:{
    borderBottomWidth:1,
    borderBottomColor:'rgba(0, 0, 0, 0.12)',
  },
  headerTextContainerShadowiOS:{
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },


  createAnIssueTextContainer:{


  },
  createAnIssueText:{
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(w,h,9),
    color: Colors.primaryColor,
    // textAlign: 'center',
  },

      //right btns

  rightBtnContainer:{
    // backgroundColor:'purple',
    flexDirection:'row',
  },

  userImage:{
    width:w*0.055,
    height:w*0.055,
    // marginHorizontal: 10,
  },
  xIconContainer:{
    paddingLeft:w*0.028,
  },
  xIcon:{
    color:Colors.negativeAccentColor
  },







  //BODY
  bodyContainer:{
      flex:1,
      // backgroundColor:'purple',
  },
  inputTextContainer:{
    flex:1,
    paddingHorizontal:w*0.03,
    paddingVertical:w*0.026,
    // backgroundColor:'red',
  },
  inputText:{
    flex:1,
    // backgroundColor:'pink',
    textAlignVertical:'bottom',
    fontFamily: 'Whitney Book',
    fontSize: getCorrectFontSizeForScreen(w,h,10),
    color: Colors.thirdTextColor,
  },




        //Article
  relatedArticleContainer:{
      paddingVertical: h*0.014,
  },
  articleImage:{
    height:w*0.20,
    width:null
  },
  relatedArticleTitleContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    backgroundColor:Colors.transparentColor,
    // backgroundColor:"red"
  },
  relatedArticleTitleTextContainer:{
    flex:1,
    paddingVertical: h*0.015,
    paddingHorizontal: w*0.04,

  },
  relatedArticleTitleText:{
    // backgroundColor:"red",
    // width: w*0.73,
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,11),
    // backgroundColor:'red',
    color:Colors.mainTextColor,
    // textAlign:'center'
  },
  relatedArticleUrlIconContainer:{
    paddingHorizontal: w*0.04,
    paddingVertical: h*0.020,
    // backgroundColor:'pink',
    justifyContent:'center',
  },
  relatedArticleUrlCloseIcon:{
    top:1,
    right:1,
    padding: w*0.011,
    position:"absolute",
    // backgroundColor:'green',
    color:Colors.mainTextColor,
  },


        //Bill

  relatedBillContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:Colors.titleBgColor,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#E7E6ED',
    // paddingHorizontal: w*0.025,
  },
  relatedBillTitleTextContainer:{
    // backgroundColor:'pink',
    paddingVertical: h*0.008,
    paddingHorizontal: w*0.025,
  },

  relatedBillTitleText:{
    width:w*0.8,
    fontFamily: 'Whitney-MediumItalic',
    fontSize: getCorrectFontSizeForScreen(w,h,10),
    color: Colors.primaryColor
  },

  relatedBillIconContainer:{
    top:1,
    right:1,
    position:"absolute",
    // backgroundColor:'green'
  },
  relatedBillIcon:{
    padding: w*0.011,
    // backgroundColor:'red',
    // alignSelf:'flex-end',
    color:Colors.fourthTextColor,
  },










  //FOOTER

  footerContainer:{

    flexDirection:'row',
    bottom:0,
  },
  attachmentBtnsContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',


    height:44,
    backgroundColor:Colors.titleBgColor,
    borderTopWidth:1,
    borderTopColor:'rgba(0, 0, 0, 0.12)',
    borderRightWidth:1,
    borderRightColor:'rgba(0, 0, 0, 0.12)',
  },
  attachmentAddTextContainer:{
    paddingHorizontal:w*0.03,
  },
  attachmentAddText:{
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,10),
    color: Colors.fourthTextColor,
  },

  attachmentIcon:{
    color:Colors.fourthTextColor
  },
  attachmentIconsContainer:{
    flexDirection:'row',
    // paddingVertical:w*0.04,
    // borderTopWidth:1,
    // borderTopColor:'rgba(0, 0, 0, 0.12)',
  },
  leftIconContainer:{
    justifyContent:'center',
    paddingHorizontal:w*0.03,
    borderRightWidth:1,
    borderRightColor:'rgba(0, 0, 0, 0.12)',
    borderLeftWidth:1,
    borderLeftColor:'rgba(0, 0, 0, 0.12)',
    height:44,


  },
  rightIconContainer:{
    justifyContent:'center',
    paddingHorizontal:w*0.05,

    height:44,

  },

  postBtnContainer:{
    // backgroundColor:Colors.accentColor,
    justifyContent:'center',
    padding:2,
  },
  postBtn:{
    height:40,
    width: w*0.3,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.transparentColor,
    backgroundColor: Colors.accentColor,
  },

  whiteBtnText:{
    color: Colors.mainTextColor,
    textAlign: 'center',
    fontFamily: 'Whitney-Bold',
    fontSize: getCorrectFontSizeForScreen(w,h,11),
  },




});






class NewIssueRender extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      text: "",    //the text that will be used as the new issue body (we get that from the input textfield)
      // urlModalVisible: false,
      // searchModalVisible: false,
      keyboardHeight: 0
    }
  }



  close(){
    if(this.props.onClose){
        this.props.onClose()
    }
  }

  onAttachUrlBtnTap(){
    // this.setState({urlModalVisible:true});
    this.props.showUrlAttachModal();
  }

  onAttachBillBtnTap(){
    // alert("attach bill")
    // this.setState({searchModalVisible:true});
    this.props.showBillSearchModal();
  }

  onRelatedArticleCloseClicked(){
    // this.props.onUrlAttached(null);
    this.props.removeAttachedArticle();
  }
  onRelatedBillClicked(){
    // this.setState({relatedBill:null})
  }
  onRelatedBillCloseClicked(){
    this.props.removeAttachedBill();
  }


  renderRelatedUrl(){
    if(!!this.props.relatedArticle){
      return (
      <View style={styles.relatedArticleContainer}>
        <PavImage platform={Platform.OS}
          style={styles.articleImage}
          defaultSource={congratsScreenPhoto}
          source={{uri: this.props.relatedArticle.img}}
          resizeMode='cover'
          indicatorProps={{color:Colors.mainTextColor}}
        >
          <LinearGradient
            colors={['black', 'rgba(0, 0, 0, 0.24)', 'black']}
            start={[-0.3, 0.0]} end={[1.3, 0.0]}
            style={styles.relatedArticleTitleContainer}>
              <TouchableOpacity  style={styles.relatedArticleTitleTextContainer}  onPress={this.props.onRelatedArticleClicked}>
                <Text style={styles.relatedArticleTitleText}>{!!this.props.relatedArticle&&this.props.relatedArticle.title}</Text>
              </TouchableOpacity>
              {/*<TouchableOpacity style={styles.relatedArticleUrlIconContainer}  onPress={this.onRelatedArticleCloseClicked.bind(this)}>
                <PavIcon name="close" size={15} style={styles.relatedArticleUrlCloseIcon}/>
              </TouchableOpacity>*/}

          </LinearGradient>
        </PavImage>
      </View>);
    }else{
      return <View></View>;
    }

  }


    renderRelatedBillLink(){
      if(!!this.props.relatedBill){
        return (
          <View style={styles.relatedBillContainer} >
            <TouchableOpacity style={styles.relatedBillTitleTextContainer} onPress={this.props.onRelatedBillClicked}>
              <Text style={styles.relatedBillTitleText}>{this.props.relatedBill.billTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.relatedBillIconContainer}  onPress={this.onRelatedBillCloseClicked.bind(this)}>
              <PavIcon name="close" size={15} style={styles.relatedBillIcon}/>
            </TouchableOpacity>
          </View>);
      }else{
        return <View></View>;
      }

    }



    async extractUrlFromText(){
      let linkData = extractUrlFromTextIfAvailable(this.state.text);
      if(linkData!=null){
        this.setState({text:linkData.strippedText});
        let result = await this.props.onUrlAttached(linkData.url);
        return result.url;
      }else{
        return (!!this.props.relatedArticle && !!this.props.relatedArticle.url)?this.props.relatedArticle.url:null;
      }
    }


    async onPostClicked(){
      if(this.props.onIssuePost){
        let relArticUrl = await this.extractUrlFromText();
        await timeout(800);
        // alert("URL: "+relArticUrl);
        let relBillId = (!!this.props.relatedBill && !!this.props.relatedBill.billId)?this.props.relatedBill.billId:null;
        this.props.onIssuePost(this.state.text, relBillId, relArticUrl);
      }
    }





  /**
   * ### render method
   */
  render() {
    // let isPortrait = (this.props.device.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    // let billData = this.props.billData.toJS();
    // console.log("@@@@@@@@@@@@@@@@@@@ BILL USER VOTED: "+this.props.billData.get("user_voted"));
    // let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);

    return(
      <View
      style={styles.container}>



      <View style={[styles.headerTextContainer,( Platform.OS === 'ios')?styles.headerTextContainerShadowiOS:styles.headerTextContainerShadowAndroid]}>
        <View style={styles.createAnIssueTextContainer}>
          <Text style={styles.createAnIssueText}>CREATE AN ISSUE </Text>
        </View>
        <View style={styles.rightBtnContainer}>
          <PavImage
            platform={Platform.OS}
            defaultSource={defaultUserPhoto}
            style={styles.userImage}
            source={{uri: this.props.userPhotoUrl}}
            resizeMode='cover'
          />
          <TouchableOpacity style={styles.xIconContainer} onPress={this.close.bind(this)}>
            <PavIcon name="close" size={19} style={styles.xIcon}/>
          </TouchableOpacity>
        </View>
      </View>



      <View style={styles.bodyContainer}>
        <View style={styles.inputTextContainer}>
          <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              autoFocus={true}
              multiline={true}
              placeholder="Tell us what this issue is all about."
              selectionColor={Colors.primaryColor}
          />
          {this.renderRelatedBillLink()}
          {this.renderRelatedUrl()}

        </View>
      </View>


      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={this.onAttachBillBtnTap.bind(this)} style={styles.attachmentBtnsContainer}>
          <View style={styles.attachmentAddTextContainer}>
            <Text style={styles.attachmentAddText}>Attach Bill: </Text>
          </View>
          <View style={styles.attachmentIconsContainer}>
            {/*<View style={styles.leftIconContainer} >
              <TouchableOpacity onPress={this.onAttachUrlBtnTap.bind(this)}>
                <PavIcon name="links" size={17} style={styles.attachmentIcon}/>
              </TouchableOpacity>
            </View>*/}
            <View style={styles.rightIconContainer} >
              <View>
                <PavIcon name="bills" size={17} style={styles.attachmentIcon}/>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.postBtnContainer}>
          <Button
          onPress={this.onPostClicked.bind(this)}
          isLoading={this.props.issueBeingPosted || this.props.scrapedUrlBeingFetched}
          isDisabled={this.props.issueBeingPosted || this.props.scrapedUrlBeingFetched}
          style={styles.postBtn}
          textStyle={styles.whiteBtnText}>
          POST
          </Button>
        </View>


      </View>
      {/* The view that will animate to match the keyboards height */}
      <KeyboardSpacer android={false} onToggle={(keyboardState, keyboardHeight)=>{
        if(Platform.OS!=="android"){
          if(keyboardState==true){
            this.setState({
              keyboardHeight: keyboardHeight
            });
          }else{
            this.setState({
              keyboardHeight: 0
            });
          }
        }
        }}/>


      {/*<InputUrlModalBox
      isOpen={this.props.urlModalVisible}
      onClose={()=>this.props.hideUrlAttachModal()}
      onUrlAttached={(attachedUrl)=>{
        this.props.onUrlAttached(attachedUrl);
        this.props.hideUrlAttachModal();
      }}
      extraBottomSpace={this.state.keyboardHeight}
      />*/}
      <SearchModalBox
      isOpen={this.props.searchModalVisible}
      onClose={()=>this.props.hideBillSearchModal()}
      restrictSearchTo="bill"
      arrowLocation="bot-center"
      extraBottomSpace={this.state.keyboardHeight}
      onSearchTermChanged={this.props.onSearchTermChanged}
      searchData={this.props.searchBillData}
      currentlySearching={this.props.currentlySearching}
      device={this.props.device}
      onBillTap={(bId, bTitle)=>{
        if(!!this.props.onBillAttached){
          this.props.onBillAttached(bId, bTitle);
          this.props.hideBillSearchModal();
        }
      }}
      />

      </View>
    );
  }


  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.relatedArticle!=null &&  nextProps.relatedArticle!== this.props.relatedArticle) {
  //     this.setState({
  //       relatedArticle: nextProps.relatedArticle
  //     })
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
      // console.log("Should vote update: "+(nextProps.billData !== this.props.billData)+" since old: "+this.props.billData.get("user_voted")+" and new: "+nextProps.billData.get("user_voted"))
    return( true
      // (nextProps.billData !== this.props.billData)
      // ||
      // (nextProps.device.orientation !== this.props.device.orientation)
      // ||
      // (nextProps.userFirstName!==this.props.userFirstName)
      // ||
      // (nextProps.topForComment!==this.props.topForComment)
      // ||
      // (nextProps.topAgainstComment!==this.props.topAgainstComment)
    );
  }

}



NewIssueRender.defaultProps={
  issueBeingPosted:false,
  scrapedUrlBeingFetched:false,
}
NewIssueRender.propTypes= {
  device: React.PropTypes.object.isRequired,
  userPhotoUrl: React.PropTypes.string,

  relatedArticle: React.PropTypes.object,
  relatedBill: React.PropTypes.object,
  issueBeingPosted: React.PropTypes.bool.isRequired,
  scrapedUrlBeingFetched: React.PropTypes.bool.isRequired,
  onSearchTermChanged: React.PropTypes.func.isRequired,
  searchBillData: React.PropTypes.array,
  currentlySearching: React.PropTypes.bool,
  removeAttachedArticle: React.PropTypes.func.isRequired,
  removeAttachedBill: React.PropTypes.func.isRequired,

  searchModalVisible: React.PropTypes.bool.isRequired,
  // urlModalVisible: React.PropTypes.bool.isRequired,
  // showUrlAttachModal: React.PropTypes.func.isRequired,
  // hideUrlAttachModal: React.PropTypes.func.isRequired,
  showBillSearchModal: React.PropTypes.func.isRequired,
  hideBillSearchModal: React.PropTypes.func.isRequired,

  onUrlAttached: React.PropTypes.func.isRequired,
  onBillAttached: React.PropTypes.func.isRequired,
  onIssuePost: React.PropTypes.func.isRequired,
  onRelatedArticleClicked: React.PropTypes.func.isRequired,
  onRelatedBillClicked: React.PropTypes.func.isRequired,
};
export default NewIssueRender;
