/* @flow weak */
/**
 * # CommentReplyBox.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
}
from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icomoonConfig = require('../../../assets/fonts/icomoon.json');
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import LinearGradient from 'react-native-linear-gradient';
import Button from 'sp-react-native-iconbutton'
/**
* Image library
*/

// import PavImage from '../../lib/UI/PavImage'



/**
 * The states were interested in
 */
// const {
//   SET_ORIENTATION
// } = ScheneKeys;













class CommentReplyBox extends Component {
  constructor(props) {
    super(props);
    this.state={
      comment:""
    }
  }




  /**
   * ## Styles for PORTRAIT
   */
  getPortraitStyles(self){
    return StyleSheet.create({


      commentsPageContainer:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'white'
      },

      addCommentTitleText:{
        paddingHorizontal: w*0.027,
        paddingTop: h*0.015,
        color: Colors.mainTextColor,
        fontFamily: 'Whitney-Bold',
        fontSize: getCorrectFontSizeForScreen(w,h,7),
        backgroundColor:Colors.transparentColor
      },
      commentInputContainer:{
        flexDirection:'row',
        paddingHorizontal: w*0.026,
        paddingVertical: h*0.015,
      },
      commentInput:{
        flex:1,
        paddingHorizontal: w*0.018,
        paddingVertical: h*0.010,
        height: 56,
        borderColor: Colors.mainBorderColor,
        borderWidth: 1,
        backgroundColor:'white',
        fontFamily: 'Whitney-Book',
        fontSize: getCorrectFontSizeForScreen(w,h,12),
      },
      postBtn:{
        marginLeft: w*0.013,
        paddingHorizontal: w*0.027,
        height:56,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: Colors.accentColor,
        borderColor: Colors.mainBorderColor
      },
      whiteBtnText:{
        color: Colors.mainTextColor,
        textAlign: 'center',
        fontFamily: 'Whitney',
        fontSize: getCorrectFontSizeForScreen(w,h,14),
      },

    });
  }





  /**
   * ## Styles for LANDSCAPE
   */
  getLandscapeStyles(self){
    return StyleSheet.create({

    });
  }

  onTabFocus(){

  }

  /**
   * ### render method
   */
  render() {
    let isPortrait = (this.props.orientation!="LANDSCAPE");
    // console.log("@@@@ IS PORTRAIT : "+isPortrait);
    // console.log("@@@@ IS LOADING : "+this.props.newsfeed.isFetching.newsFeedData);
    let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
    return(
      <LinearGradient
        colors={['#4D6EB2', '#775B96']}
        start={[0.0, 0.5]} end={[1.0, 0.5]}
        style={styles.commentsPageContainer}>
          <Text style={styles.addCommentTitleText}>ADD A COMMENT </Text>
          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder="Type a comment"
              multiline={true}
              style={styles.commentInput}
              onChangeText={(text) => this.setState({comment:text})}
            />
            <Button
            onPress={()=>this.props.onPostBtnPress(this.state.comment)}
            isDisabled={false}
            style={styles.postBtn}
            textStyle={styles.whiteBtnText}>
            Post
            </Button>
          </View>
      </LinearGradient>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      (nextProps.commentData !== this.props.commentData)
      ||
      (nextProps.orientation !== this.props.orientation)
    );
  }

}


export default CommentReplyBox;
