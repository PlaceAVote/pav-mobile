    /* @flow weak */
    /**
     * # AccordionBillCommentCardContainer.js
     *
     * This class is a little complicated as it handles multiple states.
     *
     */
    'use strict';






    /**
    * Icons library
    */



    import {Colors} from '../../../config/constants';
    import React from 'react';
    import {StyleSheet, Text, View, TouchableOpacity, ListView} from 'react-native';
    import {getCorrectFontSizeForScreen} from '../../../lib/Utils/multiResolution'
    import Dimensions from 'Dimensions';
    const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

    import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
    import icomoonConfig from '../../../../assets/fonts/icomoon.json';
    const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
    import Collapsible from 'react-native-collapsible';
    import SubcommentContainerListCard from './SubcommentContainerListCard';














    class AccordionBillCommentCardContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state={
          isCollapsed:true
        }
      }




      /**
       * ## Styles for PORTRAIT
       */
      getPortraitStyles(self){
        return StyleSheet.create({

          cardContainer:{
            flex: 1,
            alignItems: 'stretch',
            padding:7,
            // backgroundColor: 'pink',
            
          },



          /* Accordion Header */
          headerContainer:{
            paddingTop: h*0.041,
            paddingBottom: h*0.012,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            // backgroundColor:'blue',
            // borderWidth: 1,
            // borderColor: 'rgba(0, 0, 0, 0.06)',
            // borderTopWidth:0,
            // borderTopColor: 'rgba(0, 0, 0, 0.06)',
            // borderTopWidth: 1,
          },
          repliesBoxTextContainer:{
            flex:1,
            alignItems:'center',
            // backgroundColor:'red',
          },
          repliesBoxText:{
            flex:1,
            fontSize: getCorrectFontSizeForScreen(w,h,9),
            fontFamily: 'Whitney-Book',
            color: Colors.negativeAccentColor,
          },
          repliesBoxIcon:{
              color: Colors.negativeAccentColor,
          },

        });
      }




      expandCard(){
        this.setState({isCollapsed:false});
      }

      collapseCard(){
        this.setState({isCollapsed:true});
      }

      /**
       * ## Styles for LANDSCAPE
       */
      getLandscapeStyles(self){
        return StyleSheet.create({
        });
      }


      onHeaderClick(){
        // alert("Render accordion content");
          this.setState({
            isCollapsed:!this.state.isCollapsed
          })
      }

      renderAccordionHeader(styles){
        // console.log("renderAccordionHeader this.state.isCollapsed "+this.state.isCollapsed);
        return (
          <TouchableOpacity onPress={this.onHeaderClick.bind(this)} style={styles.headerContainer}>
            <View style={styles.repliesBoxTextContainer}>
              <Text style={styles.repliesBoxText}>{this.props.replies.length>1?this.props.replies.length+" Replies ":"1 Reply"}  {this.state.isCollapsed==true?"(Tap to expand)":"(Tap to collapse)"}</Text>
            </View>
            <PavIcon name={this.state.isCollapsed==true?"arrow-down":"arrow-up"} size={15} style={styles.repliesBoxIcon}/>
          </TouchableOpacity>
        );
      }





      getBgColorBasedOnCommentLvl(commentLvl){
        switch(commentLvl%3){
          case 0:
            return 'rgba(165, 203, 117, 0.1)';  //greenish
          case 1:
            return 'rgba(83, 110, 178, 0.1)';  //blueish
          case 2:
            return 'rgba(230, 74, 51, 0.025)';  //redish
        }
        return Colors.transparentColor;
      }



      /**
       * ### render
       * Setup some default presentations and render
       */
      render() {

        let isPortrait = (this.props.device.orientation!="LANDSCAPE");
        // console.log("@@@@ IS PORTRAIT : "+isPortrait);
        let styles= isPortrait?this.getPortraitStyles(this):this.getLandscapeStyles(this);
        // console.log("this.state.isCollapsed"+this.state.isCollapsed);
        // console.log("This commentLvl: "+this.props.commentLvl+" with a base of: "+this.props.baseCommentLvl)
        return(
          <View style={[styles.cardContainer,{backgroundColor: this.getBgColorBasedOnCommentLvl(this.props.commentLvl)}, this.props.style]}>
            {this.renderAccordionHeader(styles)}
            <Collapsible collapsed={this.state.isCollapsed} align="center">
              <SubcommentContainerListCard

                replies={this.props.replies}
                device={this.props.device}
                commentBeingAltered={this.props.commentBeingAltered}
                commentLvl={this.props.commentLvl}
                baseCommentLvl={this.props.baseCommentLvl}
                onShowMoreCommentsClick={this.props.onShowMoreCommentsClick}
                onUserClick={this.props.onUserClick}
                onLikeDislikeClick={this.props.onLikeDislikeClick}
                onCommentPost={this.props.onCommentPost}
                refresable={false}
                />
            </Collapsible>
          </View>
        );
      }


      shouldComponentUpdate(nextProps, nextState) {
        return(
          (nextProps.device.orientation !== this.props.device.orientation)
          ||
          (nextProps.replies !== this.props.replies)
          ||
          (nextState.isCollapsed !==this.state.isCollapsed)
        );
      }

    }






    AccordionBillCommentCardContainer.defaultProps = {commentLvl: 0};
    AccordionBillCommentCardContainer.propTypes= {

      replies:React.PropTypes.array.isRequired,
      commentBeingAltered: React.PropTypes.bool.isRequired,
      onShowMoreCommentsClick: React.PropTypes.func.isRequired,
      onUserClick: React.PropTypes.func.isRequired,
      onLikeDislikeClick: React.PropTypes.func.isRequired,
      onCommentPost: React.PropTypes.func.isRequired,

      device: React.PropTypes.object.isRequired,
      commentLvl: React.PropTypes.number.isRequired,
      baseCommentLvl: React.PropTypes.number.isRequired,


    };
    export default AccordionBillCommentCardContainer;
