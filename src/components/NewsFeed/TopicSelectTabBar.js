import React from 'react';
const {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  findNodeHandle,
  Dimensions,
} = React;

const TAB_HEIGHT = 50;
const {height:h, width:w} = Dimensions.get('window');
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);

import {Colors} from '../../config/constants';

const ScrollableTabBar = React.createClass({

  getDefaultProps() {
    return {
      scrollOffset: 52,
    };
  },

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    underlineHeight: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    scrollOffset: React.PropTypes.number,
  },

  getInitialState() {
    this._tabsMeasurements = [];
    return {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
    };
  },

  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;

    if (tabCount === 0 || offset.value < 0 || offset.value > tabCount - 1) {
      return;
    }

    if (this.necessarilyMeasurementsCompleted(position)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  },

  necessarilyMeasurementsCompleted(position) {
    return this._tabsMeasurements[position] && this._tabsMeasurements[position + 1];
  },

  updateTabPanel(position, pageOffset) {
    const absolutePageOffset = pageOffset * this._tabsMeasurements[position].width;
    let newScrollX = this._tabsMeasurements[position].left + absolutePageOffset;

    newScrollX -= this.props.scrollOffset;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform === 'android') {
      this._scrollView.scrollTo({x: newScrollX, y: 0, });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({x: newScrollX, y: 0, });
    }

  },

  updateTabUnderline(position, pageOffset, tabCount) {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;

    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
      const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);

      this.state._leftTabUnderline.setValue(newLineLeft);
      this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
    } else {
      this.state._leftTabUnderline.setValue(lineLeft);
      this.state._widthTabUnderline.setValue(lineRight - lineLeft);
    }
  },

  measureTab(page) {
    const tabContainerhandle = findNodeHandle(this.refs.tabContainer);
    this.refs['tab_' + page].measureLayout(tabContainerhandle, (ox, oy, width, height, pageX, pageY) => {
      this._tabsMeasurements[page] = {left: ox, right: ox + width, width: width, height: height, };

      this.updateView({value: this.props.scrollValue._value, });
    });
  },

    onTabContainerLayout(e) {
      this._tabContainerMeasurements = e.nativeEvent.layout;
      let width = this._tabContainerMeasurements.width;
      if (width < w) {
        width = w;
      }
      this.setState({ _containerWidth: width, });
    },

    onContainerLayout(e) {
      this._containerMeasurements = e.nativeEvent.layout;
    },








    renderTabOption(name, page) {
      const isTabActive = this.props.activeTab === page;
      const activeTextColor = this.props.activeTextColor || 'navy';
      const inactiveTextColor = this.props.inactiveTextColor || 'black';
      const textStyle = this.props.textStyle || {};
      const textColor = isTabActive ? activeTextColor : inactiveTextColor;
      // , {paddingHorizontal:isTabActive?w*0.10:0}
      return (<TouchableOpacity
        key={name}
        ref={'tab_' + page}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        style={styles.tab}
        onPress={() => this.props.goToPage(page)}
        onLayout={this.measureTab.bind(this, page)}
      >
        <Text style={[styles.tabText,{ color: textColor}, textStyle, ]}>{name} </Text>
      </TouchableOpacity>);
    },




  renderTabArrow(shouldRender, type){
    if(shouldRender){
      if(type=="left"){
        return(<TouchableOpacity style={styles.iconContainer} onPress={()=>{
          this._scrollView.scrollTo({x: 0, y: 0, });
        }}>
          <PavIcon key="leftIcon" name="arrow-left" size={15} style={[styles.topicArrowIcon, this.props.activeTab==0?{color:Colors.transparentColor,}:{}]}/>
        </TouchableOpacity>);
      }else if (type=="right"){
        return (<TouchableOpacity style={styles.iconContainer} onPress={()=>{
          if (Platform === 'android') {
            this._scrollView.scrollTo({x: 0, y: 0, });
          } else {
            const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
            this._scrollView.scrollTo({x: rightBoundScroll, y: 0, });
          }
        }}>
          <PavIcon key="leftIcon" name="arrow-right" size={15} style={[styles.topicArrowIcon, this.props.activeTab==this.props.tabs.length-1?{color:Colors.transparentColor,}:{}]}/>
        </TouchableOpacity>);
      }
    }else{
      return <View></View>
    }
  },


  render() {
    const tabUnderlineStyle = this.props.indicatorPosition=="bottom"?{
      position: 'absolute',
      height: this.props.underlineHeight || 4,
      backgroundColor: this.props.underlineColor || 'navy',
      bottom: 0,
    }:{
      position: 'absolute',
      height: this.props.underlineHeight || 4,
      backgroundColor: this.props.underlineColor || 'navy',
      top: 0,
    };

    this.props.scrollValue.addListener(this.updateView);
    const tabs = this.props.tabs;
    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline,
    };
// {width: this.state._containerWidth, }
    return  (<View
      style={styles.container}
      onLayout={this.onContainerLayout}
    >
      {this.renderTabArrow.bind(this, this.props.indicatorArrowsEnabled==true, "left")}
      <ScrollView
        ref={(scrollView) => { this._scrollView = scrollView; }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollableContainer}
        directionalLockEnabled={true}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View
          style={[styles.tabs, ]}
          ref={'tabContainer'}
          onLayout={this.onTabContainerLayout}
        >
          {tabs.map((tab, i) => this.renderTabOption(tab, i))}
          <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, ]} />
        </View>
      </ScrollView>
      {this.renderTabArrow.bind(this, this.props.indicatorArrowsEnabled==true, "right")}
    </View>);
  },

});

module.exports = ScrollableTabBar;

const styles = StyleSheet.create({
  container: {
    flex:0,
    height: TAB_HEIGHT,
    flexDirection:'row',
    backgroundColor:'white',
    // borderWidth: 0,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    // borderColor: '#ccc',
    paddingHorizontal:2,
  },
  tab: {
    flex:1,
    backgroundColor:'white',
    paddingHorizontal:w*0.05,
    height: TAB_HEIGHT - 1,
    borderStyle: 'solid',
    borderLeftColor: 'rgba(0, 0, 0, 0.1)',
    borderLeftWidth:1,
    // alignItems: 'center',
    justifyContent: 'center',

    // paddingBottom: 30,
    // paddingLeft: 20,
    // paddingRight: 20,
  },

  tabs: {
    height: TAB_HEIGHT - 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',

    // backgroundColor:'green'
  },
  scrollableContainer: {
    flex:1,
    height: TAB_HEIGHT,
    // backgroundColor:'green'
  },
  topicArrowIcon:{
    paddingHorizontal: w*0.002,
    color:Colors.primaryColor,

  },
  iconContainer:{
    justifyContent:'center',
    // backgroundColor:'blue'
  },
  tabText:{
    paddingHorizontal: w*0.009,
    fontFamily: 'Whitney',
    fontSize: getCorrectFontSizeForScreen(w,h,5),
    color: Colors.primaryColor,
    textAlign:'center',
  }

});
